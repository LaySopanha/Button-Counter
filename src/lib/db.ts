import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

if (!env.TURSO_DATABASE_URL) {
	throw new Error('TURSO_DATABASE_URL is not configured');
}

if (!env.TURSO_AUTH_TOKEN) {
	throw new Error('TURSO_AUTH_TOKEN is not configured');
}

export const db = createClient({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN
});

export type Action = 'increment' | 'decrement' | 'reset';

export async function saveClick(action: Action, count: number) {
	await db.execute({
		sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
		args: [action, count]
	});
}

export async function getLatestCount(): Promise<number> {
	const result = await db.execute('SELECT count FROM click_events ORDER BY id DESC LIMIT 1');

	if (result.rows.length === 0) {
		return 0;
	}

	return Number(result.rows[0].count);
}

export async function getClickHistory() {
	const result = await db.execute(`
		SELECT id, action, count, created_at
		FROM click_events
		ORDER BY id DESC
		LIMIT 20
	`);

	return result.rows;
}
