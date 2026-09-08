(() => {
  document.querySelectorAll('.media-results video').forEach((video) => {
    video.addEventListener('play', () => video.closest('.media').classList.add('has-played'), { once: true });
  });
  const hero = document.querySelector('.media-hero.media-filled');
  if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let heroScheduled = false;
    const updateHero = () => {
      const isMobile = matchMedia('(max-width: 760px)').matches;
      const startInset = isMobile ? 17.5 : 35;
      const viewportInset = isMobile ? 16 : 32;
      const distance = Math.max(hero.offsetHeight * 0.396, 1);
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      const finalWidth = Math.max(hero.clientWidth, Math.min(hero.clientWidth * 1.167, window.innerWidth - viewportInset * 2));
      const contactProgress = startInset / (startInset + 32);
      const verticalInset = startInset - (startInset + 32) * progress;
      let synchronizedWidth;
      let horizontalWidth;
      if (progress <= contactProgress) {
        const contactPhase = progress / contactProgress;
        const startWidth = hero.clientWidth - startInset * 2;
        synchronizedWidth = hero.clientWidth - Math.max(verticalInset, 0) * 2;
        horizontalWidth = startWidth + (hero.clientWidth - startWidth) * Math.sqrt(contactPhase);
      } else {
        const expansionProgress = (progress - contactProgress) / (1 - contactProgress);
        synchronizedWidth = hero.clientWidth + (finalWidth - hero.clientWidth) * expansionProgress;
        horizontalWidth = hero.clientWidth + (finalWidth - hero.clientWidth) * Math.sqrt(expansionProgress);
      }
      const videoWidth = synchronizedWidth * 0.8 + horizontalWidth * 0.2;
      hero.style.setProperty('--hero-video-width', `${videoWidth}px`);
      hero.style.setProperty('--hero-video-y', `${verticalInset}px`);
    };
    const scheduleHero = () => {
      if (heroScheduled) return;
      heroScheduled = true;
      requestAnimationFrame(() => {
        updateHero();
        heroScheduled = false;
      });
    };
    addEventListener('scroll', scheduleHero, { passive: true });
    addEventListener('resize', scheduleHero, { passive: true });
    updateHero();
  }
})();

(() => {
  const grid = document.querySelector('#programs .program-grid');
  const leadVisual = document.querySelector('#programs .program-visual-before');
  const tailVisual = document.querySelector('#programs .program-visual-after');
  const cards = [...document.querySelectorAll('[data-program-card]')];
  const visuals = [...document.querySelectorAll('[data-program-visual]')];
  if (!grid || !leadVisual || !tailVisual || cards.length !== 4 || !visuals.length) return;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let active = -1;
  const activate = (index) => {
    if (index === active) return;
    active = index;
    cards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === index));
    visuals.forEach((visual) => visual.querySelectorAll('[data-program-image]').forEach((image) => {
      const selected = Number(image.dataset.programImage) === index;
      image.classList.toggle('is-active', selected);
      image.setAttribute('aria-hidden', selected ? 'false' : 'true');
    }));
  };

  const update = () => {
    const isPhone = matchMedia('(max-width: 540px)').matches;
    if (isPhone) {
      const leadRect = leadVisual.getBoundingClientRect();
      const tailRect = tailVisual.getBoundingClientRect();
      const startTop = window.innerHeight - leadRect.height - window.innerHeight * 0.367;
      const distanceToStart = leadRect.top - startTop;
      const distanceToEnd = tailRect.top - window.innerHeight * 0.367;
      const travel = Math.max(distanceToEnd - distanceToStart, 1);
      const rawProgress = -distanceToStart / travel;
      const progress = Math.min(1, Math.max(0, rawProgress));
      if (!reduceMotion) grid.style.setProperty('--rainbow-angle', `${110 + progress * 112.5}deg`);
      if (rawProgress >= 1) activate(3);
      else if (rawProgress >= 0.5) activate(2);
      else if (rawProgress >= 0) activate(1);
      else activate(0);
      return;
    }

    const visualRect = leadVisual.getBoundingClientRect();
    const tileHeight = cards[0].getBoundingClientRect().height;
    const startTop = window.innerHeight - visualRect.height - tileHeight - 32;
    const endTop = 67;
    const travel = Math.max(startTop - endTop, 1);
    const rawProgress = (startTop - visualRect.top) / travel;
    const progress = Math.min(1, Math.max(0, rawProgress));
    if (!reduceMotion) grid.style.setProperty('--rainbow-angle', `${110 + progress * 112.5}deg`);
    if (rawProgress >= 1) activate(3);
    else if (rawProgress >= 0.5) activate(2);
    else if (rawProgress >= 0) activate(1);
    else activate(0);
  };

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      update();
      scheduled = false;
    });
  };

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  update();
})();
