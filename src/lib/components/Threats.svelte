<script>
	import { threats } from '$lib/data.js';
</script>

<section id="threats-section">
	<div class="thr-inner section">
		<div class="thr-left">
			<p class="section-label">Wektory ataku</p>
			<h2 class="section-title">Twój cyfrowy obwód<br />jest pod obserwacją.</h2>
			<p class="thr-copy">
				Hakerzy nie szukają dużych firm — szukają niezabezpieczonych. MŚP stanowią 43% celów, bo
				wdrażają mniej zabezpieczeń, a mają dostęp do realnych środków i danych klientów.
			</p>
			<p class="thr-copy">
				Polisa cyber przenosi finansowy ciężar incydentu z twojego bilansu na ubezpieczyciela — i
				dostarcza ekspertów gdy czas ma znaczenie krytyczne.
			</p>
		</div>
		<div class="thr-right">
			{#each threats as t (t.n)}
				<div class="thr-item">
					<span class="ti-n">{t.n}</span>
					<div>
						<div class="ti-t">{t.title}</div>
						<div class="ti-d">{t.desc}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	#threats-section {
		background:
			radial-gradient(700px 400px at 85% 20%, rgba(31, 111, 255, 0.08), transparent 70%),
			rgba(9, 16, 32, 0.7);
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
	}

	.thr-inner {
		display: grid;
		grid-template-columns: 1fr 1.1fr;
		gap: 4rem;
		align-items: start;
	}

	.thr-copy {
		margin-top: 1.3rem;
		color: var(--muted);
		font-size: 0.98rem;
		max-width: 30rem;
	}

	.thr-item {
		display: flex;
		gap: 1.2rem;
		padding: 1.15rem 0;
		border-bottom: 1px solid var(--line);
	}

	.thr-item:last-child {
		border-bottom: none;
	}

	.ti-n {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--accent);
		letter-spacing: 0.15em;
		padding-top: 0.25rem;
	}

	.ti-t {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.02rem;
	}

	.ti-d {
		color: var(--muted);
		font-size: 0.88rem;
		margin-top: 0.25rem;
	}

	@media (max-width: 900px) {
		.thr-inner {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
