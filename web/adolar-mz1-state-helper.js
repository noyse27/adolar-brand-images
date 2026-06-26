/** Adolar MZ-1 Player State Helper */
export const ADOLAR_MZ1_STATES = new Set(["idle", "loading", "playing", "paused", "error", "success"]);
export function setAdolarMZ1State(rocketElement, state) {
  if (!rocketElement) return;
  rocketElement.dataset.state = ADOLAR_MZ1_STATES.has(state) ? state : "idle";
}
export function bindAdolarMZ1ToAudio(audioElement, rocketElement) {
  if (!audioElement || !rocketElement) return () => {};
  const set = (state) => () => setAdolarMZ1State(rocketElement, state);
  const handlers = [["loadstart", set("loading")],["waiting", set("loading")],["canplay", set("paused")],["playing", set("playing")],["pause", set("paused")],["ended", set("idle")],["error", set("error")]];
  handlers.forEach(([eventName, handler]) => audioElement.addEventListener(eventName, handler));
  return () => handlers.forEach(([eventName, handler]) => audioElement.removeEventListener(eventName, handler));
}
export function flashAdolarMZ1Success(rocketElement, fallbackState = "idle") {
  if (!rocketElement) return;
  setAdolarMZ1State(rocketElement, "success");
  window.setTimeout(() => setAdolarMZ1State(rocketElement, fallbackState), 1000);
}
