(() => {
  const hero = document.querySelector('.media-hero.media-filled');
  if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let heroScheduled = false;
    const updateHero = () => {
      const distance = Math.max(hero.offsetHeight * 0.441, 1);
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      hero.style.setProperty('--hero-video-inset', `${35 - 67 * progress}px`);
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
  const cards = [...document.querySelectorAll('[data-program-card]')];
  const visuals = [...document.querySelectorAll('[data-program-visual]')];
  if (!grid || cards.length !== 4 || !visuals.length) return;

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
    const rect = grid.getBoundingClientRect();
    const startLine = window.innerHeight * 0.72;
    const endLine = window.innerHeight * 0.46;
    if (rect.top > startLine) {
      activate(0);
      return;
    }
    if (rect.bottom < endLine) {
      activate(cards.length - 1);
      return;
    }
    const travel = Math.max(rect.height + startLine - endLine, 1);
    const progress = Math.min(0.999, Math.max(0, (startLine - rect.top) / travel));
    if (progress >= 0.58) activate(3);
    else if (progress >= 0.37037) activate(2);
    else if (progress >= 0.185185) activate(1);
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
