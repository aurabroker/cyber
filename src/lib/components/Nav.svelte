<nav id="main-nav">
	<a class="nav-logo" href="#hero">AURA<span class="dot">.</span>CYBER</a>
	<div class="nav-links">
		<a href="#coverage">Zakres ochrony</a>
		<a href="#threats-section">Zagrożenia</a>
		<a href="#process-section">Jak działamy</a>
	</div>
	<a class="nav-cta" href="#cta-section">Wycena polisy →</a>
</nav>

<style>
	#main-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: var(--nav-h);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		background: rgba(7, 12, 24, 0.72);
		border-bottom: 1px solid var(--line);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	.nav-logo {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15rem;
		letter-spacing: 0.06em;
	}

	.nav-logo .dot {
		color: var(--accent);
		text-shadow: 0 0 12px var(--glow);
	}

	.nav-links {
		display: flex;
		gap: 2.2rem;
	}

	.nav-links a {
		font-size: 0.9rem;
		color: var(--muted);
		transition: color 0.15s ease;
	}

	.nav-links a:hover {
		color: var(--accent-2);
	}

	.nav-cta {
		background: rgba(77, 163, 255, 0.1);
		border: 1px solid var(--line-strong);
		border-radius: 8px;
		padding: 0.55rem 1.1rem;
		font-family: var(--font-display);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--accent-2);
		transition: background 0.15s ease, box-shadow 0.15s ease;
	}

	.nav-cta:hover {
		background: rgba(77, 163, 255, 0.2);
		box-shadow: 0 0 20px var(--glow-soft);
	}

	@media (max-width: 720px) {
		.nav-links {
			display: none;
		}
	}
</style>
