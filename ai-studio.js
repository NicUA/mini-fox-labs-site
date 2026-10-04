(() => {
  const buy = document.getElementById('studioBuy');
  const dialog = document.getElementById('studioPurchaseDialog');
  // Deliberately no checkout URL, payment request or license issuance before launch.
  if (buy && dialog) {
    buy.addEventListener('click', () => dialog.showModal());
    dialog.addEventListener('close', () => buy.focus());
  }

  const images = [...document.querySelectorAll('.studio-hero-shot img, .studio-gallery img')];
  if (!images.length) return;
  const viewer = document.createElement('dialog');
  viewer.className = 'studio-image-viewer';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'studio-image-close';
  close.textContent = '×';
  const fullImage = document.createElement('img');
  viewer.append(close, fullImage);
  document.body.append(viewer);
  let opener;
  function openImage(image, trigger) {
    opener = trigger;
    fullImage.src = image.currentSrc || image.src;
    fullImage.alt = image.alt;
    viewer.setAttribute('aria-label', image.alt);
    close.setAttribute('aria-label', document.documentElement.lang === 'ru' ? 'Закрыть изображение' : 'Close image');
    viewer.showModal();
    document.body.classList.add('studio-viewer-open');
    close.focus();
  }
  images.forEach(image => {
    let trigger = image.closest('a');
    if (!trigger) {
      trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'studio-image-trigger';
      image.replaceWith(trigger);
      trigger.append(image);
      trigger.setAttribute('aria-label', image.alt);
    }
    trigger.removeAttribute('target');
    trigger.removeAttribute('rel');
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.addEventListener('click', event => {
      event.preventDefault();
      openImage(image, trigger);
    });
  });
  close.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('studio-viewer-open');
    fullImage.removeAttribute('src');
    opener?.focus();
  });
})();
