import { describe, it, expect, vi, beforeEach } from 'vitest';
import { actions, load } from './+page.server';
import { db } from '$lib/db';

vi.mock('$lib/db', () => ({
	db: {
		execute: vi.fn()
	}
}));

describe('+page.server', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	function createRequest(action: string) {
		const formData = new FormData();
		formData.append('action', action);
		return {
			formData: async () => formData
		} as any;
	}

	function lastSql() {
		return vi.mocked(db.execute).mock.calls[0][0] as unknown as { sql: string; args: unknown[] };
	}

	describe('actions.click', () => {
		it('should return the count the database wrote', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [{ count: 6 }] } as any);

			const result = await actions.click({ request: createRequest('increment') } as any);

			expect(result).toEqual({ count: 6 });
		});

		it('should insert and read back in a single statement', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [{ count: 6 }] } as any);

			await actions.click({ request: createRequest('increment') } as any);

			// One round trip: no separate read-then-write, which is what allowed two
			// overlapping clicks to store the same count twice.
			expect(db.execute).toHaveBeenCalledTimes(1);
			expect(lastSql().sql).toContain('RETURNING count');
			expect(lastSql().args).toEqual(['increment']);
		});

		it('should derive the incremented count in SQL', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [{ count: 6 }] } as any);

			await actions.click({ request: createRequest('increment') } as any);

			expect(lastSql().sql).toContain('LIMIT 1), 0) + 1');
		});

		it('should clamp decrement at 0 in SQL', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [{ count: 0 }] } as any);

			const result = await actions.click({ request: createRequest('decrement') } as any);

			expect(result).toEqual({ count: 0 });
			expect(lastSql().sql).toContain('MAX(');
			expect(lastSql().sql).toContain('- 1, 0)');
			expect(lastSql().args).toEqual(['decrement']);
		});

		it('should reset the count to 0', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [{ count: 0 }] } as any);

			const result = await actions.click({ request: createRequest('reset') } as any);

			expect(result).toEqual({ count: 0 });
			expect(lastSql().sql).toContain('VALUES (?, 0)');
			expect(lastSql().args).toEqual(['reset']);
		});

		it('should return 400 for invalid action', async () => {
			const result = await actions.click({ request: createRequest('invalid') } as any);

			expect(result).toMatchObject({
				status: 400,
				data: { error: 'invalid action' }
			});
			expect(db.execute).not.toHaveBeenCalled();
		});
	});

	describe('load', () => {
		it('should return history and take the count from its newest row', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({
				rows: [
					{ id: 2, action: 'increment', count: 7, created_at: '2026-08-22T10:00:00Z' },
					{ id: 1, action: 'reset', count: 0, created_at: '2026-08-22T09:55:00Z' }
				]
			} as any);

			const result = await load();

			expect(result.count).toBe(7);
			expect(result.history).toEqual([
				{ id: 2, action: 'increment', count: 7, created_at: '2026-08-22T10:00:00Z' },
				{ id: 1, action: 'reset', count: 0, created_at: '2026-08-22T09:55:00Z' }
			]);
		});

		it('should use a single query for count and history', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [] } as any);

			await load();

			expect(db.execute).toHaveBeenCalledTimes(1);
		});

		it('should return 0 when no rows exist', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [] } as any);

			const result = await load();

			expect(result.count).toBe(0);
			expect(result.history).toEqual([]);
		});
	});
});
