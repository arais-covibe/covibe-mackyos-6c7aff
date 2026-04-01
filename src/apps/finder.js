// Finder
export const finderApp = {
  id: "finder",
  title: "Macintosh HD",
  icon: "💾",
  defaultWidth: 420,
  defaultHeight: 320,
  render: () => `
    <ul class="finder-list">
      <li><span class="item-icon">📁</span> System Folder</li>
      <li><span class="item-icon">📁</span> Applications</li>
      <li><span class="item-icon">📁</span> Documents</li>
      <li><span class="item-icon">📁</span> Desktop</li>
      <li><span class="item-icon">📄</span> Read Me</li>
      <li><span class="item-icon">📄</span> Welcome to MackyOS</li>
      <li><span class="item-icon">🗑️</span> Trash</li>
    </ul>
  `,
};
