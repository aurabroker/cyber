<script>
	import { processSteps } from '$lib/data.js';
</script>

<section id="process-section" class="section">
	<p class="section-label">Jak działamy</p>
	<h2 class="section-title">Od kontaktu do ochrony: 4 kroki.</h2>
	<div class="proc-grid">
		{#each processSteps as step, i (step.n)}
			<div class="proc-step" class:last={i === processSteps.length - 1}>
				<div class="ps-bg">{step.n}</div>
				<div class="ps-dot"></div>
				<div class="ps-t">{step.title}</div>
				<div class="ps-d">{step.desc}</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.proc-grid {
		margin-top: 3.5rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
	}

	.proc-step {
		position: relative;
		padding-top: 2.2rem;
	}

	/* linia łącząca */
	.proc-step::before {
		content: '';
		position: absolute;
		top: 6px;
		left: 14px;
		right: -2rem;
		height: 1px;
		background: linear-gradient(90deg, var(--line-strong), var(--line));
	}

	.proc-step.last::before {
		right: 40%;
		background: linear-gradient(90deg, var(--line-strong), transparent);
	}

	.ps-dot {
		position: absolute;
		top: 0;
		left: 0;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 14px 3px var(--glow-soft), 0 0 4px var(--glow);
	}

	.ps-bg {
		position: absolute;
		top: 0.4rem;
		right: 0;
		font-family: var(--font-display);
		font-size: 3.4rem;
		font-weight: 700;
		color: rgba(120, 180, 255, 0.08);
		line-height: 1;
		user-select: none;
	}

	.ps-t {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	.ps-d {
		color: var(--muted);
		font-size: 0.88rem;
		max-width: 15rem;
	}

	@media (max-width: 960px) {
		.proc-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.proc-step:nth-child(2)::before {
			right: 20%;
			background: linear-gradient(90deg, var(--line-strong), transparent);
		}
	}

	@media (max-width: 560px) {
		.proc-grid {
			grid-template-columns: 1fr;
		}

		.proc-step::before {
			right: 40% !important;
			background: linear-gradient(90deg, var(--line-strong), transparent) !important;
		}
	}
</style>
