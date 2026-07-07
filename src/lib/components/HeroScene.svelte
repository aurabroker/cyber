<script>
	import { onMount } from 'svelte';
	import Shield from './Shield.svelte';

	let container;
	let failed = $state(false);

	onMount(() => {
		let dispose;
		let cancelled = false;

		(async () => {
			try {
				const { createHeroScene } = await import('$lib/three/heroScene.js');
				if (cancelled) return;
				dispose = createHeroScene(container);
			} catch (err) {
				console.error('Scena WebGL niedostępna — fallback SVG:', err);
				failed = true;
			}
		})();

		return () => {
			cancelled = true;
			dispose?.();
		};
	});
</script>

<div class="scene" bind:this={container} aria-hidden="true">
	{#if failed}
		<div class="fallback"><Shield /></div>
	{/if}
</div>

<style>
	.scene {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.scene :global(canvas) {
		display: block;
		width: 100%;
		height: 100%;
	}

	.fallback {
		position: absolute;
		right: 14%;
		top: 50%;
		width: min(300px, 46%);
		transform: translateY(-55%);
	}

	@media (max-width: 960px) {
		.fallback {
			right: 50%;
			top: auto;
			bottom: 4%;
			transform: translateX(50%);
		}
	}
</style>
