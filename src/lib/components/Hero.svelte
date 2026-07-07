<script>
	import { onMount } from 'svelte';
	import HeroScene from './HeroScene.svelte';

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
</script>

<section id="hero">
	<HeroScene />
	<div class="hero-overlay" aria-hidden="true"></div>

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
		<div class="hero-spacer" aria-hidden="true"></div>
	</div>
</section>

<style>
	#hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	/* gradient pod tekstem + wygaszenie dołu sekcji */
	.hero-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			linear-gradient(90deg, rgba(7, 12, 24, 0.86) 0%, rgba(7, 12, 24, 0.5) 34%, transparent 58%),
			linear-gradient(to top, rgba(7, 12, 24, 0.9), transparent 16%),
			linear-gradient(to bottom, rgba(7, 12, 24, 0.75), transparent 14%);
	}

	.hero-inner {
		position: relative;
		z-index: 2;
		width: 100%;
		max-width: 1240px;
		margin: 0 auto;
		padding: calc(var(--nav-h) + 3rem) 2rem 4rem;
		display: grid;
		grid-template-columns: 1.05fr 1fr;
		gap: 3rem;
		align-items: center;
	}

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
		background: rgba(10, 18, 36, 0.72);
		border: 1px solid var(--line);
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		backdrop-filter: blur(6px);
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

	@media (max-width: 960px) {
		#hero {
			min-height: auto;
		}

		.hero-inner {
			grid-template-columns: 1fr;
			gap: 0;
			padding-bottom: 420px;
		}

		.hero-spacer {
			display: none;
		}

		.hero-overlay {
			background:
				linear-gradient(to bottom, rgba(7, 12, 24, 0.85) 0%, rgba(7, 12, 24, 0.45) 40%, transparent 62%),
				linear-gradient(to top, rgba(7, 12, 24, 0.9), transparent 12%);
		}
	}

	@media (max-width: 520px) {
		.hero-inner {
			padding-bottom: 330px;
		}
	}
</style>
