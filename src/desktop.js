// MackyOS Desktop Shell
// Menu bar, desktop icons, app launching, boot screen, Apple menu

import { createWindow } from "./windowManager.js";
import { apps } from "./apps/index.js";

export function initDesktop() {
  const desktop = document.getElementById("desktop");

  // Show boot screen first
  showBootScreen(desktop, () => {
    buildDesktop(desktop);
  });
}

function showBootScreen(desktop, onComplete) {
  const boot = document.createElement("div");
  boot.className = "boot-screen";
  boot.innerHTML = `
    <div class="boot-content">
      <div class="boot-logo">🍎</div>
      <div class="boot-name">MackyOS</div>
      <div class="boot-bar-container">
        <div class="boot-bar"></div>
      </div>
      <div class="boot-text">Starting up...</div>
    </div>
  `;
  desktop.appendChild(boot);

  // Animate boot bar
  const bar = boot.querySelector(".boot-bar");
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        boot.classList.add("boot-fade");
        setTimeout(() => {
          boot.remove();
          onComplete();
        }, 500);
      }, 300);
    }
    bar.style.width = `${progress}%`;
  }, 200);
}

function buildDesktop(desktop) {
  // Create menu bar
  const menuBar = document.createElement("div");
  menuBar.className = "menu-bar";
  menuBar.innerHTML = `
    <div class="apple-menu-wrapper">
      <span class="apple-menu">&#63743;</span>
      <div class="apple-dropdown">
        <div class="dropdown-item" data-action="about">About This Mac...</div>
        <div class="dropdown-divider"></div>
        ${apps.map((a) => `<div class="dropdown-item" data-app="${a.id}">${a.title}</div>`).join("")}
        <div class="dropdown-divider"></div>
        <div class="dropdown-item" data-action="restart">Restart</div>
        <div class="dropdown-item" data-action="shutdown">Shut Down</div>
      </div>
    </div>
    <span class="menu-item">File</span>
    <span class="menu-item">Edit</span>
    <span class="menu-item">View</span>
    <span class="menu-item">Special</span>
    <span class="menu-clock"></span>
  `;
  desktop.appendChild(menuBar);

  // Apple menu toggle
  const appleBtn = menuBar.querySelector(".apple-menu-wrapper");
  const dropdown = menuBar.querySelector(".apple-dropdown");

  appleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("visible");
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("visible");
  });

  // Apple menu actions
  dropdown.addEventListener("click", (e) => {
    const item = e.target.closest(".dropdown-item");
    if (!item) return;

    const action = item.dataset.action;
    const appId = item.dataset.app;

    if (action === "about") {
      const aboutApp = apps.find((a) => a.id === "about");
      if (aboutApp) openApp(aboutApp);
    } else if (action === "restart") {
      location.reload();
    } else if (action === "shutdown") {
      desktop.innerHTML = "";
      desktop.style.background = "#000";
    } else if (appId) {
      const app = apps.find((a) => a.id === appId);
      if (app) openApp(app);
    }

    dropdown.classList.remove("visible");
  });

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

    icon.addEventListener("click", (e) => {
      document.querySelectorAll(".desktop-icon").forEach((i) => i.classList.remove("selected"));
      icon.classList.add("selected");
      e.stopPropagation();
    });

    icon.addEventListener("dblclick", (e) => {
      openApp(app);
      e.stopPropagation();
    });

    iconsContainer.appendChild(icon);
  });

  desktop.appendChild(iconsContainer);

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
