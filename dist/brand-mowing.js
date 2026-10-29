const brand = document.querySelector('.brand-mow');
const stage = brand?.querySelector('.brand-mow-stage');

if (stage) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mower = stage.querySelector('.brand-mower');
  const toggle = document.querySelector('.brand-animation-toggle');
  let ready = false;
  let running = false;
  let paused = false;
  let animationFrame = 0;
  let restartTimer = 0;
  let sequence = 0;
  let cycles = 0;
  const GROW_MS = 1400, MOW_MS = 3900, HOLD_MS = 2400;

  const framePosition = frame => `${frame * 100 / 3}%`;
  const canPlay = () => ready && !paused && !motion.matches && !document.hidden;
  function syncToggle() {
    if (!toggle) return;
    toggle.hidden = !ready || motion.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Resume logo animation' : 'Pause logo animation');
    toggle.title = paused ? 'Resume logo animation' : 'Pause logo animation';
  }
  function setPose(walk, head) {
    stage.style.setProperty('--walk-frame', framePosition(walk));
    stage.style.setProperty('--head-frame', framePosition(head));
    stage.dataset.walkFrame = walk;
    stage.dataset.headFrame = head;
  }
  function finish() {
    sequence++;
    cancelAnimationFrame(animationFrame);
    clearTimeout(restartTimer);
    restartTimer = 0;
    running = false;
    brand.classList.remove('is-growing', 'is-mowing', 'is-cutting');
    stage.style.setProperty('--mow-reveal', '100%');
    stage.style.setProperty('--grass-growth', '1');
    stage.style.setProperty('--word-opacity', '1');
    stage.style.setProperty('--mower-x', '0px');
    stage.style.setProperty('--mower-opacity', '1');
    stage.style.setProperty('--mower-bob', '0px');
    setPose(1, 2);
    stage.dataset.state = motion.matches ? 'reduced-motion' : paused ? 'paused' : 'ready';
    stage.dataset.progress = '1';
    stage.dataset.growth = '0';
    syncToggle();
  }
  function schedule(delay = HOLD_MS) {
    clearTimeout(restartTimer);
    restartTimer = 0;
    if (canPlay()) restartTimer = setTimeout(play, delay);
  }
  function play() {
    restartTimer = 0;
    if (!canPlay() || running) return;
    running = true;
    const currentSequence = ++sequence;
    stage.dataset.cycle = ++cycles;
    const width = stage.clientWidth;
    const wordLeft = parseFloat(getComputedStyle(stage).getPropertyValue('--word-left'));
    const mowerWidth = mower.getBoundingClientRect().width;
    const bladeOffset = mowerWidth * .96;
    const startX = wordLeft - bladeOffset;
    const endX = width - bladeOffset;
    const start = performance.now();

    function tick(now) {
      if (currentSequence !== sequence) return;
      const cycleElapsed = now - start;
      if (cycleElapsed < GROW_MS) {
        const growth = cycleElapsed / GROW_MS;
        const eased = growth * growth * (3 - 2 * growth);
        brand.classList.add('is-growing');
        brand.classList.remove('is-mowing', 'is-cutting');
        stage.style.setProperty('--grass-growth', eased);
        stage.style.setProperty('--word-opacity', 1 - eased);
        stage.style.setProperty('--mow-reveal', '100%');
        stage.dataset.state = 'growing';
        stage.dataset.growth = growth.toFixed(3);
        stage.dataset.progress = '0';
        setPose(1, growth > .72 ? 0 : 2);
        animationFrame = requestAnimationFrame(tick);
        return;
      }
      const elapsed = cycleElapsed - GROW_MS;
      brand.classList.remove('is-growing');
      brand.classList.add('is-mowing');
      stage.style.setProperty('--grass-growth', '1');
      stage.style.setProperty('--word-opacity', '1');
      stage.dataset.state = 'mowing';
      stage.dataset.growth = '1';
      const progress = Math.max(0, Math.min(1, (elapsed - 180) / 2800));
      const leaving = Math.max(0, Math.min(1, (elapsed - 2980) / 420));
      const returning = Math.max(0, Math.min(1, (elapsed - 3400) / 500));
      const x = returning > 0 ? 0 : startX + (endX - startX) * progress + leaving * mowerWidth * .12;
      const opacity = returning > 0 ? returning : 1 - leaving;
      const cutting = elapsed >= 180 && elapsed < 2980;
      const head = progress < .18 ? 0 : progress < .34 ? 1 : progress < .7 ? 2 : progress < .9 ? 3 : 0;
      stage.style.setProperty('--mow-reveal', `${progress * 100}%`);
      stage.style.setProperty('--mower-x', `${x}px`);
      stage.style.setProperty('--cut-x', `${wordLeft + (width - wordLeft) * progress}px`);
      stage.style.setProperty('--mower-opacity', opacity);
      stage.style.setProperty('--mower-bob', cutting ? `${Math.sin(elapsed / 75) * .65}px` : '0px');
      stage.dataset.progress = progress.toFixed(3);
      brand.classList.toggle('is-cutting', cutting);
      setPose(cutting ? Math.floor((elapsed - 180) / 145) % 4 : 1, returning > 0 ? 2 : head);
      if (elapsed >= MOW_MS) { finish(); schedule(); return; }
      animationFrame = requestAnimationFrame(tick);
    }
    tick(start);
  }

  toggle?.addEventListener('click', () => {
    paused = !paused;
    finish();
    if (!paused) schedule(400);
  });
  motion.addEventListener('change', () => { finish(); schedule(600); });
  document.addEventListener('visibilitychange', () => { finish(); schedule(600); });
  new ResizeObserver(() => { finish(); schedule(400); }).observe(stage);

  const sprite = new Image();
  sprite.src = stage.dataset.mowerSprite;
  Promise.all([sprite.decode(), document.fonts.ready]).then(() => {
    ready = true;
    brand.classList.add('is-mower-ready');
    finish();
    schedule(600);
  }).catch(() => {
    // Preserve the complete static home link if the optional animation asset fails.
    finish();
    stage.dataset.state = 'static-fallback';
  });
}
