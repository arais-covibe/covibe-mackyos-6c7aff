// About This Mac
export const aboutApp = {
  id: "about",
  title: "About This Mac",
  icon: "🖥️",
  defaultWidth: 320,
  defaultHeight: 240,
  render: () => `
    <div class="about-box">
      <div class="logo">🍎</div>
      <h1>MackyOS</h1>
      <p>System 7.5.3</p>
      <div class="version">Built with ❤️ at CoVibe Hackathon</div>
      <hr>
      <p><strong>MackyOS Computer</strong></p>
      <p>Built-in Memory: 640K</p>
      <div class="version">© 2026 CoVibe Team</div>
    </div>
  `,
};
