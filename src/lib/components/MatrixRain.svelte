<script>
	import { onMount } from 'svelte';

	let {
		color = '#37f39a',
		background = 'rgba(4, 8, 6, 0.12)',
		fontSize = 15,
		speed = 1,
		opacity = 1
	} = $props();

	let canvas;

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const ctx = canvas.getContext('2d');
		const GLYPHS =
			'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ0123456789ABCDEFﾘﾙﾚﾛﾜ日本ハカ01'.split('');

		let cols = 0;
		let drops = [];
		let dpr = 1;

		function resize() {
			const w = canvas.clientWidth || 1;
			const h = canvas.clientHeight || 1;
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			cols = Math.ceil(w / fontSize);
			drops = Array.from({ length: cols }, () => Math.random() * -40);
		}

		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);

		let raf = 0;
		let last = 0;
		const interval = 1000 / (18 * speed);

		function frame(now) {
			raf = requestAnimationFrame(frame);
			if (now - last < interval) return;
			last = now;

			const w = canvas.clientWidth;
			const h = canvas.clientHeight;

			ctx.fillStyle = background;
			ctx.fillRect(0, 0, w, h);
			ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
			ctx.textBaseline = 'top';

			for (let i = 0; i < cols; i++) {
				const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				// czoło strumienia jaśniejsze
				ctx.fillStyle = 'rgba(220,255,240,0.95)';
				ctx.fillText(ch, x, y);
				ctx.fillStyle = color;
				ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], x, y - fontSize);

				if (y > h && Math.random() > 0.975) drops[i] = Math.random() * -20;
				drops[i]++;
			}
		}

		if (reduced) {
			// statyczna klatka
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			ctx.fillStyle = '#04120b';
			ctx.fillRect(0, 0, w, h);
			ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
			ctx.fillStyle = color;
			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < h / fontSize; j += 2) {
					if (Math.random() > 0.7)
						ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * fontSize, j * fontSize);
				}
			}
		} else {
			raf = requestAnimationFrame(frame);
		}

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	});
</script>

<canvas bind:this={canvas} style="opacity:{opacity}"></canvas>

<style>
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
