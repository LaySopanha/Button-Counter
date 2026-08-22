<script lang="ts">
	import Counter from '$lib/components/counter/Counter.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Button Counter</h1>

<Counter startingCount={data.count} />

<section aria-labelledby="history-heading">
	<h2 id="history-heading">History</h2>

	{#if data.history.length > 0}
		<ul>
			{#each data.history as entry (entry.id)}
				<li>
					<span>{entry.action}</span>
					<span>Count: {entry.count}</span>
					<time datetime={entry.created_at}>{entry.created_at}</time>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No clicks recorded yet.</p>
	{/if}
</section>
