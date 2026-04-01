// About This Mac
export const aboutApp = {
  id: "about",
  title: "About This Macintosh",
  icon: "🖥️",
  defaultWidth: 400,
  defaultHeight: 280,
  render: () => `
    <div class="app-about">
      <div class="about-icon">
        <div class="about-mac-icon">🖥</div>
      </div>
      <div class="about-info">
        <h2>MackyOS</h2>
        <p class="about-version">System 7.5.3</p>
        <div class="about-divider"></div>
        <p>Built with ♥ at CoVibe Hackathon</p>
        <p class="about-detail">Total Memory: 8 MB</p>
        <p class="about-detail">Largest Unused Block: 4,096K</p>
        <div class="about-memory-bar">
          <div class="about-memory-used" style="width: 62%">
            <span>System: 5 MB</span>
          </div>
        </div>
        <p class="about-detail about-copyright">© 2026 CoVibe Technologies</p>
      </div>
    </div>
  `,
};
