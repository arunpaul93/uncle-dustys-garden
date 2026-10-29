const STRIDE = 340, STANCE = .58, GROUND = 626;
const THIGH = 114, SHIN = 116;
const smooth = value => value * value * (3 - 2 * value);
const clamp = value => Math.max(0, Math.min(1, value));
const point = ({ x, y }) => `${x.toFixed(2)} ${y.toFixed(2)}`;

// During stance the planted foot moves backwards by exactly the travelled distance.
// The swing uses matching end velocities and lifts gently, rather than marching.
export function legPose(distance, offset, moving = true, bob = 0) {
  const far = offset > 0;
  const hip = { x: far ? 130 : 175, y: 390 + bob };
  const phase = ((distance / STRIDE + offset) % 1 + 1) % 1;
  const blend = moving ? smooth(clamp(distance / 70)) : 0;
  const front = 100, back = front - STRIDE * STANCE;
  let footX, lift = 0, angle;
  if (phase < STANCE) {
    footX = front - STRIDE * phase;
    angle = phase < .12 ? -8 * (1 - smooth(phase / .12)) : phase < .43 ? 0 : 12 * smooth((phase - .43) / (STANCE - .43));
  } else {
    const t = (phase - STANCE) / (1 - STANCE);
    const velocity = -STRIDE * (1 - STANCE);
    footX = (2*t**3 - 3*t**2 + 1)*back + (t**3 - 2*t**2 + t)*velocity + (-2*t**3 + 3*t**2)*front + (t**3 - t**2)*velocity;
    lift = 28 * Math.sin(Math.PI * t) ** 2;
    angle = 12 - 20 * smooth(t);
  }
  angle *= blend;
  const radians = angle * Math.PI / 180;
  const sole = Math.max(-25 * Math.sin(radians) + 35 * Math.cos(radians), 57 * Math.sin(radians) + 33 * Math.cos(radians));
  const restX = far ? 110 : 190;
  const ankle = { x: restX + (hip.x + footX - restX) * blend, y: GROUND - 35 + (35 - sole - lift) * blend };
  const dx = ankle.x - hip.x, dy = ankle.y - hip.y;
  const length = Math.hypot(dx, dy);
  const reach = Math.min(length, THIGH + SHIN - .001);
  const along = (THIGH ** 2 - SHIN ** 2 + reach ** 2) / (2 * reach);
  const bend = Math.sqrt(Math.max(0, THIGH ** 2 - along ** 2));
  const knee = { x: hip.x + (dx * along + dy * bend) / length, y: hip.y + (dy * along - dx * bend) / length };
  return { hip, knee, ankle, angle, phase, blend };
}

export function trouserPaths({ hip, knee, ankle }, width = 1) {
  const normal = (a, b) => {
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    return { x: (b.y - a.y) / length, y: (a.x - b.x) / length };
  };
  const top = normal(hip, knee), bottom = normal(knee, ankle);
  const middleLength = Math.hypot(top.x + bottom.x, top.y + bottom.y);
  const middle = { x: (top.x + bottom.x) / middleLength, y: (top.y + bottom.y) / middleLength };
  const edge = (p, n, size) => ({ x: p.x + n.x * size * width, y: p.y + n.y * size * width });
  const h1 = edge(hip, top, -28), h2 = edge(hip, top, 28);
  const k1 = edge(knee, middle, -23), k2 = edge(knee, middle, 23);
  const a1 = edge(ankle, bottom, -20), a2 = edge(ankle, bottom, 20);
  const toward = (a, b) => ({ x: a.x + (b.x - a.x) * .18, y: a.y + (b.y - a.y) * .18 });
  return {
    outline: `M${point(h1)}L${point(toward(k1, h1))}Q${point(k1)} ${point(toward(k1, a1))}L${point(a1)}L${point(a2)}L${point(toward(k2, a2))}Q${point(k2)} ${point(toward(k2, h2))}L${point(h2)}Z`,
    seam: `M${point(edge(hip, top, 12))}Q${point(edge(knee, middle, 10))} ${point(edge(ankle, bottom, 9))}`,
    cuff: `M${point(a1)}L${point(a2)}`
  };
}

export const wheelAngle = (distance, radius) => distance / radius * 180 / Math.PI;

const brand = typeof document === 'undefined' ? null : document.querySelector('.brand-mow');
const stage = brand?.querySelector('.brand-mow-stage');

