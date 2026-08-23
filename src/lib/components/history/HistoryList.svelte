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
	<h2>Activity</h2>
	{#if history.length === 0}
		<p class="empty">No history yet!</p>
	{:else}
		<ul class="timeline">
			{#each history as item (item.id)}
				<li class="timeline-item">
					<span class="timeline-dot {item.action}"></span>
					<span class="timeline-content">
						<span class="action-text">{item.action}</span>
						<span class="result-text">→ {item.count}</span>
					</span>
					<span class="timeline-time">{formatRelativeTime(item.created_at)}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.history-box {
		width: 100%;
		max-width: 400px;
		margin-top: 2rem;
		padding: 2rem;
		background: white;
		border-radius: 1.5rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
	}

	h2 {
		text-align: center;
		margin-top: 0;
		margin-bottom: 2rem;
		color: #3f3f46;
	}

	.empty {
		text-align: center;
		color: #a1a1aa;
	}

	.timeline {
		list-style: none;
		margin: 0;
		border-left: 2px solid #f4f4f5;
		margin-left: 1rem;
		padding-left: 1.5rem;
		/* Keep a long history from pushing the rest of the page down */
		max-height: 250px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.timeline-item {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.timeline-dot {
		position: absolute;
		left: -1.9rem; /* Centers the dot on the border */
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 3px solid white;
	}

	/* Timeline dot colors */
	.timeline-dot.increment {
		background: #10b981;
	}
	.timeline-dot.decrement {
		background: #f43f5e;
	}
	.timeline-dot.reset {
		background: #94a3b8;
	}

	.timeline-content {
		font-family: var(--font-main);
		font-size: 1rem;
		color: #52525b;
	}

	.action-text {
		text-transform: capitalize;
		font-weight: bold;
		color: #27272a;
	}

	.result-text {
		color: #a1a1aa;
		font-weight: 500;
	}

	.timeline-time {
		font-size: 0.8rem;
		color: #a1a1aa;
	}
</style>
