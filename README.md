# Aura Cyber — ubezpieczenia cyber

Strona ubezpieczeń cyber Aura Consulting zbudowana w **SvelteKit** (Svelte 5, adapter-static — w pełni prerenderowana strona statyczna).

## Rozwój

```bash
npm install
npm run dev        # serwer deweloperski (http://localhost:5173)
```

## Budowanie

```bash
npm run build      # statyczny build do katalogu build/
npm run preview    # podgląd builda (http://localhost:4173)
```

## Struktura

- `src/routes/+page.svelte` — strona główna (sekcje: hero, ticker, statystyki, zakres ochrony, zagrożenia, proces, partnerzy, CTA)
- `src/lib/components/` — komponenty sekcji + `Shield.svelte` / `Padlock.svelte` (grafiki SVG hologramu)
- `src/lib/data.js` — treści strony (karty, statystyki, ticker)
- `src/app.css` — tokeny designu (kolory, fonty, glow) i style globalne
