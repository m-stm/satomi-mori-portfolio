const trigger = document.getElementById("menu-trigger");
const sidebar = document.getElementById("nav-sidebar");
const overlay = document.getElementById("menu-overlay");
const icon = document.getElementById("menu-icon");

// 画像パス（実際のファイル名に合わせてください）
const menuIcon = "images/menu.png";

function toggleMenu() {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    icon.src = menuIcon;
  } else {
    icon.src = menuIcon;
  }
}

// ボタンクリック時
trigger.addEventListener("click", toggleMenu);

// 背景クリック時（メニューを閉じる）
overlay.addEventListener("click", toggleMenu);

// リンククリック時（メニューを閉じる）
const links = document.querySelectorAll(".nav-sidebar a");
links.forEach((link) => {
  link.addEventListener("click", toggleMenu);
});

document.addEventListener("DOMContentLoaded", () => {
  // --- データ定義（列挙型） ---
  const worksData = [
    {
      title: "イベント報告書閲覧サイト",
      image: "images/slides/eventReportPortal/event1.PNG",
      tags: ["Laravel", "React", "Mysql"],
      slides: [
        "images/slides/eventReportPortal/event1.PNG",
        "images/slides/eventReportPortal/event2.PNG",
        "images/slides/eventReportPortal/event3.PNG",
        "images/slides/eventReportPortal/event4.PNG",
        "images/slides/eventReportPortal/event5.PNG",
        "images/slides/eventReportPortal/event6.PNG",
        "images/slides/eventReportPortal/event7.PNG",
        "images/slides/eventReportPortal/event8.PNG",
      ],
    },
    {
      title: "学習レポート共有サイト",
      image: "images/slides/studyReportPortal/study1.PNG",
      tags: ["Laravel", "React", "Mysql", "GAS"],
      slides: [
        "images/slides/studyReportPortal/study1.PNG",
        "images/slides/studyReportPortal/study2.PNG",
        "images/slides/studyReportPortal/study3.PNG",
        "images/slides/studyReportPortal/study4.PNG",
        "images/slides/studyReportPortal/study5.PNG",
        "images/slides/studyReportPortal/study6.PNG",
        "images/slides/studyReportPortal/study7.PNG",
        "images/slides/studyReportPortal/study8.PNG",
      ],
    },
    {
      title: "オフィス紹介サイト",
      image: "images/slides/officeIntroduction/office1.PNG",
      tags: ["WordPress", "PHP", "HTML", "CSS"],
      slides: [
        "images/slides/officeIntroduction/office1.PNG",
        "images/slides/officeIntroduction/office2.PNG",
        "images/slides/officeIntroduction/office3.PNG",
        "images/slides/officeIntroduction/office4.PNG",
        "images/slides/officeIntroduction/office5.PNG",
        "images/slides/officeIntroduction/office6.PNG",
      ],
    },
    {
      title: "服薬管理アプリ『MediTap』",
      image: "images/slides/drugTakingManagementApp/drug1.PNG",
      tags: ["AppSheet"],
      slides: [
        "images/slides/drugTakingManagementApp/drug1.PNG",
        "images/slides/drugTakingManagementApp/drug2.PNG",
        "images/slides/drugTakingManagementApp/drug3.PNG",
        "images/slides/drugTakingManagementApp/drug4.PNG",
        "images/slides/drugTakingManagementApp/drug5.PNG",
        "images/slides/drugTakingManagementApp/drug6.PNG",
        "images/slides/drugTakingManagementApp/drug7.PNG",
      ],
    },
    {
      title: "議事録テンプレート自動作成ツール",
      image: "images/slides/meetingMinutesTool/meeting1.PNG",
      tags: ["Bat", "コマンド"],
      slides: [
        "images/slides/meetingMinutesTool/meeting1.PNG",
        "images/slides/meetingMinutesTool/meeting2.PNG",
        "images/slides/meetingMinutesTool/meeting3.PNG",
        "images/slides/meetingMinutesTool/meeting4.PNG",
        "images/slides/meetingMinutesTool/meeting5.PNG",
        "images/slides/meetingMinutesTool/meeting6.PNG",
      ],
    },
    {
      title: "ファイル統合ツール『OrderlyMerge』",
      image: "images/slides/OrderlyMerge/merge1.PNG",
      tags: ["Excel", "VBA"],
      slides: [
        "images/slides/OrderlyMerge/merge1.PNG",
        "images/slides/OrderlyMerge/merge2.PNG",
        "images/slides/OrderlyMerge/merge3.PNG",
        "images/slides/OrderlyMerge/merge4.PNG",
        "images/slides/OrderlyMerge/merge5.PNG",
        "images/slides/OrderlyMerge/merge6.PNG",
        "images/slides/OrderlyMerge/merge7.PNG",
      ],
    },
  ];
  // ========================================================
  // 【Webデザイン】データ定義
  // ========================================================
  const designWorksData = [
    {
      id: 1,
      title: "学習レポート共有サイト：サイトオープンのご案内",
      thumbImage: "images/webFlyer/studyReportPortal-new-release.jpg",
      fullImage: "images/webFlyer/studyReportPortal-new-release.jpg",
      target: "就労移行支援事業所の利用者さん",
      point:
        "配色を工夫し、学習がテーマのサイトの為、知的印象の「グリーン」をベースカラーに採用。<br/>利用メリットはポジティブな気持ちを促す「落ちついたピンク」をベースカラーに採用。具体的な利用場面は穏やかな「優しいブルー」をベースカラーに採用しました。<br/>全体的に統一感を残すために色のトーンが同程度になるように調整しました。",
      layout:
        "使用ハードルを下げるため、3ステップの利用方法を中央上にイラストと配置。<br/>その後具体的な試用場面に想像を促すような導線でメリットと掲載内容案をコンテンツとして配置しました。",
    },
  ];

  const worksGrid = document.getElementById("works-grid");
  const loadMoreBtn = document.getElementById("load-more-btn");
  let currentSlideIdx = 0;
  let activeWorkSlides = [];

  // --- カードの動的生成 ---
  if (worksGrid) {
    worksData.forEach((work, index) => {
      const card = document.createElement("div");
      card.className = "work-card";
      // 3枚目以降（index 2より後ろ）は初期状態で隠す
      if (index > 2) card.classList.add("hidden");

      // カードデザインHTML
      card.innerHTML = `
        <img src="${work.image}" alt="${work.title}" class="work-photo" />
        <div class="work-info">
          <h3 class="work-title">${work.title}</h3>
          <div class="work-tags">
            ${work.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      `;

      // カードクリックでモーダルを開く
      card.addEventListener("click", () => openModal(index));
      worksGrid.appendChild(card);
    });
  }

  // --- View More / Close ロジック ---
  if (loadMoreBtn && worksGrid) {
    loadMoreBtn.addEventListener("click", () => {
      const hiddenCards = worksGrid.querySelectorAll(".work-card.hidden");
      const isHidden = hiddenCards.length > 0;

      if (isHidden) {
        // 開く動作
        hiddenCards.forEach((card) => {
          card.classList.remove("hidden");
          card.classList.add("shown-temporarily");
        });
        loadMoreBtn.textContent = "Close";
      } else {
        // 閉じる動作
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

  // --- モーダル制御ロジック ---
  const modal = document.getElementById("work-modal");
  const modalImg = document.getElementById("current-slide");
  const modalDesc = document.getElementById("modal-description");

  function openModal(index) {
    const data = worksData[index];
    activeWorkSlides = data.slides;
    currentSlideIdx = 0;

    modalDesc.innerHTML = `<h3>${data.title}</h3>`;
    updateSlide();

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function updateSlide() {
    modalImg.src = activeWorkSlides[currentSlideIdx];
    document.getElementById("slide-num").textContent = currentSlideIdx + 1;
    document.getElementById("slide-total").textContent =
      activeWorkSlides.length;
  }

  // モーダル内のボタンイベント（ページを次へ、ページを戻る）
  document.getElementById("next-btn").onclick = () => {
    currentSlideIdx = (currentSlideIdx + 1) % activeWorkSlides.length;
    updateSlide();
  };
  document.getElementById("prev-btn").onclick = () => {
    currentSlideIdx =
      (currentSlideIdx - 1 + activeWorkSlides.length) % activeWorkSlides.length;
    updateSlide();
  };

  // 閉じる処理
  const closeBtn = document.querySelector(".close-btn");
  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };
  if (closeBtn) closeBtn.onclick = closeModal;
  window.onclick = (e) => {
    if (e.target == modal) closeModal();
  };
  // ========================================================
  // 【Webチラシ】プレビュー拡大モーダル表示
  // ========================================================
  const designGallery = document.getElementById("design-gallery");
  const designModalContainer = document.getElementById(
    "design-modal-container",
  );
  const flyerMoreBtn = document.getElementById("flyer-more-btn");

  if (designGallery && designModalContainer) {
    let galleryHtml = "";
    let modalHtml = "";

    designWorksData.forEach((work, index) => {
      const isHiddenClass = index >= 2 ? "is-hidden" : "";

      // webチラシカード
      galleryHtml += `
      <div class="flyer-card ${isHiddenClass}">
        <div class="flyer-card-media">
          <div class="flyer-thumb-box">
            <img src="${work.thumbImage}" alt="${work.title}" class="flyer-thumb">
          </div>
          <button type="button" class="btn-card-zoom" onclick="openFlyerModal('${work.id}')">
            🔍 拡大表示
          </button>
        </div>

        <div class="flyer-card-content">
          <h4 class="flyer-title">${work.title}</h4>
          <dl class="flyer-info-list">
            <div class="info-item">
              <dt>🎯 ターゲット</dt>
              <dd>${work.target}</dd>
            </div>
            <div class="info-item">
              <dt>🎨 デザインの工夫</dt>
              <dd>${work.point}</dd>
            </div>
            <div class="info-item">
              <dt>📐 構成の意図</dt>
              <dd>${work.layout}</dd>
            </div>
          </dl>
        </div>
      </div>
    `;

      // 拡大表示されるモーダル
      modalHtml += `
      <div id="flyer-modal-${work.id}" class="flyer-modal-overlay" onclick="closeFlyerModalOnBg(event, '${work.id}')">
        <div class="flyer-modal-container">
          <button type="button" class="flyer-modal-close" onclick="closeFlyerModal('${work.id}')" aria-label="閉じる">&times;</button>
          <div class="flyer-modal-scroll-area">
            <img src="${work.fullImage}" alt="${work.title}：拡大" class="flyer-modal-img">
          </div>
        </div>
      </div>
    `;
    });

    designGallery.innerHTML = galleryHtml;
    designModalContainer.innerHTML = modalHtml;

    if (designWorksData.length <= 2 && flyerMoreBtn) {
      flyerMoreBtn.style.display = "none";
    }

    // View More 開閉処理
    if (flyerMoreBtn) {
      flyerMoreBtn.addEventListener("click", () => {
        const isExpanded = flyerMoreBtn.classList.contains("is-expanded");

        if (!isExpanded) {
          const hiddenCards = designGallery.querySelectorAll(
            ".flyer-card.is-hidden",
          );
          hiddenCards.forEach((card) => {
            card.classList.remove("is-hidden");
            card.classList.add("is-visible");
          });
          flyerMoreBtn.classList.add("is-expanded");
          flyerMoreBtn.textContent = "Close";
        } else {
          const allCards = designGallery.querySelectorAll(".flyer-card");
          allCards.forEach((card, index) => {
            if (index >= 2) {
              card.classList.add("is-hidden");
              card.classList.remove("is-visible");
            }
          });
          flyerMoreBtn.classList.remove("is-expanded");
          flyerMoreBtn.textContent = "View More";

          designGallery.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }

  // ------------------------------------------------------
  // モーダル開閉制御
  // ------------------------------------------------------
  window.openFlyerModal = function (id) {
    const modal = document.getElementById(`flyer-modal-${id}`);
    if (modal) {
      modal.classList.add("is-active");
      document.body.style.overflow = "hidden"; // 背面のスクロール固定
    }
  };

  window.closeFlyerModal = function (id) {
    const modal = document.getElementById(`flyer-modal-${id}`);
    if (modal) {
      modal.classList.remove("is-active");
      document.body.style.overflow = ""; // スクロール固定解除
    }
  };

  window.closeFlyerModalOnBg = function (event, id) {
    if (event.target.classList.contains("flyer-modal-overlay")) {
      closeFlyerModal(id);
    }
  };
});
