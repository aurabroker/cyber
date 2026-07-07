<script>
	import { onMount } from 'svelte';
	import MatrixRain from './MatrixRain.svelte';
	import RansomOverlay from './RansomOverlay.svelte';
	import BreachWindow from './BreachWindow.svelte';
	import MatrixTakeover from './MatrixTakeover.svelte';

	let active = $state(null); // 'ransom' | 'breach' | 'matrix' | null

	const demos = [
		{
			id: 'ransom',
			tag: 'RANSOMWARE',
			title: 'Ekran blokady',
			desc: 'Zobacz, co widzi ofiara Petya/NotPetya, gdy dane zostają zaszyfrowane, a przestępcy żądają okupu w Bitcoin.',
			cta: 'Uruchom symulację'
		},
		{
			id: 'breach',
			tag: 'INTRUZJA',
			title: 'Włamanie na żywo',
			desc: 'Terminal krok po kroku: skan, exploit, przejęcie konta administratora i eksfiltracja danych obywateli.',
			cta: 'Otwórz terminal'
		},
		{
			id: 'matrix',
			tag: 'DATA LEAK',
			title: 'Deszcz danych',
			desc: 'Twój ekran „przejęty" — matrixowy strumień danych i komunikaty o kompromitacji systemu.',
			cta: 'Przejmij ekran'
		}
	];

	function openDemo(id) {
		active = id;
	}
	function close() {
		active = null;
	}

	/* Losowe wyskakujące okno — raz na sesję, po losowym opóźnieniu */
	onMount(() => {
		let timer;
		try {
			if (!sessionStorage.getItem('aura-sim-shown')) {
				const delay = 16000 + Math.random() * 14000; // 16–30 s
				timer = setTimeout(() => {
					if (!active && !document.hidden) {
						active = 'ransom';
						sessionStorage.setItem('aura-sim-shown', '1');
					}
				}, delay);
			}
		} catch {
			/* sessionStorage niedostępny — pomijamy auto-popup */
		}
		return () => clearTimeout(timer);
	});
</script>

<section id="sim-section">
	<div class="rain-bg" aria-hidden="true">
		<MatrixRain color="#173f2b" fontSize={16} opacity={0.5} />
	</div>
	<div class="sim-glow" aria-hidden="true"></div>

	<div class="sim-inner section">
		<p class="section-label">Symulator ataku</p>
		<h2 class="section-title">Zobacz atak, zanim on zobaczy Ciebie.</h2>
		<p class="sim-lead">
			Poniższe pokazy to <strong>bezpieczne symulacje</strong> prawdziwych scenariuszy. Nic nie zostaje
			zainstalowane ani przejęte — chcemy tylko, żebyś zobaczył, jak wygląda incydent i co pokrywa polisa.
		</p>

		<div class="demo-grid">
			{#each demos as d (d.id)}
				<button class="demo-card" onclick={() => openDemo(d.id)}>
					<span class="dc-tag">{d.tag}</span>
					<span class="dc-title">{d.title}</span>
					<span class="dc-desc">{d.desc}</span>
					<span class="dc-cta">{d.cta} →</span>
				</button>
			{/each}
		</div>

		<p class="sim-note">
			⚠ Wszystkie dane, adresy i cele w symulacjach są fikcyjne. Efekty służą wyłącznie celom
			edukacyjnym i marketingowym.
		</p>
	</div>
</section>

<RansomOverlay open={active === 'ransom'} onclose={close} />
<BreachWindow open={active === 'breach'} onclose={close} />
<MatrixTakeover open={active === 'matrix'} onclose={close} />

<style>
	#sim-section {
		position: relative;
		overflow: hidden;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		background: #060d0a;
	}

	.rain-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		mask-image: linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent);
		-webkit-mask-image: linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent);
	}

	.sim-glow {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: radial-gradient(120% 90% at 50% 50%, rgba(6, 13, 10, 0.45), rgba(6, 13, 10, 0.9));
		pointer-events: none;
	}

	.sim-inner {
		position: relative;
		z-index: 2;
	}

	.sim-lead {
		max-width: 44rem;
		margin-top: 1.2rem;
		color: var(--muted);
		font-size: 1.02rem;
	}

	.sim-lead strong {
		color: #37f39a;
	}

	.demo-grid {
		margin-top: 2.6rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4rem;
	}

	.demo-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.55rem;
		text-align: left;
		background: rgba(10, 20, 15, 0.82);
		border: 1px solid rgba(55, 243, 154, 0.2);
		border-radius: var(--radius);
		padding: 1.6rem;
		color: var(--text);
		cursor: pointer;
		transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
	}

	.demo-card:hover {
		transform: translateY(-4px);
		border-color: rgba(55, 243, 154, 0.55);
		box-shadow: 0 0 34px rgba(30, 200, 120, 0.18);
	}

	.dc-tag {
		font-family: var(--font-mono);
		font-size: 0.64rem;
		letter-spacing: 0.24em;
		color: #37f39a;
	}

	.dc-title {
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
	}

	.dc-desc {
		color: var(--muted);
		font-size: 0.88rem;
	}

	.dc-cta {
		margin-top: 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: #8fe6bd;
	}

	.sim-note {
		margin-top: 2rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--faint);
		letter-spacing: 0.02em;
	}

	@media (max-width: 900px) {
		.demo-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
