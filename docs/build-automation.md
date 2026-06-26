# Build / Export Automation v0.6.0

Dieses Release stabilisiert die Build-Automation und erzeugt echte ICO-Dateien ohne externe CLI-Tools.

## Ziel

SVGs bleiben die Quelle der Wahrheit. PNGs, Favicons und Social-Preview-Bilder werden daraus erzeugt.

## Voraussetzungen

Node.js 20 oder neuer.

```bash
npm install
```

## Befehle

```bash
npm run check
npm run build
npm run build:clean
```

- `npm run check` prueft wichtige Source-Dateien, Variant-Quellen und Social-Preview-SVGs.
- `npm run build` erzeugt PNGs, Favicons, ICOs und Social-Preview-PNGs aus SVGs.
- `npm run build:clean` entfernt generierte Exportordner vor dem Neubau.

## Was wird erzeugt?

Aus den Variant-Icons:

```text
exports/png/<variant>/<variant>-icon-16.png
exports/png/<variant>/<variant>-icon-24.png
exports/png/<variant>/<variant>-icon-32.png
exports/png/<variant>/<variant>-icon-48.png
exports/png/<variant>/<variant>-icon-64.png
exports/png/<variant>/<variant>-icon-128.png
exports/png/<variant>/<variant>-icon-256.png
exports/png/<variant>/<variant>-icon-512.png
```

Für die Website:

```text
favicons/favicon-16x16.png
favicons/favicon-32x32.png
favicons/favicon-48x48.png
favicons/android-chrome-192x192.png
favicons/android-chrome-512x512.png
favicons/apple-touch-icon.png
favicons/site.webmanifest
```

Für GitHub / Social:

```text
social/github-social-preview.png
social/variants/<variant>-social-preview.png
```

## ICO-Dateien

Das Skript schreibt PNG-basierte Multi-Image-ICO-Container direkt in Node:

```text
exports/ico/<variant>.ico
```

Enthalten sind 16, 32, 48 und 256 px. Keine ImageMagick- oder Inkscape-Abhaengigkeit ist erforderlich.

Fehlende optionale Quell-SVGs werden als klare `Skipped optional asset`-Warnung gemeldet. Varianten aus `variants/manifest.json` sollten vollstaendige SVG-Quellen besitzen.

## GitHub Actions

Die Workflow-Datei liegt hier:

```text
.github/workflows/build-assets.yml
```

Sie prüft das Repository, baut Exporte und lädt die generierten Dateien als Artifact hoch.
