/* Intersection Observer for reveal-on-scroll */
(function setupRevealOnScroll() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function(el) {
    observer.observe(el);
  });
})();

/* Smooth scroll for same-page links */
(function setupSmoothScroll() {
  function isSamePageLink(link) {
    return link.getAttribute('href') && link.getAttribute('href').startsWith('#');
  }

  Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function(link) {
    link.addEventListener('click', function(e) {
      if (!isSamePageLink(link)) return;
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* Confetti burst on page load */
(function launchConfetti() {
  var root = document.getElementById('confetti-root');
  if (!root) return;

  var colors = ['#ffd93d', '#a8e6cf', '#ffb4b4', '#e8b4f0', '#fff'];
  var count = Math.min(140, Math.floor(window.innerWidth / 6));

  for (var i = 0; i < count; i++) {
    var piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.setProperty('--x', (Math.random() * 60 - 30) + 'px');
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = (6 + Math.random() * 3) + 's';
    piece.style.animationDelay = (Math.random() * 0.6) + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '3px' : '50%';
    root.appendChild(piece);
  }

  setTimeout(function() {
    while (root.firstChild) root.removeChild(root.firstChild);
  }, 10000);
})();

