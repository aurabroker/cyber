<script>
	import { stats } from '$lib/data.js';
</script>

<section id="stats-section">
	<div class="stats-row">
		{#each stats as s (s.n)}
			<div class="stat-cell">
				<div class="stat-n">{s.n}</div>
				<div class="stat-d">
					{s.desc}
					<em>{s.source}</em>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	#stats-section {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4.5rem 2rem 0;
	}

	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.stat-cell {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 2rem;
		text-align: center;
		backdrop-filter: blur(8px);
	}

	.stat-n {
		font-family: var(--font-display);
		font-size: 2.8rem;
		font-weight: 700;
		background: linear-gradient(120deg, #d4ecff, var(--accent));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		filter: drop-shadow(0 0 18px rgba(77, 163, 255, 0.35));
	}

	.stat-d {
		margin-top: 0.6rem;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.stat-d em {
		display: block;
		margin-top: 0.35rem;
		font-family: var(--font-mono);
		font-style: normal;
		font-size: 0.65rem;
		letter-spacing: 0.12em;
		color: var(--faint);
		text-transform: uppercase;
	}

	@media (max-width: 820px) {
		.stats-row {
			grid-template-columns: 1fr;
		}
	}
</style>
