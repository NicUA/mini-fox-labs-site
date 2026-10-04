(() => {
  const buy = document.getElementById('studioBuy');
  const dialog = document.getElementById('studioPurchaseDialog');
  if (!buy || !dialog) return;
  // Deliberately no checkout URL, payment request or license issuance before launch.
  buy.addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('close', () => buy.focus());
})();
