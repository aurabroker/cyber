<script>
	import { onMount } from 'svelte';
	import Shield from './Shield.svelte';
	import Padlock from './Padlock.svelte';

	let attacks = $state(0);

	onMount(() => {
		const now = new Date();
		const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		attacks = Math.floor(((now - startOfDay) / 1000) * 1.85);
		const id = setInterval(() => {
			attacks += Math.floor(Math.random() * 3) + 1;
		}, 950);
		return () => clearInterval(id);
	});

	/* stałe pozycje cząsteczek — deterministyczne, bez różnic SSR/klient */
	const particles = [
		{ x: 6, y: 16, s: 5, d: 0 },
		{ x: 14, y: 62, s: 4, d: 1.2 },
		{ x: 22, y: 30, s: 6, d: 2.4 },
		{ x: 30, y: 74, s: 3, d: 0.6 },
		{ x: 44, y: 10, s: 4, d: 1.8 },
		{ x: 58, y: 20, s: 5, d: 3.1 },
		{ x: 66, y: 66, s: 3, d: 0.9 },
		{ x: 74, y: 12, s: 6, d: 2.1 },
		{ x: 82, y: 44, s: 4, d: 1.5 },
		{ x: 90, y: 24, s: 5, d: 2.8 },
		{ x: 94, y: 70, s: 3, d: 0.3 },
		{ x: 50, y: 84, s: 4, d: 1.1 }
	];
</script>

