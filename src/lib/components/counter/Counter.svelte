<script lang="ts">
	import { enhance } from '$app/forms';
	let { startingCount = 0 }: { startingCount?: number } = $props();
</script>

<form class="counter" method="POST" action="?/click" use:enhance role="group" aria-label="Counter">
	<!-- The Huge Number -->
	<div class="count-display">
		<span aria-hidden="true">{startingCount}</span>
		<span class="sr-only" aria-live="polite" aria-atomic="true">
			Count is {startingCount}
		</span>
	</div>

	<!-- The Massive 3D Button -->
	<div class="main-action">
		<button
			type="submit"
			name="action"
			value="increment"
			class="btn-huge"
			aria-label="Increase count"
		>
			PRESS
		</button>
	</div>

	<!-- The Smaller Buttons -->
	<div class="secondary-actions">
		<button
			type="submit"
			name="action"
			value="decrement"
			class="btn-small"
			aria-label="Decrease count">− Decrease</button
		>
		<button
			type="submit"
			name="action"
			value="reset"
			class="btn-small"
			aria-label="Reset count to zero">Reset</button
		>
	</div>
</form>

<style>
	.counter {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		margin: 2rem 0;
	}

	.count-display {
		font-size: clamp(4rem, 18vw, 8rem); /* Massive number, but never wider than the screen */
		font-weight: 900;
		color: #3f3f46;
		line-height: 1;
		font-family: var(--font-heading);
		font-variant-numeric: tabular-nums;
	}

	.btn-huge {
		font-family: var(--font-main);
		font-size: clamp(1.5rem, 8vw, 2.5rem);
		font-weight: bold;
		padding: 1.5rem clamp(2rem, 12vw, 4rem);
		border-radius: 1rem;
		background: var(--primary); /* Red tactile button */
		color: white;
		border: none;
		/* The 3D tactile shadow effect */
		box-shadow:
			0 10px 0 var(--primary-dark),
			0 15px 20px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: all 0.1s ease;
		letter-spacing: 4px;
	}

	/* When clicked, it presses down! */
	.btn-huge:active {
		transform: translateY(10px);
		box-shadow:
			0 0px 0 var(--primary-dark),
			0 5px 10px rgba(0, 0, 0, 0.2);
	}

	.btn-huge:focus-visible {
		outline: 3px solid var(--primary-dark);
		outline-offset: 4px;
	}

	.secondary-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		margin-top: 1rem;
	}

	.btn-small {
		font-family: var(--font-main);
		font-size: 1rem;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		border: 2px solid #e4e4e7;
		background: transparent;
		color: #71717a;
		cursor: pointer;
		font-weight: bold;
		transition: all 0.2s;
	}

	.btn-small:hover {
		background: #f4f4f5;
		color: #27272a;
	}

	.btn-small:focus-visible {
		outline: 2px solid #71717a;
		outline-offset: 2px;
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
