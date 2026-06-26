const variants = [
  ["adolar", "Adolar"],
  ["radio", "Radio"],
  ["disco", "Disco"],
  ["tv", "TV"],
  ["player", "Player"],
  ["core", "Core"]
];

const states = ["idle", "loading", "playing", "paused", "error", "success"];

function renderFigure(container, image, label, alt) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const caption = document.createElement("figcaption");

  img.src = image;
  img.alt = alt;
  caption.textContent = label;
  figure.append(img, caption);
  container.append(figure);
}

const variantGrid = document.querySelector("#variantGrid");
for (const [slug, label] of variants) {
  renderFigure(
    variantGrid,
    `../variants/${slug}/${slug}-icon.svg`,
    `${label}: variants/${slug}/${slug}-icon.svg`,
    `Adolar ${label} MZ-1 icon`
  );
}

const stateGrid = document.querySelector("#stateGrid");
for (const state of states) {
  renderFigure(
    stateGrid,
    `../animations/rocket-mz1-${state}.svg`,
    `${state}: animations/rocket-mz1-${state}.svg`,
    `MZ-1 ${state} state`
  );
}