if (stage) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mower = stage.querySelector('.brand-mower');
  const person = stage.querySelector('.brand-mower-person');
  const headImage = stage.querySelector('.brand-rig-head');
  const rearWheel = stage.querySelector('.brand-wheel-rear');
  const frontWheel = stage.querySelector('.brand-wheel-front');
  const legs = [...stage.querySelectorAll('.brand-leg')].map((leg, index) => ({
    offset: index === 0 ? .5 : 0,
    width: index === 0 ? .92 : 1,
    boot: leg.querySelector('.brand-boot'),
    trouser: leg.querySelector('.brand-trouser'),
    seam: leg.querySelector('.brand-trouser-seam'),
    cuff: leg.querySelector('.brand-trouser-cuff')
  }));
  const toggle = document.querySelector('.brand-animation-toggle');
  let ready = false;
  let running = false;
  let paused = false;
  let animationFrame = 0;
  let restartTimer = 0;
  let sequence = 0;
  let cycles = 0;
  const GROW_MS = 1400, MOW_MS = 3900, HOLD_MS = 2400;
  const canPlay = () => ready && !paused && !motion.matches && !document.hidden;
  function syncToggle() {
    if (!toggle) return;
    toggle.hidden = !ready || motion.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Resume logo animation' : 'Pause logo animation');
    toggle.title = paused ? 'Resume logo animation' : 'Pause logo animation';
  }
  function setPose(distance, head, moving = false) {
    const blend = moving ? smooth(clamp(distance / 70)) : 0;
    const bob = -2 * (1 - Math.cos(distance / STRIDE * Math.PI * 4)) * blend;
    person.setAttribute('transform', `translate(0 ${bob.toFixed(3)})`);
    for (const leg of legs) {
      const pose = legPose(distance, leg.offset, moving, bob);
      const paths = trouserPaths(pose, leg.width);
      leg.boot.setAttribute('transform', `translate(${point(pose.ankle)}) rotate(${pose.angle.toFixed(3)})`);
      leg.trouser.setAttribute('d', paths.outline);
      leg.seam.setAttribute('d', paths.seam);
      leg.cuff.setAttribute('d', paths.cuff);
    }
    headImage.setAttribute('x', String(-head * 543));
    rearWheel.setAttribute('transform', `rotate(${wheelAngle(distance, 57).toFixed(3)})`);
    frontWheel.setAttribute('transform', `rotate(${wheelAngle(distance, 48).toFixed(3)})`);
    stage.dataset.gaitPhase = ((distance / STRIDE) % 1).toFixed(3);
    stage.dataset.wheelRotation = wheelAngle(distance, 57).toFixed(2);
    stage.dataset.headFrame = head;
  }
  function finish() {
    sequence++;
    cancelAnimationFrame(animationFrame);
    clearTimeout(restartTimer);
    restartTimer = 0;
    running = false;
    brand.classList.remove('is-growing', 'is-mowing');
    stage.style.setProperty('--mow-reveal', '100%');
    stage.style.setProperty('--grass-growth', '1');
    stage.style.setProperty('--word-opacity', '1');
    stage.style.setProperty('--mower-x', '0px');
    stage.style.setProperty('--mower-opacity', '1');
    setPose(0, 2);
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
    const distance = width - wordLeft;
    const scale = mowerWidth / 543;
    const approach = wordLeft - mowerWidth * .96;
    const speed = (distance + approach) / (2800 - 80);
    const start = performance.now();

    function tick(now) {
      if (currentSequence !== sequence) return;
      const cycleElapsed = now - start;
      if (cycleElapsed < GROW_MS) {
        const growth = cycleElapsed / GROW_MS;
        const eased = growth * growth * (3 - 2 * growth);
        brand.classList.add('is-growing');
        brand.classList.remove('is-mowing');
        stage.style.setProperty('--grass-growth', eased);
        stage.style.setProperty('--word-opacity', 1 - eased);
        stage.style.setProperty('--mow-reveal', '100%');
        stage.dataset.state = 'growing';
        stage.dataset.growth = growth.toFixed(3);
        stage.dataset.progress = '0';
        setPose(0, growth > .72 ? 0 : 2);
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
      const pushTime = Math.max(0, Math.min(3220, elapsed - 180));
      const travel = speed * (pushTime < 160 ? pushTime ** 2 / 320 : pushTime - 80);
      const progress = clamp((travel - approach) / distance);
      const leaving = Math.max(0, Math.min(1, (elapsed - 2980) / 420));
      const returning = Math.max(0, Math.min(1, (elapsed - 3400) / 500));
      const x = returning > 0 ? 0 : travel;
      const opacity = returning > 0 ? returning : 1 - leaving;
      const walking = elapsed >= 180 && elapsed < 3400;
      const head = progress < .18 ? 0 : progress < .34 ? 1 : progress < .7 ? 2 : progress < .9 ? 3 : 0;
      stage.style.setProperty('--mow-reveal', `${progress * 100}%`);
      stage.style.setProperty('--mower-x', `${x}px`);
      stage.style.setProperty('--mower-opacity', opacity);
      stage.dataset.progress = progress.toFixed(3);
      setPose(returning > 0 ? 0 : travel / scale, returning > 0 ? 2 : head, walking);
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
