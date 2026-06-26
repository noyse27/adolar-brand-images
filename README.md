# Adolar Brand / MZ-1

MZ-1 ist das gemeinsame Raketenzeichen für das Adolar-Universum.
Die Rakete bleibt in allen Projekten dieselbe; Varianten entstehen ueber Akzentfarbe, Cockpit-Zeichen, Produktname und Zustand.

## Inhalt

- `logo/adolar-logo.svg` – Masterlogo auf hellem Hintergrund
- `logo/adolar-logo-dark.svg` – Variante für dunkle Hintergründe
- `rocket/rocket-mz1.svg` – reine Rakete als Vektor
- `animations/rocket-mz1-state-machine.svg` – SVG mit CSS-Zuständen
- `variants/<slug>/<slug>-icon.svg` – Source-SVGs fuer Projektvarianten
- `web/adolar-rocket.css` – CSS-Snippet für Einbettung im Webplayer
- `docs/styleguide.md` – kurzer Styleguide
- `docs/build-automation.md` – Build- und Export-Automation
- `palette/colors.svg` – Farbpalette
- `site/` – statische Vorschau fuer GitHub Pages
- `generated-previews/` – KI-generierte Vorschau-PNGs als visuelle Richtung

## Source of Truth und Exporte

SVGs sind die Quelle der Wahrheit. PNGs, Favicons, ICOs und Social-Preview-PNGs werden aus SVGs erzeugt.

```bash
npm install
npm run check
npm run build
```

Der Build erzeugt Exporte unter `exports/`, `favicons/` und `social/**/*.png`.

## Schrift

Der Schriftzug verwendet Orbitron:

```css
font-family: "Orbitron", "Orbitron Medium", "Orbitron Regular", "Segoe UI", sans-serif;
```

Für finale Releases sollte zusätzlich eine Version erstellt werden, bei der Orbitron in Pfade umgewandelt ist.

## Zustände im Webplayer

Das animierte SVG versteht folgende Zustände über `data-state`:

```html
<object data="animations/rocket-mz1-state-machine.svg" type="image/svg+xml"></object>
```

Oder direkt inline:

```html
<svg data-state="playing">...</svg>
```

Unterstützte Zustände:

- `idle`
- `loading`
- `playing`
- `paused`
- `error`
- `success`
