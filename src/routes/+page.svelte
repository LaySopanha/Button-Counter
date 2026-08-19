<script lang="ts">
	let count = $state(0);
	function increment() {
		count += 1;
	}
	function decrement() {
		count -= 1;
	}
	function reset() {
		count = 0;
	}
</script>

<h1>Button Counter</h1>
<p>Count: {count}</p>
<button onclick={increment}>Increment+</button>
<button onclick={decrement}>Decrement-</button>
<button onclick={reset}>Reset</button>
