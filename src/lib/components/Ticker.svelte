<script>
	import { tickerItems } from '$lib/data.js';

	const doubled = [...tickerItems, ...tickerItems];
</script>

<div class="ticker-wrap" aria-hidden="true">
	<div class="ticker-track">
		{#each doubled as item, i (i)}
			<span class="tick-item">
				<span class="tick-dot" class:red={item.red}></span>
				{item.text}
			</span>
		{/each}
	</div>
</div>

<style>
	.ticker-wrap {
		overflow: hidden;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		background: rgba(10, 18, 36, 0.6);
		padding: 0.75rem 0;
	}

	.ticker-track {
		display: flex;
		gap: 3rem;
		width: max-content;
		animation: ticker-scroll 70s linear infinite;
	}

	.tick-item {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		color: var(--muted);
		white-space: nowrap;
	}

	.tick-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 8px var(--glow);
		flex: none;
	}

	.tick-dot.red {
		background: var(--red);
		box-shadow: 0 0 8px rgba(255, 77, 94, 0.7);
	}

	@keyframes ticker-scroll {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}
</style>
