# Adolar Brand / MZ-1

MZ-1 ist das gemeinsame Raketenzeichen für das Adolar-Universum.

## Inhalt

- `logo/adolar-logo.svg` – Masterlogo auf hellem Hintergrund
- `logo/adolar-logo-dark.svg` – Variante für dunkle Hintergründe
- `rocket/rocket-mz1.svg` – reine Rakete als Vektor
- `animations/rocket-mz1-states.svg` – SVG mit CSS-Zuständen
- `web/adolar-rocket.css` – CSS-Snippet für Einbettung im Webplayer
- `docs/styleguide.md` – kurzer Styleguide
- `palette/colors.svg` – Farbpalette
- `generated-previews/` – KI-generierte Vorschau-PNGs als visuelle Richtung

## Schrift

Der Schriftzug verwendet Orbitron:

```css
font-family: "Orbitron", "Orbitron Medium", "Orbitron Regular", "Segoe UI", sans-serif;
```

Für finale Releases sollte zusätzlich eine Version erstellt werden, bei der Orbitron in Pfade umgewandelt ist.

## Zustände im Webplayer

Das animierte SVG versteht folgende Zustände über `data-state`:

```html
<object data="animations/rocket-mz1-states.svg" type="image/svg+xml"></object>
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
