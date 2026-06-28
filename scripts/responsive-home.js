(function () {
  var BREAKPOINT = 1280;
  var mounted = false;
  var iframeLoaded = false;

  function markup() {
    return [
      '<main id="cr-responsive-home" aria-label="Cougar Racing responsive home">',
      '  <header class="cr-header cr-shell">',
      '    <a href="index.html" aria-label="Cougar Racing home"><img class="cr-logo" src="media/logo-banner.png" alt="Cougar Racing"></a>',
      '    <nav class="cr-nav" aria-label="Site">',
      '      <a href="sub-team-page.html">Sub-Teams</a>',
      '      <a href="index.html#contact">Contact</a>',
      '      <a href="sponsors.html">Sponsors</a>',
      '      <a href="news.html">Legacy</a>',
      '      <a href="https://checkout.square.site/merchant/6JR8Q2ZJ112HV/checkout/JTEPKQCKJ5I5P442GVGLZPKZ" target="_blank" rel="noreferrer noopener">Join Us</a>',
      '    </nav>',
      '  </header>',
      '  <section class="cr-hero cr-shell" aria-label="Design Build Complete">',
      '    <div class="cr-hero-lockup" aria-hidden="true"><span>DESIGN.</span><span>BUILD.</span><span>COMPLETE.</span></div>',
      '    <span class="cr-sr-only">Design. Build. Complete.</span>',
      '    <div class="cr-actions">',
      '      <a href="https://checkout.square.site/merchant/6JR8Q2ZJ112HV/checkout/JTEPKQCKJ5I5P442GVGLZPKZ" target="_blank" rel="noreferrer noopener">Join Us</a>',
      '      <a href="sponsors.html">Donate</a>',
      '    </div>',
      '  </section>',
      '  <section id="mission-overview" class="cr-section">',
      '    <div class="cr-shell">',
      '      <h1 class="cr-title">Design a Car. <span>Build a Career.</span></h1>',
      '      <div class="cr-overview-grid">',
      '        <div class="cr-features">',
      '          <article class="cr-feature">',
      '            <img src="media/home-team.jpg" alt="Cougar Racing team with the UH flag and car">',
      '            <div><h2>Our Mission</h2><h3>Mission Statement</h3><p>Cougar Racing empowers UH students to design, fabricate, and validate a Formula SAE car while building the engineering leadership, safety, and communication skills employers expect. We bridge campus and industry through mentorship, training, and professional networking.</p></div>',
      '          </article>',
      '          <article class="cr-feature">',
      '            <img src="media/home-welding.webp" alt="Cougar Racing member welding the car chassis">',
      '            <div><h2>Develop Your Skills</h2><p>We facilitate technical growth through workshops that offer members opportunities to learn engineering concepts and build technical skills crucial for designing and building a race car. You do not need to be an engineering major. If you have the passion for automotive engineering and the drive to learn and apply yourself, then Cougar Racing is the place for you.</p></div>',
      '          </article>',
      '          <article class="cr-feature">',
      '            <img src="media/home-community.jpg" alt="Cougar Racing car at a community event">',
      '            <div><h2>Connect with the Community</h2><p>We host and attend numerous events throughout the year, providing opportunities for community outreach and networking. Meet others who have equal interests and experiences in the automotive industry, make new memories, and have fun.</p></div>',
      '          </article>',
      '        </div>',
      '        <aside class="cr-model" aria-label="Interactive 3D car model">',
      '          <div class="cr-model-frame" id="cr-responsive-model-frame"></div>',
      '          <p class="cr-model-caption">Samantha : 2025-2026 ICE Car</p>',
      '        </aside>',
      '      </div>',
      '    </div>',
      '  </section>',
      '  <section class="cr-section">',
      '    <div class="cr-shell cr-fsae">',
      '      <div><h2>What is FSAE?</h2><p>Formula SAE is an engineering education competition that requires performance demonstration of vehicles in a series of events, both off and on the track. Competitions challenge teams of university undergraduate and graduate students to design, fabricate, develop, and compete with formula-style vehicles. Each team&apos;s design will be judged and evaluated against other competing designs in a series of static and dynamic events to determine the vehicle that best meets the design goals.</p></div>',
      '      <img src="media/home-fsae-track.jpg" alt="Formula SAE cars lined up on track">',
      '    </div>',
      '  </section>',
      '  <section id="contact" class="cr-section">',
      '    <div class="cr-shell cr-contact">',
      '      <h2>Get in Touch</h2>',
      '      <p>Interested in joining, sponsoring, or learning more about Cougar Racing? Use the Join Us link or reach out through the team contact channels.</p>',
      '    </div>',
      '  </section>',
      '</main>'
    ].join('');
  }

  function mount() {
    if (mounted) return;
    document.body.insertAdjacentHTML('afterbegin', markup());
    mounted = true;
  }

  function ensureModel() {
    if (iframeLoaded) return;
    var frame = document.getElementById('cr-responsive-model-frame');
    if (!frame) return;
    var iframe = document.createElement('iframe');
    iframe.title = 'Samantha 2025-2026 ICE Car 3D model';
    iframe.loading = 'lazy';
    iframe.src = 'car-model.html?v=responsive-home-1';
    frame.appendChild(iframe);
    iframeLoaded = true;
  }

  function active() {
    return (window.innerWidth || document.documentElement.clientWidth || 0) <= BREAKPOINT;
  }

  function apply() {
    mount();
    var isActive = active();
    document.documentElement.classList.toggle('cr-responsive-home-active', isActive);
    document.body.classList.toggle('cr-responsive-home-active', isActive);
    if (isActive) {
      document.body.classList.remove('codex-responsive-scale');
      document.body.style.minHeight = '';
      document.documentElement.style.setProperty('--codex-site-scale', '1');
      ensureModel();
    }
  }

  function start() {
    apply();
    window.addEventListener('resize', apply, { passive: true });
    window.addEventListener('orientationchange', apply, { passive: true });
    setTimeout(apply, 100);
    setTimeout(apply, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
