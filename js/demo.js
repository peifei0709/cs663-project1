(function () {
  const quiz = document.getElementById('quiz-form');
  const result = document.getElementById('quiz-result');

  if (!quiz || !result) return;

  const answers = {
    q1: {
      answer: 'b',
      explanation:
        'Object detection locates and classifies an object in an individual frame. Tracking connects detections over time and tries to preserve the same object ID across video frames.'
    },
    q2: {
      answer: 'b',
      explanation:
        'The restricted area is a region of interest defined using image coordinates. In the notebook demo it is a rectangular polygon, not an object class learned by YOLO.'
    },
    q3: {
      answer: 'a',
      explanation:
        'The bottom-center of the bounding box is closer to the floor than the box center, so it is a useful simple approximation when the restricted zone represents a physical area on the floor.'
    },
    q4: {
      answer: 'b',
      explanation:
        'A dwell-time threshold allows the system to ignore very brief boundary crossings. The alert is triggered only when the same tracked dog remains inside long enough.'
    },
    q5: {
      answer: 'b',
      explanation:
        'YOLO is primarily an object detector. Behaviors such as walking, standing, or lying often depend on motion and temporal information across several frames.'
    }
  };

  quiz.addEventListener('submit', event => {
    event.preventDefault();
    let score = 0;

    Object.entries(answers).forEach(([q, info]) => {
      const selected = quiz.querySelector(`input[name="${q}"]:checked`);
      const questionBox = quiz.querySelector(`[data-question="${q}"]`);
      const feedback = document.getElementById(`feedback-${q}`);
      const isCorrect = selected && selected.value === info.answer;

      questionBox?.classList.remove('correct', 'wrong');
      feedback?.classList.remove('correct', 'wrong');

      if (isCorrect) {
        score += 1;
        questionBox?.classList.add('correct');
        feedback?.classList.add('correct');
        feedback.innerHTML = `<strong>Correct.</strong> ${info.explanation}`;
      } else {
        questionBox?.classList.add('wrong');
        feedback?.classList.add('wrong');
        const prefix = selected ? 'Not quite.' : 'No answer selected.';
        feedback.innerHTML = `<strong>${prefix}</strong> ${info.explanation}`;
      }
    });

    result.textContent =
      `You answered ${score} of 5 questions correctly. Review the explanation under any question you missed.`;

    result.style.color = score >= 4 ? '#24734b' : '#8b5b1c';
  });
})();
