import { json } from '@sveltejs/kit';
import { db } from '$lib/db';

export async function POST() {
	try {
		await db.execute(`
			CREATE TABLE IF NOT EXISTS click_history (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				action TEXT NOT NULL,
				previous_count INTEGER NOT NULL,
				new_count INTEGER NOT NULL,
				created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
			)
		`);

		console.log('click_history table created successfully');

		return json({
			success: true,
			message: 'click_history table created successfully'
		});
	} catch (error) {
		console.error('Failed to create table:', error);

		return json(
			{
				success: false,
				message: 'Failed to create table',
				error: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
}
