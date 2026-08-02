document.addEventListener("DOMContentLoaded", () => {
  const backContainer = document.getElementById("petals-back");
  const frontContainer = document.getElementById("petals-front");
  const seedsContainer = document.getElementById("center-seeds");
  const center = document.querySelector(".center");
  const message = document.querySelector(".message");
  const portrait = document.querySelector(".portrait");
  const particles = document.getElementById("particles");
  const flower = document.getElementById("flower");
  const canvas = document.getElementById("butterflies");
  const ctx = canvas.getContext("2d");

  const backCount = 22;
  const frontCount = 20;
  const petalDelay = 55;

  function createPetals(container, count, layerClass, angleOffset = 0) {
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("div");
      petal.classList.add("petal", layerClass);
      const angle = (360 / count) * i + angleOffset;
      const lengthScale = 0.92 + Math.random() * 0.14;
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
    const warmth = Math.floor(40 + t * 50);
    seed.style.background = `radial-gradient(circle at 30% 30%,
      hsl(32, 55%, ${48 - warmth * 0.15}%),
      hsl(28, 60%, ${22 + (1 - t) * 10}%))`;
    seedsContainer.appendChild(seed);
  }

  for (let i = 0; i < 18; i++) {
    const p = document.createElement("span");
    p.classList.add("particle");
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
    p.style.animationDuration = `${8 + Math.random() * 10}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    p.style.width = p.style.height = `${2 + Math.random() * 4}px`;
    particles.appendChild(p);
  }

  /* ——— Purple butterflies (canvas = always visible) ——— */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const butterflies = Array.from({ length: 10 }, () => ({
    x: Math.random() * window.innerWidth,
    y: 40 + Math.random() * (window.innerHeight * 0.7),
    vx: 0.8 + Math.random() * 1.4,
    amp: 20 + Math.random() * 35,
    freq: 0.008 + Math.random() * 0.012,
    phase: Math.random() * Math.PI * 2,
    size: 14 + Math.random() * 16,
    flap: Math.random() * Math.PI * 2,
    flapSpeed: 0.25 + Math.random() * 0.2,
    hue: 270 + Math.random() * 45,
    baseY: 0,
  }));
  butterflies.forEach((b) => {
    b.baseY = b.y;
  });

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawButterfly(b, time) {
    const flap = Math.sin(b.flap) * 0.55 + 0.45;
    const angle = Math.atan2(
      Math.cos(time * b.freq + b.phase) * b.amp * b.freq * 8,
      b.vx
    );

    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(angle * 0.4);

    const s = b.size;
    const light = `hsl(${b.hue}, 72%, 68%)`;
    const mid = `hsl(${b.hue}, 68%, 48%)`;
    const dark = `hsl(${b.hue - 15}, 60%, 32%)`;

    // Left wing
    ctx.save();
    ctx.scale(-flap, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s * 0.1, -s * 0.5, -s * 0.9, -s * 0.55, -s * 0.85, -s * 0.05);
    ctx.bezierCurveTo(-s * 0.95, s * 0.35, -s * 0.3, s * 0.45, 0, s * 0.1);
    ctx.closePath();
    const lg = ctx.createLinearGradient(-s, -s * 0.3, 0, s * 0.2);
    lg.addColorStop(0, light);
    lg.addColorStop(0.55, mid);
    lg.addColorStop(1, dark);
    ctx.fillStyle = lg;
    ctx.globalAlpha = 0.92;
    ctx.fill();
    ctx.restore();

    // Right wing
    ctx.save();
    ctx.scale(flap, 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(s * 0.1, -s * 0.5, s * 0.9, -s * 0.55, s * 0.85, -s * 0.05);
    ctx.bezierCurveTo(s * 0.95, s * 0.35, s * 0.3, s * 0.45, 0, s * 0.1);
    ctx.closePath();
    const rg = ctx.createLinearGradient(s, -s * 0.3, 0, s * 0.2);
    rg.addColorStop(0, light);
    rg.addColorStop(0.55, mid);
    rg.addColorStop(1, dark);
    ctx.fillStyle = rg;
    ctx.globalAlpha = 0.92;
    ctx.fill();
    ctx.restore();

    // Body
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#2a1538";
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.08, s * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  let last = performance.now();
  function animateButterflies(now) {
    const dt = Math.min(32, now - last) / 16;
    last = now;
    const time = now * 0.001;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const b of butterflies) {
      b.flap += b.flapSpeed * dt;
      b.x += b.vx * dt;

      // Soft attraction toward mouse (gentle)
      const dx = mouseX - b.x;
      const dy = mouseY - b.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < 280) {
        b.x += (dx / dist) * 0.35 * dt;
        b.baseY += (dy / dist) * 0.25 * dt;
      }

      b.y = b.baseY + Math.sin(time * b.freq * 60 + b.phase) * b.amp;

      if (b.x > canvas.width + 40) {
        b.x = -40;
        b.baseY = 40 + Math.random() * (canvas.height * 0.7);
        b.y = b.baseY;
      }

      drawButterfly(b, time);
    }

    requestAnimationFrame(animateButterflies);
  }
  requestAnimationFrame(animateButterflies);

  /* ——— Bloom sequence ——— */
  const allPetals = [
    ...backContainer.querySelectorAll(".petal"),
    ...frontContainer.querySelectorAll(".petal"),
  ];
  const bloomStart = 1400;

  allPetals.forEach((petal, index) => {
    setTimeout(() => petal.classList.add("visible"), bloomStart + petalDelay * index);
  });

  setTimeout(() => center.classList.add("visible"), bloomStart + petalDelay * 10);
  setTimeout(() => portrait.classList.add("visible"), bloomStart + 200);
  setTimeout(() => message.classList.add("visible"), bloomStart + petalDelay * allPetals.length + 400);

  flower.addEventListener("click", () => {
    flower.classList.remove("spin-nudge");
    void flower.offsetWidth;
    flower.classList.add("spin-nudge");
  });
});
