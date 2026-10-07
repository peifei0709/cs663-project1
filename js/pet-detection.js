(function () {
  const upload = document.getElementById('pet-upload');
  const runButton = document.getElementById('run-detection');
  const image = document.getElementById('detector-image');
  const canvas = document.getElementById('detector-canvas');
  const placeholder = document.getElementById('detector-placeholder');
  const status = document.getElementById('detection-status');

  if (!upload || !runButton || !image || !canvas || !status) return;

  const ctx = canvas.getContext('2d');
  const animalClasses = new Set([
    'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe'
  ]);

  let model = null;
  let predictions = [];
  let currentObjectUrl = null;

  function setStatus(message, type) {
    status.textContent = message;
    status.classList.remove('status-good', 'status-warn', 'status-bad');
    if (type) status.classList.add(type);
  }

  function redraw() {
    if (!image.src || !canvas.width || !canvas.height) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const scale = Math.max(2, canvas.width / 420);

    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;

      ctx.lineWidth = scale;
      ctx.strokeStyle = '#137a72';
      ctx.fillStyle = 'rgba(27,127,121,.10)';
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);

      const label = `${prediction.class} ${(prediction.score * 100).toFixed(0)}%`;
      ctx.font = `${Math.max(16, canvas.width / 45)}px Arial`;

      const textWidth = ctx.measureText(label).width;
      const textHeight = Math.max(24, canvas.width / 32);
      const labelY = Math.max(textHeight, y);

      ctx.fillStyle = '#0f5f5a';
      ctx.fillRect(x, labelY - textHeight, textWidth + 12, textHeight);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(label, x + 6, labelY - 6);
    });
  }

  upload.addEventListener('change', () => {
    const file = upload.files && upload.files[0];
    if (!file) return;

    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = URL.createObjectURL(file);

    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      predictions = [];
      placeholder.hidden = true;
      redraw();
      runButton.disabled = false;
      setStatus('Image loaded. Click “Run animal detection.”', 'status-warn');
    };

    image.src = currentObjectUrl;
  });

  runButton.addEventListener('click', async () => {
    if (!image.src) return;

    runButton.disabled = true;
    setStatus(
      model ? 'Running animal detection…' : 'Loading the browser model for the first time…',
      'status-warn'
    );

    try {
      if (!window.cocoSsd) {
        throw new Error('COCO-SSD did not load. Check your internet connection.');
      }

      if (!model) {
        model = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
      }

      const allPredictions = await model.detect(image, 20, 0.45);
      predictions = allPredictions.filter(item => animalClasses.has(item.class));
      redraw();

      if (predictions.length === 0) {
        setStatus(
          'No supported animal was detected with at least 45% confidence. Try a clearer dog or cat photo.',
          'status-bad'
        );
      } else {
        const summary = predictions
          .map(p => `${p.class} ${(p.score * 100).toFixed(0)}%`)
          .join(', ');

        setStatus(
          `Detected ${predictions.length} animal(s): ${summary}.`,
          'status-good'
        );
      }
    } catch (error) {
      console.error(error);
      setStatus(`Detection could not run: ${error.message}`, 'status-bad');
    } finally {
      runButton.disabled = false;
    }
  });
})();
