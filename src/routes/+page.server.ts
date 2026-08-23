import { fail, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/db';

export type HistoryEntry = {
	id: number;
	action: 'increment' | 'decrement' | 'reset';
	count: number;
	created_at: string;
};

async function getHistory(): Promise<HistoryEntry[]> {
	const result = await db.execute(
		`SELECT id, action, count, replace(created_at, ' ', 'T') || 'Z' AS created_at FROM click_events ORDER BY id DESC LIMIT 20`
	);

	return result.rows.map((row) => ({
		id: Number(row.id),
		action: String(row.action) as HistoryEntry['action'],
		count: Number(row.count),
		created_at: String(row.created_at)
	}));
}

export const load = async () => {
	// The newest history row already carries the current count, so one round trip
	// to the database answers both questions.
	const history = await getHistory();
	const latest = history[0]?.count;

	return {
		count: Number.isFinite(latest) ? (latest as number) : 0,
		history
	};
};

// The new count is derived inside the INSERT rather than read first, so two
// overlapping clicks cannot both read the same value and store it twice.
const COUNT_EXPR = {
	increment: 'COALESCE((SELECT count FROM click_events ORDER BY id DESC LIMIT 1), 0) + 1',
	decrement: 'MAX(COALESCE((SELECT count FROM click_events ORDER BY id DESC LIMIT 1), 0) - 1, 0)',
	reset: '0'
} as const;

export const actions = {
	click: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const action = data.get('action');

		if (action !== 'increment' && action !== 'decrement' && action !== 'reset') {
			return fail(400, { error: 'invalid action' });
		}

		const result = await db.execute({
			sql: `INSERT INTO click_events (action, count) VALUES (?, ${COUNT_EXPR[action]}) RETURNING count`,
			args: [action]
		});

		return { count: Number(result.rows[0].count) };
	}
};
