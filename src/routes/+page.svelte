<script lang="ts">
	import { clampDecrement } from '$lib/clamp-decrement';

	let count = $state(0);
	function increment() { count += 1; }
	function decrement() { count = clampDecrement(count); }
	function reset() { count = 0; }
</script>
