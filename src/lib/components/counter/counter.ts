import { writable } from 'svelte/store';

export function createCounter(startingCount: number = 0) {
	const count = writable(startingCount);

	function increment() {
		count.update((n) => n + 1);
	}

	function decrement() {
		count.update((n) => Math.max(0, n - 1));
	}

	return { count, increment, decrement };
}
