function inicializarDiaUno() {
  const carousel = document.getElementById("carousel");
  const items = document.querySelectorAll(".carousel-item");
  const indicators = document.getElementById("indicators");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let index = 0;

  // Crear indicadores
  indicators.innerHTML = ""; // limpiar si ya existen
  items.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    indicators.appendChild(dot);
  });

  function updateIndicators(i) {
    indicators.querySelectorAll("span").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === i);
    });
  }

  function scrollToIndex(i) {
    const itemWidth = items[0].offsetWidth;
    carousel.scrollTo({ left: i * itemWidth, behavior: "smooth" });
    updateIndicators(i);
    index = i;
  }

  prevBtn.addEventListener("click", () => {
    if (index > 0) scrollToIndex(index - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (index < items.length - 1) scrollToIndex(index + 1);
  });

  carousel.addEventListener("scroll", () => {
    const newIndex = Math.round(carousel.scrollLeft / items[0].offsetWidth);
    if (newIndex !== index) updateIndicators(newIndex);
    index = newIndex;
  });
}
