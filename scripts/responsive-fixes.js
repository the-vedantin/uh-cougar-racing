(function () {
  var DESIGN_WIDTH = 980;
  var resizeObserver;
  var scheduled = false;

  function pageHeight() {
    var container = document.getElementById('SITE_CONTAINER');
    var root = document.getElementById('site-root');
    var master = document.getElementById('masterPage');
    return Math.max(
      container ? container.scrollHeight : 0,
      root ? root.scrollHeight : 0,
      master ? master.scrollHeight : 0,
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0
    );
  }

  function applyScale() {
    scheduled = false;
    if (!document.body) return;

    var viewportWidth = window.innerWidth || document.documentElement.clientWidth || DESIGN_WIDTH;
    var scale = viewportWidth < DESIGN_WIDTH ? viewportWidth / DESIGN_WIDTH : 1;
    document.documentElement.style.setProperty('--codex-site-scale', String(scale));

    if (scale < 1) {
      document.body.classList.add('codex-responsive-scale');
      document.body.style.minHeight = Math.ceil(pageHeight() * scale) + 'px';
    } else {
      document.body.classList.remove('codex-responsive-scale');
      document.body.style.minHeight = '';
    }
  }

  function scheduleScale() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(applyScale);
  }

  function observe() {
    if (!window.ResizeObserver || resizeObserver) return;
    var target = document.getElementById('SITE_CONTAINER') || document.getElementById('site-root');
    if (!target) return;
    resizeObserver = new ResizeObserver(scheduleScale);
    resizeObserver.observe(target);
  }

  function start() {
    applyScale();
    observe();
    window.addEventListener('resize', scheduleScale, { passive: true });
    window.addEventListener('orientationchange', scheduleScale, { passive: true });
    window.addEventListener('load', scheduleScale, { once: true });
    setTimeout(scheduleScale, 250);
    setTimeout(scheduleScale, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
