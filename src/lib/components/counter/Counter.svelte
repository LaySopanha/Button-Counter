<script lang="ts">
	import { createCounter } from './counter';

	let { startingCount = 0 }: { startingCount?: number } = $props();

	const counter = createCounter(startingCount);
</script>

<p>Count: {counter.count}</p>
<button onclick={counter.increment}>Increment+</button>
<button onclick={counter.decrement}>Decrement-</button>
<button onclick={counter.reset}>Reset</button>
