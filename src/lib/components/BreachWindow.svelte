<script>
	import { onMount } from 'svelte';
	import MatrixRain from './MatrixRain.svelte';

	let { open = false, onclose = () => {} } = $props();

	let linesEl;
	let typingEl;

	/* Wszystkie cele i adresy są FIKCYJNE. IP z zakresów dokumentacyjnych
	   (RFC 5737: 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24). Domeny
	   *.gov.example nie istnieją. To teatralna symulacja — żaden system
	   nie jest atakowany. */
	const SCRIPT = [
		{ t: 'cmd', x: 'nmap -sS -p- --open 198.51.100.0/24  # SKAN SYMULACYJNY' },
		{ t: 'out', x: 'Starting Nmap 7.94 · tryb: SYMULACJA · cele fikcyjne (RFC5737)' },
		{ t: 'ok', x: 'host 198.51.100.14  [portal-uslug.gov.example]  UP' },
		{ t: 'ok', x: 'host 198.51.100.37  [e-podatki.gov.example]     UP' },
		{ t: 'warn', x: 'otwarte porty: 22/ssh  443/https  8080/http-alt  5432/postgres' },
		{ t: 'blank' },
		{ t: 'cmd', x: 'searchsploit "gov portal" cms 4.2.1' },
		{ t: 'out', x: '[SIM] Auth Bypass (CVE-SIM-2024-0001) ......... portal-uslug.gov.example' },
		{ t: 'out', x: '[SIM] SQL Injection  (CVE-SIM-2024-0087) ...... e-podatki.gov.example' },
		{ t: 'blank' },
		{ t: 'cmd', x: 'python3 exploit_sim.py --target portal-uslug.gov.example --cve SIM-2024-0001' },
		{ t: 'out', x: '[*] wysyłanie ładunku uwierzytelnienia... (symulacja)' },
		{ t: 'warn', x: '[*] obchodzenie 2FA .......... ████████████ 100%' },
		{ t: 'err', x: '[✓] ACCESS GRANTED · rola: administrator · sesja: SIM-a91f' },
		{ t: 'data', x: 'root@portal-uslug:/var/www# whoami → root (SYMULACJA)' },
		{ t: 'blank' },
		{ t: 'cmd', x: "psql -h 198.51.100.37 -c 'SELECT count(*) FROM obywatele;'" },
		{ t: 'err', x: '  count → 2 480 913  rekordów obywateli (dane fikcyjne)' },
		{ t: 'cmd', x: 'pg_dump obywatele > exfil_SIM.sql && upload c2.sim.onion' },
		{ t: 'warn', x: '[*] eksfiltracja ..... 1.2 GB / 1.2 GB ████████████ 100%' },
		{ t: 'err', x: '[✓] 2 480 913 rekordów PESEL/adres/NIP przesłanych (SYMULACJA)' },
		{ t: 'blank' },
		{ t: 'cmd', x: 'ransomware_sim.py --encrypt /srv --algo AES-256 --note ROADMAP.txt' },
		{ t: 'err', x: '[✓] 84 210 plików zaszyfrowanych · żądanie okupu: 3.27 BTC' },
		{ t: 'blank' },
		{ t: 'out', x: '════════════════════════════════════════════════════' },
		{ t: 'out', x: '>>> To była SYMULACJA. Prawdziwy atak trwa średnio 11 dni.' },
		{ t: 'ok', x: '    ✓ Polisa cyber Aura pokrywa: okup i negocjacje' },
		{ t: 'ok', x: '    ✓ informatyka śledcza i przywrócenie systemów' },
		{ t: 'ok', x: '    ✓ zgłoszenie naruszenia RODO do UODO (72h)' },
		{ t: 'ok', x: '    ✓ przestój, kary NIS2 i obrona prawna' }
	];

	onMount(() => {
		let lineIdx = 0;
		let charIdx = 0;
		let timer = 0;
		let stopped = false;

		function addLine(type, text) {
			if (!linesEl) return;
			const div = document.createElement('div');
			div.className = 'tl tl-' + type;
			if (type === 'blank') div.style.height = '0.5em';
			else div.textContent = text;
			linesEl.appendChild(div);
			while (linesEl.children.length > 22) linesEl.removeChild(linesEl.firstChild);
			linesEl.scrollTop = linesEl.scrollHeight;
		}

		function loop() {
			if (stopped) return;
			if (!open) {
				timer = setTimeout(loop, 300);
				return;
			}
			if (lineIdx >= SCRIPT.length) {
				lineIdx = 0;
				if (linesEl) linesEl.innerHTML = '';
			}
			const e = SCRIPT[lineIdx];

			if (e.t === 'blank') {
				addLine('blank', '');
				lineIdx++;
				timer = setTimeout(loop, 130);
				return;
			}
			if (e.t !== 'cmd') {
				addLine(e.t, e.x);
				lineIdx++;
				timer = setTimeout(loop, 90 + Math.random() * 140);
				return;
			}
			// cmd — pisanie znak po znaku
			if (charIdx === 0 && typingEl) typingEl.textContent = '';
			if (charIdx < e.x.length) {
				if (typingEl) typingEl.textContent += e.x[charIdx];
				charIdx++;
				timer = setTimeout(loop, 26 + Math.random() * 45);
			} else {
				addLine('cmd', e.x);
				if (typingEl) typingEl.textContent = '';
				charIdx = 0;
				lineIdx++;
				timer = setTimeout(loop, 380 + Math.random() * 220);
			}
		}

		timer = setTimeout(loop, 400);
		return () => {
			stopped = true;
			clearTimeout(timer);
		};
	});

	function onkeydown(e) {
		if (e.key === 'Escape') onclose();
	}

	$effect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window on:keydown={open ? onkeydown : undefined} />

