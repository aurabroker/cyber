/* ════════════════════════════════════════════════
   AURA CYBER · scena hero 3D (Three.js)
   Odtworzenie referencji: izometryczna płytka
   drukowana, hologram tarczy z kodem binarnym,
   kłódki na piedestałach, orbity, bloom.
   ════════════════════════════════════════════════ */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const BG = 0x070c18;

/* deterministyczny generator — stabilny układ sceny */
function mulberry32(seed) {
	return function () {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/* ── tekstura tarczy: kod binarny + dziurka od klucza ── */
function makeShieldTexture() {
	const S = 2.4;
	const w = Math.round(220 * S);
	const h = Math.round(262 * S);
	const cv = document.createElement('canvas');
	cv.width = w;
	cv.height = h;
	const ctx = cv.getContext('2d');

	const outline = new Path2D();
	outline.moveTo(110 * S, 10 * S);
	outline.lineTo(192 * S, 44 * S);
	outline.lineTo(192 * S, 126 * S);
	outline.bezierCurveTo(192 * S, 185 * S, 155 * S, 226 * S, 110 * S, 252 * S);
	outline.bezierCurveTo(65 * S, 226 * S, 28 * S, 185 * S, 28 * S, 126 * S);
	outline.lineTo(28 * S, 44 * S);
	outline.closePath();

	const inner = new Path2D();
	inner.moveTo(110 * S, 24 * S);
	inner.lineTo(180 * S, 53 * S);
	inner.lineTo(180 * S, 125 * S);
	inner.bezierCurveTo(180 * S, 176 * S, 148 * S, 213 * S, 110 * S, 236 * S);
	inner.bezierCurveTo(72 * S, 213 * S, 40 * S, 176 * S, 40 * S, 125 * S);
	inner.lineTo(40 * S, 53 * S);
	inner.closePath();

	const rows = 16;
	const cols = 30;
	const rnd = mulberry32(42);
	const bits = Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => (rnd() < 0.5 ? '0' : '1'))
	);

	function draw() {
		ctx.clearRect(0, 0, w, h);

		const fill = ctx.createLinearGradient(0, 0, 0, h);
		fill.addColorStop(0, 'rgba(159,216,255,0.30)');
		fill.addColorStop(0.5, 'rgba(77,163,255,0.13)');
		fill.addColorStop(1, 'rgba(31,111,255,0.32)');
		ctx.fillStyle = fill;
		ctx.fill(outline);

		ctx.save();
		ctx.clip(outline);
		ctx.font = `${Math.round(11 * S)}px "JetBrains Mono", monospace`;
		for (let r = 0; r < rows; r++) {
			const alpha = 0.22 + ((r * 7) % 9) / 16;
			ctx.fillStyle = `rgba(191,227,255,${alpha.toFixed(2)})`;
			const y = (30 + r * 14.6) * S;
			for (let c = 0; c < cols; c++) {
				ctx.fillText(bits[r][c], (31 + c * 5.6) * S, y);
			}
		}
		ctx.restore();

		const edge = ctx.createLinearGradient(0, 0, 0, h);
		edge.addColorStop(0, '#d4ecff');
		edge.addColorStop(0.55, '#6fb6ff');
		edge.addColorStop(1, '#2f7dff');
		ctx.strokeStyle = edge;
		ctx.lineWidth = 2.6 * S;
		ctx.stroke(outline);
		ctx.strokeStyle = 'rgba(190,227,255,0.35)';
		ctx.lineWidth = 1 * S;
		ctx.stroke(inner);

		const hole = new Path2D();
		hole.arc(110 * S, 112 * S, 23 * S, 0, Math.PI * 2);
		const slot = new Path2D();
		slot.moveTo(102 * S, 128 * S);
		slot.lineTo(93 * S, 174 * S);
		slot.lineTo(127 * S, 174 * S);
		slot.lineTo(118 * S, 128 * S);
		slot.closePath();
		ctx.fillStyle = 'rgba(8,19,43,0.94)';
		ctx.fill(hole);
		ctx.fill(slot);
		ctx.strokeStyle = '#cfeaff';
		ctx.lineWidth = 2 * S;
		ctx.stroke(hole);
		ctx.fill(slot);
		const slotEdges = new Path2D();
		slotEdges.moveTo(102 * S, 128 * S);
		slotEdges.lineTo(93 * S, 174 * S);
		slotEdges.lineTo(127 * S, 174 * S);
		slotEdges.lineTo(118 * S, 128 * S);
		ctx.stroke(slotEdges);
	}

	draw();
	const texture = new THREE.CanvasTexture(cv);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 4;

	/* migotanie kodu binarnego */
	function flicker() {
		for (let n = 0; n < 24; n++) {
			const r = (Math.random() * rows) | 0;
			const c = (Math.random() * cols) | 0;
			bits[r][c] = bits[r][c] === '0' ? '1' : '0';
		}
		draw();
		texture.needsUpdate = true;
	}

	return { texture, flicker };
}

