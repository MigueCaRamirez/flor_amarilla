document.addEventListener("DOMContentLoaded", () => {
  const backContainer = document.getElementById("petals-back");
  const frontContainer = document.getElementById("petals-front");
  const seedsContainer = document.getElementById("center-seeds");
  const center = document.querySelector(".center");
  const message = document.getElementById("message");
  const portrait = document.getElementById("portrait");
  const flower = document.getElementById("flower");

  const backCount = 22;
  const frontCount = 20;
  const petalDelay = 50;

  function createPetals(container, count, layerClass, angleOffset = 0) {
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal", layerClass);
      const angle = (360 / count) * i + angleOffset;
      const lengthScale = 0.92 + Math.random() * 0.12;
      petal.style.setProperty("--angle", `${angle}deg`);
      petal.style.setProperty("--len", lengthScale.toFixed(3));
      container.appendChild(petal);
    }
  }

  createPetals(backContainer, backCount, "petal-back", 0);
  createPetals(frontContainer, frontCount, "petal-front", 360 / frontCount / 2);

  const seedCount = 160;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < seedCount; i++) {
    const seed = document.createElement("span");
    seed.classList.add("seed");
    const t = i / seedCount;
    const radius = Math.sqrt(t) * 46;
    const theta = i * goldenAngle;
    seed.style.left = `${50 + radius * Math.cos(theta)}%`;
    seed.style.top = `${50 + radius * Math.sin(theta)}%`;
    const size = 2.2 + t * 2.4;
    seed.style.width = `${size}px`;
    seed.style.height = `${size * 0.85}px`;
    seed.style.setProperty("--rot", `${(theta * 180) / Math.PI}deg`);
    seed.style.background = `radial-gradient(circle at 30% 30%,
      hsl(32, 55%, ${40 - t * 10}%),
      hsl(28, 60%, ${22 + (1 - t) * 8}%))`;
    seedsContainer.appendChild(seed);
  }

  const allPetals = [
    ...backContainer.querySelectorAll(".petal"),
    ...frontContainer.querySelectorAll(".petal"),
  ];

  const bloomStart = 900;

  // Show portrait & start flower sway immediately-ish
  requestAnimationFrame(() => {
    portrait.classList.add("visible");
    flower.classList.add("ready");
  });

  allPetals.forEach((petal, index) => {
    setTimeout(() => petal.classList.add("visible"), bloomStart + petalDelay * index);
  });

  setTimeout(() => center.classList.add("visible"), bloomStart + petalDelay * 8);

  setTimeout(() => {
    message.classList.add("visible");
  }, bloomStart + petalDelay * allPetals.length + 350);

  flower.addEventListener("click", () => {
    flower.classList.remove("spin-nudge");
    void flower.offsetWidth;
    flower.classList.add("spin-nudge");
  });
});
