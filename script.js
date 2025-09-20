document.addEventListener("DOMContentLoaded", () => {
  const petalsContainer = document.querySelector(".petals");
  const totalPetals = 16;

  // Crear pétalos
  for (let i = 0; i < totalPetals; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.transform = `translate(-50%, -50%) rotate(${(360 / totalPetals) * i}deg)`;
    petalsContainer.appendChild(petal);
  }

  const petals = document.querySelectorAll(".petal");
  const center = document.querySelector(".center");
  const stem = document.querySelector(".stem");
  const leaves = document.querySelectorAll(".leaf");
  const message = document.querySelector(".message");

  let delay = 100;

  // Aparecen los pétalos uno a uno
  petals.forEach((petal, index) => {
    setTimeout(() => {
      petal.style.opacity = 1;
    }, delay * index);
  });

  // Centro
  setTimeout(() => {
    center.style.opacity = 1;
  }, delay * 10);

  // Tallo
  setTimeout(() => {
    stem.style.opacity = 1;
  }, delay * totalPetals + 100);


  // Mensaje final
  setTimeout(() => {
    message.style.opacity = 1;
  }, delay * totalPetals + 1000);
});
