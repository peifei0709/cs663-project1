(function () {
  const pet = document.getElementById('pet-marker');
  const status = document.getElementById('demo-status');
  const timerText = document.getElementById('dwell-time');
  let dwell = 0;
  let interval = null;

  function clearTimer() {
    if (interval) clearInterval(interval);
    interval = null;
    dwell = 0;
    if (timerText) timerText.textContent = '0.0';
  }

  function startTimer() {
    clearTimer();
    interval = setInterval(() => {
      dwell += 0.1;
      timerText.textContent = dwell.toFixed(1);
      if (dwell >= 2.0) {
        status.textContent = 'ALERT: tracked pet has remained inside the restricted area for at least 2 seconds.';
        status.style.background = '#ffe7e7';
        status.style.color = '#8f2c2c';
      }
    }, 100);
  }

  function move(outside) {
    if (!pet || !status) return;
    if (outside) {
      pet.style.left = '12%';
      pet.style.top = '64%';
      pet.classList.remove('in-zone');
      status.textContent = 'Pet ID #3 is outside the restricted area.';
      status.style.background = '#eaf6ef';
      status.style.color = '#245c3e';
      clearTimer();
    } else {
      pet.style.left = '72%';
      pet.style.top = '56%';
      pet.classList.add('in-zone');
      status.textContent = 'Pet ID #3 entered the restricted area. Dwell timer started.';
      status.style.background = '#fff4db';
      status.style.color = '#6e561f';
      startTimer();
    }
  }

  document.getElementById('move-inside')?.addEventListener('click', () => move(false));
  document.getElementById('move-outside')?.addEventListener('click', () => move(true));
  document.getElementById('reset-demo')?.addEventListener('click', () => move(true));

  const quiz = document.getElementById('quiz-form');
  const result = document.getElementById('quiz-result');
  if (quiz && result) {
    quiz.addEventListener('submit', e => {
      e.preventDefault();
      const answers = { q1: 'b', q2: 'c', q3: 'b', q4: 'c', q5: 'a' };
      let score = 0;
      Object.entries(answers).forEach(([q, a]) => {
        const selected = quiz.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === a) score++;
      });
      result.textContent = `You answered ${score} of 5 questions correctly.`;
      result.style.color = score >= 4 ? '#24734b' : '#8b5b1c';
    });
  }
})();