/* ── tekstura kłódki ── */
function makePadlockTexture() {
	const S = 2.6;
	const w = Math.round(100 * S);
	const h = Math.round(124 * S);
	const cv = document.createElement('canvas');
	cv.width = w;
	cv.height = h;
	const ctx = cv.getContext('2d');

	ctx.beginPath();
	ctx.moveTo(31 * S, 56 * S);
	ctx.lineTo(31 * S, 40 * S);
	ctx.arc(50 * S, 40 * S, 19 * S, Math.PI, 0);
	ctx.lineTo(69 * S, 56 * S);
	ctx.strokeStyle = '#a8d6ff';
	ctx.lineWidth = 8 * S;
	ctx.lineCap = 'round';
	ctx.stroke();

	ctx.beginPath();
	if (ctx.roundRect) ctx.roundRect(18 * S, 54 * S, 64 * S, 58 * S, 12 * S);
	else ctx.rect(18 * S, 54 * S, 64 * S, 58 * S);
	ctx.fillStyle = 'rgba(130,195,255,0.20)';
	ctx.fill();
	ctx.strokeStyle = '#7cc0ff';
	ctx.lineWidth = 2.5 * S;
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(50 * S, 78 * S, 7 * S, 0, Math.PI * 2);
	if (ctx.roundRect) ctx.roundRect(46.5 * S, 82 * S, 7 * S, 15 * S, 3.5 * S);
	else ctx.rect(46.5 * S, 82 * S, 7 * S, 15 * S);
	ctx.fillStyle = '#08132b';
	ctx.fill();
	ctx.strokeStyle = '#cfeaff';
	ctx.lineWidth = 1.5 * S;
	ctx.stroke();

	const texture = new THREE.CanvasTexture(cv);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 4;
	return texture;
}

/* ── tekstura smugi światła ── */
function makeStreakTexture() {
	const cv = document.createElement('canvas');
	cv.width = 512;
	cv.height = 64;
	const ctx = cv.getContext('2d');
	const gx = ctx.createLinearGradient(0, 0, 512, 0);
	gx.addColorStop(0, 'rgba(210,235,255,0)');
	gx.addColorStop(0.5, 'rgba(210,235,255,1)');
	gx.addColorStop(1, 'rgba(210,235,255,0)');
	ctx.fillStyle = gx;
	ctx.fillRect(0, 0, 512, 64);
	ctx.globalCompositeOperation = 'destination-in';
	const gy = ctx.createLinearGradient(0, 0, 0, 64);
	gy.addColorStop(0, 'rgba(255,255,255,0)');
	gy.addColorStop(0.5, 'rgba(255,255,255,1)');
	gy.addColorStop(1, 'rgba(255,255,255,0)');
	ctx.fillStyle = gy;
	ctx.fillRect(0, 0, 512, 64);
	const texture = new THREE.CanvasTexture(cv);
	texture.colorSpace = THREE.SRGBColorSpace;
	return texture;
}

function additiveMat(color, opacity) {
	return new THREE.MeshBasicMaterial({
		color,
		transparent: true,
		opacity,
		blending: THREE.AdditiveBlending,
		depthWrite: false
	});
}

