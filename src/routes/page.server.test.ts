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

	describe('actions.click', () => {
		it('should increment the count', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({
				rows: [{ count: 5 }]
			} as any);
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [] } as any);

			const request = createRequest('increment');
			const result = await actions.click({ request } as any);

			expect(result).toEqual({ count: 6 });
			expect(db.execute).toHaveBeenCalledTimes(2);
			expect(db.execute).toHaveBeenCalledWith({
				sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
				args: ['increment', 6]
			});
		});

		it('should decrement the count', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({
				rows: [{ count: 10 }]
			} as any);
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [] } as any);

			const request = createRequest('decrement');
			const result = await actions.click({ request } as any);

			expect(result).toEqual({ count: 9 });
			expect(db.execute).toHaveBeenCalledWith({
				sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
				args: ['decrement', 9]
			});
		});

		it('should stop at 0 when decrementing from 0', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({
				rows: [{ count: 0 }]
			} as any);
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [] } as any);

			const request = createRequest('decrement');
			const result = await actions.click({ request } as any);

			expect(result).toEqual({ count: 0 });
			expect(db.execute).toHaveBeenCalledWith({
				sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
				args: ['decrement', 0]
			});
		});

		it('should reset the count to 0', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({
				rows: [{ count: 42 }]
			} as any);
			vi.mocked(db.execute).mockResolvedValueOnce({ rows: [] } as any);

			const request = createRequest('reset');
			const result = await actions.click({ request } as any);

			expect(result).toEqual({ count: 0 });
			expect(db.execute).toHaveBeenCalledWith({
				sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
				args: ['reset', 0]
			});
		});

		it('should return 400 for invalid action', async () => {
			const request = createRequest('invalid');
			const result = await actions.click({ request } as any);

			expect(result).toMatchObject({
				status: 400,
				data: { error: 'invalid action' }
			});
			expect(db.execute).not.toHaveBeenCalled();
		});
	});

	describe('load', () => {
		it('should return count and history', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({
				rows: [{ count: 7 }]
			} as any);

			vi.mocked(db.execute).mockResolvedValueOnce({
				rows: [
					{ id: 1, action: 'increment', count: 6, created_at: '2026-08-22T10:00:00Z' },
					{ id: 2, action: 'reset', count: 0, created_at: '2026-08-22T09:55:00Z' }
				]
			} as any);

			const result = await load();

			expect(result).toEqual({
				count: 7,
				history: [
					{ id: 1, action: 'increment', count: 6, created_at: '2026-08-22T10:00:00Z' },
					{ id: 2, action: 'reset', count: 0, created_at: '2026-08-22T09:55:00Z' }
				]
			});
		});

		it('should return 0 when no rows exist', async () => {
			vi.mocked(db.execute).mockResolvedValueOnce({
				rows: []
			} as any);
			vi.mocked(db.execute).mockResolvedValueOnce({
				rows: []
			} as any);

			const result = await load();

			expect(result.count).toBe(0);
			expect(result.history).toEqual([]);
		});
	});
});
