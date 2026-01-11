const hero = document.querySelector(".hero-section");
const posters = document.querySelectorAll(".netflix-slider img");

posters.forEach(poster => {
  poster.addEventListener("mouseenter", () => {
    hero.style.setProperty(
      "--bg-image",
      `url('${poster.src}')`
    );
    hero.classList.add("bg-active");
  });

  poster.addEventListener("mouseleave", () => {
    hero.classList.remove("bg-active");
  });
});

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");

let currentPage = 0;
let locked = false;

function goToPage(index) {
  if (locked || index === currentPage) return;
  locked = true;

  currentPage = index;

  pages.forEach((page, i) => {
    page.classList.toggle("active", i === currentPage);
  });

  setTimeout(() => {
    locked = false;
  }, 900);
}

/* SCROLL */
/* SCROLL REMOVED - BUTTON NAV ADDED */
document.addEventListener("click", (e) => {
  const downBtn = e.target.closest(".nav-down-btn");
  const upBtn = e.target.closest(".nav-up-btn");

  if (downBtn) {
    if (currentPage < pages.length - 1) {
      goToPage(currentPage + 1);
    }
  }

  if (upBtn) {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }
});

/* NAVBAR CLICK */
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.dataset.page;
    const targetIndex = [...pages].findIndex(
      page => page.id === targetId
    );

    if (targetIndex !== -1) {
      goToPage(targetIndex);
    }
  });
});

/* POSTER CLICK → PAGE SWITCH */
posters.forEach(poster => {
  poster.addEventListener("click", () => {
    document.querySelector(".page.active")
      .classList.remove("active");

    document.getElementById("detail")
      .classList.add("active");

    window.scrollTo(0, 0);
  });
});

/* SCROLL PARALLAX */
window.addEventListener("scroll", () => {
  const x = window.scrollY * 0.05;
  document.documentElement
    .style.setProperty("--x", `${x}px`);
});

const detail = document.querySelector("#detail");

detail.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

  detail.style.transform = `
    rotateY(${x}deg)
    rotateX(${y}deg)
  `;
});

detail.addEventListener("mouseleave", () => {
  detail.style.transform = "rotateY(0deg) rotateX(0deg)";
});

document.querySelectorAll(".movie-card, .netflix-slider img").forEach(item => {
  item.addEventListener("click", () => {
    const movie = item.dataset.movie || "batman";
    openDetail(movie);
  });
});

function openDetail(movie) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("detail").classList.add("active");

  const title = document.querySelector(".detail-info h1");
  const poster = document.querySelector(".detail-poster");
  const galleryImgs = document.querySelectorAll(".detail-gallery img");

  let titleText = "The Batman";
  let posterSrc = "src/fotos/Batman.jpg";
  let galleryImages = [
    "src/fotos/Batman.jpg",
    "src/fotos/shutter-island.jpg",
    "src/fotos/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
  ];

  if (movie === "interstellar") {
    titleText = "Interstellar";
    posterSrc = "src/fotos/Interstellar-IMAX-Poster-Wallpaper-1152x720-960x600.jpg";
    galleryImages = [
      "src/fotos/Interstellar-IMAX-Poster-Wallpaper-1152x720-960x600.jpg",
      "src/fotos/shutter-island.jpg",
      "src/fotos/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
    ];
  } else if (movie === "inception") {
    titleText = "Inception";
    posterSrc = "src/fotos/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg";
    galleryImages = [
      "src/fotos/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      "src/fotos/Batman.jpg",
      "src/fotos/shutter-island.jpg"
    ];
  } else if (movie === "shutter-island") {
    titleText = "Shutter Island";
    posterSrc = "src/fotos/shutter-island.jpg";
    galleryImages = [
      "src/fotos/shutter-island.jpg",
      "src/fotos/Batman.jpg",
      "src/fotos/Interstellar-IMAX-Poster-Wallpaper-1152x720-960x600.jpg"
    ];
  }

  title.innerText = titleText;
  poster.src = posterSrc;
  galleryImgs.forEach((img, index) => {
    if (galleryImages[index]) {
      img.src = galleryImages[index];
    }
  });
}

/* Detail Close Button */
const detailCloseBtn = document.querySelector(".detail-close-btn");
if (detailCloseBtn) {
  detailCloseBtn.addEventListener("click", () => {
    document.getElementById("detail").classList.remove("active");
    goToPage(0); // Ana sayfaya geri dön
  });
}



