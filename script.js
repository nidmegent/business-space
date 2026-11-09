
document.addEventListener("DOMContentLoaded", () => {
  // LOADER
  const loader = document.getElementById("loader");

  const hideLoader = () => {
    setTimeout(() => {
      loader?.classList.add("is-hidden");
    }, 500);
  };

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, { once: true });
  }

  // YEAR
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // HEADER
  const header = document.getElementById("header");

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", updateHeader);
  updateHeader();

  // MOBILE MENU
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  const closeMenu = () => {
    menuToggle?.classList.remove("active");
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open");

    menuToggle.classList.toggle("active", Boolean(isOpen));
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // REVEAL ANIMATION
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // FAQ
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });

  // HERO VIDEO
  const heroVideo = document.querySelector(".hero-video");

  if (heroVideo) {
    const playVideo = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        heroVideo.pause();
        return;
      }

      const playPromise = heroVideo.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // ブラウザが自動再生を許可しない場合は静止表示
        });
      }
    };

    playVideo();
  }
});
