(function () {
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === file || (file === '' && href === 'index.html')) a.classList.add('active');
  });

  const readBtn = document.querySelector('[data-read-page]');
  const stopBtn = document.querySelector('[data-stop-reading]');

  if (readBtn && 'speechSynthesis' in window) {
    readBtn.addEventListener('click', () => {
      window.speechSynthesis.cancel();
      const main = document.querySelector('main');
      if (!main) return;
      const clone = main.cloneNode(true);
      clone.querySelectorAll('.voice-box, pre, code, button, script, .page-links').forEach(el => el.remove());
      const text = clone.innerText.replace(/\s+/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    });
  }
  if (stopBtn && 'speechSynthesis' in window) {
    stopBtn.addEventListener('click', () => window.speechSynthesis.cancel());
  }
})();
