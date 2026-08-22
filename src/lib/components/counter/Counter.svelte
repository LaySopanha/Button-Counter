<script lang="ts">
	let { startingCount = 0 }: { startingCount?: number } = $props();
</script>

<form class="counter" method="POST" action="?/click" role="group" aria-label="Counter">
	<button type="submit" name="action" value="decrement" aria-label="Decrease count"> − </button>

	<span class="count-display">
		<span aria-hidden="true">{startingCount}</span>
		<span class="sr-only" aria-live="polite" aria-atomic="true">
			Count is {startingCount}
		</span>
	</span>

	<button type="submit" name="action" value="increment" aria-label="Increase count"> + </button>

	<button type="submit" name="action" value="reset" aria-label="Reset count to zero">
		Reset
	</button>
</form>

<style>
	.counter {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	button {
		font-size: 1.5rem;
		min-width: 2.5rem;
		height: 2.5rem;
		padding: 0 0.75rem;
		border-radius: 0.375rem;
		border: 1px solid #ccc;
		background: #fff;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	button:focus-visible {
		outline: 2px solid #2563eb;
		outline-offset: 2px;
	}

	.count-display {
		min-width: 3rem;
		text-align: center;
		font-size: 1.25rem;
		font-variant-numeric: tabular-nums;
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
</style>
