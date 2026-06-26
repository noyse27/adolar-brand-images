# MZ-1 Animation System v0.4.0

Dieses Release macht die Rakete zu einer kleinen Zustandsanzeige für den Webplayer.

## Dateien

| Datei | Zweck |
|---|---|
| `animations/rocket-mz1-state-machine.svg` | Haupt-SVG mit allen Zuständen |
| `animations/rocket-mz1-idle.svg` | Beispielzustand Idle |
| `animations/rocket-mz1-loading.svg` | Beispielzustand Loading |
| `animations/rocket-mz1-playing.svg` | Beispielzustand Playing |
| `animations/rocket-mz1-paused.svg` | Beispielzustand Paused |
| `animations/rocket-mz1-error.svg` | Beispielzustand Error |
| `animations/rocket-mz1-success.svg` | Beispielzustand Success |
| `web/adolar-mz1-animations.css` | externe CSS-Variante |
| `web/adolar-mz1-state-helper.js` | kleiner JS-Helfer für Audio-Events |

## Zustände

| Zustand | Bedeutung |
|---|---|
| `idle` | Neutral, keine Wiedergabe |
| `loading` | Stream lädt / puffert |
| `playing` | Wiedergabe läuft |
| `paused` | Wiedergabe pausiert |
| `error` | Stream oder Playerfehler |
| `success` | kurzer positiver Impuls, z. B. Update oder Speichern erfolgreich |

## Einbettung

Die SVG sollte inline eingebettet werden, weil `data-state` dann direkt gesetzt werden kann.

```html
<svg class="adolar-mz1" data-state="idle" viewBox="0 0 380 380">
  ...
</svg>
```

Zustand setzen:

```js
const rocket = document.querySelector(".adolar-mz1");
rocket.dataset.state = "playing";
```

## Audio-Mapping

```js
audio.addEventListener("loadstart", () => rocket.dataset.state = "loading");
audio.addEventListener("waiting", () => rocket.dataset.state = "loading");
audio.addEventListener("playing", () => rocket.dataset.state = "playing");
audio.addEventListener("pause", () => rocket.dataset.state = "paused");
audio.addEventListener("ended", () => rocket.dataset.state = "idle");
audio.addEventListener("error", () => rocket.dataset.state = "error");
```

## Reduced Motion

Alle Animationen respektieren `prefers-reduced-motion: reduce`.

## Design-Regeln

- Kein Gesicht.
- Keine neuen Flügel.
- Keine neuen Raketenformen pro Zustand.
- Bewegung bleibt dezent.
- Die Flamme darf pulsen.
- Das Cockpit darf bei Fehler/Erfolg die Farbe ändern.
