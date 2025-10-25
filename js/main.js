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

/* Print functionality for invitation card */
(function setupPrintFunction() {
  var printBtn = document.getElementById('print-btn');
  if (!printBtn) return;

  printBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Get the invitation card element
    var invitationCard = document.querySelector('.invitation-card');
    if (!invitationCard) return;
    
    // Create a new window for printing
    var printWindow = window.open('', '_blank', 'width=800,height=600');
    
    // Create the print content with proper CSS links
    var printContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Pranshi's 1st Birthday Invitation</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Quicksand:wght@400;600;700&family=Great+Vibes&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/animations.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/print.css">
      </head>
      <body>
        <div class="card-hero">
          <div class="container">
            ${invitationCard.outerHTML}
          </div>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = function() {
      setTimeout(function() {
        printWindow.print();
        printWindow.close();
      }, 1000);
    };
  });
})();

