# Adolar Project Variant System

Dieses Dokument definiert, wie neue Adolar-Projekte visuell aus dem MZ-1-System abgeleitet werden.

## Grundregel

Die Rakete bleibt immer MZ-1.

Neue Projekte bekommen keine neue Rakete. Sie bekommen:

1. eine eigene Akzentfarbe
2. optional ein kleines Cockpit-Zeichen
3. einen eigenen Produktnamen im Orbitron-Wordmark-System

## Varianten

| Projekt | Akzent | Cockpit | Zweck |
|---|---:|---|---|
| Adolar | `#31D5FF` | keines | Master Brand |
| Adolar Radio | `#FF9500` | `♪` | Radio / Streams |
| Adolar Disco | `#31D5FF` | `◎` | Disco / Playlists |
| Adolar TV | `#FF4D6D` | `▶` | Video / TV |
| Adolar Player | `#8B5CFF` | `▶` | WebMediaPlayer |
| Adolar Core | `#7CFFB2` | `{}` | Core / Dev |

Die Variantennamen kommen aus `variants/manifest.json`. Fuer jede dort gelistete Variante werden Icon-PNGs, ICOs und Social-Preview-PNGs gebaut, wenn die SVG-Quellen vorhanden sind.

## Namenslogik

Der Dachname `ADOLAR` bleibt dominant. Der Projektname steht darunter oder daneben kleiner.

## Was nicht verändert wird

- Rumpfform
- Nase
- Flügel
- Grundproportionen
- MZ-1-Label
- Flammenform
- Orbitron als Schriftbasis

## Was verändert werden darf

- Akzentfarbe
- Cockpit-Symbol
- Produktname
- Social-Preview-Text
- Hintergrundfarbe einer Projektseite

## Neue Variante anlegen

```text
variants/<slug>/
  <slug>-logo.svg
  <slug>-icon.svg
  <slug>-icon-transparent.svg
  README.md
```

Zusätzlich `variants/manifest.json` und `social/variants/<slug>-social-preview.svg` ergänzen. Danach:

```bash
npm run check
npm run build
```

## Source of Truth

SVG-Dateien in `logo/`, `rocket/`, `animations/`, `variants/` und `social/` sind die Quellen. PNG, ICO, Favicons und Social-Preview-PNGs sind Exporte.

## Leitmotiv

> Same rocket. Different mission.
