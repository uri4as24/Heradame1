const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a, .nav-cta, .hero-actions a");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("is-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
  });
});

const observer = new IntersectionObserver(
  ([entry]) => {
    header?.classList.toggle("is-scrolled", !entry.isIntersecting);
  },
  { threshold: 0.1 },
);

const hero = document.querySelector(".hero");
if (hero) observer.observe(hero);

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name") || "";
  const email = formData.get("email") || "";
  const phone = formData.get("phone") || "";
  const reason = formData.get("reason") || "";
  const message = formData.get("message") || "";

  const subject = `Consulta Herédame - ${reason || "Sitio web"}`;
  const body = [
    "Hola Herédame,",
    "",
    "Quiero solicitar información sobre el servicio.",
    "",
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Teléfono: ${phone || "No indicado"}`,
    `Motivo: ${reason}`,
    "",
    "Mensaje:",
    message || "No indicado",
  ].join("\n");

  const mailto = `mailto:contacto@heredame.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formNote?.classList.add("is-success");
  if (formNote) {
    formNote.textContent = "Listo. Se abrirá tu correo con la consulta preparada para Herédame.";
  }
  window.location.href = mailto;
});
