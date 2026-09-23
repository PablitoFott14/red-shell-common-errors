/* The Slides tab: one slide at a time. Buttons, the arrow keys, Page Up and Down, Space, Home
   and End, the strip, a swipe on a touch screen, full screen, and a link to every slide (#1 to
   #N). It reads the deck from the page itself and touches nothing outside #deck. */
(function () {
  'use strict';
  var data = JSON.parse(document.getElementById('deck-data').textContent);
  var slides = data.slides, N = slides.length;
  function $(s) { return document.querySelector(s); }
  var wrap = $('.dk-stagewrap'), stage = $('.dk-stage'), img = $('.dk-img'), count = $('.dk-count'),
      title = $('.dk-title'), part = $('.dk-part'), prevB = $('[data-act="prev"]'), nextB = $('[data-act="next"]'),
      fullB = $('[data-act="full"]'), live = $('.dk-live'), text = $('#dk-text'), strip = $('.dk-strip'),
      help = $('.dk-help'), thumbs = Array.prototype.slice.call(document.querySelectorAll('.dk-strip button'));
  var cur = -1, held = {};

  function clamp(i) { return Math.max(0, Math.min(N - 1, i)); }
  function fromHash() {
    var m = /^#(\d+)$/.exec(location.hash);
    return m ? clamp(parseInt(m[1], 10) - 1) : 0;
  }
  // keep the neighbours decoded, so a step shows the next slide at once
  function hold(i) {
    if (i < 0 || i >= N || held[i]) return;
    var im = new Image();
    im.decoding = 'async';
    im.src = slides[i].img;
    held[i] = im;
  }
  function centre(t) {
    var sr = strip.getBoundingClientRect(), tr = t.getBoundingClientRect();
    if (tr.left < sr.left || tr.right > sr.right) strip.scrollLeft += (tr.left - sr.left) - (sr.width - tr.width) / 2;
  }
  function show(i) {
    i = clamp(i);
    if (i === cur) return;
    cur = i;
    var s = slides[i];
    img.src = s.img;
    img.alt = 'Slide ' + (i + 1) + ' of ' + N + ': ' + s.name;
    text.textContent = s.text;
    count.textContent = (i + 1) + ' / ' + N;
    title.textContent = s.name;
    part.textContent = s.part;
    prevB.disabled = i === 0;
    nextB.disabled = i === N - 1;
    thumbs.forEach(function (b, k) {
      if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
    });
    if (thumbs[i]) centre(thumbs[i]);
    if (location.hash !== '#' + (i + 1)) history.replaceState(null, '', '#' + (i + 1));
    live.textContent = 'Slide ' + (i + 1) + ' of ' + N + ': ' + s.name;
    document.title = s.name + ' · Slides · Red Shell · Common Errors';
    hold(i + 1);
    hold(i - 1);
  }
  function step(d) { show(cur + d); }

  // The slide takes the column's width, or less when the window is short, so the bar, the whole
  // slide and the strip fit on one screen without scrolling. Full screen fills the screen.
  function fit() {
    var w;
    if (document.fullscreenElement === wrap) {
      w = Math.min(window.innerWidth, window.innerHeight * 16 / 9);
    } else {
      var top = wrap.getBoundingClientRect().top + window.scrollY;
      var below = strip.offsetHeight + (help && help.offsetParent ? help.offsetHeight + 14 : 0) + 14 + 18;
      var room = window.innerHeight - top - below;
      w = Math.min(wrap.clientWidth, Math.max(240, room * 16 / 9));
    }
    stage.style.width = Math.floor(w) + 'px';
  }

  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (wrap.requestFullscreen) wrap.requestFullscreen().catch(function () {});
  }

  prevB.addEventListener('click', function () { step(-1); });
  nextB.addEventListener('click', function () { step(1); });
  fullB.addEventListener('click', toggleFull);
  if (!document.fullscreenEnabled) fullB.hidden = true;
  thumbs.forEach(function (b, k) { b.addEventListener('click', function () { show(k); }); });

  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    var t = e.target, k = e.key;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    // Space and Enter keep their usual job on a focused button or link
    if ((k === ' ' || k === 'Enter') && t && /^(BUTTON|A)$/.test(t.tagName)) return;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || (k === ' ' && !e.shiftKey)) step(1);
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || (k === ' ' && e.shiftKey)) step(-1);
    else if (k === 'Home') show(0);
    else if (k === 'End') show(N - 1);
    else if ((k === 'f' || k === 'F') && document.fullscreenEnabled) toggleFull();
    else return;
    e.preventDefault();
  });

  stage.addEventListener('click', function (e) {
    if (document.fullscreenElement !== wrap) return;
    var r = stage.getBoundingClientRect();
    step(e.clientX - r.left < r.width / 3 ? -1 : 1);
  });

  var sx = null, sy = 0;
  stage.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') { sx = e.clientX; sy = e.clientY; }
  });
  stage.addEventListener('pointerup', function (e) {
    if (sx === null) return;
    var dx = e.clientX - sx, dy = e.clientY - sy;
    sx = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  });
  stage.addEventListener('pointercancel', function () { sx = null; });

  window.addEventListener('hashchange', function () { show(fromHash()); });
  document.addEventListener('fullscreenchange', function () {
    fullB.setAttribute('aria-pressed', document.fullscreenElement === wrap ? 'true' : 'false');
    fit();
  });
  window.addEventListener('resize', fit);

  show(fromHash());
  fit();
  document.documentElement.setAttribute('data-deck', 'ready');
})();
