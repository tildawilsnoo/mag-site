// Click to expand: shows an image as large as the screen allows.
// Click anywhere, press Esc or use × to close.
(function () {
  var imgs = document.querySelectorAll('img.zoom, svg.zoom-svg');
  if (!imgs.length) return;

  var box = document.createElement('dialog');
  box.className = 'zoombox';
  box.setAttribute('aria-label', 'Expanded image');
  box.innerHTML = '<img alt=""><button class="zoombox-x" aria-label="Close">&times;</button>';
  document.body.appendChild(box);
  var big = box.querySelector('img');

  var copy = null;
  function open(el) {
    if (copy) { copy.remove(); copy = null; }
    if (el.tagName.toLowerCase() === 'svg') {
      big.hidden = true;
      copy = el.cloneNode(true);
      copy.removeAttribute('tabindex');
      box.insertBefore(copy, big);
    } else {
      big.hidden = false;
      big.src = el.currentSrc || el.src;
      big.alt = el.alt;
    }
    var w = +el.getAttribute('width') || el.naturalWidth || 16, h = +el.getAttribute('height') || el.naturalHeight || 9;
    if (el.tagName.toLowerCase() === 'svg') { w = 16; h = 9; }
    box.classList.toggle('wide', w > h * 1.2);
    box.showModal();
    box.scrollLeft = 0;
  }

  imgs.forEach(function (el) {
    el.setAttribute('tabindex', '0');
    if (el.tagName.toLowerCase() !== 'svg') el.setAttribute('role', 'button');
    el.addEventListener('click', function () { open(el); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); }
    });
  });

  box.addEventListener('click', function () { box.close(); });
})();

// Scrolling project rows: arrow buttons page through the cards.
(function () {
  document.querySelectorAll('.band-scroll').forEach(function (wrap) {
    var row = wrap.querySelector('.scroller');
    var prev = wrap.querySelector('.prev'), next = wrap.querySelector('.next');
    function update() {
      var max = row.scrollWidth - row.clientWidth;
      prev.hidden = row.scrollLeft <= 2;
      next.hidden = row.scrollLeft >= max - 2;
    }
    function page(dir) {
      var max = row.scrollWidth - row.clientWidth;
      var target = Math.max(0, Math.min(max, row.scrollLeft + dir * row.clientWidth));
      var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      row.scrollTo({ left: target, behavior: smooth ? 'smooth' : 'auto' });
    }
    prev.addEventListener('click', function () { page(-1); });
    next.addEventListener('click', function () { page(1); });
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
