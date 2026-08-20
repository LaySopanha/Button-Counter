import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		env: {
			TURSO_DATABASE_URL: 'file:./test.db',
			TURSO_AUTH_TOKEN: ''
		}
	}
});
