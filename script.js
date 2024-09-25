const toggleButton = document.getElementById("toggle-theme");
const toggleIcon = toggleButton.querySelector("i"); // Seleccionar el ícono dentro del botón
const calleInput = document.getElementById("calle");
const datalist = document.getElementById("calle-options");

// Función para cambiar entre los temas claro y oscuro
function toggleTheme() {
  const currentTheme = document.body.classList.contains("dark")
    ? "dark"
    : "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.body.classList.remove(currentTheme);
  document.body.classList.add(newTheme);

  // Guardar la preferencia de tema en localStorage
  localStorage.setItem("theme", newTheme);

  // Cambiar el ícono del botón
  if (newTheme === "light") {
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
  } else {
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
  }
}

// Cargar el tema desde localStorage al cargar la página
function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"; // Predeterminado es "light"
  document.body.classList.add(savedTheme);

  // Cambiar el ícono del botón según el tema actual
  if (savedTheme === "light") {
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
  } else {
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
  }
}

// Agregar evento al botón para cambiar el tema
toggleButton.addEventListener("click", toggleTheme);

// Cargar las calles desde el archivo calles.json
async function cargarCalles() {
  try {
    const response = await fetch("calles.json"); // Ruta del archivo JSON
    const calles = await response.json();
    agregarCallesDatalist(calles);
  } catch (error) {
    console.error("Error al cargar el archivo JSON de calles:", error);
  }
}

// Función para agregar las calles al datalist
function agregarCallesDatalist(calles) {
  calles.forEach((calle) => {
    const option = document.createElement("option");
    option.value = calle; // Asignamos el nombre de la calle directamente
    datalist.appendChild(option);
  });
}

// Cargar las calles y el tema al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  loadTheme(); // Cargar el tema
  cargarCalles(); // Cargar las calles
});
