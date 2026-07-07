<script>
	/* Deterministyczny wzór binarny (stały string → brak niezgodności przy hydratacji) */
	const BITS =
		'0110100101110100011010010110111001100111001000000110001101111001011000100110010101110010' +
		'0111001101101000011010010110010101101100011001000010000001100001011101010111001001100001' +
		'0100000101010101010100100100000101000011011110010110001001100101011100100010000001110011';

	const rows = Array.from({ length: 16 }, (_, i) => {
		const start = (i * 29) % (BITS.length - 30);
		return BITS.slice(start, start + 28);
	});
</script>

<svg class="shield" viewBox="0 0 220 262" aria-hidden="true">
	<defs>
		<linearGradient id="shield-fill" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#9fd8ff" stop-opacity="0.30" />
			<stop offset="0.5" stop-color="#4da3ff" stop-opacity="0.13" />
			<stop offset="1" stop-color="#1f6fff" stop-opacity="0.32" />
		</linearGradient>
		<linearGradient id="shield-edge" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#d4ecff" />
			<stop offset="0.55" stop-color="#6fb6ff" />
			<stop offset="1" stop-color="#2f7dff" />
		</linearGradient>
		<clipPath id="shield-clip">
			<path d="M110 10 L192 44 V126 C192 185 155 226 110 252 C65 226 28 185 28 126 V44 Z" />
		</clipPath>
	</defs>

	<!-- korpus tarczy -->
	<path
		d="M110 10 L192 44 V126 C192 185 155 226 110 252 C65 226 28 185 28 126 V44 Z"
		fill="url(#shield-fill)"
		stroke="url(#shield-edge)"
		stroke-width="2.5"
	/>

	<!-- kod binarny wewnątrz -->
	<g clip-path="url(#shield-clip)" class="bits">
		{#each rows as row, i (i)}
			<text x="33" y={30 + i * 14.6} opacity={0.2 + ((i * 7) % 9) / 16}>{row}</text>
		{/each}
	</g>

	<!-- wewnętrzny obrys -->
	<path
		d="M110 24 L180 53 V125 C180 176 148 213 110 236 C72 213 40 176 40 125 V53 Z"
		fill="none"
		stroke="rgba(190,227,255,0.35)"
		stroke-width="1"
	/>

	<!-- dziurka od klucza -->
	<g class="keyhole">
		<circle cx="110" cy="112" r="23" />
		<path d="M102 128 L93 174 H127 L118 128 Z" />
	</g>
</svg>

<style>
	.shield {
		display: block;
		width: 100%;
		height: auto;
		filter: drop-shadow(0 0 16px rgba(110, 185, 255, 0.75)) drop-shadow(0 0 55px rgba(60, 140, 255, 0.45));
		animation: shield-float 7s ease-in-out infinite;
	}

	.bits text {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 1.5px;
		fill: #bfe3ff;
	}

	.keyhole circle,
	.keyhole path {
		fill: #08132b;
		stroke: #cfeaff;
		stroke-width: 2.5;
	}

	@keyframes shield-float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-14px); }
	}
</style>
