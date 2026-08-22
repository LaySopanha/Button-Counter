<script lang="ts">
	import Counter from '$lib/components/counter/Counter.svelte';

	let { data }: { data: { count: number } } = $props();
</script>

<h1>Button Counter</h1>

<Counter startingCount={data.count} />
