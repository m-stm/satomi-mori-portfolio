document.addEventListener("DOMContentLoaded", () => {
  const loadMoreBtn = document.getElementById("load-more-btn");
  const worksGrid = document.querySelector(".works-grid");

  if (loadMoreBtn && worksGrid) {
    loadMoreBtn.addEventListener("click", () => {
      const hiddenCards = worksGrid.querySelectorAll(".work-card.hidden");
      const isHidden = hiddenCards.length > 0;

      if (isHidden) {
        // 【開く動作】
        hiddenCards.forEach((card) => {
          card.classList.remove("hidden");
          card.classList.add("shown-temporarily");
        });
        loadMoreBtn.textContent = "Close";
      } else {
        // 【閉じる動作】
        const shownCards = worksGrid.querySelectorAll(
          ".work-card.shown-temporarily",
        );
        shownCards.forEach((card) => {
          card.classList.add("hidden");
          card.classList.remove("shown-temporarily");
        });
        loadMoreBtn.textContent = "View More";
        loadMoreBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
});
