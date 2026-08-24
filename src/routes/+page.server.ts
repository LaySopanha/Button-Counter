import { fail, type RequestEvent } from '@sveltejs/kit';
import { db } from '$lib/db';

export const load = async () => {
	const result = await db.execute('SELECT count FROM click_events ORDER BY id DESC LIMIT 1');
	const latest = Number(result.rows[0]?.count);

	return {
		count: Number.isFinite(latest) ? latest : 0
	};
};

// The new count is derived inside the INSERT rather than read first, so two
// overlapping clicks cannot both read the same value and store it twice.
const NEXT_COUNT = 'COALESCE((SELECT count FROM click_events ORDER BY id DESC LIMIT 1), 0) + 1';

export const actions = {
	click: async ({ request }: RequestEvent) => {
		const data = await request.formData();
		const action = data.get('action');

		if (action !== 'increment') {
			return fail(400, { error: 'invalid action' });
		}

		const result = await db.execute({
			sql: `INSERT INTO click_events (action, count) VALUES (?, ${NEXT_COUNT}) RETURNING count`,
			args: [action]
		});

		return { count: Number(result.rows[0].count) };
	}
};
