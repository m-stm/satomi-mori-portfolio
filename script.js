document.addEventListener("DOMContentLoaded", () => {
  // --- データ定義（列挙型） ---
  const worksData = [
    {
      title: "イベント報告書閲覧サイト",
      image: "images/sample_eventReportPortal.png",
      tags: ["Laravel", "React", "Mysql"],
      slides: [
        "images/slides/eventReportPortal/event1.PNG",
        "images/slides/eventReportPortal/event2.PNG",
        "images/slides/eventReportPortal/event3.PNG",
        "images/slides/eventReportPortal/event4.PNG",
        "images/slides/eventReportPortal/event5.PNG",
        "images/slides/eventReportPortal/event6.PNG",
        "images/slides/eventReportPortal/event7.PNG",
      ],
    },
    {
      title: "学習レポート共有サイト",
      image: "images/sample_studyReportPortal.png",
      tags: ["Laravel", "React", "Mysql"],
      slides: [
        "images/slides/studyReportPortal/study1.PNG",
        "images/slides/studyReportPortal/study2.PNG",
        "images/slides/studyReportPortal/study3.PNG",
        "images/slides/studyReportPortal/study4.PNG",
        "images/slides/studyReportPortal/study5.PNG",
        "images/slides/studyReportPortal/study6.PNG",
        "images/slides/studyReportPortal/study7.PNG",
      ],
    },
    {
      title: "予定表自動更新ツール",
      image: "images/work2.jpg",
      tags: ["Excel", "VBA"],
      slides: ["images/slides/vba1-1.png", "images/slides/vba1-2.png"],
    },
    {
      title: "ファイル統合ツール",
      image: "images/work3.jpg",
      tags: ["Excel", "VBA"],
      slides: ["images/slides/vba2-1.png"],
    },
    {
      title: "議事録テンプレート作成ツール",
      image: "images/work4.jpg",
      tags: ["Bat"],
      slides: ["images/slides/bat1.png"],
    },
  ];

  const worksGrid = document.getElementById("works-grid");
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
