// MackyOS Window Manager
// Handles window creation, dragging, focusing, closing, resizing

let highestZ = 100;
const openWindows = new Map();
let windowIdCounter = 0;

export function createWindow({ id, title, content, width = 400, height = 300, x, y }) {
  const winId = `win-${windowIdCounter++}`;

  // Default position: cascade from top-left
  const offsetIndex = openWindows.size;
  const posX = x ?? 60 + (offsetIndex % 8) * 30;
  const posY = y ?? 40 + (offsetIndex % 8) * 30;

  const win = document.createElement("div");
  win.className = "os7-window focused";
  win.id = winId;
  win.dataset.appId = id;
  win.style.width = `${width}px`;
  win.style.height = `${height}px`;
  win.style.left = `${posX}px`;
  win.style.top = `${posY}px`;
  win.style.zIndex = ++highestZ;

  win.innerHTML = `
    <div class="window-titlebar">
      <div class="window-close"></div>
      <div class="window-title">${title}</div>
    </div>
    <div class="window-body">
      <div class="app-content">${content}</div>
    </div>
    <div class="window-resize"></div>
  `;

  // Focus on click
  win.addEventListener("mousedown", () => focusWindow(winId));

  // Close button
  win.querySelector(".window-close").addEventListener("click", (e) => {
    e.stopPropagation();
    closeWindow(winId);
  });

  // Dragging
  setupDrag(win);

  // Resizing
  setupResize(win);

  document.getElementById("desktop").appendChild(win);

  // Unfocus all others
  unfocusAll();
  win.classList.add("focused");

  openWindows.set(winId, { appId: id, element: win });
  return winId;
}

export function closeWindow(winId) {
  const info = openWindows.get(winId);
  if (info) {
    info.element.remove();
    openWindows.delete(winId);
  }
}

export function focusWindow(winId) {
  unfocusAll();
  const info = openWindows.get(winId);
  if (info) {
    info.element.style.zIndex = ++highestZ;
    info.element.classList.add("focused");
  }
}

function unfocusAll() {
  openWindows.forEach((info) => {
    info.element.classList.remove("focused");
  });
}

function setupDrag(win) {
  const titlebar = win.querySelector(".window-titlebar");
  let isDragging = false;
  let startX, startY, origLeft, origTop;

  titlebar.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("window-close")) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    origLeft = win.offsetLeft;
    origTop = win.offsetTop;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    win.style.left = `${origLeft + dx}px`;
    win.style.top = `${Math.max(20, origTop + dy)}px`; // Don't drag above menu bar
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

function setupResize(win) {
  const handle = win.querySelector(".window-resize");
  let isResizing = false;
  let startX, startY, origW, origH;

  handle.addEventListener("mousedown", (e) => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    origW = win.offsetWidth;
    origH = win.offsetHeight;
    e.preventDefault();
    e.stopPropagation();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    win.style.width = `${Math.max(200, origW + dx)}px`;
    win.style.height = `${Math.max(120, origH + dy)}px`;
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
  });
}

export function getOpenWindows() {
  return openWindows;
}
