// Fullscreen functionality
function toggleFullscreen() {
  const container = document.querySelector(".game-frame-container");

  if (!document.fullscreenElement) {
    container.requestFullscreen().catch((err) => {
      console.log("Fullscreen error:", err);
    });
    container.classList.add("fullscreen");
  } else {
    document.exitFullscreen();
    container.classList.remove("fullscreen");
  }
}

// Star rating functionality
function initRating() {
  const stars = document.querySelectorAll(".star");
  let currentRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      currentRating = index + 1;
      updateStars(currentRating);
      saveRating(currentRating);
    });

    star.addEventListener("mouseenter", () => {
      highlightStars(index + 1);
    });

    star.addEventListener("mouseleave", () => {
      updateStars(currentRating);
    });
  });

  // Load saved rating
  const savedRating = localStorage.getRating();
  if (savedRating > 0) {
    currentRating = savedRating;
    updateStars(currentRating);
  }
}

function highlightStars(rating) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < rating);
  });
}

function updateStars(rating) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.classList.toggle("active", index < rating);
  });
}

function saveRating(rating) {
  const gameId =
    window.location.pathname.split("/").pop().replace(".html", "") || "index";
  localStorage.setItem("rating_" + gameId, rating);
}

// Extend localStorage for rating
localStorage.getRating = function () {
  const gameId =
    window.location.pathname.split("/").pop().replace(".html", "") || "index";
  return parseInt(localStorage.getItem("rating_" + gameId)) || 0;
};

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initRating();

  // Fullscreen button
  const fullscreenBtn = document.querySelector(".fullscreen-btn");
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", toggleFullscreen);
  }

  // Keyboard shortcut for fullscreen (F key)
  document.addEventListener("keydown", (e) => {
    if (e.key === "f" || e.key === "F") {
      if (!e.target.matches("input, textarea")) {
        toggleFullscreen();
      }
    }
  });

  // Exit fullscreen on Escape
  document.addEventListener("fullscreenchange", () => {
    const container = document.querySelector(".game-frame-container");
    if (!document.fullscreenElement && container) {
      container.classList.remove("fullscreen");
    }
  });
});

// Load game iframe on poster click
function loadGame(url) {
  const container = document.getElementById('game-container');
  if (container) {
    container.innerHTML = `<iframe class="game-frame" src="${url}" allowfullscreen allow="fullscreen; autoplay"></iframe>`;
  }
}
