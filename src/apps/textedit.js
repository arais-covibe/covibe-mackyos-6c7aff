// TextEdit (SimpleText)
export const texteditApp = {
  id: "textedit",
  title: "Untitled",
  icon: "📝",
  defaultWidth: 460,
  defaultHeight: 360,
  render: () => `
    <div class="app-textedit">
      <div class="textedit-toolbar">
        <select class="textedit-font">
          <option>Chicago</option>
          <option>Geneva</option>
          <option>Monaco</option>
          <option>New York</option>
          <option>Courier</option>
        </select>
        <select class="textedit-size">
          <option>9</option>
          <option selected>12</option>
          <option>14</option>
          <option>18</option>
          <option>24</option>
        </select>
        <div class="textedit-style-buttons">
          <button class="textedit-btn" title="Bold"><b>B</b></button>
          <button class="textedit-btn" title="Italic"><i>I</i></button>
          <button class="textedit-btn" title="Underline"><u>U</u></button>
        </div>
      </div>
      <div class="textedit-ruler">
        <div class="ruler-marks"></div>
      </div>
      <div class="textedit-body" contenteditable="true" spellcheck="false">Welcome to MackyOS SimpleText!

This is a classic Macintosh text editor.
You can type anything here.

MackyOS is a tribute to the classic Macintosh
System 7 operating system, built during a
CoVibe hackathon session.</div>
    </div>
  `,
};
