// TextEdit (SimpleText)
export const texteditApp = {
  id: "textedit",
  title: "Untitled",
  icon: "📝",
  defaultWidth: 480,
  defaultHeight: 360,
  render: () => `
    <textarea class="textedit-area" placeholder="Start typing...">Welcome to MackyOS!

This is SimpleText, the classic text editor.
You can type anything here.

MackyOS is a tribute to the classic Macintosh
System 7 operating system, built during a
CoVibe hackathon session.</textarea>
  `,
};
