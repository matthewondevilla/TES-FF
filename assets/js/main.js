// QUICK ACTION CARD ANIMATION
const featureCards = document.querySelectorAll('.feature-card');
/* CARD ANIMATIONS */
const animatedCards = document.querySelectorAll(
  '.feature-card, .venue-card'
);

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-up');
    }
  });
}, {
  threshold: 0.15
});

animatedCards.forEach(card => {
  cardObserver.observe(card);
});
// const cardObserver = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('animate-fade-up');
//     }
//   });
// }, {
//   threshold: 0.15
// });

// featureCards.forEach(card => {
//   cardObserver.observe(card);
// });

/* UCLA-inspired campus event services theme */

"use strict";

/* Announcement bar dismiss */
(function () {
  const bar = document.querySelector(".announcement-bar");
  const closeBtn = document.getElementById("closeAnnouncement");

  if (!bar || !closeBtn) return;

  closeBtn.addEventListener("click", () => {
    bar.style.transition = "max-height 0.3s ease, opacity 0.3s ease";
    bar.style.overflow = "hidden";
    bar.style.maxHeight = bar.scrollHeight + "px";
    bar.style.opacity = "1";

    requestAnimationFrame(() => {
      bar.style.maxHeight = "0";
      bar.style.opacity = "0";
    });

    setTimeout(() => {
      bar.remove();
    }, 320);
  });
})();

/* Navbar scroll shrink */
(function () {
  const navbar = document.querySelector(".navbar-main");

  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* Current year in footer */
(function () {
  const yearSpans = document.querySelectorAll("[data-current-year]");

  if (!yearSpans.length) return;

  const currentYear = new Date().getFullYear();

  yearSpans.forEach((span) => {
    span.textContent = currentYear;
  });
})();

/* Active navigation link based on current page */
(function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  if (!navLinks.length) return;

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
})();

/* Booking form multi-step */
(function () {
  const form = document.getElementById("bookingForm");

  if (!form) return;

  let currentStep = 1;
  const totalSteps = 3;

  const steps = form.querySelectorAll(".form-step");
  const progressDots = document.querySelectorAll(".step-dot");
  const stepLabel = document.getElementById("stepLabel");

  const stepTitles = [
    "Step 1 of 3: Event Details",
    "Step 2 of 3: Venue & Logistics",
    "Step 3 of 3: Technical Support & Confirmation"
  ];

  const showStep = (stepNumber) => {
    steps.forEach((step, index) => {
      step.style.display = index + 1 === stepNumber ? "block" : "none";
    });

    progressDots.forEach((dot, index) => {
      dot.classList.toggle("active", index + 1 === stepNumber);
      dot.classList.toggle("done", index + 1 < stepNumber);
    });

    if (stepLabel) {
      stepLabel.textContent = stepTitles[stepNumber - 1];
    }

    window.scrollTo({
      top: form.offsetTop - 140,
      behavior: "smooth"
    });
  };

  const validateCurrentStep = () => {
    const currentStepElement = steps[currentStep - 1];
    const requiredFields = currentStepElement.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.checkValidity()) {
        isValid = false;
        field.classList.add("is-invalid");
      } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
      }
    });

    return isValid;
  };

  form.querySelectorAll("[data-next-step]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!validateCurrentStep()) {
        form.classList.add("was-validated");
        return;
      }

      if (currentStep < totalSteps) {
        currentStep += 1;
        showStep(currentStep);
      }
    });
  });

  form.querySelectorAll("[data-prev-step]").forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep -= 1;
        showStep(currentStep);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateCurrentStep() || !form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const confirmation = document.getElementById("bookingConfirmation");
    const venue = document.getElementById("requestedVenue");
    const confirmVenue = document.querySelector("[data-confirm-venue]");

    if (confirmation) {
      confirmation.classList.remove("d-none");
    }

    if (venue && confirmVenue) {
      confirmVenue.textContent = venue.value || "pending review";
    }

    form.reset();
    form.classList.remove("was-validated");

    form.querySelectorAll(".is-valid, .is-invalid").forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
    });

    currentStep = 1;
    showStep(currentStep);
  });

  showStep(currentStep);
})();

/* SCROLL TO TOP */
(function () {

  const scrollBtn = document.getElementById("scrollTopBtn");

  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }

  });

  scrollBtn.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

})();