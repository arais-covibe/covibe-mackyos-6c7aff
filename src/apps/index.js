// App Registry - All apps are registered here
// Agent B: Add your app imports and include them in the apps array

import { aboutApp } from "./about.js";
import { finderApp } from "./finder.js";
import { texteditApp } from "./textedit.js";
import { controlPanelApp } from "./controlpanel.js";

export const apps = [
  finderApp,
  aboutApp,
  texteditApp,
  controlPanelApp,
];
