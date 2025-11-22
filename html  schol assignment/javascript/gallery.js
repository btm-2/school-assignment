// minimal script: open modal on image click, zoom controls, close
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.getElementById('closeBtn');
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');
  const resetZoom = document.getElementById('resetZoom');
  let scale = 1;

  // open modal when any gallery image clicked
  document.querySelectorAll('.gallery img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
      scale = 1;
      modalImg.style.transform = `scale(${scale})`;
    });
  });

  // close
  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  // close when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // zoom controls
  zoomIn.addEventListener('click', () => { scale = Math.min(3, scale + 0.25); modalImg.style.transform = `scale(${scale})`; });
  zoomOut.addEventListener('click', () => { scale = Math.max(0.5, scale - 0.25); modalImg.style.transform = `scale(${scale})`; });
  resetZoom.addEventListener('click', () => { scale = 1; modalImg.style.transform = `scale(${scale})`; });
});