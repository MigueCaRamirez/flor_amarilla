document.addEventListener("DOMContentLoaded", () => {
  const backContainer = document.getElementById("petals-back");
  const frontContainer = document.getElementById("petals-front");
  const seedsContainer = document.getElementById("center-seeds");
  const center = document.querySelector(".center");
  const message = document.querySelector(".message");
  const particles = document.getElementById("particles");

  const backCount = 22;
  const frontCount = 20;
  const petalDelay = 55;

  function createPetals(container, count, layerClass, angleOffset = 0) {
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal", layerClass);
      const angle = (360 / count) * i + angleOffset;
      // Slight natural variation in length
      const lengthScale = 0.92 + Math.random() * 0.14;
      petal.style.setProperty("--angle", `${angle}deg`);
      petal.style.setProperty("--len", lengthScale.toFixed(3));
      container.appendChild(petal);
    }
  }

  createPetals(backContainer, backCount, "petal-back", 0);
  createPetals(frontContainer, frontCount, "petal-front", 360 / frontCount / 2);

  // Fibonacci spiral of disk florets (seeds)
  const seedCount = 160;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5°
  for (let i = 0; i < seedCount; i++) {
    const seed = document.createElement("span");
    seed.classList.add("seed");
    const t = i / seedCount;
    const radius = Math.sqrt(t) * 46; // % from center
    const theta = i * goldenAngle;
    const x = 50 + radius * Math.cos(theta);
    const y = 50 + radius * Math.sin(theta);
    const size = 2.2 + t * 2.4;
    seed.style.left = `${x}%`;
    seed.style.top = `${y}%`;
    seed.style.width = `${size}px`;
    seed.style.height = `${size * 0.85}px`;
    seed.style.setProperty("--rot", `${(theta * 180) / Math.PI}deg`);
    // Outer ring darker / more green-brown; inner warmer
    const warmth = Math.floor(40 + t * 50);
    seed.style.background = `radial-gradient(circle at 30% 30%,
      hsl(32, 55%, ${48 - warmth * 0.15}%),
      hsl(28, 60%, ${22 + (1 - t) * 10}%))`;
    seedsContainer.appendChild(seed);
  }

  // Soft floating light particles
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("span");
    p.classList.add("particle");
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
    p.style.animationDuration = `${8 + Math.random() * 10}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    p.style.width = p.style.height = `${2 + Math.random() * 4}px`;
    particles.appendChild(p);
  }

  const allPetals = [
    ...backContainer.querySelectorAll(".petal"),
    ...frontContainer.querySelectorAll(".petal"),
  ];

  const bloomStart = 1400;

  // Bloom outer layer first, then inner — like a real opening
  allPetals.forEach((petal, index) => {
    setTimeout(() => {
      petal.classList.add("visible");
    }, bloomStart + petalDelay * index);
  });

  setTimeout(() => {
    center.classList.add("visible");
  }, bloomStart + petalDelay * 10);

  setTimeout(() => {
    message.classList.add("visible");
  }, bloomStart + petalDelay * allPetals.length + 400);
});
