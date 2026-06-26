# Claude Integration – Adolar MZ-1 im Webplayer

Dieses Dokument beschreibt, wie die MZ-1-Rakete als Zustandsanzeige in den Adolar-Webplayer eingebettet werden soll.

## Ziel

Die Rakete ist nicht nur ein Logo, sondern ein dezentes Statussymbol des Players.

Die Silhouette bleibt immer gleich. Zustände werden nur über Bewegung, Flamme und Cockpit-Akzent vermittelt.

## Zustände

| Player-Zustand | `data-state` | Verhalten |
|---|---|---|
| Keine Wiedergabe / neutral | `idle` | Rakete schwebt leicht |
| Stream wird geladen | `loading` | Flamme pulsiert langsam |
| Wiedergabe aktiv | `playing` | Flamme pulsiert etwas schneller |
| Pausiert | `paused` | Flamme fast aus |
| Fehler / Stream nicht erreichbar | `error` | Rakete kippt leicht, Flamme aus, Cockpit rot |
| Update / Aktion erfolgreich | `success` | kurzer Startimpuls, danach zurück zu `idle` |

## Empfohlene HTML-Struktur

Am besten wird `rocket-mz1-state-machine.svg` inline eingebettet, nicht per `<img>`, weil CSS und `data-state` dann direkt funktionieren.

```html
<div class="adolar-brand-status" aria-label="Adolar Player Status">
  <!-- Inhalt aus animations/rocket-mz1-state-machine.svg inline einfügen -->
  <svg class="adolar-mz1" data-state="idle" viewBox="0 0 380 380" aria-hidden="true">
    ...
  </svg>
</div>
```

## Zustand per JavaScript setzen

```js
const rocket = document.querySelector(".adolar-mz1");

function setAdolarState(state) {
  const allowedStates = new Set([
    "idle",
    "loading",
    "playing",
    "paused",
    "error",
    "success"
  ]);

  rocket.dataset.state = allowedStates.has(state) ? state : "idle";
}
```

## Mapping im Player

```js
audio.addEventListener("loadstart", () => setAdolarState("loading"));
audio.addEventListener("waiting", () => setAdolarState("loading"));
audio.addEventListener("playing", () => setAdolarState("playing"));
audio.addEventListener("pause", () => setAdolarState("paused"));
audio.addEventListener("ended", () => setAdolarState("idle"));
audio.addEventListener("error", () => setAdolarState("error"));
```

## Design-Regel

Nicht mehrere Raketenvarianten je Zustand bauen.

Richtig:
- dieselbe Rakete
- andere Bewegung
- andere Flammenintensität
- kleiner Cockpit-Akzent

Falsch:
- andere Flügel
- anderes Cockpit
- anderer Rumpf
- Comic-Gesicht
- Augen/Mund
