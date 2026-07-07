<script>
	import { coverage } from '$lib/data.js';
	import Padlock from './Padlock.svelte';
</script>

<section id="coverage" class="section">
	<p class="section-label">Co obejmuje polisa</p>
	<h2 class="section-title">Pełna tarcza. Jeden kontrakt.</h2>
	<div class="coverage-grid">
		{#each coverage as c (c.n)}
			<div class="cov-card">
				<div class="cov-head">
					<span class="cov-n">{c.n}</span>
					<span class="cov-icon"><Padlock size={30} /></span>
				</div>
				<div class="cov-name">{c.name}</div>
				<div class="cov-txt">{c.text}</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.coverage-grid {
		margin-top: 3rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4rem;
	}

	.cov-card {
		position: relative;
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 1.8rem;
		backdrop-filter: blur(8px);
		transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
		overflow: hidden;
	}

	.cov-card::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(140, 200, 255, 0.55), transparent);
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.cov-card:hover {
		border-color: var(--line-strong);
		box-shadow: 0 0 34px rgba(50, 120, 255, 0.16);
		transform: translateY(-3px);
	}

	.cov-card:hover::before {
		opacity: 1;
	}

	.cov-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.1rem;
	}

	.cov-n {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--accent);
		letter-spacing: 0.2em;
	}

	.cov-icon {
		opacity: 0.85;
	}

	.cov-name {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		margin-bottom: 0.55rem;
	}

	.cov-txt {
		color: var(--muted);
		font-size: 0.9rem;
	}

	@media (max-width: 960px) {
		.coverage-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 620px) {
		.coverage-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
