// Control Panel
const panels = [
  { name: "General", icon: "⚙️" },
  { name: "Monitors", icon: "🖥️" },
  { name: "Sound", icon: "🔊" },
  { name: "Keyboard", icon: "⌨️" },
  { name: "Mouse", icon: "🖱️" },
  { name: "Network", icon: "🌐" },
  { name: "Date & Time", icon: "🕐" },
  { name: "Memory", icon: "💾" },
];

export const controlPanelApp = {
  id: "controlpanel",
  title: "Control Panels",
  icon: "⚙️",
  defaultWidth: 420,
  defaultHeight: 320,
  render: () => {
    const panelItems = panels
      .map(
        (p) => `
        <div class="app-cp-item">
          <div class="app-cp-icon">${p.icon}</div>
          <div class="app-cp-name">${p.name}</div>
        </div>
      `
      )
      .join("");

    return `
      <div class="app-controlpanel">
        <div class="app-cp-grid">
          ${panelItems}
        </div>
      </div>
    `;
  },
};
