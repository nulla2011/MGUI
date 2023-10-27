import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { ensureDir, outputJSONSync, readJSONSync } from 'fs-extra';
import defaultSettings from './defaultSettings';
import { bootstrap } from 'global-agent';

bootstrap();
type Isettings = typeof defaultSettings & Record<string, string | number | boolean>;
let settings: Isettings;
const settingFile = path.join(app.getPath('userData'), 'settings.json');
if (!fs.existsSync(settingFile)) {
  const defaultDownloadPath = path.join(app.getPath('downloads'), 'minyami');
  const tempDir = app.getPath('temp');
  outputJSONSync(settingFile, Object.assign(defaultSettings, { defaultDownloadPath, tempDir }), {
    spaces: 2
  });
  settings = defaultSettings;
} else {
  settings = readJSONSync(settingFile);
}
ensureDir(settings.defaultDownloadPath as string);
if (settings.enableProxy) {
  global.GLOBAL_AGENT.HTTP_PROXY = settings.proxy ? `http://${settings.proxy}` : null;
}
export { settings };
