<script>
	let { size = 84 } = $props();
</script>

<svg class="padlock" width={size} viewBox="0 0 100 124" aria-hidden="true">
	<path class="shackle" d="M31 56 V40 a19 19 0 0 1 38 0 V56" fill="none" stroke-linecap="round" />
	<rect class="body" x="18" y="54" width="64" height="58" rx="12" />
	<circle class="hole" cx="50" cy="78" r="7" />
	<rect class="hole" x="46.5" y="82" width="7" height="15" rx="3.5" />
</svg>

<style>
	.padlock {
		display: block;
		height: auto;
		filter: drop-shadow(0 0 10px rgba(110, 185, 255, 0.7)) drop-shadow(0 0 34px rgba(60, 140, 255, 0.4));
	}

	.shackle {
		stroke: #a8d6ff;
		stroke-width: 8;
	}

	.body {
		fill: rgba(130, 195, 255, 0.16);
		stroke: #7cc0ff;
		stroke-width: 2.5;
	}

	.hole {
		fill: #08132b;
		stroke: #cfeaff;
		stroke-width: 1.5;
	}
</style>