export function createHeroScene(container) {
	const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
	renderer.setClearColor(BG, 1);
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.05;
	container.appendChild(renderer.domElement);

	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(BG, 0.05);

	const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
	const camBase = new THREE.Vector3(0, 3.6, 10.6);
	const lookTarget = new THREE.Vector3(1.35, 1.3, 0);
	camera.position.copy(camBase);

	/* grupa sceny — przesuwana w prawo na desktopie (tekst po lewej) */
	const stage = new THREE.Group();
	scene.add(stage);

	const rnd = mulberry32(1337);
	const disposables = [];
	function track(obj) {
		disposables.push(obj);
		return obj;
	}

	/* ── światła ── */
	scene.add(new THREE.AmbientLight(0x2a3c5e, 0.7));
	const dir = new THREE.DirectionalLight(0x6f9fdf, 0.65);
	dir.position.set(4, 8, 6);
	scene.add(dir);
	const glowLight = new THREE.PointLight(0x4da3ff, 11, 8, 2);
	glowLight.position.set(0, 1.6, 1);
	stage.add(glowLight);
	const backLight = new THREE.PointLight(0x3060c0, 5, 10, 2);
	backLight.position.set(-3.5, 2, -3);
	stage.add(backLight);

	/* ── podłoga: bloki płytki drukowanej ── */
	const COLS = 40;
	const ROWS = 24;
	const TILE = 0.62;
	const STEP = 0.72;
	const blockGeo = track(new THREE.BoxGeometry(TILE, 1, TILE));
	const blockMat = track(
		new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82, metalness: 0.25 })
	);
	const blocks = new THREE.InstancedMesh(blockGeo, blockMat, COLS * ROWS);
	const mtx = new THREE.Matrix4();
	const col = new THREE.Color();
	let bi = 0;
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			const x = (c - (COLS - 1) / 2) * STEP;
			const z = (r - (ROWS - 1) / 2) * STEP - 3;
			const hgt = 0.1 + rnd() * 0.28 + (rnd() < 0.05 ? 0.35 : 0);
			mtx.makeScale(1, hgt, 1);
			mtx.setPosition(x, -hgt / 2, z);
			blocks.setMatrixAt(bi, mtx);
			const shade = 0.7 + rnd() * 0.5;
			col.setRGB(0.038 * shade, 0.058 * shade, 0.115 * shade);
			blocks.setColorAt(bi, col);
			bi++;
		}
	}
	stage.add(blocks);

	/* płyta „chipu" pod piedestałem */
	const chipPlate = new THREE.Mesh(
		track(new THREE.BoxGeometry(3.7, 0.12, 3.7)),
		track(new THREE.MeshStandardMaterial({ color: 0x141f36, roughness: 0.6, metalness: 0.35 }))
	);
	chipPlate.position.y = 0.06;
	stage.add(chipPlate);

	/* pulsujące płytki-diody */
	const glowTiles = [];
	const tileGeo = track(new THREE.PlaneGeometry(TILE * 0.86, TILE * 0.86));
	for (let i = 0; i < 14; i++) {
		const mat = track(additiveMat(0x2f6fbf, 0.14));
		const tile = new THREE.Mesh(tileGeo, mat);
		tile.rotation.x = -Math.PI / 2;
		tile.position.set(
			(Math.floor(rnd() * COLS) - (COLS - 1) / 2) * STEP,
			0.012,
			(Math.floor(rnd() * ROWS) - (ROWS - 1) / 2) * STEP - 3
		);
		stage.add(tile);
		glowTiles.push(tile);
	}

	/* ── ścieżki obwodu + impulsy danych ── */
	const traceMat = track(additiveMat(0x1d4d8f, 0.85));
	const viaGeo = track(new THREE.SphereGeometry(0.032, 10, 10));
	const viaMat = track(additiveMat(0x7cc0ff, 0.9));

	/** polilinie (płaszczyzna XZ, y ≈ 0) */
	const polylines = [
		[new THREE.Vector3(-7, 0.03, 1.15), new THREE.Vector3(-1.9, 0.03, 1.15), new THREE.Vector3(-1.9, 0.03, 3.6)],
		[new THREE.Vector3(7, 0.03, 0.65), new THREE.Vector3(2.1, 0.03, 0.65), new THREE.Vector3(2.1, 0.03, 3.2)],
		[new THREE.Vector3(-6.2, 0.03, -1.5), new THREE.Vector3(-2.3, 0.03, -1.5), new THREE.Vector3(-2.3, 0.03, -3.8)],
		[new THREE.Vector3(6.4, 0.03, -1.9), new THREE.Vector3(2.5, 0.03, -1.9), new THREE.Vector3(2.5, 0.03, -3.9)],
		[new THREE.Vector3(-0.8, 0.03, 2.0), new THREE.Vector3(-0.8, 0.03, 5.2)],
		[new THREE.Vector3(0.9, 0.03, 2.2), new THREE.Vector3(0.9, 0.03, 4.2), new THREE.Vector3(3.4, 0.03, 4.2)]
	];

	const segGeo = track(new THREE.BoxGeometry(1, 0.016, 0.03));
	for (const line of polylines) {
		for (let i = 0; i < line.length - 1; i++) {
			const a = line[i];
			const b = line[i + 1];
			const seg = new THREE.Mesh(segGeo, traceMat);
			const len = a.distanceTo(b);
			seg.scale.x = len;
			seg.position.copy(a).lerp(b, 0.5);
			if (Math.abs(b.z - a.z) > Math.abs(b.x - a.x)) seg.rotation.y = Math.PI / 2;
			stage.add(seg);
		}
		for (const p of line) {
			const via = new THREE.Mesh(viaGeo, viaMat);
			via.position.copy(p);
			stage.add(via);
		}
	}

	/* impulsy biegnące po ścieżkach */
	const pulseGeo = track(new THREE.SphereGeometry(0.045, 10, 10));
	const pulseMat = track(additiveMat(0x9fd4ff, 1));
	const pulses = polylines.map((line, i) => {
		const lengths = [];
		let total = 0;
		for (let k = 0; k < line.length - 1; k++) {
			const l = line[k].distanceTo(line[k + 1]);
			lengths.push(l);
			total += l;
		}
		const mesh = new THREE.Mesh(pulseGeo, pulseMat);
		stage.add(mesh);
		return { line, lengths, total, mesh, t: rnd(), speed: 0.09 + 0.05 * (i % 3) };
	});

	function pulsePosition(p, out) {
		let d = p.t * p.total;
		for (let k = 0; k < p.lengths.length; k++) {
			if (d <= p.lengths[k]) {
				return out.copy(p.line[k]).lerp(p.line[k + 1], d / p.lengths[k]);
			}
			d -= p.lengths[k];
		}
		return out.copy(p.line[p.line.length - 1]);
	}

	/* ── piedestał główny ── */
	const baseMat = track(
		new THREE.MeshStandardMaterial({ color: 0x18243c, roughness: 0.5, metalness: 0.45 })
	);
	const base = new THREE.Mesh(track(new THREE.CylinderGeometry(1.5, 1.72, 0.22, 48)), baseMat);
	base.position.y = 0.11;
	stage.add(base);

	const glass = new THREE.Mesh(
		track(new THREE.CylinderGeometry(1.0, 1.06, 0.14, 48)),
		track(additiveMat(0x2a4f86, 0.3))
	);
	glass.position.y = 0.29;
	stage.add(glass);

	const rim = new THREE.Mesh(
		track(new THREE.TorusGeometry(1.05, 0.016, 10, 72)),
		track(additiveMat(0x7cc0ff, 0.9))
	);
	rim.rotation.x = Math.PI / 2;
	rim.position.y = 0.38;
	stage.add(rim);

	const padGlow = new THREE.Mesh(
		track(new THREE.CircleGeometry(0.95, 48)),
		track(additiveMat(0x3f7fce, 0.35))
	);
	padGlow.rotation.x = -Math.PI / 2;
	padGlow.position.y = 0.39;
	stage.add(padGlow);

	/* koncentryczne kręgi na podłodze */
	const floorRings = [];
	[
		[1.55, 0.5],
		[2.1, 0.3],
		[2.65, 0.18]
	].forEach(([radius, opacity]) => {
		const ring = new THREE.Mesh(
			track(new THREE.RingGeometry(radius, radius + 0.025, 72)),
			track(additiveMat(0x5f9fe0, opacity))
		);
		ring.rotation.x = -Math.PI / 2;
		ring.position.y = 0.02;
		stage.add(ring);
		floorRings.push(ring);
	});

	/* ── tarcza-hologram ── */
	const shieldGroup = new THREE.Group();
	shieldGroup.position.y = 0.42;
	stage.add(shieldGroup);

	const shieldTex = makeShieldTexture();
	track(shieldTex.texture);
	const shieldMat = track(
		new THREE.MeshBasicMaterial({
			map: shieldTex.texture,
			transparent: true,
			side: THREE.DoubleSide,
			depthWrite: false
		})
	);
	const shieldGeo = track(new THREE.PlaneGeometry(2.3, 2.74));
	const shield = new THREE.Mesh(shieldGeo, shieldMat);
	shield.position.y = 1.45;
	shieldGroup.add(shield);

	/* druga warstwa hologramu — głębia */
	const shieldEcho = new THREE.Mesh(
		shieldGeo,
		track(
			new THREE.MeshBasicMaterial({
				map: shieldTex.texture,
				transparent: true,
				opacity: 0.3,
				side: THREE.DoubleSide,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			})
		)
	);
	shieldEcho.material.opacity = 0.16;
	shieldEcho.position.set(0, 1.45, -0.09);
	shieldEcho.scale.setScalar(1.05);
	shieldGroup.add(shieldEcho);

	/* ── orbity wokół tarczy ── */
	function makeOrbit(radius, tilt, dots, opacity) {
		const orbit = new THREE.Group();
		const ring = new THREE.Mesh(
			track(new THREE.TorusGeometry(radius, 0.008, 8, 128)),
			track(additiveMat(0x6fb6ff, opacity))
		);
		orbit.add(ring);
		const dotGeo = track(new THREE.SphereGeometry(0.038, 10, 10));
		const dotMat = track(additiveMat(0xbfe0ff, 1));
		for (let i = 0; i < dots; i++) {
			const dot = new THREE.Mesh(dotGeo, dotMat);
			const a = (i / dots) * Math.PI * 2;
			dot.position.set(radius * Math.cos(a), radius * Math.sin(a), 0);
			orbit.add(dot);
		}
		orbit.rotation.x = tilt;
		return orbit;
	}

	const orbit1 = makeOrbit(1.8, 1.45, 3, 0.55);
	orbit1.position.y = 1.7;
	shieldGroup.add(orbit1);
	const orbit2 = makeOrbit(2.3, 1.32, 2, 0.3);
	orbit2.position.y = 1.6;
	shieldGroup.add(orbit2);

	/* ── kłódki satelitarne ── */
	const padlockTex = track(makePadlockTexture());
	const lockSpecs = [
		{ x: -2.7, z: 0.6, s: 1.0 },
		{ x: -1.75, z: -1.9, s: 0.72 },
		{ x: 2.45, z: -1.5, s: 0.85 },
		{ x: 3.2, z: 0.9, s: 0.7 }
	];
	const locks = [];
	for (const [i, spec] of lockSpecs.entries()) {
		const group = new THREE.Group();
		group.position.set(spec.x, 0, spec.z);
		stage.add(group);

		const plate = new THREE.Mesh(
			track(new THREE.CylinderGeometry(0.5 * spec.s, 0.58 * spec.s, 0.12, 36)),
			baseMat
		);
		plate.position.y = 0.06;
		group.add(plate);

		const lockRim = new THREE.Mesh(
			track(new THREE.TorusGeometry(0.42 * spec.s, 0.012, 8, 48)),
			track(additiveMat(0x7cc0ff, 0.8))
		);
		lockRim.rotation.x = Math.PI / 2;
		lockRim.position.y = 0.13;
		group.add(lockRim);

		const lockGlow = new THREE.Mesh(
			track(new THREE.CircleGeometry(0.38 * spec.s, 36)),
			track(additiveMat(0x3f7fce, 0.45))
		);
		lockGlow.rotation.x = -Math.PI / 2;
		lockGlow.position.y = 0.135;
		group.add(lockGlow);

		const plane = new THREE.Mesh(
			track(new THREE.PlaneGeometry(0.8 * spec.s, 0.99 * spec.s)),
			track(
				new THREE.MeshBasicMaterial({
					map: padlockTex,
					transparent: true,
					side: THREE.DoubleSide,
					depthWrite: false
				})
			)
		);
		const baseY = 0.75 * spec.s + 0.15;
		plane.position.y = baseY;
		group.add(plane);

		const ring = makeOrbit(0.62 * spec.s, 1.4 + 0.1 * i, 1, 0.45);
		ring.position.y = baseY;
		group.add(ring);

		locks.push({ plane, ring, baseY, phase: i * 1.7 });
	}

	/* ── smugi światła ── */
	const streakTex = track(makeStreakTexture());
	function makeStreak(width, height, y, z, opacity) {
		const mesh = new THREE.Mesh(
			track(new THREE.PlaneGeometry(width, height)),
			track(
				new THREE.MeshBasicMaterial({
					map: streakTex,
					transparent: true,
					opacity,
					blending: THREE.AdditiveBlending,
					depthWrite: false
				})
			)
		);
		mesh.position.set(0, y, z);
		stage.add(mesh);
		return mesh;
	}
	const streak1 = makeStreak(12, 0.45, 1.15, -3.4, 0.35);
	const streak2 = makeStreak(8, 0.22, 0.4, 1.8, 0.18);

	/* ── unoszące się kostki ── */
	const cubes = [];
	const cubeMat = track(additiveMat(0x5fa8ee, 0.6));
	for (let i = 0; i < 26; i++) {
		const size = 0.045 + rnd() * 0.06;
		const cube = new THREE.Mesh(track(new THREE.BoxGeometry(size, size, size)), cubeMat);
		cube.position.set((rnd() - 0.5) * 11, 0.2 + rnd() * 4.2, (rnd() - 0.5) * 8 - 0.5);
		stage.add(cube);
		cubes.push({
			mesh: cube,
			vy: 0.05 + rnd() * 0.12,
			rx: (rnd() - 0.5) * 1.4,
			ry: (rnd() - 0.5) * 1.4
		});
	}

	/* ── pył / cząsteczki ── */
	const COUNT = 260;
	const positions = new Float32Array(COUNT * 3);
	const speeds = new Float32Array(COUNT);
	for (let i = 0; i < COUNT; i++) {
		positions[i * 3] = (rnd() - 0.5) * 13;
		positions[i * 3 + 1] = rnd() * 4.8;
		positions[i * 3 + 2] = (rnd() - 0.5) * 9 - 0.5;
		speeds[i] = 0.03 + rnd() * 0.1;
	}
	const ptsGeo = track(new THREE.BufferGeometry());
	ptsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	const ptsMat = track(
		new THREE.PointsMaterial({
			color: 0x9fd4ff,
			size: 0.03,
			transparent: true,
			opacity: 0.7,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			sizeAttenuation: true
		})
	);
	const pts = new THREE.Points(ptsGeo, ptsMat);
	stage.add(pts);

	/* ── postprocessing: bloom ── */
	const composer = new EffectComposer(renderer);
	composer.addPass(new RenderPass(scene, camera));
	const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.62, 0.45, 0.3);
	composer.addPass(bloom);
	composer.addPass(new OutputPass());

	/* ── rozmiar / responsywność ── */
	function resize() {
		const w = container.clientWidth || 1;
		const h = container.clientHeight || 1;
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
		renderer.setSize(w, h);
		composer.setSize(w, h);
		bloom.setSize(w, h);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		const desktop = w >= 960;
		stage.position.x = desktop ? 2.35 : 0;
		camBase.set(0, desktop ? 3.6 : 4.2, desktop ? 10.6 : 13.4);
		lookTarget.set(desktop ? 1.35 : 0, desktop ? 1.3 : 3.0, 0);
	}
	resize();
	const ro = new ResizeObserver(resize);
	ro.observe(container);

	/* ── paralaks kursora ── */
	const mouse = new THREE.Vector2(0, 0);
	const camOffset = new THREE.Vector2(0, 0);
	function onPointerMove(e) {
		mouse.x = e.clientX / window.innerWidth - 0.5;
		mouse.y = e.clientY / window.innerHeight - 0.5;
	}
	window.addEventListener('pointermove', onPointerMove, { passive: true });

	/* ── pętla animacji ── */
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const clock = new THREE.Clock();
	const tmpV = new THREE.Vector3();
	let t = 0;
	let lastFlicker = 0;
	let raf = 0;
	let running = true;

	function tick() {
		raf = requestAnimationFrame(tick);
		const dt = Math.min(clock.getDelta(), 0.05);
		t += dt;

		/* tarcza — unoszenie */
		shieldGroup.position.y = 0.42 + 0.11 * Math.sin(t * 0.9);
		shieldGroup.rotation.y = 0.05 * Math.sin(t * 0.45);

		/* orbity */
		orbit1.rotation.z += dt * 0.4;
		orbit2.rotation.z -= dt * 0.26;

		/* kłódki */
		for (const lock of locks) {
			lock.plane.position.y = lock.baseY + 0.07 * Math.sin(t * 0.8 + lock.phase);
			lock.ring.position.y = lock.plane.position.y;
			lock.ring.rotation.z += dt * 0.6;
		}

		/* kręgi na podłodze — pulsowanie */
		floorRings.forEach((ring, i) => {
			const s = 1 + 0.025 * Math.sin(t * 1.6 + i * 1.2);
			ring.scale.set(s, s, 1);
		});

		/* diody na płytce */
		glowTiles.forEach((tile, i) => {
			tile.material.opacity = 0.1 + 0.1 * Math.sin(t * 1.3 + i * 2.1);
		});

		/* kostki */
		for (const c of cubes) {
			c.mesh.position.y += c.vy * dt;
			c.mesh.rotation.x += c.rx * dt;
			c.mesh.rotation.y += c.ry * dt;
			if (c.mesh.position.y > 4.6) c.mesh.position.y = 0.15;
		}

		/* pył */
		const attr = ptsGeo.attributes.position;
		for (let i = 0; i < COUNT; i++) {
			let y = attr.getY(i) + speeds[i] * dt;
			if (y > 4.9) y = 0.05;
			attr.setY(i, y);
		}
		attr.needsUpdate = true;

		/* impulsy na ścieżkach */
		for (const p of pulses) {
			p.t = (p.t + dt * p.speed) % 1;
			pulsePosition(p, tmpV);
			p.mesh.position.copy(tmpV).setY(0.06);
		}

		/* smugi */
		streak1.material.opacity = 0.28 + 0.12 * Math.sin(t * 0.8);
		streak2.material.opacity = 0.13 + 0.07 * Math.sin(t * 0.6 + 2);

		/* kod binarny */
		if (t - lastFlicker > 0.16) {
			lastFlicker = t;
			shieldTex.flicker();
		}

		/* kamera — paralaks + dryf */
		camOffset.x += (mouse.x * 0.55 + 0.12 * Math.sin(t * 0.2) - camOffset.x) * 0.04;
		camOffset.y += (-mouse.y * 0.35 + 0.06 * Math.sin(t * 0.16) - camOffset.y) * 0.04;
		camera.position.set(camBase.x + camOffset.x, camBase.y + camOffset.y, camBase.z);
		camera.lookAt(lookTarget);

		composer.render();
	}

	if (reducedMotion) {
		camera.lookAt(lookTarget);
		composer.render();
	} else {
		tick();
	}

	/* pauza gdy hero poza ekranem */
	const io = new IntersectionObserver(
		(entries) => {
			const visible = entries[0]?.isIntersecting ?? true;
			if (reducedMotion) return;
			if (visible && !running) {
				running = true;
				clock.getDelta();
				tick();
			} else if (!visible && running) {
				running = false;
				cancelAnimationFrame(raf);
			}
		},
		{ threshold: 0 }
	);
	io.observe(container);

	/* ── sprzątanie ── */
	return function dispose() {
		cancelAnimationFrame(raf);
		io.disconnect();
		ro.disconnect();
		window.removeEventListener('pointermove', onPointerMove);
		for (const d of disposables) d.dispose?.();
		composer.dispose();
		renderer.dispose();
		renderer.domElement.remove();
	};
}
