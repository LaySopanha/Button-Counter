import { fail, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/db';

export type HistoryEntry = {
	id: number;
	action: 'increment' | 'decrement' | 'reset';
	count: number;
	created_at: string;
};

async function getLatestCount(): Promise<number> {
	const result = await db.execute('SELECT count FROM click_events ORDER BY id DESC LIMIT 1');
	if (result.rows.length === 0) return 0;

	const count = Number(result.rows[0].count);
	return Number.isFinite(count) ? count : 0;
}

async function getHistory(): Promise<HistoryEntry[]> {
	const result = await db.execute(
		'SELECT id, action, count, created_at FROM click_events ORDER BY id DESC LIMIT 20'
	);

	return result.rows.map((row) => ({
		id: Number(row.id),
		action: String(row.action) as HistoryEntry['action'],
		count: Number(row.count),
		created_at: String(row.created_at)
	}));
}

export const load = async () => {
	const [count, history] = await Promise.all([getLatestCount(), getHistory()]);
	return { count, history };
};

export const actions = {
	click: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const action = data.get('action');

		if (action !== 'increment' && action !== 'decrement' && action !== 'reset') {
			return fail(400, { error: 'invalid action' });
		}

		const currentCount = await getLatestCount();
		const newCount =
			action === 'increment'
				? currentCount + 1
				: action === 'decrement'
					? Math.max(0, currentCount - 1)
					: 0;

		await db.execute({
			sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
			args: [action, newCount]
		});

		return { count: newCount };
	}
};