{#if open}
	<div class="breach-backdrop" role="dialog" aria-modal="true" aria-label="Symulacja włamania">
		<div class="win">
			<div class="titlebar">
				<div class="dots" aria-hidden="true">
					<span class="d r"></span><span class="d y"></span><span class="d g"></span>
				</div>
				<div class="title">root@blackops: ~/operacja-sim — SYMULACJA</div>
				<div class="rec"><span class="rec-dot"></span>REC</div>
				<button class="win-x" onclick={onclose} aria-label="Zamknij">✕</button>
			</div>

			<div class="sim-strip">
				⚠ SYMULACJA — cele, adresy i dane są fikcyjne (RFC&nbsp;5737). Żaden system nie jest atakowany.
			</div>

			<div class="screen">
				<div class="rain"><MatrixRain color="#1f7a4d" fontSize={14} opacity={0.16} /></div>
				<div class="term">
					<div class="lines" bind:this={linesEl}></div>
					<div class="cmdline">
						<span class="prompt">root@blackops:~#</span>
						<span class="typing" bind:this={typingEl}></span><span class="caret"></span>
					</div>
				</div>
			</div>

			<div class="win-foot">
				<span class="foot-txt">Symulacja scenariusza ataku na infrastrukturę publiczną</span>
				<a class="btn-primary sm" href="#cta-section" onclick={onclose}>Zabezpiecz firmę →</a>
			</div>
		</div>
	</div>
{/if}

<style>
	.breach-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9998;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.2rem;
		background: rgba(2, 5, 10, 0.86);
		backdrop-filter: blur(4px);
		animation: fade 0.2s ease;
	}

	@keyframes fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.win {
		width: min(880px, 100%);
		max-height: 88vh;
		display: flex;
		flex-direction: column;
		background: #050c08;
		border: 1px solid rgba(60, 220, 140, 0.35);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 0 60px rgba(20, 200, 120, 0.18), 0 30px 80px rgba(0, 0, 0, 0.6);
	}

	.titlebar {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.55rem 0.9rem;
		background: #0a140d;
		border-bottom: 1px solid rgba(60, 220, 140, 0.22);
	}

	.dots {
		display: flex;
		gap: 0.4rem;
	}

	.d {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		display: block;
	}
	.d.r { background: #ff5f56; }
	.d.y { background: #ffbd2e; }
	.d.g { background: #27c93f; }

	.title {
		flex: 1;
		font-family: var(--font-mono);
		font-size: 0.76rem;
		color: #8fe6bd;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rec {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--font-mono);
		font-size: 0.66rem;
		color: #ff6b6b;
		letter-spacing: 0.15em;
	}

	.rec-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #ff3b3b;
		box-shadow: 0 0 8px #ff3b3b;
		animation: blink 1s steps(2) infinite;
	}

	@keyframes blink {
		50% { opacity: 0.2; }
	}

	.win-x {
		background: transparent;
		border: none;
		color: #8fe6bd;
		font-size: 0.9rem;
		padding: 0 0.2rem;
	}

	.sim-strip {
		padding: 0.5rem 0.9rem;
		background: #ffd54a;
		color: #201400;
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.02em;
	}

	.screen {
		position: relative;
		flex: 1;
		min-height: 0;
		background: #040906;
	}

	.rain {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.term {
		position: relative;
		z-index: 1;
		height: 100%;
		min-height: 300px;
		display: flex;
		flex-direction: column;
		padding: 0.9rem 1rem;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		line-height: 1.5;
	}

	.lines {
		flex: 1;
		overflow-y: auto;
		scrollbar-width: thin;
	}

	.lines :global(.tl) {
		white-space: pre-wrap;
		word-break: break-word;
	}
	.lines :global(.tl-cmd) { color: #eafff4; }
	.lines :global(.tl-cmd)::before { content: '$ '; color: #37f39a; }
	.lines :global(.tl-out) { color: #7fbfa2; }
	.lines :global(.tl-ok) { color: #37f39a; }
	.lines :global(.tl-warn) { color: #ffd54a; }
	.lines :global(.tl-err) { color: #ff6b6b; }
	.lines :global(.tl-data) { color: #6fd0ff; }

	.cmdline {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding-top: 0.3rem;
		color: #eafff4;
	}

	.prompt {
		color: #37f39a;
	}

	.caret {
		width: 8px;
		height: 1em;
		background: #37f39a;
		display: inline-block;
		animation: blink 1s steps(2) infinite;
	}

	.win-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.7rem 0.9rem;
		background: #0a140d;
		border-top: 1px solid rgba(60, 220, 140, 0.22);
	}

	.foot-txt {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		color: #6fae8e;
	}

	.btn-primary.sm {
		padding: 0.55rem 1rem;
		font-size: 0.8rem;
	}

	@media (prefers-reduced-motion: reduce) {
		.breach-backdrop { animation: none; }
		.rec-dot, .caret { animation: none; }
	}

	@media (max-width: 560px) {
		.foot-txt { display: none; }
	}
</style>
