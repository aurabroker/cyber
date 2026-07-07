<script>
	import { partners } from '$lib/data.js';
</script>

<div id="partner-strip">
	<span class="part-label">WSPARCIE UNDERWRITINGOWE I AKREDYTACJE</span>
	{#each partners as p (p.name)}
		<div class="part-badge">
			<div class="pb-n" class:accent={p.accent}>{p.name}</div>
			<div class="pb-s">{p.sub}</div>
		</div>
	{/each}
</div>

<style>
	#partner-strip {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 2.5rem 3.5rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 2rem;
		border-top: 1px solid var(--line);
	}

	.part-label {
		flex-basis: 100%;
		text-align: center;
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.32em;
		color: var(--faint);
	}

	.part-badge {
		text-align: center;
	}

	.pb-n {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.05rem;
		color: var(--text);
	}

	.pb-n.accent {
		color: var(--accent-2);
		text-shadow: 0 0 18px var(--glow-soft);
	}

	.pb-s {
		font-family: var(--font-mono);
		font-size: 0.58rem;
		letter-spacing: 0.22em;
		color: var(--faint);
		margin-top: 0.3rem;
	}
</style>
