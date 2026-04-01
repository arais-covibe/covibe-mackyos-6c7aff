// Finder
const files = [
  { name: "System Folder", icon: "📁", type: "folder" },
  { name: "Applications", icon: "📁", type: "folder" },
  { name: "Documents", icon: "📁", type: "folder" },
  { name: "Desktop", icon: "📁", type: "folder" },
  { name: "Read Me", icon: "📄", type: "file" },
  { name: "Welcome to MackyOS", icon: "📄", type: "file" },
  { name: "SimpleText", icon: "📝", type: "app" },
  { name: "Trash", icon: "🗑️", type: "folder" },
];

export const finderApp = {
  id: "finder",
  title: "Macintosh HD",
  icon: "💾",
  defaultWidth: 480,
  defaultHeight: 340,
  render: () => {
    const fileItems = files
      .map(
        (f) => `
        <div class="app-finder-item" data-type="${f.type}">
          <div class="app-finder-icon">${f.icon}</div>
          <div class="app-finder-name">${f.name}</div>
        </div>
      `
      )
      .join("");

    return `
      <div class="app-finder">
        <div class="app-finder-toolbar">
          <div class="finder-item-count">${files.length} items</div>
          <div class="finder-disk-space">42.5 MB available</div>
        </div>
        <div class="app-finder-grid">
          ${fileItems}
        </div>
      </div>
    `;
  },
};
