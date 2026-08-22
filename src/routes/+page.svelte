<!-- <script lang="ts">
	import Counter from '$lib/components/counter/Counter.svelte';
</script>

<h1>Button Counter</h1>
<Counter startingCount={0} /> -->
<script lang="ts">
	import Counter from '$lib/components/counter/Counter.svelte';
	import HistoryList from '$lib/components/history/HistoryList.svelte';

	// dummy data
	let testHistory = [
		{ id: 3, action: 'increment', count: 2, time: new Date().toISOString() },
		{ id: 2, action: 'increment', count: 1, time: '2026-01-01T14:30:00' },
		{ id: 1, action: 'reset', count: 0, time: '2025-12-25T10:00:00' }
	];
</script>

<div class="container">
	<h1>Button Counter</h1>
	<Counter startingCount={0} />

	<HistoryList history={testHistory} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: Arial, sans-serif;
		padding: 30px;
	}
</style>
