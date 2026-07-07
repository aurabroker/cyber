<script>
	import MatrixRain from './MatrixRain.svelte';

	let { open = false, onclose = () => {} } = $props();

	const glitch = [
		'SYSTEM COMPROMISED',
		'ŁADOWANIE ŁADUNKU...',
		'SZYFROWANIE DANYCH...',
		'DOSTĘP DO KAMERY...',
		'PRZECHWYTYWANIE HASEŁ...'
	];
	let idx = $state(0);

	$effect(() => {
		if (!open) return;
		document.body.style.overflow = 'hidden';
		const rot = setInterval(() => (idx = (idx + 1) % glitch.length), 900);
		return () => {
			clearInterval(rot);
			document.body.style.overflow = '';
		};
	});

	function onkeydown(e) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window on:keydown={open ? onkeydown : undefined} />

{#if open}
	<div class="takeover" role="dialog" aria-modal="true" aria-label="Symulacja: deszcz danych">
		<div class="rain"><MatrixRain color="#37f39a" fontSize={17} /></div>

		<div class="sim-banner">
			<strong>⚠ SYMULACJA</strong>
			<span>Efekt pokazowy — nic nie zostało przejęte.</span>
			<button class="banner-x" onclick={onclose}>✕ ZAMKNIJ</button>
		</div>

		<div class="center">
			<div class="glitch" data-text={glitch[idx]}>{glitch[idx]}</div>
			<div class="sub">// SYMULACJA ATAKU · AURA CYBER</div>
			<button class="btn-primary" onclick={onclose}>Powrót do bezpieczeństwa</button>
		</div>
	</div>
{/if}

<style>
	.takeover {
		position: fixed;
		inset: 0;
		z-index: 9997;
		background: #020604;
		overflow: hidden;
		animation: fade 0.2s ease;
	}

	@keyframes fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.rain {
		position: absolute;
		inset: 0;
	}

	.sim-banner {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 3;
		display: flex;
		align-items: center;
		gap: 0.9rem;
		flex-wrap: wrap;
		padding: 0.7rem 1.1rem;
		background: #ffd54a;
		color: #201400;
		font-family: var(--font-mono);
		font-size: 0.78rem;
	}

	.sim-banner strong { font-weight: 700; }
	.sim-banner span { flex: 1 1 200px; }

	.banner-x {
		background: #201400;
		color: #ffd54a;
		border: none;
		border-radius: 6px;
		padding: 0.45rem 0.9rem;
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 0.72rem;
	}

	.center {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.2rem;
		text-align: center;
		padding: 1rem;
	}

	.glitch {
		position: relative;
		font-family: var(--font-mono);
		font-size: clamp(1.6rem, 6vw, 3.4rem);
		font-weight: 700;
		color: #d6ffe9;
		letter-spacing: 0.06em;
		text-shadow: 0 0 24px rgba(55, 243, 154, 0.7);
	}

	.glitch::before,
	.glitch::after {
		content: attr(data-text);
		position: absolute;
		inset: 0;
	}

	.glitch::before {
		color: #ff3b6b;
		transform: translate(-2px, 0);
		mix-blend-mode: screen;
		animation: gl 1.6s infinite steps(2);
	}

	.glitch::after {
		color: #35d6ff;
		transform: translate(2px, 0);
		mix-blend-mode: screen;
		animation: gl 2.1s infinite reverse steps(2);
	}

	@keyframes gl {
		0%, 100% { transform: translate(-2px, 0); }
		50% { transform: translate(3px, 1px); }
	}

	.sub {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: #37f39a;
		letter-spacing: 0.2em;
	}

	.btn-primary {
		cursor: pointer;
	}

	@media (prefers-reduced-motion: reduce) {
		.takeover { animation: none; }
		.glitch::before, .glitch::after { animation: none; }
	}
</style>
