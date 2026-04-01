// MackyOS Desktop Shell
// Menu bar, desktop icons, and app launching

import { createWindow } from "./windowManager.js";
import { apps } from "./apps/index.js";

export function initDesktop() {
  const desktop = document.getElementById("desktop");

  // Create menu bar
  const menuBar = document.createElement("div");
  menuBar.className = "menu-bar";
  menuBar.innerHTML = `
    <span class="apple-menu">&#63743;</span>
    <span class="menu-item">File</span>
    <span class="menu-item">Edit</span>
    <span class="menu-item">View</span>
    <span class="menu-item">Special</span>
    <span class="menu-clock"></span>
  `;
  desktop.appendChild(menuBar);

  // Update clock
  function updateClock() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    menuBar.querySelector(".menu-clock").textContent = `${h12}:${m} ${ampm}`;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Create desktop icons
  const iconsContainer = document.createElement("div");
  iconsContainer.className = "desktop-icons";

  apps.forEach((app) => {
    const icon = document.createElement("div");
    icon.className = "desktop-icon";
    icon.innerHTML = `
      <div class="icon-img">${app.icon}</div>
      <div class="icon-label">${app.title}</div>
    `;

    // Single click to select
    icon.addEventListener("click", (e) => {
      document.querySelectorAll(".desktop-icon").forEach((i) => i.classList.remove("selected"));
      icon.classList.add("selected");
      e.stopPropagation();
    });

    // Double click to open
    icon.addEventListener("dblclick", (e) => {
      openApp(app);
      e.stopPropagation();
    });

    iconsContainer.appendChild(icon);
  });

  desktop.appendChild(iconsContainer);

  // Click desktop to deselect icons
  desktop.addEventListener("click", () => {
    document.querySelectorAll(".desktop-icon").forEach((i) => i.classList.remove("selected"));
  });
}

function openApp(app) {
  createWindow({
    id: app.id,
    title: app.title,
    content: app.render(),
    width: app.defaultWidth || 400,
    height: app.defaultHeight || 300,
  });
}
