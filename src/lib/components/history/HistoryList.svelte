<script lang="ts">
	import { formatRelativeTime } from './time';

	type Item = {
		id: number;
		action: string;
		count: number;
		created_at: string;
	};

	let { history = [] }: { history: Item[] } = $props();
</script>

<div class="history-box">
	<h2>History</h2>

	{#if history.length === 0}
		<p>No history yet!</p>
	{:else}
		<ul class="list">
			{#each history as item (item.id)}
				<li>
					<span class="badge {item.action}">
						{item.action}
					</span>

					<span class="middle">
						Result: {item.count}
					</span>

					<span class="time">
						{formatRelativeTime(item.created_at)}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.history-box {
		margin-top: 20px;
		width: 400px;
	}

	.list {
		list-style: none;
		padding: 0;
		max-height: 250px;
		overflow-y: auto;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	li {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 1px solid #eee;
	}

	.badge {
		font-weight: bold;
		font-size: 12px;
		padding: 5px;
		border-radius: 3px;
	}

	/* Beginners usually use basic colors or simple hexes, not perfectly matched palettes */
	.increment {
		background: lightgreen;
		color: darkgreen;
	}
	.decrement {
		background: #ffcccc;
		color: red;
	}
	.reset {
		background: #eee;
		color: black;
	}

	.middle {
		flex-grow: 1;
		text-align: center;
	}

	.time {
		font-size: 12px;
		color: gray;
	}
</style>
