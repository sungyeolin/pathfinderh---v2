/* ── FUND PAGINATION ── */
  let fundPage = 1;
  const fundTotal = 3;

  function goFundPage(n) {
    document.getElementById('fund-page-' + fundPage).classList.remove('active');
    document.querySelectorAll('.fund-dots .fund-dot')[fundPage - 1].classList.remove('active');
    fundPage = n;
    document.getElementById('fund-page-' + fundPage).classList.add('active');
    document.querySelectorAll('.fund-dots .fund-dot')[fundPage - 1].classList.add('active');
    document.getElementById('fund-prev').disabled = (fundPage === 1);
    document.getElementById('fund-next').disabled = (fundPage === fundTotal);
    document.getElementById('fund-page-label').textContent = fundPage + ' / ' + fundTotal;
  }

  function changeFundPage(dir) {
    var next = fundPage + dir;
    if (next >= 1 && next <= fundTotal) goFundPage(next);
  }

  /* ── PEOPLE PAGINATION ── */
  let peoplePage = 1;
  const peopleTotal = 3;

  function goPeoplePage(n) {
    document.getElementById('people-page-' + peoplePage).classList.remove('active');
    document.querySelectorAll('.people-dots .people-dot')[peoplePage - 1].classList.remove('active');
    peoplePage = n;
    document.getElementById('people-page-' + peoplePage).classList.add('active');
    document.querySelectorAll('.people-dots .people-dot')[peoplePage - 1].classList.add('active');
    document.getElementById('people-prev').disabled = (peoplePage === 1);
    document.getElementById('people-next').disabled = (peoplePage === peopleTotal);
    document.getElementById('people-page-label').textContent = peoplePage + ' / ' + peopleTotal;
  }

  function changePeoplePage(dir) {
    var next = peoplePage + dir;
    if (next >= 1 && next <= peopleTotal) goPeoplePage(next);
  }

  /* ── PORTFOLIO PAGINATION ── */
  (function() {
    var portfolioPage = 1;
    var portfolioTotal = 2;

    function goPortfolioPage(n) {
      document.getElementById('portfolio-page-' + portfolioPage).classList.remove('active');
      document.querySelectorAll('.portfolio-dots .portfolio-dot')[portfolioPage - 1].classList.remove('active');
      portfolioPage = n;
      document.getElementById('portfolio-page-' + portfolioPage).classList.add('active');
      document.querySelectorAll('.portfolio-dots .portfolio-dot')[portfolioPage - 1].classList.add('active');
      document.getElementById('portfolio-prev').disabled = (portfolioPage === 1);
      document.getElementById('portfolio-next').disabled = (portfolioPage === portfolioTotal);
      document.getElementById('portfolio-page-label').textContent = portfolioPage + ' / ' + portfolioTotal;
    }

    document.getElementById('portfolio-prev').addEventListener('click', function() {
      if (portfolioPage > 1) goPortfolioPage(portfolioPage - 1);
    });
    document.getElementById('portfolio-next').addEventListener('click', function() {
      if (portfolioPage < portfolioTotal) goPortfolioPage(portfolioPage + 1);
    });
    document.querySelectorAll('.portfolio-dots .portfolio-dot').forEach(function(dot) {
      dot.addEventListener('click', function() {
        goPortfolioPage(parseInt(this.dataset.page));
      });
    });
  })();

  /* ── HERO CAROUSEL ── */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDots   = document.querySelectorAll('.hero-dot');
  var heroIdx    = 0;
  var heroTimer;

  function goSlide(n) {
    heroSlides[heroIdx].classList.remove('active');
    heroSlides[heroIdx = ((n % heroSlides.length) + heroSlides.length) % heroSlides.length].classList.add('active');
    heroDots.forEach(function(d) { d.classList.remove('active'); void d.offsetWidth; });
    heroDots[heroIdx].classList.add('active');
    if (typeof currentLang !== 'undefined') setLang(currentLang);
    clearInterval(heroTimer);
    heroTimer = setInterval(function() { goSlide(heroIdx + 1); }, 8000);
  }

  heroTimer = setInterval(function() { goSlide(heroIdx + 1); }, 8000);

  /* ── METRICS COUNT-UP ── */
  (function() {
    var row = document.getElementById('metrics-row');
    if (!row) return;

    row.querySelectorAll('.metric-count').forEach(function(el) {
      var plus = el.dataset.plus || '';
      var suffix = el.dataset.suffix || '';
      el.innerHTML = '0' +
        (plus ? '<span class="metric-plus">' + plus + '</span>' : '') +
        '<span class="metric-suffix">' + suffix + '</span>';
    });

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

    function countUp(el) {
      var target = parseInt(el.dataset.target, 10);
      var plus = el.dataset.plus || '';
      var suffix = el.dataset.suffix || '';
      var duration = target >= 1000 ? 1800 : 1200;
      var start = performance.now();
      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var value = Math.round(easeOut(progress) * target);
        el.innerHTML = value.toLocaleString('ko-KR') +
          (plus ? '<span class="metric-plus">' + plus + '</span>' : '') +
          '<span class="metric-suffix">' + suffix + '</span>';
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          row.classList.add('counted');
          row.querySelectorAll('.metric-count').forEach(countUp);
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });

    row.classList.add('count-ready');
    observer.observe(row);
  })();

  /* ── Nav smooth scroll (+ 모바일 드로어 닫기) ── */
  // smooth scroll 지원 여부 미리 검사 (일부 구형 모바일 브라우저는 객체 인자 자체를 잘못 해석)
  var supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;

  document.querySelectorAll('#nav a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;

      var doScroll = function() {
        var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
        if (supportsSmoothScroll) {
          window.scrollTo({ top: top, behavior: 'smooth' });
        } else {
          // 폴백: 객체 인자 미지원 환경 (즉시 스크롤)
          window.scrollTo(0, top);
        }
      };

      if (document.body.classList.contains('nav-open')) {
        // 드로어가 열린 상태: 닫는 트랜지션(0.32s) + 안전 마진 후 스크롤
        closeDrawer();
        setTimeout(doScroll, 380);
      } else {
        doScroll();
      }
    });
  });

  /* ── MOBILE DRAWER (햄버거 메뉴) ── */
  var navToggle = document.getElementById('nav-toggle');
  var navOverlay = document.getElementById('nav-overlay');

  function openDrawer() {
    document.body.classList.add('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    document.body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      if (document.body.classList.contains('nav-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeDrawer);
  }

  /* ESC 키로 드로어 닫기 (기존 keydown 리스너가 stewardship 모달도 처리하지만, 이건 독립적으로 추가) */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeDrawer();
    }
  });

  /* ── Hero scroll arrow ── */
  var arrow = document.querySelector('.scroll-arrow');
  if (arrow) {
    arrow.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.getElementById('s1');
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ── STEWARDSHIP CODE MODAL ── */
  function openStewardship() {
    document.getElementById('stewardshipOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeStewardship(e) {
    if (e && e.target !== document.getElementById('stewardshipOverlay')) return;
    document.getElementById('stewardshipOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeStewardship(null);
  });

  /* ── LANGUAGE TOGGLE ── */
  var currentLang = 'ko';

  function setLang(lang) {
    currentLang = lang;
    document.getElementById('btn-kr').classList.toggle('active', lang === 'ko');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.querySelectorAll('[data-ko][data-en]').forEach(function(el) {
      var text = el.getAttribute('data-' + lang);
      if (text === null) return;
      el.innerHTML = text;
    });
  }