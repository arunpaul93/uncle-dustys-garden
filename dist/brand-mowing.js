const brand = document.querySelector('.brand-mow');
const stage = brand?.querySelector('.brand-mow-stage');

if (stage) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mower = stage.querySelector('.brand-mower');
  let ready = false;
  let running = false;
  let animationFrame = 0;
  let sequence = 0;

  const framePosition = frame => `${frame * 100 / 3}%`;
  function setPose(walk, head) {
    stage.style.setProperty('--walk-frame', framePosition(walk));
    stage.style.setProperty('--head-frame', framePosition(head));
    stage.dataset.walkFrame = walk;
    stage.dataset.headFrame = head;
  }
  function finish() {
    sequence++;
    cancelAnimationFrame(animationFrame);
    running = false;
    brand.classList.remove('is-mowing', 'is-cutting');
    stage.style.setProperty('--mow-reveal', '100%');
    stage.style.setProperty('--mower-x', '0px');
    stage.style.setProperty('--mower-opacity', '1');
    stage.style.setProperty('--mower-bob', '0px');
    setPose(1, 2);
    stage.dataset.state = motion.matches ? 'reduced-motion' : 'ready';
    stage.dataset.progress = '1';
  }
  function play() {
    if (!ready || running || motion.matches || document.hidden) return;
    running = true;
    const currentSequence = ++sequence;
    const width = stage.clientWidth;
    const wordLeft = parseFloat(getComputedStyle(stage).getPropertyValue('--word-left'));
    const mowerWidth = mower.getBoundingClientRect().width;
    const bladeOffset = mowerWidth * .96;
    const startX = wordLeft - bladeOffset;
    const endX = width - bladeOffset;
    const start = performance.now();
    brand.classList.add('is-mowing');
    stage.dataset.state = 'mowing';

    function tick(now) {
      if (currentSequence !== sequence) return;
      const elapsed = now - start;
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
      if (elapsed >= 3900) { finish(); return; }
      animationFrame = requestAnimationFrame(tick);
    }
    tick(start);
  }

  brand.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') play(); });
  brand.addEventListener('focusin', play);
  motion.addEventListener('change', () => { if (motion.matches) finish(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && running) finish(); });
  new ResizeObserver(() => { if (running) finish(); }).observe(stage);

  const sprite = new Image();
  sprite.src = stage.dataset.mowerSprite;
  Promise.all([sprite.decode(), document.fonts.ready]).then(() => {
    ready = true;
    brand.classList.add('is-mower-ready');
    finish();
    requestAnimationFrame(() => requestAnimationFrame(play));
  }).catch(() => {
    // Preserve the complete static home link if the optional animation asset fails.
    finish();
    stage.dataset.state = 'static-fallback';
  });
}
