<script>
	import { onMount } from 'svelte';

	let { open = false, onclose = () => {} } = $props();

	let closeBtn;
	let remaining = $state(71 * 3600 + 59 * 60 + 42); // ~71h jak w oryginalnym Petya
	let btc = $state(3.2749);

	const skull = String.raw`
        7MMF' 7MMF'  MM'   MM7
     .dP'    dPYo.    dPYo.  Yb.
    dP'    .P   Yb  .P   Yb    Yb
   dP     dP     Yb dP     Yb    Yb
  ,MP     Yb.   .dP Yb.   .dP    OM,
  dMb      YbmmdP'   YbmmdP'    dMP
   Yb.                        .dY
    Yb.      X E N O C R Y P T .dP
     Yb..                  ..dP
       ''YbmmmmmmmmmmmmmmdP''`;

	function pad(n) {
		return String(n).padStart(2, '0');
	}

	let timeStr = $derived.by(() => {
		const h = Math.floor(remaining / 3600);
		const m = Math.floor((remaining % 3600) / 60);
		const s = remaining % 60;
		return `${pad(h)}:${pad(m)}:${pad(s)}`;
	});

	$effect(() => {
		if (!open) return;
		document.body.style.overflow = 'hidden';
		closeBtn?.focus();
		const t = setInterval(() => {
			remaining = remaining > 0 ? remaining - 1 : 0;
			if (Math.random() > 0.6) btc = Math.max(0, btc + (Math.random() - 0.5) * 0.002);
		}, 1000);
		return () => {
			clearInterval(t);
			document.body.style.overflow = '';
		};
	});

	function onkeydown(e) {
		if (e.key === 'Escape') onclose();
	}
</script>

<svelte:window on:keydown={open ? onkeydown : undefined} />

