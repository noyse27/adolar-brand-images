# Build / Export Automation v0.5.0

Dieses Release ergänzt das Brand-Repository um eine einfache Build-Automation.

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

## ICO-Hinweis

Das Skript erzeugt aktuell ICO-Quellbilder als PNG:

```text
exports/ico/<variant>-ico-source-256.png
```

Multi-Size-`.ico` kann später per ImageMagick, Inkscape oder einem separaten Release-Job erzeugt werden.

## GitHub Actions

Die Workflow-Datei liegt hier:

```text
.github/workflows/build-assets.yml
```

Sie prüft das Repository, baut Exporte und lädt die generierten Dateien als Artifact hoch.
