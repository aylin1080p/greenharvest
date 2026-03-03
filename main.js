const initMenu = () => {
  const header = document.getElementById('gh-header');
  const openBtn = document.getElementById('gh-menu-open');
  const closeTabletBtn = document.getElementById('gh-menu-close-tablet');
  const closeMobileBtn = document.getElementById('gh-menu-close-mobile');
  const backdrop = document.getElementById('gh-backdrop');
  const tabletMenu = document.getElementById('gh-menu-tablet');
  const mobileMenu = document.getElementById('gh-menu-mobile');
  const navLinks = document.querySelectorAll(
    '.gh-nav__item[href^="#"], .gh-cta[href^="#"]'
  );

  if (
    !header ||
    !openBtn ||
    !closeTabletBtn ||
    !closeMobileBtn ||
    !backdrop ||
    !tabletMenu ||
    !mobileMenu
  ) {
    return;
  }

  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  const closeMenu = () => {
    header.classList.remove('gh-header--tablet-open', 'gh-header--mobile-open');
    tabletMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('gh-no-scroll');
  };

  const openMenu = () => {
    const mobile = isMobile();
    header.classList.toggle('gh-header--tablet-open', !mobile);
    header.classList.toggle('gh-header--mobile-open', mobile);
    tabletMenu.setAttribute('aria-hidden', String(mobile));
    mobileMenu.setAttribute('aria-hidden', String(!mobile));
    backdrop.hidden = mobile;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('gh-no-scroll');
  };

  openBtn.addEventListener('click', openMenu);
  closeTabletBtn.addEventListener('click', closeMenu);
  closeMobileBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  window.addEventListener('resize', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.charAt(0) !== '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', targetId);
    });
  });
};

initMenu();
