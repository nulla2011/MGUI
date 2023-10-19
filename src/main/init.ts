import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { outputJSONSync, readJSONSync } from 'fs-extra';
import defaultSettings from './defaultSettings';

let settings: Record<string, string | number | boolean>;
const settingFile = path.join(app.getPath('userData'), 'settings.json');
if (!fs.existsSync(settingFile)) {
  outputJSONSync(settingFile, defaultSettings, { spaces: 2 });
  settings = defaultSettings;
} else {
  settings = readJSONSync(settingFile);
}
export { settings };