<section id="hero">
	<!-- świetlista smuga w tle -->
	<div class="streak" aria-hidden="true"></div>

	<!-- perspektywiczna siatka / płytka drukowana -->
	<div class="floor" aria-hidden="true"></div>

	<div class="hero-inner">
		<div class="hero-left">
			<p class="eyebrow">UBEZPIECZENIE CYBER · AURA CONSULTING SP. Z O.O.</p>
			<h1 class="hero-title">
				<span class="ht-1">Twój biznes</span>
				<span class="ht-2">jest atakowany.</span>
				<span class="ht-3">Pytanie brzmi: kiedy?</span>
			</h1>
			<p class="hero-sub">
				Polisa cyber to nie formalność — to jedyna sieć bezpieczeństwa, która działa wtedy, gdy
				wszystko inne zawodzi. Aura Consulting buduje programy ochrony szyte na miarę twojego ryzyka.
			</p>
			<div class="hero-btns">
				<a class="btn-primary" href="#cta-section">Zamów analizę ryzyka</a>
				<a class="btn-ghost" href="#coverage">Jak działa ochrona →</a>
			</div>
			<div class="attack-chip">
				<span class="pulse-dot" aria-hidden="true"></span>
				<span class="ac-label">ATAKI DZIŚ · GLOBALNIE</span>
				<span class="ac-val">{attacks.toLocaleString('pl-PL')}</span>
				<span class="ac-live">NA ŻYWO</span>
			</div>
		</div>

		<div class="hero-scene" aria-hidden="true">
			{#each particles as p, i (i)}
				<span
					class="particle"
					style="left:{p.x}%; top:{p.y}%; width:{p.s}px; height:{p.s}px; animation-delay:{p.d}s"
				></span>
			{/each}

			<!-- orbity wokół tarczy -->
			<div class="orbit o1"><span class="orbit-dot"></span></div>
			<div class="orbit o2"><span class="orbit-dot slow"></span></div>

			<!-- główna tarcza -->
			<div class="shield-wrap">
				<Shield />
			</div>

			<!-- piedestał pod tarczą -->
			<div class="pedestal main">
				<div class="ped-core"></div>
				<div class="ped-ring r1"></div>
				<div class="ped-ring r2"></div>
			</div>

			<!-- kłódki satelitarne -->
			<div class="lock lock-a">
				<Padlock size={74} />
				<div class="pedestal small">
					<div class="ped-core"></div>
					<div class="ped-ring r1"></div>
				</div>
			</div>
			<div class="lock lock-b">
				<Padlock size={56} />
				<div class="pedestal small">
					<div class="ped-core"></div>
					<div class="ped-ring r1"></div>
				</div>
			</div>
			<div class="lock lock-c">
				<Padlock size={64} />
				<div class="pedestal small">
					<div class="ped-core"></div>
					<div class="ped-ring r1"></div>
				</div>
			</div>

			<!-- ścieżki obwodu -->
			<svg class="traces" viewBox="0 0 600 320" fill="none">
				<path d="M300 250 H120 V180" />
				<path d="M300 250 H480 V160" />
				<path d="M300 250 V300 H80" />
				<path d="M300 250 V300 H520" />
				<path d="M180 250 V210 H60" />
				<path d="M420 250 V214 H560" />
				<circle cx="120" cy="180" r="4" />
				<circle cx="480" cy="160" r="4" />
				<circle cx="80" cy="300" r="4" />
				<circle cx="520" cy="300" r="4" />
				<circle cx="60" cy="210" r="4" />
				<circle cx="560" cy="214" r="4" />
			</svg>
		</div>
	</div>
</section>

<style>
	#hero {
		position: relative;
		min-height: calc(100vh - var(--nav-h));
		padding: calc(var(--nav-h) + 4rem) 2rem 5rem;
		overflow: hidden;
	}

	.hero-inner {
		position: relative;
		z-index: 2;
		max-width: 1240px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.05fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	/* ── tło: smuga + podłoga ── */
	.streak {
		position: absolute;
		left: 30%;
		right: -10%;
		top: 58%;
		height: 3px;
		background: linear-gradient(90deg, transparent, rgba(120, 190, 255, 0.9) 45%, transparent);
		filter: blur(1.5px);
		box-shadow: 0 0 40px 6px rgba(80, 160, 255, 0.35);
	}

	.floor {
		position: absolute;
		left: -20%;
		right: -20%;
		bottom: -12%;
		height: 52%;
		background:
			repeating-linear-gradient(90deg, rgba(90, 160, 255, 0.13) 0 1px, transparent 1px 64px),
			repeating-linear-gradient(0deg, rgba(90, 160, 255, 0.09) 0 1px, transparent 1px 64px),
			linear-gradient(to top, rgba(20, 40, 80, 0.35), transparent);
		transform: perspective(720px) rotateX(58deg);
		transform-origin: top center;
		-webkit-mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 72%, transparent);
		mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 72%, transparent);
	}

	/* ── lewa kolumna ── */
	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.3em;
		color: var(--accent);
		margin-bottom: 1.4rem;
	}

	.hero-title {
		font-size: clamp(2.4rem, 5.2vw, 4rem);
		font-weight: 700;
		letter-spacing: -0.015em;
	}

	.hero-title span {
		display: block;
	}

	.ht-2 {
		color: var(--red);
		text-shadow: 0 0 32px rgba(255, 77, 94, 0.35);
	}

	.ht-3 {
		background: linear-gradient(100deg, #d4ecff 10%, var(--accent) 55%, var(--accent-2) 90%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.hero-sub {
		margin: 1.6rem 0 2.2rem;
		max-width: 34rem;
		color: var(--muted);
		font-size: 1.05rem;
	}

	.hero-btns {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
	}

	.attack-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		margin-top: 2.4rem;
		padding: 0.6rem 1rem;
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.14em;
	}

	.pulse-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--red);
		box-shadow: 0 0 10px var(--red);
		animation: pulse 1.4s ease-in-out infinite;
	}

	.ac-label {
		color: var(--faint);
	}

	.ac-val {
		color: var(--text);
		font-size: 0.95rem;
		font-weight: 500;
		min-width: 5.5ch;
	}

	.ac-live {
		color: var(--red);
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.45; transform: scale(0.8); }
	}

	/* ── scena ── */
	.hero-scene {
		position: relative;
		height: 560px;
	}

	.shield-wrap {
		position: absolute;
		left: 50%;
		top: 44%;
		width: 250px;
		transform: translate(-50%, -55%);
		z-index: 3;
	}

	/* orbity */
	.orbit {
		position: absolute;
		left: 50%;
		top: 42%;
		border: 1px solid rgba(110, 180, 255, 0.3);
		border-radius: 50%;
		z-index: 2;
	}

	.o1 {
		width: 420px;
		height: 130px;
		transform: translate(-50%, -50%) rotate(-6deg);
	}

	.o2 {
		width: 520px;
		height: 170px;
		transform: translate(-50%, -46%) rotate(4deg);
		border-color: rgba(110, 180, 255, 0.16);
	}

	.orbit-dot {
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent-2);
		box-shadow: 0 0 12px 3px rgba(120, 190, 255, 0.8);
		offset-path: ellipse(50% 50% at 50% 50%);
		animation: orbit-run 9s linear infinite;
	}

	.orbit-dot.slow {
		animation-duration: 14s;
		animation-direction: reverse;
	}

	@supports not (offset-path: ellipse(50% 50% at 50% 50%)) {
		.orbit-dot {
			left: 50%;
			top: -4px;
		}
	}

	@keyframes orbit-run {
		from { offset-distance: 0%; }
		to { offset-distance: 100%; }
	}

	/* piedestały */
	.pedestal {
		position: absolute;
		z-index: 1;
	}

	.pedestal.main {
		left: 50%;
		top: 69%;
		width: 300px;
		height: 90px;
		transform: translateX(-50%);
	}

	.ped-core {
		position: absolute;
		inset: 12% 18%;
		border-radius: 50%;
		background: radial-gradient(ellipse at center, rgba(140, 200, 255, 0.5), rgba(60, 130, 255, 0.12) 60%, transparent 75%);
		filter: blur(2px);
	}

	.ped-ring {
		position: absolute;
		border: 1px solid rgba(130, 195, 255, 0.4);
		border-radius: 50%;
	}

	.ped-ring.r1 {
		inset: 6% 10%;
	}

	.ped-ring.r2 {
		inset: -8% -2%;
		border-color: rgba(130, 195, 255, 0.18);
	}

	/* kłódki */
	.lock {
		position: absolute;
		z-index: 2;
		animation: lock-float 6s ease-in-out infinite;
	}

	.lock .pedestal.small {
		position: relative;
		width: 120px;
		height: 36px;
		margin: 6px auto 0;
	}

	.lock-a {
		left: -4%;
		top: 12%;
	}

	.lock-b {
		right: 2%;
		top: 4%;
		animation-delay: 1.6s;
	}

	.lock-c {
		right: -2%;
		bottom: 10%;
		animation-delay: 3s;
	}

	@keyframes lock-float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	/* cząsteczki */
	.particle {
		position: absolute;
		background: var(--accent-2);
		border-radius: 1.5px;
		box-shadow: 0 0 10px 2px rgba(120, 190, 255, 0.55);
		opacity: 0.7;
		animation: particle-drift 8s ease-in-out infinite;
	}

	@keyframes particle-drift {
		0%, 100% { transform: translateY(0); opacity: 0.35; }
		50% { transform: translateY(-22px); opacity: 0.9; }
	}

	/* ścieżki obwodu */
	.traces {
		position: absolute;
		left: 50%;
		bottom: -4%;
		width: 600px;
		transform: translateX(-50%);
		z-index: 0;
	}

	.traces path {
		stroke: rgba(100, 170, 255, 0.3);
		stroke-width: 1.5;
	}

	.traces circle {
		fill: rgba(140, 200, 255, 0.7);
		filter: drop-shadow(0 0 6px rgba(120, 190, 255, 0.8));
	}

	/* ── responsywność ── */
	@media (max-width: 960px) {
		.hero-inner {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.hero-scene {
			height: 460px;
			max-width: 560px;
			margin: 0 auto;
			width: 100%;
		}

		#hero {
			padding-top: calc(var(--nav-h) + 2.5rem);
		}
	}

	@media (max-width: 520px) {
		.hero-scene {
			height: 380px;
		}

		.shield-wrap {
			width: 190px;
		}

		.o1 { width: 320px; height: 100px; }
		.o2 { width: 380px; height: 130px; }

		.lock-a { left: -6%; }
	}
</style>
