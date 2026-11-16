document.addEventListener('DOMContentLoaded', () => {
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast--success' : 'toast--info'}`;

    toast.innerHTML = `
      <span class="toast-dot" aria-hidden="true"></span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });

    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  }

  // Theme toggle with warm light mode as default aesthetic
  const themeToggleBtn = document.getElementById('themeToggle');
  const rootHtml = document.documentElement;

  const savedTheme = localStorage.getItem('flipplay-theme');
  if (savedTheme === 'dark') {
    rootHtml.classList.add('dark');
  } else {
    rootHtml.classList.remove('dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = rootHtml.classList.toggle('dark');
    localStorage.setItem('flipplay-theme', isDark ? 'dark' : 'light');
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) themeColorMeta.content = isDark ? '#101319' : '#f4f0e6';
    showToast(isDark ? 'Mode gelap aktif' : 'Mode terang aktif', 'info');
  });

  // Mobile navigation menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(isOpen) {
    const willOpen = typeof isOpen === 'boolean' ? isOpen : mobileMenu.classList.contains('hidden');
    if (willOpen) {
      mobileMenu.classList.remove('hidden');
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      toggleMobileMenu(false);
      mobileMenuBtn.focus();
    }
  });

  // Hero CTAs
  const btnHeroPlay = document.getElementById('btnHeroPlay');
  const btnHeroMyList = document.getElementById('btnHeroMyList');
  const heroListIcon = document.getElementById('heroListIcon');
  const heroListText = document.getElementById('heroListText');
  let isInMyList = false;

  btnHeroPlay.addEventListener('click', () => {
    const item = catalogItemsData.find(i => i.id === 'item-1') || catalogItemsData[0];
    if (item) openModalWithData(item);
  });

  btnHeroMyList.addEventListener('click', () => {
    isInMyList = !isInMyList;
    btnHeroMyList.setAttribute('aria-pressed', String(isInMyList));
    if (isInMyList) {
      heroListIcon.textContent = '✓';
      heroListText.textContent = 'Tersimpan';
      btnHeroMyList.classList.add('is-saved');
      showToast('"Starlight Horizon" ditambahkan ke daftar');
    } else {
      heroListIcon.textContent = '+';
      heroListText.textContent = 'Daftar saya';
      btnHeroMyList.classList.remove('is-saved');
      showToast('"Starlight Horizon" dihapus dari daftar');
    }
  });

  // Hero player preview switcher
  const heroTabVideo = document.getElementById('heroTabVideo');
  const heroTabReader = document.getElementById('heroTabReader');
  const heroVideoView = document.getElementById('heroVideoView');
  const heroReaderView = document.getElementById('heroReaderView');
  const triggerSwitchToReader = document.getElementById('triggerSwitchToReader');
  const triggerSwitchToVideo = document.getElementById('triggerSwitchToVideo');

  function switchToVideoMode() {
    heroTabVideo.setAttribute('aria-selected', 'true');
    heroTabReader.setAttribute('aria-selected', 'false');
    heroVideoView.classList.remove('hidden');
    heroReaderView.classList.add('hidden');
  }

  function switchToReaderMode() {
    heroTabReader.setAttribute('aria-selected', 'true');
    heroTabVideo.setAttribute('aria-selected', 'false');
    heroReaderView.classList.remove('hidden');
    heroVideoView.classList.add('hidden');
  }

  heroTabVideo.addEventListener('click', switchToVideoMode);
  heroTabReader.addEventListener('click', switchToReaderMode);
  if (triggerSwitchToReader) triggerSwitchToReader.addEventListener('click', switchToReaderMode);
  if (triggerSwitchToVideo) triggerSwitchToVideo.addEventListener('click', switchToVideoMode);

  // Content detail modal setup
  const contentModal = document.getElementById('contentModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCloseModalBottom = document.getElementById('btnCloseModalBottom');
  const btnModalPlay = document.getElementById('btnModalPlay');

  const modalTitle = document.getElementById('modalTitle');
  const modalTypeBadge = document.getElementById('modalTypeBadge');
  const modalGenre = document.getElementById('modalGenre');
  const modalDesc = document.getElementById('modalDesc');
  const modalRating = document.getElementById('modalRating');
  const modalFormat = document.getElementById('modalFormat');

  function openModalWithData(item) {
    modalTitle.textContent = item.title;
    modalTypeBadge.textContent = item.typeDetail || item.categoryLabel;
    modalGenre.textContent = 'Genre: ' + (item.genres || 'Umum');
    modalDesc.textContent = item.fullDesc || item.shortDesc;
    modalRating.textContent = `${item.rating} / 5.0 (data contoh)`;
    modalFormat.textContent = item.formatDetail || item.formatAvailability;

    modalTypeBadge.className = 'tag tag--accent mb-2';
    if (btnModalPlay) {
      const isReading = (item.category === 'manga' || item.category === 'novel' || (item.type && item.type.toLowerCase().includes('reader')));
      btnModalPlay.textContent = isReading ? 'Buka e-reader' : 'Putar video';
      btnModalPlay.className = 'btn btn-primary btn-sm';
    }

    contentModal.showModal();
  }

  function closeModal() {
    contentModal.close();
  }

  btnCloseModal.addEventListener('click', closeModal);
  btnCloseModalBottom.addEventListener('click', closeModal);
  if (btnModalPlay) {
    btnModalPlay.addEventListener('click', () => {
      closeModal();
      showToast(`Memulai konten: ${modalTitle.textContent}`);
    });
  }

  contentModal.addEventListener('click', (e) => {
    const dialogDimensions = contentModal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });

  // Carousel horizontal scroll navigation
  const catalogCarousel = document.getElementById('catalogCarousel');
  const carouselPrevBtn = document.getElementById('carouselPrevBtn');
  const carouselNextBtn = document.getElementById('carouselNextBtn');

  if (carouselPrevBtn && catalogCarousel) {
    carouselPrevBtn.addEventListener('click', () => {
      catalogCarousel.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

  if (carouselNextBtn && catalogCarousel) {
    carouselNextBtn.addEventListener('click', () => {
      catalogCarousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Catalog carousel poster renderer
  let catalogItemsData = [];

  function renderCarousel(items) {
    if (!catalogCarousel) return;
    catalogCarousel.innerHTML = '';

    if (!items || items.length === 0) {
      catalogCarousel.innerHTML = `
            <div class="w-full py-10 text-center">
              <p class="text-sm font-semibold" style="color: var(--muted)">Tidak ada judul untuk kategori ini.</p>
            </div>
          `;
      return;
    }

    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'catalog-card';

      card.innerHTML = `
            <figure class="catalog-poster">
              <img src="${item.poster}" alt="Poster ${item.title}" width="360" height="480" loading="lazy">
              <figcaption class="sr-only">Poster ${item.title}</figcaption>

              <div class="catalog-tags">
                <span class="tag tag--accent">${item.categoryLabel}</span>
                <span class="tag tag--dark">${item.statusBadge}</span>
              </div>

              <div class="catalog-hover">
                <button type="button" class="carousel-view-btn btn btn-primary btn-sm">
                  Lihat cerita
                </button>
              </div>
            </figure>

            <div class="catalog-body">
              <div class="catalog-meta">
                <span>${item.year || '2024'}</span>
                <span>${item.formatAvailability}</span>
              </div>
              <h3 class="catalog-title">${item.title}</h3>
              <p class="catalog-genre">${item.genres}</p>
              <p class="catalog-desc">${item.shortDesc}</p>
              <div class="catalog-foot">
                <span>${item.categoryLabel}</span>
                <button type="button" class="carousel-detail-link link-underline">Detail cerita</button>
              </div>
            </div>
          `;

      const viewBtn = card.querySelector('.carousel-view-btn');
      const detailLink = card.querySelector('.carousel-detail-link');
      const triggerDetail = () => openModalWithData(item);
      if (viewBtn) viewBtn.addEventListener('click', triggerDetail);
      if (detailLink) detailLink.addEventListener('click', triggerDetail);

      catalogCarousel.appendChild(card);
    });
  }

  // Category filter handler
  function setupCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');

        filterButtons.forEach(btn => btn.classList.remove('is-active'));
        button.classList.add('is-active');

        if (filterValue === 'all') {
          renderCarousel(catalogItemsData);
        } else {
          const filtered = catalogItemsData.filter(item => item.category === filterValue);
          renderCarousel(filtered);
        }
      });
    });
  }

  // Spotlight action handler matching referensi.jpg
  const btnSpotlightWatch = document.getElementById('btnSpotlightWatch');
  if (btnSpotlightWatch) {
    btnSpotlightWatch.addEventListener('click', () => {
      const chainsawItem = catalogItemsData.find(i => (i.title || '').toLowerCase().includes('chainsaw')) || {
        id: 'spotlight-chainsaw',
        title: 'Chainsaw Man',
        categoryLabel: 'Anime',
        typeDetail: 'Anime TV Series (MAPPA)',
        genres: 'Action, Adventure, Supernatural',
        shortDesc: 'Denji hidup dalam kemiskinan ekstrem dan berburu iblis bersama anjing iblis Pochita.',
        fullDesc: 'Denji hidup dalam kemiskinan ekstrem dan berburu iblis bersama anjing iblis Pochita. Setelah dikhianati dan dibunuh oleh sindikat yakuza, Pochita menyatu dengan jantung Denji, membangkitkannya kembali sebagai manusia gergaji mesin dalam pertempuran takdir supranatural.',
        rating: '8.6',
        formatDetail: 'Video Streaming 1080p + Manga Digital',
        formatAvailability: 'Tersedia Video + Manga'
      };
      openModalWithData(chainsawItem);
      showToast('Membuka sorotan: Chainsaw Man', 'info');
    });
  }

  // 9. LOAD JSON DATA ASYNCHRONOUSLY
  async function loadAllData() {
    try {
      let response = await fetch('./data/catalog.json');
      if (!response.ok) response = await fetch('./data.json');
      if (response.ok) {
        const jsonData = await response.json();
        catalogItemsData = jsonData.catalog || [];
        renderCarousel(catalogItemsData);
        setupCategoryFilter();
      } else {
        throw new Error('Gagal membaca JSON');
      }
    } catch (err) {
      console.warn('Menggunakan data cadangan offline:', err);
      // Fallback robust data
      const fallbackData = {
        continueWatching: [
          {
            id: "cw-1",
            title: "Starlight Horizon",
            subtitle: "Musim 1: Episode 12 - Menembus Gerbang",
            type: "Video Streaming",
            typeBadge: "Anime",
            progress: 68,
            progressLabel: "16:20 / 24:00",
            thumbnail: "./images/starlight-horizon.jpg",
            nextAction: "Putar Lanjutan"
          },
          {
            id: "cw-2",
            title: "Blade of Northern Wind",
            subtitle: "Bab 45: Tebasan Menembus Badai",
            type: "Digital Reader",
            typeBadge: "Manga",
            progress: 82,
            progressLabel: "Halaman 26 / 32",
            thumbnail: "./images/blade-northern-wind.jpg",
            nextAction: "Lanjut Membaca"
          },
          {
            id: "cw-3",
            title: "Ghost Doctor",
            subtitle: "Episode 6: Secangkir Kopi Kenangan",
            type: "Video Streaming",
            typeBadge: "Drama",
            progress: 45,
            progressLabel: "28:10 / 62:00",
            thumbnail: "./images/web.1.jpg",
            nextAction: "Putar Lanjutan"
          },
          {
            id: "cw-4",
            title: "The Alchemist of White Moon",
            subtitle: "Volume 2: Bab 4 - Formula Rahasia",
            type: "Digital Reader",
            typeBadge: "Novel",
            progress: 30,
            progressLabel: "Bab 4 / 14",
            thumbnail: "./images/alchemist-white-moon.jpg",
            nextAction: "Lanjut Membaca"
          }
        ],
        catalog: [
          {
            id: "item-1",
            title: "Starlight Horizon",
            year: "2024",
            category: "anime",
            categoryLabel: "Anime",
            statusBadge: "24 Episode",
            rating: "4.9",
            genres: "Sci-Fi, Mecha, Adventure",
            shortDesc: "Petualangan kru kapal penjelajah menembus gerbang antarbintang demi memecahkan misteri sinyal peradaban kuno.",
            fullDesc: "Di masa ketika umat manusia telah mendiami koloni tata surya luar, sebuah suar sinyal misterius aktif dari balik sabuk Kuiper. Kapten Ren dan krunya ditugaskan menyelidiki sinyal tersebut.",
            formatAvailability: "Video + Manga",
            poster: "./images/starlight-horizon.jpg"
          },
          {
            id: "item-2",
            title: "Ghost Doctor",
            year: "2024",
            category: "drama",
            categoryLabel: "Drama Asia",
            statusBadge: "16 Episode",
            rating: "4.8",
            genres: "Romance, Slice of Life, Mystery",
            shortDesc: "Sebuah kafe kecil yang hanya buka di tengah malam menjadi tempat bertemunya kisah cinta, kenangan, dan takdir.",
            fullDesc: "Di sudut gang kota Seoul yang tenang, ada sebuah kafe misterius yang hanya menerima tamu tepat tengah malam.",
            formatAvailability: "Drama + Web Novel",
            poster: "./images/web.1.jpg"
          },
          {
            id: "item-3",
            title: "Blade of Northern Wind",
            year: "2023",
            category: "manga",
            categoryLabel: "Manga Digital",
            statusBadge: "Bab 118 Update",
            rating: "4.9",
            genres: "Action, Fantasy, Martial Arts",
            shortDesc: "Pendekar muda pengembara salju harus bangkit mempertahankan jurus pedang angin dari serbuan klan bayangan.",
            fullDesc: "Ditempa di puncak gunung bersalju abadi, Yuto mewarisi pedang legendaris yang mampu mengendalikan badai kutub.",
            formatAvailability: "Full Color & Dub",
            poster: "./images/blade-northern-wind.jpg"
          },
          {
            id: "item-4",
            title: "The Alchemist of White Moon",
            year: "2024",
            category: "novel",
            categoryLabel: "Light Novel",
            statusBadge: "Volume 6 Rilis",
            rating: "4.7",
            genres: "Fantasy, Isekai, Magic System",
            shortDesc: "Seorang peneliti kimia yang terbangun di dunia sihir mendirikan laboratorium rahasia untuk memulihkan kerajaan.",
            fullDesc: "Menggabungkan sains modern dengan sistem mantra kuno, novel ini memanjakan pembaca yang menyukai world-building mendalam.",
            formatAvailability: "EPUB + Ilustrasi",
            poster: "./images/alchemist-white-moon.jpg"
          }
        ]
      };
      catalogItemsData = fallbackData.catalog;
      renderCarousel(catalogItemsData);
      setupCategoryFilter();
    }
  }

  loadAllData();

  // 10. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const btnSendAnother = document.getElementById('btnSendAnother');
  const successMessageDetail = document.getElementById('successMessageDetail');
  const btnSubmitContact = document.getElementById('btnSubmitContact');
  const submitLabel = document.getElementById('submitLabel');
  const submitSpinner = document.getElementById('submitSpinner');

  const inputName = document.getElementById('userFullName');
  const inputEmail = document.getElementById('userEmail');
  const selectCategory = document.getElementById('userCategory');
  const inputSubject = document.getElementById('userSubject');
  const textareaMessage = document.getElementById('userMessage');
  const checkboxConsent = document.getElementById('userConsent');

  const errorFullName = document.getElementById('errorFullName');
  const errorEmail = document.getElementById('errorEmail');
  const errorCategory = document.getElementById('errorCategory');
  const errorSubject = document.getElementById('errorSubject');
  const errorMessage = document.getElementById('errorMessage');
  const errorConsent = document.getElementById('errorConsent');

  function setFieldError(input, hasError) {
    input.classList.toggle('is-invalid', hasError);
    input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInvalid = !inputName.value.trim() || inputName.value.trim().length < 3;
    setFieldError(inputName, nameInvalid);
    errorFullName.classList.toggle('hidden', !nameInvalid);
    if (nameInvalid) isValid = false;

    const emailInvalid = !validateEmail(inputEmail.value.trim());
    setFieldError(inputEmail, emailInvalid);
    errorEmail.classList.toggle('hidden', !emailInvalid);
    if (emailInvalid) isValid = false;

    const categoryInvalid = !selectCategory.value;
    setFieldError(selectCategory, categoryInvalid);
    errorCategory.classList.toggle('hidden', !categoryInvalid);
    if (categoryInvalid) isValid = false;

    const subjectInvalid = !inputSubject.value.trim();
    setFieldError(inputSubject, subjectInvalid);
    errorSubject.classList.toggle('hidden', !subjectInvalid);
    if (subjectInvalid) isValid = false;

    const messageInvalid = !textareaMessage.value.trim() || textareaMessage.value.trim().length < 10;
    setFieldError(textareaMessage, messageInvalid);
    errorMessage.classList.toggle('hidden', !messageInvalid);
    if (messageInvalid) isValid = false;

    const consentInvalid = !checkboxConsent.checked;
    errorConsent.classList.toggle('hidden', !consentInvalid);
    if (consentInvalid) isValid = false;

    if (isValid) {
      btnSubmitContact.disabled = true;
      submitLabel.textContent = 'Mengirim Pesan...';
      submitSpinner.classList.remove('hidden');

      setTimeout(() => {
        const senderName = inputName.value.trim();
        const senderCategory = selectCategory.options[selectCategory.selectedIndex].text;

        btnSubmitContact.disabled = false;
        submitLabel.textContent = 'Kirim Pesan Sekarang';
        submitSpinner.classList.add('hidden');
        contactForm.classList.add('hidden');
        formSuccessAlert.classList.remove('hidden');

        successMessageDetail.textContent = `Terima kasih, ${senderName}. Pesan mengenai "${senderCategory}" hanya dicatat di halaman demo ini. Tidak ada data yang dikirim ke server atau tim FlipPlay.`;

        showToast('Simulasi pengiriman selesai', 'success');
        contactForm.reset();
      }, 800);
    }
  });

  btnSendAnother.addEventListener('click', () => {
    formSuccessAlert.classList.add('hidden');
    contactForm.classList.remove('hidden');
    inputName.focus();
  });

  // ============================================================
  // 11. MODUL 2 DEMO: THE VIBE GRID LOGIC (FETCH API + ES6+)
  // ============================================================

  // State Variables
  let vibeDataList = [];
  let activeAura = 'all';
  let currentSearchQuery = '';

  // DOM Elements
  const vibeGridContainer = document.getElementById('vibeGridContainer');
  const vibeLoadingState = document.getElementById('vibeLoadingState');
  const vibeErrorState = document.getElementById('vibeErrorState');
  const vibeErrorMessage = document.getElementById('vibeErrorMessage');
  const vibeEmptyState = document.getElementById('vibeEmptyState');
  const vibeRetryBtn = document.getElementById('vibeRetryBtn');
  const vibeFallbackBtn = document.getElementById('vibeFallbackBtn');
  const vibeSearchInput = document.getElementById('vibeSearchInput');
  const vibeClearSearchBtn = document.getElementById('vibeClearSearchBtn');
  const vibeResetFilterBtn = document.getElementById('vibeResetFilterBtn');
  const vibeCountStat = document.getElementById('vibeCountStat');
  const vibeScoreStat = document.getElementById('vibeScoreStat');
  const auraButtons = document.querySelectorAll('.aura-btn');

  // Vibe Detail Modal Elements
  const vibeDetailModal = document.getElementById('vibeDetailModal');
  const btnVibeModalClose = document.getElementById('btnVibeModalClose');
  const btnVibeModalCloseBottom = document.getElementById('btnVibeModalCloseBottom');
  const vibeModalTitle = document.getElementById('vibeModalTitle');
  const vibeModalJapanese = document.getElementById('vibeModalJapanese');
  const vibeModalImage = document.getElementById('vibeModalImage');
  const vibeModalType = document.getElementById('vibeModalType');
  const vibeModalAuraBadge = document.getElementById('vibeModalAuraBadge');
  const vibeModalScore = document.getElementById('vibeModalScore');
  const vibeModalEpisodes = document.getElementById('vibeModalEpisodes');
  const vibeModalStudio = document.getElementById('vibeModalStudio');
  const vibeModalStatus = document.getElementById('vibeModalStatus');
  const vibeModalYear = document.getElementById('vibeModalYear');
  const vibeModalGenres = document.getElementById('vibeModalGenres');
  const vibeModalSynopsis = document.getElementById('vibeModalSynopsis');
  const vibeModalMalLink = document.getElementById('vibeModalMalLink');

  /**
   * Fungsi Helper: Menentukan Aura dari metadata anime
   * Mendukung: High Energy, Melancholy, Binge Mode, Wholesome
   */
  function detectAuraForAnime(anime) {
    const genres = (anime.genres || []).map(g => (typeof g === 'string' ? g : g.name).toLowerCase());
    const auras = [];

    // High Energy: Action, Sports, Adventure, Shounen, Martial Arts
    if (genres.some(g => ['action', 'sports', 'adventure', 'shounen', 'martial arts'].includes(g))) {
      auras.push('high-energy');
    }

    // Melancholy: Drama, Romance, Supernatural, Slice of Life
    if (genres.some(g => ['drama', 'romance', 'supernatural', 'slice of life'].includes(g))) {
      auras.push('melancholy');
    }

    // Binge Mode: Mystery, Suspense, Sci-Fi, Psychological, Thriller, Horror, Award Winning
    if (genres.some(g => ['mystery', 'suspense', 'sci-fi', 'psychological', 'thriller', 'horror', 'award winning'].includes(g)) || (anime.score && anime.score >= 8.6)) {
      auras.push('binge-mode');
    }

    // Wholesome: Comedy, Fantasy, Gourmet, Slice of Life, Music
    if (genres.some(g => ['comedy', 'fantasy', 'gourmet', 'slice of life', 'music'].includes(g))) {
      auras.push('wholesome');
    }

    // Default aura jika belum terklasifikasi
    if (auras.length === 0) {
      auras.push('high-energy');
    }

    return auras;
  }

  function getPrimaryAuraBadgeHtml(auras) {
    if (auras.includes('high-energy')) {
      return '<span class="tag tag--accent">High Energy</span>';
    }
    if (auras.includes('melancholy')) {
      return '<span class="tag tag--teal">Melancholy</span>';
    }
    if (auras.includes('binge-mode')) {
      return '<span class="tag tag--ink">Binge Mode</span>';
    }
    return '<span class="tag tag--light-outline">Wholesome</span>';
  }

  // Curated in-memory fallback dataset for offline/local environment resilience
  const EMBEDDED_FALLBACK_DATA = [
    {
      mal_id: 5114,
      title: "Fullmetal Alchemist: Brotherhood",
      title_english: "Fullmetal Alchemist: Brotherhood",
      type: "TV",
      episodes: 64,
      score: 9.1,
      status: "Finished Airing",
      year: 2009,
      synopsis: "Dua bersaudara Edward dan Alphonse Elric menggunakan seni terlarang transmutasi manusia demi membangkitkan ibu mereka. Usaha gagal itu mengorbankan tubuh Alphonse dan sebagian anggota tubuh Edward. Keduanya berkelana mencari Batu Bertuah untuk memulihkan tubuh mereka, menyingkap konspirasi besar kekaisaran.",
      genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Drama" }, { name: "Fantasy" }],
      studios: [{ name: "Bones" }],
      images: { jpg: { large_image_url: "./images/fma-brotherhood.jpg", image_url: "./images/fma-brotherhood.jpg" } }
    },
    {
      mal_id: 52991,
      title: "Sousou no Frieren",
      title_english: "Frieren: Beyond Journey's End",
      type: "TV",
      episodes: 28,
      score: 9.32,
      status: "Finished Airing",
      year: 2023,
      synopsis: "Setelah mengalahkan Raja Iblis, kelompok pahlawan bubar. Sebagai peri dengan rentang hidup ribuan tahun, Frieren menyaksikan kematian rekan-rekannya satu demi satu karena usia tua. Dia memulai pengembaraan baru untuk memahami perasaan manusia yang selama ini luput dari perhatiannya.",
      genres: [{ name: "Adventure" }, { name: "Drama" }, { name: "Fantasy" }],
      studios: [{ name: "Madhouse" }],
      images: { jpg: { large_image_url: "./images/frieren.jpg", image_url: "./images/frieren.jpg" } }
    },
    {
      mal_id: 38000,
      title: "Kimetsu no Yaiba",
      title_english: "Demon Slayer: Kimetsu no Yaiba",
      type: "TV",
      episodes: 26,
      score: 8.48,
      status: "Finished Airing",
      year: 2019,
      synopsis: "Keluarga Tanjiro Kamado dibantai oleh iblis dan adik perempuannya, Nezuko, berubah menjadi iblis. Demi menyembuhkan adiknya dan membalas dendam, Tanjiro bergabung dengan Korps Pemburu Iblis dengan latihan pedang pernapasan air yang keras.",
      genres: [{ name: "Action" }, { name: "Fantasy" }, { name: "Supernatural" }],
      studios: [{ name: "ufotable" }],
      images: { jpg: { large_image_url: "./images/demon-slayer.jpg", image_url: "./images/demon-slayer.jpg" } }
    },
    {
      mal_id: 40748,
      title: "Jujutsu Kaisen",
      title_english: "Jujutsu Kaisen",
      type: "TV",
      episodes: 24,
      score: 8.6,
      status: "Finished Airing",
      year: 2020,
      synopsis: "Yuuji Itadori menelan jari terkutuk milik Raja Kutukan Ryoumen Sukuna demi menyelamatkan temannya. Masuk ke SMA Jujutsu Tokyo, Yuuji belajar mengendalikan energi kutukan bersama Satoru Gojo dan teman-temannya.",
      genres: [{ name: "Action" }, { name: "Fantasy" }, { name: "Supernatural" }],
      studios: [{ name: "MAPPA" }],
      images: { jpg: { large_image_url: "./images/jujutsu-kaisen.jpg", image_url: "./images/jujutsu-kaisen.jpg" } }
    },
    {
      mal_id: 32281,
      title: "Your Name",
      title_english: "Your Name",
      type: "Movie",
      episodes: 1,
      score: 8.84,
      status: "Finished Airing",
      year: 2016,
      synopsis: "Mitsuha, gadis desa pegunungan, dan Taki, anak SMA di Tokyo, mendapati tubuh mereka tertukar secara misterius di alam mimpi. Saat komet langka mendekati bumi, rahasia ruang dan waktu di antara mereka terungkap.",
      genres: [{ name: "Drama" }, { name: "Romance" }, { name: "Supernatural" }],
      studios: [{ name: "CoMix Wave Films" }],
      images: { jpg: { large_image_url: "./images/your-name.jpg", image_url: "./images/your-name.jpg" } }
    },
    {
      mal_id: 1535,
      title: "Death Note",
      title_english: "Death Note",
      type: "TV",
      episodes: 37,
      score: 8.62,
      status: "Finished Airing",
      year: 2006,
      synopsis: "Light Yagami menemukan buku catatan maut milik dewa kematian Ryuk. Siapa pun yang namanya tertulis di buku itu akan mati. Light bertekad membersihkan dunia dari penjahat di bawah julukan Kira, memicu duel kecerdasan legendaris melawan detektif jenius L.",
      genres: [{ name: "Mystery" }, { name: "Psychological" }, { name: "Supernatural" }, { name: "Suspense" }],
      studios: [{ name: "Madhouse" }],
      images: { jpg: { large_image_url: "./images/death-note.jpg", image_url: "./images/death-note.jpg" } }
    },
    {
      mal_id: 9253,
      title: "Steins;Gate",
      title_english: "Steins;Gate",
      type: "TV",
      episodes: 24,
      score: 9.07,
      status: "Finished Airing",
      year: 2011,
      synopsis: "Ilmuwan nyentrik Rintarou Okabe bersama rekan labnya tanpa sengaja mengubah microwave menjadi mesin pengirim pesan ke masa lalu. Perubahan garis waktu mengarah pada konsekuensi takdir global yang penuh kepedihan dan misteri.",
      genres: [{ name: "Drama" }, { name: "Sci-Fi" }, { name: "Suspense" }],
      studios: [{ name: "White Fox" }],
      images: { jpg: { large_image_url: "./images/steins-gate.jpg", image_url: "./images/steins-gate.jpg" } }
    },
    {
      mal_id: 50265,
      title: "Spy x Family",
      title_english: "SPY x FAMILY",
      type: "TV",
      episodes: 12,
      score: 8.49,
      status: "Finished Airing",
      year: 2022,
      synopsis: "Mata-mata ulung Twilight harus membuat keluarga palsu demi misi perdamaian dunia. Tanpa ia sadari, istri yang ia nikahi adalah pembunuh bayaran profesional, dan anak perempuan yang diadopsinya memiliki kemampuan telepati membaca pikiran.",
      genres: [{ name: "Action" }, { name: "Comedy" }],
      studios: [{ name: "WIT Studio" }, { name: "CloverWorks" }],
      images: { jpg: { large_image_url: "./images/spy-family.jpg", image_url: "./images/spy-family.jpg" } }
    },
    {
      mal_id: 48583,
      title: "Shingeki no Kyojin: The Final Season",
      title_english: "Attack on Titan Final Season",
      type: "TV",
      episodes: 16,
      score: 8.79,
      status: "Finished Airing",
      year: 2020,
      synopsis: "Setelah menyeberangi lautan dan mengetahui kebenaran dunia luar, Eren Yeager memilih jalur ekstrem demi kebebasan bangsa Eldia, memicu konflik global antara militer Marley dan Pulau Paradis.",
      genres: [{ name: "Action" }, { name: "Drama" }, { name: "Suspense" }],
      studios: [{ name: "MAPPA" }],
      images: { jpg: { large_image_url: "./images/attack-on-titan.jpg", image_url: "./images/attack-on-titan.jpg" } }
    },
    {
      mal_id: 37521,
      title: "Vinland Saga",
      title_english: "Vinland Saga",
      type: "TV",
      episodes: 24,
      score: 8.74,
      status: "Finished Airing",
      year: 2019,
      synopsis: "Thorfinn, pemuda Viking yang terobsesi membalas dendam kepada pembunuh ayahnya, Askeladd. Melalui medan perang berdarah di tanah Inggris abad pertengahan, Thorfinn perlahan belajar arti sejati dari seorang kesatria sejati dan kedamaian Vinland.",
      genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Drama" }],
      studios: [{ name: "WIT Studio" }],
      images: { jpg: { large_image_url: "./images/vinland-saga.jpg", image_url: "./images/vinland-saga.jpg" } }
    },
    {
      mal_id: 41467,
      title: "Bleach: Sennen Kessen-hen",
      title_english: "Bleach: Thousand-Year Blood War",
      type: "TV",
      episodes: 13,
      score: 8.98,
      status: "Finished Airing",
      year: 2022,
      synopsis: "Kerajaan Wandenreich di bawah pimpinan Yhwach menyatakan perang total terhadap Soul Society. Ichigo Kurosaki harus kembali ke medan tempur dengan kekuatan baru untuk mempertahankan dunia manusia dan dunia roh.",
      genres: [{ name: "Action" }, { name: "Adventure" }, { name: "Supernatural" }],
      studios: [{ name: "Pierrot" }],
      images: { jpg: { large_image_url: "./images/bleach.jpg", image_url: "./images/bleach.jpg" } }
    },
    {
      mal_id: 44511,
      title: "Chainsaw Man",
      title_english: "Chainsaw Man",
      type: "TV",
      episodes: 12,
      score: 8.47,
      status: "Finished Airing",
      year: 2022,
      synopsis: "Denji hidup dalam kemiskinan ekstrem dan berburu iblis bersama anjing iblis Pochita. Setelah dikhianati dan dibunuh oleh yakuza, Pochita menyatu dengan jantung Denji, membangkitkannya kembali sebagai manusia gergaji mesin (Chainsaw Man).",
      genres: [{ name: "Action" }, { name: "Fantasy" }, { name: "Supernatural" }],
      studios: [{ name: "MAPPA" }],
      images: { jpg: { large_image_url: "./images/chainsaw-man.jpg", image_url: "./images/chainsaw-man.jpg" } }
    }
  ];

  // Fetch provider 1: AniList GraphQL Public API (Primary, high reliability, zero rate-limit blocks)
  async function fetchFromAniList() {
    const query = 'query { Page(page: 1, perPage: 24) { media(type: ANIME, sort: POPULARITY_DESC) { id idMal title { romaji english native } coverImage { extraLarge large } averageScore genres episodes status seasonYear description siteUrl studios(isMain: true) { nodes { name } } } } }';

    const timeoutSignal = (typeof AbortSignal !== 'undefined' && AbortSignal.timeout)
      ? AbortSignal.timeout(6000)
      : undefined;

    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query }),
      signal: timeoutSignal
    });

    if (!response.ok) {
      throw new Error(`AniList HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const rawList = json && json.data && json.data.Page && json.data.Page.media ? json.data.Page.media : [];
    if (!rawList.length) {
      throw new Error('Respons AniList tidak memuat data');
    }

    return rawList.map(m => {
      const cleanDesc = m.description ? m.description.replace(/<[^>]*>?/gm, '').trim() : '';
      return {
        mal_id: m.idMal || m.id,
        title: m.title.romaji || m.title.english || 'Untitled Anime',
        title_english: m.title.english || m.title.romaji || 'Untitled Anime',
        title_japanese: m.title.native || '',
        images: {
          jpg: {
            large_image_url: m.coverImage.extraLarge || m.coverImage.large,
            image_url: m.coverImage.large
          }
        },
        score: m.averageScore ? (m.averageScore / 10).toFixed(1) : null,
        episodes: m.episodes || null,
        type: 'TV',
        genres: (m.genres || []).map(g => ({ name: g })),
        synopsis: cleanDesc || 'Sinopsis belum tersedia untuk judul ini.',
        studios: (m.studios && m.studios.nodes && m.studios.nodes.length) ? m.studios.nodes : [{ name: 'Animation Studio' }],
        status: m.status ? m.status.replace(/_/g, ' ') : 'Finished Airing',
        year: m.seasonYear || null,
        url: m.siteUrl || `https://myanimelist.net/anime/${m.idMal || m.id}`
      };
    });
  }

  // Fetch provider 2: Jikan REST API with strict timeout
  async function fetchFromJikan() {
    const timeoutSignal = (typeof AbortSignal !== 'undefined' && AbortSignal.timeout)
      ? AbortSignal.timeout(3500)
      : undefined;

    const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=24', {
      signal: timeoutSignal
    });

    if (!response.ok) {
      throw new Error(`Jikan HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const rawList = json && json.data ? json.data : [];
    if (!rawList.length) {
      throw new Error('Respons Jikan tidak memuat data');
    }

    return rawList;
  }

  // Fetch provider 3: Kitsu REST Public API
  async function fetchFromKitsu() {
    const timeoutSignal = (typeof AbortSignal !== 'undefined' && AbortSignal.timeout)
      ? AbortSignal.timeout(4000)
      : undefined;

    const response = await fetch('https://kitsu.io/api/edge/anime?page[limit]=20&sort=-userCount', {
      headers: { 'Accept': 'application/vnd.api+json' },
      signal: timeoutSignal
    });

    if (!response.ok) {
      throw new Error(`Kitsu HTTP ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    const rawData = json && json.data ? json.data : [];
    if (!rawData.length) {
      throw new Error('Respons Kitsu tidak memuat data');
    }

    return rawData.map(item => {
      const attr = item.attributes || {};
      return {
        mal_id: item.id,
        title: attr.canonicalTitle || 'Untitled Anime',
        title_english: (attr.titles && (attr.titles.en || attr.titles.en_jp)) || attr.canonicalTitle || 'Untitled Anime',
        title_japanese: (attr.titles && attr.titles.ja_jp) || '',
        images: {
          jpg: {
            large_image_url: (attr.posterImage && (attr.posterImage.large || attr.posterImage.original)) || '',
            image_url: (attr.posterImage && attr.posterImage.medium) || ''
          }
        },
        score: attr.averageRating ? (Number(attr.averageRating) / 10).toFixed(1) : null,
        episodes: attr.episodeCount || null,
        type: attr.showType ? attr.showType.toUpperCase() : 'TV',
        genres: [{ name: 'Action' }, { name: 'Adventure' }, { name: 'Drama' }],
        synopsis: attr.synopsis || 'Sinopsis belum tersedia.',
        studios: [{ name: 'Animation Studio' }],
        status: attr.status ? attr.status.replace(/_/g, ' ') : 'Finished Airing',
        year: attr.startDate ? attr.startDate.split('-')[0] : null,
        url: `https://kitsu.io/anime/${attr.slug || item.id}`
      };
    });
  }

  // Unified Fetch API pipeline with automatic cascading fallback
  async function fetchVibeData(forceOffline = false) {
    vibeLoadingState.classList.remove('hidden');
    vibeErrorState.classList.add('hidden');
    vibeEmptyState.classList.add('hidden');
    vibeGridContainer.innerHTML = '';
    vibeCountStat.textContent = 'Menghubungkan ke Public API...';

    if (forceOffline) {
      await loadVibeFallbackData(false);
      return;
    }

    let sourceName = '';

    try {
      // 1. Coba AniList GraphQL API (Kecepatan tinggi, 0 limit timeout di region lokal)
      try {
        vibeDataList = await fetchFromAniList();
        sourceName = 'AniList Public API';
      } catch (aniErr) {
        console.warn('AniList API offline/terkendala, beralih ke Jikan:', aniErr.message);

        // 2. Coba Jikan REST API (dengan timeout 3.5 detik)
        try {
          vibeDataList = await fetchFromJikan();
          sourceName = 'Jikan REST API';
        } catch (jikanErr) {
          console.warn('Jikan API offline/terkendala, beralih ke Kitsu:', jikanErr.message);

          // 3. Coba Kitsu Public REST API
          vibeDataList = await fetchFromKitsu();
          sourceName = 'Kitsu Public API';
        }
      }

      if (!vibeDataList || vibeDataList.length === 0) {
        throw new Error('Seluruh endpoint API publik tidak merespons');
      }

      vibeLoadingState.classList.add('hidden');
      showToast(`Data The Vibe Grid berhasil dimuat dari ${sourceName}`, 'success');
      filterAndRenderVibeGrid();

    } catch (networkError) {
      console.warn('Koneksi seluruh API publik tidak terjangkau, beralih ke data kurasi lokal:', networkError);
      // Otomatis beralih ke dataset lokal agar antarmuka tidak kosong
      await loadVibeFallbackData(true);
    }
  }

  // Resilient fallback dataset loader (supports both network fetch & in-memory safety net)
  async function loadVibeFallbackData(isAutoFallback = false) {
    vibeLoadingState.classList.remove('hidden');
    vibeErrorState.classList.add('hidden');
    vibeEmptyState.classList.add('hidden');

    try {
      const res = await fetch('./data/vibe_fallback.json');
      if (res.ok) {
        vibeDataList = await res.json();
      } else {
        throw new Error('Gagal memuat file fallback');
      }
    } catch {
      // Jika terjadi error CORS (misal dijalankan langsung via file:///) gunakan in-memory dataset
      vibeDataList = [...EMBEDDED_FALLBACK_DATA];
    }

    vibeLoadingState.classList.add('hidden');
    if (isAutoFallback) {
      showToast('API publik offline: The Vibe Grid beralih ke data kurasi lokal', 'info');
    } else {
      showToast('Memuat The Vibe Grid dalam mode data cadangan (Offline)', 'info');
    }
    filterAndRenderVibeGrid();
  }

  // Unified search and aura filter logic
  function filterAndRenderVibeGrid() {
    const filteredList = vibeDataList.filter(anime => {
      const title = (anime.title || '').toLowerCase();
      const titleEnglish = (anime.title_english || '').toLowerCase();
      const synopsis = (anime.synopsis || '').toLowerCase();
      const query = currentSearchQuery.toLowerCase();

      const matchesSearch = !query ||
        title.includes(query) ||
        titleEnglish.includes(query) ||
        synopsis.includes(query);

      const animeAuras = detectAuraForAnime(anime);
      const matchesAura = activeAura === 'all' || animeAuras.includes(activeAura);

      return matchesSearch && matchesAura;
    });

    if (filteredList.length > 0) {
      const totalScore = filteredList.reduce((acc, curr) => acc + (Number(curr.score) || 0), 0);
      const avgScore = (totalScore / filteredList.length).toFixed(2);
      vibeCountStat.textContent = `Menampilkan ${filteredList.length} dari ${vibeDataList.length} Judul`;
      vibeScoreStat.textContent = `Rata-rata Skor: ★ ${avgScore}`;
    } else {
      vibeCountStat.textContent = `0 Judul Ditemukan`;
      vibeScoreStat.textContent = `Rata-rata Skor: -`;
    }

    if (filteredList.length === 0) {
      vibeEmptyState.classList.remove('hidden');
      vibeGridContainer.innerHTML = '';
      return;
    } else {
      vibeEmptyState.classList.add('hidden');
    }

    const localPosterMap = {
      5114: './images/fma-brotherhood.jpg',
      52991: './images/frieren.jpg',
      38000: './images/demon-slayer.jpg',
      40748: './images/jujutsu-kaisen.jpg',
      32281: './images/your-name.jpg',
      1535: './images/death-note.jpg',
      9253: './images/steins-gate.jpg',
      50265: './images/spy-family.jpg',
      48583: './images/attack-on-titan.jpg',
      16498: './images/attack-on-titan.jpg',
      37521: './images/vinland-saga.jpg',
      41467: './images/bleach.jpg',
      44511: './images/chainsaw-man.jpg'
    };

    const cardsHtml = filteredList.map(anime => {
      const fallbackLocal = localPosterMap[anime.mal_id] || './images/starlight-horizon.jpg';
      const posterUrl = localPosterMap[anime.mal_id] || anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || fallbackLocal;
      const rawTitle = (anime.mal_id === 32281) ? 'Your Name' : (anime.title_english || anime.title || 'Judul Tidak Tersedia');
      const animeTitle = rawTitle.replace(/\.$/, '');
      const score = anime.score ? `Skor ${anime.score}` : 'Tanpa skor';
      const episodes = anime.episodes ? `${anime.episodes} ep` : 'Ongoing';
      const animeType = anime.type || 'TV';
      const genreLabels = (anime.genres || []).slice(0, 2).map(g => (typeof g === 'string' ? g : g.name)).join(', ') || 'Umum';
      const synopsisSnippet = anime.synopsis
        ? (anime.synopsis.length > 110 ? anime.synopsis.slice(0, 110) + '...' : anime.synopsis)
        : 'Sinopsis lengkap belum tersedia untuk judul ini.';
      const auras = detectAuraForAnime(anime);
      const auraBadge = getPrimaryAuraBadgeHtml(auras);

      return `
            <article class="vibe-card" data-id="${anime.mal_id}">
              <div class="vibe-poster">
                <img
                  src="${posterUrl}"
                  alt="${animeTitle}"
                  width="300"
                  height="400"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  onerror="this.src='${fallbackLocal}'"
                />
                <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(10,13,18,.82), rgba(10,13,18,.02) 58%)"></div>

                <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  <span class="tag tag--dark">${animeType} &middot; ${episodes}</span>
                </div>

                <div class="absolute top-2.5 right-2.5">
                  <span class="tag tag--accent">${score}</span>
                </div>

                <div class="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2">
                  ${auraBadge}
                  <span class="vibe-genre text-[10px] font-semibold truncate max-w-[52%]" style="color: var(--inverse-text)">
                    ${genreLabels}
                  </span>
                </div>
              </div>

              <div class="vibe-body">
                <h3 class="vibe-title" title="${animeTitle}">${animeTitle}</h3>
                <p class="vibe-desc">${synopsisSnippet}</p>
              </div>

              <div class="p-3 pt-0">
                <button
                  type="button"
                  class="btn-open-vibe-detail btn btn-secondary btn-sm w-full"
                  data-id="${anime.mal_id}"
                >
                  Lihat detail
                </button>
              </div>
            </article>
          `;
    }).join('');

    vibeGridContainer.innerHTML = cardsHtml;

    const vibeCards = vibeGridContainer.querySelectorAll('.vibe-card');
    vibeCards.forEach(card => {
      const detailBtn = card.querySelector('.btn-open-vibe-detail');
      if (detailBtn) {
        detailBtn.addEventListener('click', () => {
          openVibeDetailModal(Number(detailBtn.getAttribute('data-id')));
        });
      }
    });
  }

  function openVibeDetailModal(malId) {
    const anime = vibeDataList.find(a => Number(a.mal_id) === Number(malId));
    if (!anime) return;

    const localPosterMap = {
      5114: './images/fma-brotherhood.jpg',
      52991: './images/frieren.jpg',
      38000: './images/demon-slayer.jpg',
      40748: './images/jujutsu-kaisen.jpg',
      32281: './images/your-name.jpg',
      1535: './images/death-note.jpg',
      9253: './images/steins-gate.jpg',
      50265: './images/spy-family.jpg',
      48583: './images/attack-on-titan.jpg',
      16498: './images/attack-on-titan.jpg',
      37521: './images/vinland-saga.jpg',
      41467: './images/bleach.jpg',
      44511: './images/chainsaw-man.jpg'
    };

    const fallbackLocal = localPosterMap[anime.mal_id] || './images/starlight-horizon.jpg';
    const modalImgSrc = localPosterMap[anime.mal_id] || anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || fallbackLocal;

    const rawModalTitle = (anime.mal_id === 32281) ? 'Your Name' : (anime.title_english || anime.title || 'Judul Tidak Tersedia');
    vibeModalTitle.textContent = rawModalTitle.replace(/\.$/, '');
    vibeModalJapanese.textContent = (anime.mal_id === 32281) ? '' : (anime.title_japanese || '');
    vibeModalImage.src = modalImgSrc;
    vibeModalImage.onerror = () => { vibeModalImage.src = fallbackLocal; };
    vibeModalImage.alt = anime.title;
    vibeModalType.textContent = anime.type || 'TV';
    vibeModalScore.textContent = anime.score ? `Skor ${anime.score}` : 'Skor: -';
    vibeModalEpisodes.textContent = anime.episodes ? `${anime.episodes} Episode` : 'Masih Berjalan (Ongoing)';
    vibeModalStudio.textContent = (anime.studios && anime.studios[0]?.name) || 'Studio Belum Terdaftar';
    vibeModalStatus.textContent = anime.status || 'Finished Airing';
    vibeModalYear.textContent = anime.year ? `${anime.year}` : (anime.aired?.string || 'Tahun rilis -');
    vibeModalSynopsis.textContent = anime.synopsis || 'Sinopsis belum tersedia dari penerbit resminya.';
    vibeModalMalLink.href = anime.url || `https://myanimelist.net/anime/${malId}`;

    const auras = detectAuraForAnime(anime);
    const auraContainer = document.getElementById('vibeModalAuraBadge');
    if (auraContainer) {
      auraContainer.innerHTML = getPrimaryAuraBadgeHtml(auras);
    }

    const genresList = (anime.genres || []).map(g => {
      const name = typeof g === 'string' ? g : g.name;
      return `<span class="tag tag--outline">${name}</span>`;
    }).join('');
    vibeModalGenres.innerHTML = genresList || '<span class="text-xs" style="color: var(--muted)">Tidak ada kategori</span>';

    vibeDetailModal.showModal();
  }

  btnVibeModalClose.addEventListener('click', () => vibeDetailModal.close());
  btnVibeModalCloseBottom.addEventListener('click', () => vibeDetailModal.close());
  vibeDetailModal.addEventListener('click', (e) => {
    if (e.target === vibeDetailModal) vibeDetailModal.close();
  });

  // Unified Search input event handler
  vibeSearchInput.addEventListener('input', (e) => {
    currentSearchQuery = e.target.value.trim();
    if (currentSearchQuery.length > 0) {
      vibeClearSearchBtn.classList.remove('hidden');
    } else {
      vibeClearSearchBtn.classList.add('hidden');
    }
    filterAndRenderVibeGrid();
  });

  vibeClearSearchBtn.addEventListener('click', () => {
    vibeSearchInput.value = '';
    currentSearchQuery = '';
    vibeClearSearchBtn.classList.add('hidden');
    filterAndRenderVibeGrid();
    vibeSearchInput.focus();
  });

  // Aura discovery buttons event handler
  auraButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      auraButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      activeAura = btn.getAttribute('data-aura');
      filterAndRenderVibeGrid();
      showToast(`Menyaring Aura: ${btn.textContent.trim()}`, 'info');
    });
  });

  // Reset filter and search button
  vibeResetFilterBtn.addEventListener('click', () => {
    vibeSearchInput.value = '';
    currentSearchQuery = '';
    vibeClearSearchBtn.classList.add('hidden');
    activeAura = 'all';

    auraButtons.forEach(b => b.classList.remove('is-active'));
    const allBtn = document.querySelector('.aura-btn[data-aura="all"]');
    if (allBtn) {
      allBtn.classList.add('is-active');
    }

    filterAndRenderVibeGrid();
    showToast('Pencarian dan filter Aura telah di-reset', 'info');
  });

  vibeRetryBtn.addEventListener('click', () => fetchVibeData(false));
  vibeFallbackBtn.addEventListener('click', () => fetchVibeData(true));

  fetchVibeData(false);
});