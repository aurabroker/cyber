<footer id="main-footer">
	<div class="foot-brand">AURA<span class="dot">.</span>CONSULTING</div>
	<div class="foot-meta">© {new Date().getFullYear()} Aura Consulting Sp. z o.o. · Wszelkie prawa zastrzeżone</div>
	<div class="foot-knf">KNF LICENCJA 2013</div>
</footer>

<style>
	#main-footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2.2rem 2rem;
		border-top: 1px solid var(--line);
	}

	.foot-brand {
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: 0.06em;
	}

	.foot-brand .dot {
		color: var(--accent);
		text-shadow: 0 0 12px var(--glow);
	}

	.foot-meta {
		color: var(--faint);
		font-size: 0.8rem;
	}

	.foot-knf {
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.22em;
		color: var(--faint);
	}
</style>
