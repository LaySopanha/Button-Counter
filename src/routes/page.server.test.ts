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

	function firstCall() {
		return vi.mocked(db.execute).mock.calls[0][0] as unknown as {
			sql: string;
			args: unknown[];
		};
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
			expect(firstCall().sql).toContain('RETURNING count');
			expect(firstCall().args).toEqual(['increment']);
		});

		it('should derive the incremented count in SQL', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [{ count: 6 }] } as any);

			await actions.click({ request: createRequest('increment') } as any);

			expect(firstCall().sql).toContain('LIMIT 1), 0) + 1');
		});

		it.each(['decrement', 'reset', 'invalid'])('should return 400 for %s', async (action) => {
			const result = await actions.click({ request: createRequest(action) } as any);

			expect(result).toMatchObject({
				status: 400,
				data: { error: 'invalid action' }
			});
			expect(db.execute).not.toHaveBeenCalled();
		});
	});

	describe('load', () => {
		it('should take the count from the newest row', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [{ count: 7 }] } as any);

			const result = await load();

			expect(result.count).toBe(7);
		});

		it('should read the count in a single query', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [{ count: 7 }] } as any);

			await load();

			expect(db.execute).toHaveBeenCalledTimes(1);
		});

		it('should return 0 when no rows exist', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [] } as any);

			const result = await load();

			expect(result.count).toBe(0);
		});
	});
});
