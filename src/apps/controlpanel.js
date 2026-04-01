// Control Panel
export const controlPanelApp = {
  id: "controlpanel",
  title: "Control Panels",
  icon: "⚙️",
  defaultWidth: 380,
  defaultHeight: 280,
  render: () => `
    <div class="control-panel">
      <div class="control-panel-item">
        <span class="cp-icon">🖥️</span>
        <span class="cp-label">Monitors</span>
      </div>
      <div class="control-panel-item">
        <span class="cp-icon">🔊</span>
        <span class="cp-label">Sound</span>
      </div>
      <div class="control-panel-item">
        <span class="cp-icon">⌨️</span>
        <span class="cp-label">Keyboard</span>
      </div>
      <div class="control-panel-item">
        <span class="cp-icon">🖱️</span>
        <span class="cp-label">Mouse</span>
      </div>
      <div class="control-panel-item">
        <span class="cp-icon">🌐</span>
        <span class="cp-label">Network</span>
      </div>
      <div class="control-panel-item">
        <span class="cp-icon">🕐</span>
        <span class="cp-label">Date & Time</span>
      </div>
    </div>
  `,
};