{#if open}
	<div class="ransom" role="dialog" aria-modal="true" aria-label="Symulacja ataku ransomware">
		<div class="crt" aria-hidden="true"></div>

		<div class="sim-banner">
			<strong>⚠ SYMULACJA ATAKU</strong>
			<span>To tylko pokaz. Twój komputer jest bezpieczny — żaden plik nie został naruszony.</span>
			<button class="banner-x" onclick={onclose} bind:this={closeBtn} aria-label="Zamknij symulację"
				>✕ ZAMKNIJ</button
			>
		</div>

		<div class="ransom-body">
			<pre class="skull" aria-hidden="true">{skull}</pre>

			<h2 class="ransom-h">Ooops, Twoje ważne pliki zostały zaszyfrowane.</h2>

			<div class="ransom-text">
				<p>
					Jeśli widzisz ten tekst, Twoje pliki nie są już dostępne, ponieważ zostały zaszyfrowane.
					Być może szukasz sposobu na ich odzyskanie, ale nie trać czasu. Nikt nie odzyska Twoich
					danych bez naszego klucza deszyfrującego.
				</p>
				<p>
					Gwarantujemy, że możesz odzyskać wszystkie pliki bezpiecznie. Wystarczy przesłać płatność i
					zakupić klucz deszyfrujący.
				</p>

				<div class="pay-grid">
					<div class="pay-row"><span>Wyślij</span><b>{btc.toFixed(4)} BTC</b></div>
					<div class="pay-row"><span>na adres portfela</span><b class="wallet">1XeNoCrYpt9Q4h2FakeSimWALLETzz7bTp</b></div>
					<div class="pay-row"><span>ID ofiary</span><b>AC-SIM-7F3A-9B2C-1D00</b></div>
				</div>

				<div class="countdown">
					<span class="cd-label">Utrata klucza za:</span>
					<span class="cd-time">{timeStr}</span>
				</div>
				<div class="danger-line">
					Po upływie czasu cena wzrośnie dwukrotnie, a klucz zostanie trwale usunięty.
				</div>
			</div>

			<div class="payoff">
				<div class="payoff-head">— gdyby to był prawdziwy atak —</div>
				<p>
					Polisa cyber <b>Aura Consulting</b> pokryłaby: negocjacje i okup do limitu, odzyskanie
					danych, informatykę śledczą, przestój firmy oraz zgłoszenie naruszenia do UODO (72h).
				</p>
				<div class="payoff-btns">
					<a class="btn-primary" href="#cta-section" onclick={onclose}>Chcę być chroniony →</a>
					<button class="btn-ghost" onclick={onclose}>Zamknij symulację</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.ransom {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: #a30b0b;
		color: #ffe9e9;
		font-family: var(--font-mono);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		animation: ransom-in 0.25s ease;
	}

	@keyframes ransom-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.crt {
		position: fixed;
		inset: 0;
		pointer-events: none;
		background:
			repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.18) 0 1px, transparent 1px 3px),
			radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(0, 0, 0, 0.45) 100%);
		mix-blend-mode: multiply;
		z-index: 1;
	}

	.sim-banner {
		position: sticky;
		top: 0;
		z-index: 3;
		display: flex;
		align-items: center;
		gap: 0.9rem;
		flex-wrap: wrap;
		padding: 0.7rem 1.1rem;
		background: #ffd54a;
		color: #201400;
		font-size: 0.8rem;
		letter-spacing: 0.03em;
		box-shadow: 0 2px 18px rgba(0, 0, 0, 0.4);
	}

	.sim-banner strong {
		font-weight: 700;
	}

	.sim-banner span {
		flex: 1 1 260px;
	}

	.banner-x {
		background: #201400;
		color: #ffd54a;
		border: none;
		border-radius: 6px;
		padding: 0.45rem 0.9rem;
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
	}

	.ransom-body {
		position: relative;
		z-index: 2;
		max-width: 760px;
		margin: 0 auto;
		padding: 1.6rem 1.4rem 3rem;
	}

	.skull {
		color: #ffdede;
		font-size: 0.62rem;
		line-height: 1.15;
		text-align: center;
		margin: 0.5rem 0 1rem;
		text-shadow: 0 0 12px rgba(255, 120, 120, 0.6);
		white-space: pre;
		overflow-x: auto;
	}

	.ransom-h {
		font-family: var(--font-mono);
		font-size: clamp(1.3rem, 3.4vw, 2rem);
		font-weight: 700;
		text-align: center;
		margin-bottom: 1.4rem;
		text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
	}

	.ransom-text p {
		font-size: 0.92rem;
		line-height: 1.7;
		margin-bottom: 0.9rem;
		color: #ffdcdc;
	}

	.pay-grid {
		margin: 1.4rem 0;
		border: 1px solid rgba(255, 220, 220, 0.35);
		border-radius: 8px;
		overflow: hidden;
	}

	.pay-row {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.7rem 1rem;
		background: rgba(0, 0, 0, 0.16);
		border-bottom: 1px solid rgba(255, 220, 220, 0.15);
		font-size: 0.85rem;
	}

	.pay-row:last-child {
		border-bottom: none;
	}

	.pay-row span {
		color: #ffb0b0;
	}

	.pay-row b {
		color: #fff;
	}

	.wallet {
		word-break: break-all;
		text-align: right;
	}

	.countdown {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 1rem;
		margin-top: 1.6rem;
	}

	.cd-label {
		color: #ffb0b0;
		font-size: 0.85rem;
	}

	.cd-time {
		font-size: clamp(1.8rem, 6vw, 3rem);
		font-weight: 700;
		color: #fff;
		text-shadow: 0 0 24px rgba(255, 80, 80, 0.7);
		font-variant-numeric: tabular-nums;
	}

	.danger-line {
		text-align: center;
		margin-top: 0.6rem;
		font-size: 0.8rem;
		color: #ffcaca;
	}

	.payoff {
		margin-top: 2.4rem;
		padding: 1.4rem;
		background: rgba(7, 12, 24, 0.92);
		border: 1px solid var(--line-strong);
		border-radius: 12px;
		color: var(--text);
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.35);
	}

	.payoff-head {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--accent);
		text-align: center;
		margin-bottom: 0.8rem;
	}

	.payoff p {
		font-family: var(--font-body);
		font-size: 0.92rem;
		color: var(--muted);
		text-align: center;
		line-height: 1.6;
	}

	.payoff-btns {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.8rem;
		margin-top: 1.3rem;
	}

	.payoff-btns .btn-ghost {
		cursor: pointer;
	}

	@media (prefers-reduced-motion: reduce) {
		.ransom {
			animation: none;
		}
	}
</style>
