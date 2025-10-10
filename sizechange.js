const resizableBox = document.getElementById('resizableBox');

let isResizing = false;
let startX, startY;
let startWidth, startHeight;
const CORNER_TOLERANCE = 15;

function isMouseInCorner(e) {
  const rect = resizableBox.getBoundingClientRect();
  const nearRight = (rect.right - e.clientX) <= CORNER_TOLERANCE;
  const nearBottom = (rect.bottom - e.clientY) <= CORNER_TOLERANCE;
  return nearRight && nearBottom;
}

resizableBox.addEventListener('mousemove', (e) => {
  if (isResizing) return;

  if (isMouseInCorner(e)) {
    resizableBox.classList.add('resizing-cursor');
  } else {
    resizableBox.classList.remove('resizing-cursor');
  }
});

resizableBox.addEventListener('mousedown', (e) => {
  if (!isMouseInCorner(e)) {
    return;
  }

  e.preventDefault();
  isResizing = true;
  startX = e.clientX;
  startY = e.clientY;

  startWidth = resizableBox.offsetWidth;
  startHeight = resizableBox.offsetHeight;

  document.addEventListener('mousemove', handleResize);
  document.addEventListener('mouseup', handleMouseUp);

  document.body.style.userSelect = 'none';
});

function handleResize(e) {
  if (!isResizing) return;

  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  const newWidth = Math.max(100, startWidth + deltaX);
  const newHeight = Math.max(50, startHeight + deltaY);

  resizableBox.style.width = newWidth + 'px';
  resizableBox.style.height = newHeight + 'px';
}

function handleMouseUp() {
  if (!isResizing) return;

  isResizing = false;
  document.body.style.userSelect = '';

  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', handleMouseUp);

  console.log("Зміна розміру завершена.");
}