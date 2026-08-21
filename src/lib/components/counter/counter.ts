export type CounterState = {
	count: number;
};

export function createCounter(initial: number) {
	let count = $state(initial);

	return {
		get count() {
			return count;
		},
		increment() {
			count += 1;
		},
		decrement() {
			count = count > 0 ? count - 1 : 0;
		},
		reset() {
			count = 0;
		}
	};
}
