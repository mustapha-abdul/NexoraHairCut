
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

// Mobile navigation
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

// Smooth reveal animations when sections enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Clicking a service's arrow selects it in the booking form
const serviceSelect = document.getElementById("serviceSelect");

document.querySelectorAll("[data-service]").forEach(button => {
  button.addEventListener("click", () => {
    serviceSelect.value = button.dataset.service;
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  });
});

// Set today's date as the earliest booking date
const dateInput = document.getElementById("bookingDate");

if (dateInput) {
  const now = new Date();
  const localDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);

  dateInput.min = localDate;
  dateInput.value = localDate;
}

// IMPORTANT: Replace this placeholder with the real shop's WhatsApp number.
// Format: Nigerian country code + number, digits only. Example: 2348012345678
const WHATSAPP_NUMBER = "23408051669399";

const bookingForm = document.getElementById("bookingForm");
const formError = document.getElementById("formError");

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const service = serviceSelect.value;
  const date = dateInput.value;
  const notes = document.getElementById("bookingNotes").value.trim();

  if (WHATSAPP_NUMBER === "08051669399") {
    formError.textContent =
      "Demo mode: replace the placeholder WhatsApp number in script.js before launch.";
    return;
  }

  const message = [
    "Hello Nexora Grooming Lounge! I would like to request an appointment.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Preferred date: ${date}`,
    notes ? `Notes: ${notes}` : ""
  ].filter(Boolean).join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
  formError.textContent = "";
});

// Automatically update the copyright year
document.getElementById("year").textContent = new Date().getFullYear();
