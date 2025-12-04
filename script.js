const hoy = new Date().getDate(); // día actual del mes
const totalDias = 31;

// Persistencia con localStorage
let estadoCasillas =
  JSON.parse(localStorage.getItem("estadoCasillas")) ||
  Array(totalDias).fill(false);

const calendario = document.getElementById("calendario");

function renderCalendario() {
  calendario.innerHTML = "";

  // Encabezados de días de la semana (empezando en domingo)
  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  diasSemana.forEach((dia) => {
    const encabezado = document.createElement("div");
    encabezado.className = "encabezado";
    encabezado.textContent = dia;
    calendario.appendChild(encabezado);
  });

  // Diciembre 2025 empieza en lunes
  const primerDiaSemana = new Date(2025, 11, 1).getDay(); // 0=domingo
  const offset = primerDiaSemana;

  // Casillas vacías antes del día 1
  for (let i = 0; i < offset; i++) {
    const vacio = document.createElement("div");
    vacio.className = "casilla";
    calendario.appendChild(vacio);
  }

  // Renderizar días
  for (let dia = 1; dia <= totalDias; dia++) {
    const casilla = document.createElement("div");
    casilla.className = "casilla";
    casilla.innerHTML = `<span>${dia}</span>`;

    if (dia <= hoy && !estadoCasillas[dia - 1]) {
      // Crear botón con imagen
      const boton = document.createElement("button");
      boton.className = "abrir-regalo";

      // Imagen dentro del botón
      const icono = document.createElement("img");
      icono.src = "assets/images/rasca.png";
      icono.alt = "Abrir regalo";
      icono.className = "icono-regalo";

      boton.appendChild(icono);

      boton.onclick = () => {
        estadoCasillas[dia - 1] = true;
        localStorage.setItem("estadoCasillas", JSON.stringify(estadoCasillas));
        // Redirección con parámetro en la URL
        window.location.href = `sorpresa.html?dia=${dia}`;
      };

      casilla.appendChild(boton);
    } else if (estadoCasillas[dia - 1]) {
      casilla.innerHTML = `<span>${dia}</span><p>🎁 ¡Ya abierto!</p>`;
    } else {
      casilla.innerHTML += `<p>🔒 Bloqueado</p>`;
    }

    calendario.appendChild(casilla);
  }

  // Rellenar casillas vacías al final
  const totalCeldas = calendario.children.length;
  const resto = totalCeldas % 7;
  if (resto !== 0) {
    const faltan = 7 - resto;
    for (let i = 0; i < faltan; i++) {
      const vacio = document.createElement("div");
      vacio.className = "casilla";
      calendario.appendChild(vacio);
    }
  }
}

// Botón reiniciar
document.getElementById("reiniciar").onclick = () => {
  localStorage.removeItem("estadoCasillas");
  estadoCasillas = Array(totalDias).fill(false);
  renderCalendario();
};

// Render inicial
renderCalendario();

// 🔄 Refrescar al volver con botón atrás del navegador
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    // Si la página viene de caché (back/forward cache)
    window.location.reload();
  } else {
    renderCalendario();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const musicBtn = document.getElementById("music-btn");
  const musicIcon = document.getElementById("music-icon");
  const bgMusic = document.getElementById("bg-music");
  const volumeSlider = document.getElementById("volume-slider");

  bgMusic.volume = 0.2;
  volumeSlider.value = 0.2;

  bgMusic
    .play()
    .then(() => {
      musicIcon.textContent = "🔊";
    })
    .catch((err) => {
      console.log("El navegador bloqueó el autoplay:", err);
    });

  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicIcon.textContent = "🔊";
    } else {
      bgMusic.pause();
      musicIcon.textContent = "🔇";
    }
  });

  // Control de volumen
  volumeSlider.addEventListener("input", () => {
    bgMusic.volume = volumeSlider.value;
  });

  const festivoBtn = document.getElementById("modo-festivo");
  let nieveActiva = true; // ❄️ empieza activa
  let contenedorNieve;

  // Activar nieve al cargar
  activarNieve();
  festivoBtn.textContent = "❄️ Quitar nieve";

  festivoBtn.addEventListener("click", () => {
    if (nieveActiva) {
      desactivarNieve();
      festivoBtn.textContent = "❄️ Activar nieve";
    } else {
      activarNieve();
      festivoBtn.textContent = "❄️ Quitar nieve";
    }
    nieveActiva = !nieveActiva;
  });

  function activarNieve() {
    contenedorNieve = document.createElement("div");
    contenedorNieve.classList.add("nieve-contenedor");
    document.body.appendChild(contenedorNieve);

    // Generar copos de nieve
    for (let i = 0; i < 50; i++) {
      const copo = document.createElement("div");
      copo.classList.add("copo");
      copo.style.left = Math.random() * 100 + "vw";
      copo.style.animationDuration = 5 + Math.random() * 5 + "s";
      copo.style.opacity = Math.random();
      copo.style.fontSize = 12 + Math.random() * 20 + "px";
      copo.textContent = "❄";
      contenedorNieve.appendChild(copo);
    }
  }

  function desactivarNieve() {
    if (contenedorNieve) {
      contenedorNieve.remove();
    }
  }
});
