<script>
	let email = $state('');
	let sent = $state(false);
	let error = $state(false);

	function submit(e) {
		e.preventDefault();
		const v = email.trim();
		if (!v || !v.includes('@')) {
			error = true;
			setTimeout(() => (error = false), 1600);
			return;
		}
		email = '';
		sent = true;
		setTimeout(() => (sent = false), 5000);
	}
</script>

<section id="cta-section">
	<div class="cta-glow" aria-hidden="true"></div>
	<h2 class="cta-title">
		Twoja firma zasługuje na ochronę<br />
		<span class="accent">zanim będzie za późno.</span>
	</h2>
	<p class="cta-sub">Bezpłatna analiza ryzyka cyber. Bez zobowiązań. Odpowiadamy w 24h.</p>
	<form class="cta-row" onsubmit={submit}>
		<input
			type="email"
			class="cta-input"
			class:error
			class:sent
			placeholder={sent ? 'Dziękujemy! Odezwiemy się w 24h.' : 'twoj@email.pl'}
			bind:value={email}
			aria-label="Adres e-mail"
		/>
		<button type="submit" class="btn-primary">Chcę darmową analizę →</button>
	</form>
	<p class="cta-meta">AURA CONSULTING SP. Z O.O. · BROKER UBEZPIECZENIOWY · KNF · auraconsulting.pl</p>
</section>

<style>
	#cta-section {
		position: relative;
		text-align: center;
		padding: 7rem 2rem;
		overflow: hidden;
	}

	.cta-glow {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 720px;
		height: 420px;
		transform: translate(-50%, -50%);
		background: radial-gradient(ellipse at center, rgba(50, 130, 255, 0.16), transparent 65%);
		pointer-events: none;
	}

	.cta-title {
		position: relative;
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		font-weight: 700;
	}

	.cta-title .accent {
		background: linear-gradient(100deg, var(--accent-2), var(--accent));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		filter: drop-shadow(0 0 22px rgba(77, 163, 255, 0.4));
	}

	.cta-sub {
		position: relative;
		margin: 1.1rem 0 2.2rem;
		color: var(--muted);
	}

	.cta-row {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.8rem;
		max-width: 620px;
		margin: 0 auto;
	}

	.cta-input {
		flex: 1 1 260px;
		background: rgba(10, 20, 40, 0.8);
		border: 1px solid var(--line-strong);
		border-radius: 10px;
		padding: 0.95rem 1.2rem;
		color: var(--text);
		font-family: var(--font-body);
		font-size: 0.95rem;
		outline: none;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	.cta-input:focus {
		border-color: var(--accent);
		box-shadow: 0 0 20px var(--glow-soft);
	}

	.cta-input::placeholder {
		color: var(--faint);
	}

	.cta-input.error {
		border-color: var(--red);
		box-shadow: 0 0 20px rgba(255, 77, 94, 0.25);
	}

	.cta-input.sent {
		border-color: var(--accent);
	}

	.cta-meta {
		position: relative;
		margin-top: 2.4rem;
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.25em;
		color: var(--faint);
	}
</style>
