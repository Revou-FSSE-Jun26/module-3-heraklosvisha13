/* =========================================================
   RevoPack — Contact Page Script
   Handles: mobile menu toggle, contact form validation,
   form submission feedback, and small UI interactions.
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   1. DOM SELECTORS
   --------------------------------------------------------- */
const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");

const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

/* ---------------------------------------------------------
   2. MOBILE MENU TOGGLE
   --------------------------------------------------------- */
function initMenuToggle() {
  if (!menuToggle || !primaryNav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a nav link (mobile UX)
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close menu when pressing Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });
}

/* ---------------------------------------------------------
   3. FORM VALIDATION HELPERS
   --------------------------------------------------------- */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a single field.
 * @param {HTMLInputElement|HTMLTextAreaElement} field
 * @returns {string} error message, or empty string if valid
 */
function validateField(field) {
  const value = field.value.trim();

  if (value === "") {
    return `${field.previousElementSibling?.textContent.trim().replace("*", "").trim() || "This field"} is required.`;
  }

  if (field.type === "email" && !EMAIL_REGEX.test(value)) {
    return "Please enter a valid email address.";
  }

  if (field.id === "message" && value.length < 10) {
    return "Your message must be at least 10 characters long.";
  }

  return "";
}

/**
 * Show or clear an inline error for a field.
 */
function setFieldError(field, message) {
  const group = field.closest(".form-group");
  if (!group) return;

  // Remove existing error
  const existing = group.querySelector(".field-error");
  if (existing) existing.remove();

  field.classList.toggle("is-invalid", Boolean(message));

  if (message) {
    const errorEl = document.createElement("small");
    errorEl.className = "field-error";
    errorEl.setAttribute("role", "alert");
    errorEl.textContent = message;
    group.appendChild(errorEl);
  }
}

/**
 * Validate the whole form.
 * @returns {boolean} true if valid
 */
function validateForm() {
  const fields = [fullnameInput, emailInput, subjectInput, messageInput];
  let isValid = true;

  fields.forEach((field) => {
    if (!field) return;
    const error = validateField(field);
    setFieldError(field, error);
    if (error) isValid = false;
  });

  return isValid;
}

/* ---------------------------------------------------------
   4. FORM STATUS FEEDBACK
   --------------------------------------------------------- */
function showStatus(message, type = "success") {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.classList.remove("is-success", "is-error");
  formStatus.classList.add(type === "error" ? "is-error" : "is-success");
}

function clearStatus() {
  if (!formStatus) return;
  formStatus.textContent = "";
  formStatus.classList.remove("is-success", "is-error");
}

/* ---------------------------------------------------------
   5. SUBMIT HANDLER
   --------------------------------------------------------- */
function initContactForm() {
  if (!contactForm) return;

  // Clear inline errors on input
  [fullnameInput, emailInput, subjectInput, messageInput].forEach((field) => {
    if (!field) return;
    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) {
        setFieldError(field, "");
      }
      clearStatus();
    });
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission
    clearStatus();

    if (!validateForm()) {
      showStatus("Please fix the errors above and try again.", "error");
      return;
    }

    // Simulate sending (replace with real fetch to your API later)
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = "Sending...";

    try {
      await fakeSendMessage({
        fullname: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
      });

      showStatus("Thanks! Your message has been sent successfully.", "success");
      contactForm.reset();
    } catch (error) {
      showStatus("Something went wrong. Please try again later.", "error");
      console.error("Form submission error:", error);
    } finally {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = "Send Message";
    }
  });
}

/**
 * Simulated async submission.
 * Replace this with a real fetch() to your Flask API later.
 */
function fakeSendMessage(payload) {
  return new Promise((resolve) => {
    console.log("Sending message payload:", payload);
    setTimeout(resolve, 900);
  });
}

/* ---------------------------------------------------------
   6. INIT
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initMenuToggle();
  initContactForm();
});