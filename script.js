"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContentArea = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

// Page navigation

// Add event listener to common parent element
// Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  //Matching strategy, it ignores clicks that werent clicked on links
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Remove active classes and hide their elements
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContentArea.forEach((c) =>
    c.classList.remove("operations__content--active")
  );

  // Active tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

// Menu fade animation, we can play with opacity on mouseover and mouseout
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      // i can replace =opacity with =this
      if (el !== link) el.style.opacity = opacity;
    });
  }
};

// need to update this section with handleHover.bind and i need to add this siblings foreach part
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.35);
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

// Passing "argument" into handler
// nav.addEventListener("mouseover", handleHover.bind(0.35));
// nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation
const initialCords = section1.getBoundingClientRect();

window.addEventListener("scroll", function () {
  console.log(window.scrollY);

  if (this.window.scrollY > initialCords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
