import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';

describe('database', () => {
	let db: any;

	beforeAll(async () => {
		vi.resetModules();

		vi.doMock('$env/dynamic/private', () => ({
			env: {
				TURSO_DATABASE_URL: 'file:./test.db',
				TURSO_AUTH_TOKEN: 'dummy-token'
			}
		}));

		const module = await import('./db');
		db = module.db;

		await db.execute(`
      CREATE TABLE IF NOT EXISTS click_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT NOT NULL CHECK (action IN ('increment', 'decrement', 'reset')),
        count INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
	});

	afterEach(async () => {
		if (db) {
			await db.execute('DELETE FROM click_events');
		}
	});

	it('should insert an increment event and retrieve it', async () => {
		const action = 'increment';
		const count = 42;

		await db.execute({
			sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
			args: [action, count]
		});

		const result = await db.execute({
			sql: 'SELECT action, count FROM click_events WHERE action = ?',
			args: [action]
		});

		expect(result.rows).toHaveLength(1);
		expect(result.rows[0]).toMatchObject({ action, count });
	});

	it('should insert a decrement event correctly', async () => {
		await db.execute({
			sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
			args: ['decrement', 10]
		});

		const result = await db.execute('SELECT * FROM click_events');
		expect(result.rows[0]).toMatchObject({ action: 'decrement', count: 10 });
	});

	it('should insert a reset event correctly', async () => {
		await db.execute({
			sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
			args: ['reset', 0]
		});

		const result = await db.execute('SELECT * FROM click_events');
		expect(result.rows[0]).toMatchObject({ action: 'reset', count: 0 });
	});
	it('should reject an invalid action name', async () => {
		await expect(
			db.execute({
				sql: 'INSERT INTO click_events (action, count) VALUES (?, ?)',
				args: ['invalid', 99]
			})
		).rejects.toThrow();
	});
});
