document.addEventListener("DOMContentLoaded", () => {
  const petalsContainer = document.querySelector(".petals");
  const center = document.querySelector(".center");
  const message = document.querySelector(".message");
  const particles = document.getElementById("particles");
  const totalPetals = 18;
  const petalDelay = 90;

  for (let i = 0; i < totalPetals; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.setProperty("--angle", `${(360 / totalPetals) * i}deg`);
    petalsContainer.appendChild(petal);
  }

  const petals = document.querySelectorAll(".petal");

  // Soft floating light particles
  const particleCount = 22;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("span");
    p.classList.add("particle");
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
    p.style.animationDuration = `${8 + Math.random() * 10}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    p.style.width = p.style.height = `${2 + Math.random() * 4}px`;
    particles.appendChild(p);
  }

  // Bloom petals one by one
  const bloomStart = 1400;
  petals.forEach((petal, index) => {
    setTimeout(() => {
      petal.classList.add("visible");
    }, bloomStart + petalDelay * index);
  });

  // Center appears mid-bloom
  setTimeout(() => {
    center.classList.add("visible");
  }, bloomStart + petalDelay * 8);

  // Dedication message after the flower opens
  setTimeout(() => {
    message.classList.add("visible");
  }, bloomStart + petalDelay * totalPetals + 500);
});
