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
    box.showModal();
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
