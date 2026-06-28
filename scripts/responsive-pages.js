(function () {
  var BREAKPOINT = 1100;
  var ALWAYS_RESPONSIVE = {
    'inquiry-services-page.html': true
  };
  var mounted = false;

  var nav = [
    ['Sub-Teams', 'sub-team-page.html'],
    ['Contact', 'index.html#contact'],
    ['Sponsors', 'sponsors.html'],
    ['Legacy', 'news.html'],
    ['Join Us', 'https://checkout.square.site/merchant/6JR8Q2ZJ112HV/checkout/JTEPKQCKJ5I5P442GVGLZPKZ']
  ];

  var sponsorLogos = [
    ['Kratz Coffee', 'media/sponsor-kratz-coffee.png'],
    ['Fluor', 'media/sponsor-fluor.png'],
    ['Gene Haas Foundation', 'media/sponsor-gene-haas-foundation.png'],
    ['Houston Powder Coaters / Makers Development Group', 'media/sponsor-houston-powder-coaters.png'],
    ['GoEngineer', 'media/sponsor-goengineer.png'],
    ['AmeriTex Machine and Fabrication', 'media/sponsor-ameritex.png'],
    ['Baker Hughes', 'media/sponsor-baker-hughes.png'],
    ['SpeedSportz Racing Park', 'media/sponsor-speedsportz.png'],
    ['Salcedo Engineering, L.L.C.', 'media/sponsor-salcedo-engineering.png'],
    ['Bend-It', 'media/sponsor-bend-it.png'],
    ['Rush Auto Works', 'media/sponsor-rush-auto-works.png'],
    ['Blue Ox', 'media/sponsor-blue-ox.png'],
    ['Katy Hydraulics', 'media/sponsor-katy-hydraulics.png'],
    ['Ironrod Steel Co.', 'media/sponsor-ironrod-steel.png']
  ];

  var subteams = [
    ['Aerodynamics', 'media/subteam-aero.png', 'The aerodynamics team is responsible for designing, testing, and optimizing the vehicle aerodynamic package. They develop components like wings, undertrays and diffusers to maximize downforce while minimizing drag.'],
    ['Chassis', 'media/subteam-chassis.jpg', 'The chassis team designs and builds the structural frame for the vehicle, ensuring the rigidity of the car is within the standards of safety while minimizing the weight of the car.'],
    ['DAQ', 'media/subteam-daq.png', 'The data acquisition team manages telemetry data and analysis. They develop the software systems for data logging and visualization, providing feedback for potential improvements that can be made for the vehicle.'],
    ['Ergonomics', 'media/subteam-ergonomics.jpeg', 'The ergonomics team develops all the components of the vehicle that the driver interacts with. They design the cockpit layout, ensuring driver comfort, accessibility, and safety.'],
    ['Powertrain', 'media/subteam-powertrain.jpg', 'The powertrain team manages each part of the vehicle that produces and transmits power to the vehicle. The team designs the most optimal engine and drivetrain system that maximizes power while maintaining reliability for strenuous testing.'],
    ['Suspension', 'media/subteam-suspension.png', 'The suspension team is responsible for designing the systems that optimize vehicle handling. They perform simulations and tests to improve grip, stability, and responsiveness, ensuring the driver has control at all times.']
  ];

  var pages = {
    'sub-team-page.html': {
      kicker: 'Sub-Teams',
      title: 'Explore the Team',
      deck: 'Cougar Racing is split into focused engineering groups that design, fabricate, test, and validate the car.',
      hero: 'media/subteams-hero.webp',
      heroAlt: 'Cougar Racing car on track',
      body: subteamPage
    },
    'sponsors.html': {
      kicker: 'Sponsor',
      title: 'Support Future Engineers',
      deck: 'Your contribution is not only an investment in the training of future enthusiastic technical professionals, but also helps to better the professional reputation of Houston academic institutions. Students in this program use what is taught in the classroom and apply it to real-life situations.',
      hero: 'media/sponsors-hero.jpg',
      heroAlt: 'Cougar Racing fabrication work',
      body: sponsorsPage
    },
    'news.html': {
      kicker: 'Legacy',
      title: 'Our History',
      deck: 'From the Mini-Indy roots at the University of Houston to Cougar Racing returning to competition, this is the team timeline.',
      hero: 'media/legacy-hero.jpg',
      heroAlt: 'Cougar Racing historical car photo',
      body: legacyPage
    },
    'inquiry-services-page.html': {
      kicker: 'Contact',
      title: 'Explore our services and get in touch',
      deck: 'Reach out to Cougar Racing for joining, sponsorship, outreach, and team information.',
      hero: '',
      heroAlt: '',
      body: contactPage
    }
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function currentKey() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    return pages[path] ? path : '';
  }

  function navMarkup() {
    return nav.map(function (item) {
      var external = /^https?:\/\//.test(item[1]) ? ' target="_blank" rel="noreferrer noopener"' : '';
      return '<a href="' + esc(item[1]) + '"' + external + '>' + esc(item[0]) + '</a>';
    }).join('');
  }

  function shell(page) {
    return [
      '<main id="cr-responsive-page" aria-label="Cougar Racing responsive page">',
      '  <header class="crp-header crp-shell">',
      '    <a href="index.html" aria-label="Cougar Racing home"><img class="crp-logo" src="media/logo-banner.png" alt="Cougar Racing"></a>',
      '    <nav class="crp-nav" aria-label="Site">' + navMarkup() + '</nav>',
      '  </header>',
      '  <section class="crp-hero crp-shell">',
      '    <p class="crp-kicker">' + esc(page.kicker) + '</p>',
      '    <h1 class="crp-title">' + esc(page.title) + '</h1>',
      '    <p class="crp-deck">' + esc(page.deck) + '</p>',
      page.hero ? '    <img class="crp-hero-media" src="' + esc(page.hero) + '" alt="' + esc(page.heroAlt) + '">' : '',
      '  </section>',
      page.body(),
      '  <footer class="crp-footer crp-shell">',
      '    <p>info.uhfsae@gmail.com</p>',
      '    <p>4465 University Drive, Mailbox 451 Houston, TX 77204</p>',
      '  </footer>',
      '</main>'
    ].join('');
  }

  function subteamPage() {
    var tabs = subteams.map(function (team) {
      return '<a href="#crp-' + esc(team[0].toLowerCase()) + '">' + esc(team[0]) + '</a>';
    }).join('');
    var cards = subteams.map(function (team) {
      return [
        '<article class="crp-card" id="crp-' + esc(team[0].toLowerCase()) + '">',
        '  <img src="' + esc(team[1]) + '" alt="' + esc(team[0]) + ' subteam">',
        '  <h3>' + esc(team[0]) + '</h3>',
        '  <p>' + esc(team[2]) + '</p>',
        '</article>'
      ].join('');
    }).join('');
    return '<section class="crp-section"><div class="crp-shell"><h2>Sub-Teams</h2><div class="crp-tabs">' + tabs + '</div></div></section><section class="crp-section"><div class="crp-shell crp-grid">' + cards + '</div></section>';
  }

  function sponsorsPage() {
    var logos = sponsorLogos.map(function (logo) {
      return '<div class="crp-sponsor"><img src="' + esc(logo[1]) + '" alt="' + esc(logo[0]) + '"></div>';
    }).join('');
    return [
      '<section class="crp-section crp-sponsors-section"><div class="crp-shell">',
      '  <h2>Support Future Engineers</h2>',
      '  <p>If you are interested in sponsoring us, please refer to our sponsorship packet below and <a class="crp-link" href="index.html#contact">contact us here.</a></p>',
      '  <h2 class="crp-sponsor-heading">Thank You To Our Sponsors</h2>',
      '  <div class="crp-sponsor-grid">' + logos + '</div>',
      '</div></section>'
    ].join('');
  }

  function legacyPage() {
    var items = [
      ['Early Days', 'media/legacy-early.png', 'Formula SAE began at the University of Houston in 1979, first named The Mini-Indy. 5 Horsepower B&S engines were used. 13 schools entered and 11 competed that first year. In 1981, The Mini-Indy was renamed Formula SAE. In 1984, The University of Houston won its first and only Formula SAE competition.'],
      ['Cougar Racing Returns', 'media/legacy-returns.png', 'With the goal of becoming competitive within Formula SAE, Team Coogs was formed at the turn of 2015 as a first year team. The team continued to compete through the rest of the 2010s, until the Covid-19 pandemic. The team spent the first few years after the pandemic rebuilding the team in preparation of returning to competition.'],
      ['Cougar Racing Now', 'media/legacy-now.png', 'After a 5 year hiatus, Cougar Racing returned to competition with \"Faith\"! The team began vehicle fabrication in 2023, but the car did not make it to the 2024 competition. Cougar Racing still competed in the Presentation Event, placing 10th out of 111 universities.'],
      ['2026 Season', 'media/legacy-sam.jpeg', 'Entering into the 2026 season, Cougar Racing returned to a one year design cycle for the first time since 2019. Although the team was unable to participate in the dynamic events, the 2026 car, named \"Sam,\" was over 100 lbs lighter than the previous year.']
    ];
    var markup = items.map(function (item) {
      return '<article class="crp-card"><img src="' + esc(item[1]) + '" alt="' + esc(item[0]) + '"><h3>' + esc(item[0]) + '</h3><p>' + esc(item[2]) + '</p></article>';
    }).join('');
    return '<section class="crp-section"><div class="crp-shell crp-timeline">' + markup + '</div></section>';
  }

  function contactPage() {
    return [
      '<section id="contact" class="crp-section crp-contact-section"><div class="crp-shell">',
      '  <div class="crp-contact-grid">',
      '    <article><h2>Email</h2><p><a class="crp-link" href="mailto:info.uhfsae@gmail.com">info.uhfsae@gmail.com</a></p></article>',
      '    <article><h2>Address</h2><p>4465 University Drive, Mailbox 451 Houston, TX 77204</p></article>',
      '    <article><h2>Join</h2><p><a class="crp-link" href="https://checkout.square.site/merchant/6JR8Q2ZJ112HV/checkout/JTEPKQCKJ5I5P442GVGLZPKZ" target="_blank" rel="noreferrer noopener">Open the Cougar Racing checkout</a></p></article>',
      '  </div>',
      '  <form id="crp-contact-form" class="crp-contact-form">',
      '    <label>Name<input name="name" autocomplete="name" required></label>',
      '    <label>Email<input name="email" type="email" autocomplete="email" required></label>',
      '    <label>Message<textarea name="message" rows="5" required></textarea></label>',
      '    <button type="submit">Send Email</button>',
      '    <p id="crp-contact-status" class="crp-contact-status" aria-live="polite"></p>',
      '  </form>',
      '</div></section>'
    ].join('');
  }

  function active() {
    var key = currentKey();
    if (!key) return false;
    if (ALWAYS_RESPONSIVE[key]) return true;
    return (window.innerWidth || document.documentElement.clientWidth || 0) <= BREAKPOINT;
  }

  function handleContactSubmit(event) {
    if (!event.target || event.target.id !== 'crp-contact-form') return;
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var name = data.get('name') || '';
    var email = data.get('email') || '';
    var message = data.get('message') || '';
    var body = [
      'Name: ' + name,
      'Email: ' + email,
      '',
      String(message)
    ].join('\n');
    var subject = 'Cougar Racing website inquiry';
    var mailto = 'mailto:info.uhfsae@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    var status = document.getElementById('crp-contact-status');
    if (status) {
      status.textContent = 'Opening your email app to send the message.';
    }
    window.location.href = mailto;
  }

  function scrollToHash() {
    if (window.location.hash !== '#contact') return;
    var target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ block: 'start' });
    }
  }

  function mount() {
    var key = currentKey();
    if (mounted || !key) return;
    document.body.insertAdjacentHTML('afterbegin', shell(pages[key]));
    mounted = true;
  }

  function apply() {
    var key = currentKey();
    if (!key) return;
    mount();
    var isActive = active();
    document.documentElement.classList.toggle('cr-responsive-page-active', isActive);
    document.body.classList.toggle('cr-responsive-page-active', isActive);
    if (isActive) {
      document.body.classList.remove('codex-responsive-scale');
      document.body.style.minHeight = '';
      document.documentElement.style.setProperty('--codex-site-scale', '1');
    }
    if (isActive) {
      setTimeout(scrollToHash, 50);
    }
  }

  function start() {
    apply();
    document.addEventListener('submit', handleContactSubmit);
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
