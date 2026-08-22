import { fail, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/db';

async function getLatestCount(): Promise<number> {
	const result = await db.execute('SELECT count FROM click_events ORDER BY id DESC LIMIT 1');
	if (result.rows.length === 0) return 0;

	const count = Number(result.rows[0].count);
	return Number.isFinite(count) ? count : 0;
}

export const load = async () => {
	const count = await getLatestCount();
	return { count };
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
