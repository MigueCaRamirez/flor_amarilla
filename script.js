document.addEventListener("DOMContentLoaded", () => {
  const backContainer = document.getElementById("petals-back");
  const frontContainer = document.getElementById("petals-front");
  const seedsContainer = document.getElementById("center-seeds");
  const center = document.querySelector(".center");
  const message = document.getElementById("message");
  const portrait = document.getElementById("portrait");
  const flower = document.getElementById("flower");
  const butterfliesLayer = document.getElementById("butterflies");

  // Soft purple butterflies
  const bfConfigs = [
    { top: "12%", s: 1.15, dur: 11, delay: 0 },
    { top: "28%", s: 0.85, dur: 14, delay: -3 },
    { top: "45%", s: 1.3, dur: 12, delay: -6 },
    { top: "18%", s: 0.75, dur: 16, delay: -8 },
    { top: "58%", s: 1.05, dur: 13, delay: -2 },
    { top: "35%", s: 0.95, dur: 15, delay: -10 },
    { top: "65%", s: 1.2, dur: 10, delay: -4 },
    { top: "8%", s: 0.8, dur: 17, delay: -12 },
  ];

  bfConfigs.forEach((cfg, i) => {
    const gid = `bfWing${i}`;
    const el = document.createElement("i");
    el.className = `bf bf-${i + 1}`;
    el.style.top = cfg.top;
    el.style.setProperty("--s", cfg.s);
    el.style.animationDuration = `${cfg.dur}s`;
    el.style.animationDelay = `${cfg.delay}s`;
    el.innerHTML = `
      <svg viewBox="0 0 40 28" aria-hidden="true">
        <defs>
          <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#d4a5ff"/>
            <stop offset="55%" stop-color="#9b5de5"/>
            <stop offset="100%" stop-color="#5a2d8a"/>
          </linearGradient>
        </defs>
        <g class="bf-wing-l">
          <path d="M19 14 C16 4 6 2 3 8 C1 13 4 20 12 22 C16 20 18 17 19 14 Z" fill="url(#${gid})"/>
          <circle cx="9" cy="11" r="2.2" fill="#e8cfff" opacity="0.55"/>
        </g>
        <g class="bf-wing-r">
          <path d="M21 14 C24 4 34 2 37 8 C39 13 36 20 28 22 C24 20 22 17 21 14 Z" fill="url(#${gid})"/>
          <circle cx="31" cy="11" r="2.2" fill="#e8cfff" opacity="0.55"/>
        </g>
        <ellipse cx="20" cy="14" rx="1.4" ry="5.5" fill="#2d1840"/>
        <path d="M19 9 Q17 4 15 3 M21 9 Q23 4 25 3" fill="none" stroke="#2d1840" stroke-width="0.9" stroke-linecap="round"/>
      </svg>`;
    butterfliesLayer.appendChild(el);
  });

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
