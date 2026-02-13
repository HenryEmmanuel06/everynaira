(() => {
  const modalOverlay = document.getElementById('waitlistModal');
  const openButtons = document.querySelectorAll('.hero_btn');

  const backToTop = document.getElementById('backToTop');
  const toggleBackToTop = () => {
    if (!backToTop) return;
    const shouldShow = (window.scrollY || window.pageYOffset || 0) > 250;
    if (shouldShow) backToTop.classList.add('is-visible');
    else backToTop.classList.remove('is-visible');
  };

  if (!modalOverlay || openButtons.length === 0) return;

  const modalCard = modalOverlay.querySelector('.modal_card');
  const closeButton = modalOverlay.querySelector('.modal_close');

  let lastActiveElement = null;
  let savedScrollY = 0;
  let savedBodyPaddingRight = '';

  const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

  const lockScroll = () => {
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    savedBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.classList.add('modal_open');
  };

  const unlockScroll = () => {
    document.body.classList.remove('modal_open');
    document.body.style.paddingRight = savedBodyPaddingRight;
    window.scrollTo(0, savedScrollY);
  };

  const openModal = () => {
    lastActiveElement = document.activeElement;
    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    lockScroll();

    if (modalCard) {
      modalCard.scrollTop = 0;
      modalCard.setAttribute('tabindex', '-1');
      modalCard.focus({ preventScroll: true });
    }
  };

  const closeModal = () => {
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    unlockScroll();

    toggleBackToTop();

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus({ preventScroll: true });
    }
  };

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
      closeModal();
    }
  });

  if (backToTop) {
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
