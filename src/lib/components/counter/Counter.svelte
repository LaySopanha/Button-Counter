<script lang="ts">
	import { createCounter } from './counter-state.svelte';
	let { startingCount = 0 }: { startingCount?: number } = $props();
	// svelte-ignore state_referenced_locally
	const counter = createCounter(startingCount);
</script>

<div class="counter-panel">
	<div class="hanko" aria-hidden="true">数</div>

	<p class="eyebrow">カウンター</p>

	<div class="counter" role="group" aria-label="Counter">
		<button
			type="button"
			class="btn"
			onclick={counter.decrement}
			disabled={counter.count <= 0}
			aria-label="Decrease count"
		>
			−
		</button>

		<div class="count-display">
			<span class="count-value" aria-hidden="true">{counter.count}</span>
			<span class="sr-only" aria-live="polite" aria-atomic="true">
				Count is {counter.count}
			</span>
		</div>

		<button type="button" class="btn" onclick={counter.increment} aria-label="Increase count">
			+
		</button>
	</div>

	<button type="button" class="reset" onclick={counter.reset} aria-label="Reset count to zero">
		Reset
	</button>
</div>

<style>
	:global(:root) {
		--washi: #f3eee4;
		--sumi: #232323;
		--shu: #bf3b2c;
		--shinchu: #b8935b;
		--usuzumi: #8c8578;
	}

	:global(body) {
		background-color: var(--washi);
		font-family: 'Zen Kaku Gothic New', sans-serif;
		color: var(--sumi);
	}

	.counter-panel {
		position: relative;
		width: min(340px, 100%);
		margin: 3rem auto;
		padding: 2.75rem 2rem 2.25rem;
		background-color: var(--washi);
		background-image:
			radial-gradient(circle at 18% 25%, rgba(35, 35, 35, 0.03) 0%, transparent 40%),
			radial-gradient(circle at 82% 75%, rgba(35, 35, 35, 0.025) 0%, transparent 45%);
		border: 1px solid rgba(35, 35, 35, 0.16);
		border-radius: 2px;
		box-shadow:
			0 1px 2px rgba(35, 35, 35, 0.06),
			0 8px 24px rgba(35, 35, 35, 0.05);
		text-align: center;
	}

	.hanko {
		position: absolute;
		top: -18px;
		right: -12px;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--shu);
		background-image: radial-gradient(
			circle at 35% 30%,
			rgba(255, 255, 255, 0.12),
			transparent 60%
		);
		color: var(--washi);
		font-family: 'Shippori Mincho B1', serif;
		font-size: 1.35rem;
		font-weight: 600;
		border-radius: 4px;
		transform: rotate(-6deg);
		box-shadow: 0 3px 8px rgba(191, 59, 44, 0.35);
	}

	.eyebrow {
		margin: 0 0 0.35rem;
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.28em;
		color: var(--usuzumi);
	}

	.counter {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin-bottom: 1.75rem;
	}

	.btn {
		width: 2.75rem;
		height: 2.75rem;
		font-family: 'Zen Kaku Gothic New', sans-serif;
		font-size: 1.35rem;
		line-height: 1;
		color: var(--sumi);
		background: transparent;
		border: 1.5px solid var(--sumi);
		border-radius: 3px;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.btn:hover:not(:disabled) {
		background-color: var(--sumi);
		color: var(--washi);
	}

	.btn:disabled {
		border-color: var(--usuzumi);
		color: var(--usuzumi);
		cursor: not-allowed;
	}

	.btn:focus-visible,
	.reset:focus-visible {
		outline: 2px solid var(--shu);
		outline-offset: 2px;
	}

	.count-display {
		min-width: 4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.count-value {
		font-family: 'Shippori Mincho B1', serif;
		font-weight: 600;
		font-size: 3rem;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--shu);
	}

	.reset {
		font-family: 'Zen Kaku Gothic New', sans-serif;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.16em;
		color: var(--usuzumi);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
	}

	.reset:hover {
		color: var(--sumi);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.btn {
			transition: none;
		}
	}
</style>
