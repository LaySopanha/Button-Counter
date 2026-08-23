<script lang="ts">
	import Counter from '$lib/components/counter/Counter.svelte';
	import HistoryList from '$lib/components/history/HistoryList.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="container">
	<h1>Button Counter</h1>
	<Counter startingCount={data.count} />

	<HistoryList history={data.history} />
</div>

<!-- <style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: Arial, sans-serif;
		padding: 30px;
	}
</style> -->
