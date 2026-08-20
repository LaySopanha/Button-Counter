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
