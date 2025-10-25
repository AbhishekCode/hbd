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


/* Print handler for invitation card */
(function setupPrintButton() {
  var btn = document.getElementById('btnPrintCard');
  if (!btn) return;
  btn.addEventListener('click', function() {
    var card = document.querySelector('.invitation-card');
    if (!card) return window.print();

    // Prefer a single-page export using html2canvas + jsPDF (bundled by html2pdf)
    var hasCanvas = !!(window.html2canvas);
    var JsPDFCtor = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);

    if (hasCanvas && JsPDFCtor) {
      card.classList.add('exporting');
      window.html2canvas(card, { scale: 2, useCORS: true, backgroundColor: '#ffffff', foreignObjectRendering: true })
        .then(function(canvas) {
          var imgData = canvas.toDataURL('image/jpeg', 0.98);
          var pdf = new JsPDFCtor({ unit: 'mm', format: 'a4', orientation: 'portrait' });
          var pageWidth = pdf.internal.pageSize.getWidth();
          var pageHeight = pdf.internal.pageSize.getHeight();
          var margin = 5; // mm
          var maxW = pageWidth - margin * 2;
          var maxH = pageHeight - margin * 2;

          var imgW = canvas.width;
          var imgH = canvas.height;
          var ratio = Math.min(maxW / imgW, maxH / imgH);
          var renderW = imgW * ratio;
          var renderH = imgH * ratio;
          var x = (pageWidth - renderW) / 2;
          var y = (pageHeight - renderH) / 2;

          pdf.addImage(imgData, 'JPEG', x, y, renderW, renderH);
          if (typeof pdf.getNumberOfPages === 'function' && typeof pdf.deletePage === 'function') {
            var pages = pdf.getNumberOfPages();
            for (var p = pages; p > 1; p--) { pdf.deletePage(p); }
          }
          pdf.save('Pranshi-1st-Birthday-Invitation.pdf');
        })
        .catch(function() {
          // Fallback to browser print if anything fails
          window.print();
        })
        .finally(function() {
          card.classList.remove('exporting');
        });
    } else if (window.html2pdf) {
      // Secondary fallback to html2pdf default flow
      var opt = {
        margin:       [5, 5, 5, 5],
        filename:     'Pranshi-1st-Birthday-Invitation.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff', foreignObjectRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'] }
      };

      card.classList.add('exporting');
      window.html2pdf().set(opt).from(card).save().then(function(){
        card.classList.remove('exporting');
      }).catch(function(){
        card.classList.remove('exporting');
      });
    } else {
      window.print();
    }
  });
})();
