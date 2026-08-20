import { json } from '@sveltejs/kit';
import { db } from '$lib/db';

export async function GET() {
	try {
		const result = await db.execute('SELECT 1 AS test');
		console.log('Database connected successfully');
		return json({
			success: true,
			message: 'Database connected successfully',
			data: result.rows
		});
	} catch (error) {
		console.error('Database connection failed:', error);

		return json(
			{
				success: false,
				message: 'Database connection failed',
				error: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 500 }
		);
	}
}
