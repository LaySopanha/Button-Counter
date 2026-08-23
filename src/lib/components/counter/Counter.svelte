<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let { startingCount = 0 }: { startingCount?: number } = $props();

	// The server is the source of truth, but a click costs two round trips before
	// its result lands. Show the predicted count immediately and fall back to the
	// server value once every in-flight click has settled.
	let predicted = $state<number | null>(null);
	let inFlight = $state(0);

	const shown = $derived(predicted ?? startingCount);

	const submitClick: SubmitFunction = () => {
		predicted = shown + 1;
		inFlight += 1;

		return async ({ update }) => {
			await update();
			inFlight -= 1;
			if (inFlight === 0) predicted = null;
		};
	};
</script>

<form
	class="counter"
	method="POST"
	action="?/click"
	use:enhance={submitClick}
	role="group"
	aria-label="Counter"
>
	<!-- The Huge Number -->
	<div class="count-display">
		<span aria-hidden="true">{shown}</span>
		<span class="sr-only" aria-live="polite" aria-atomic="true">
			Count is {shown}
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
