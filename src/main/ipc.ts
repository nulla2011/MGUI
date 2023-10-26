import { app, dialog, ipcMain } from 'electron';
import { outputJSON } from 'fs-extra';
import path from 'path';
import { settings } from './init';

export default () => {
  ipcMain.handle('form:select-path', () =>
    dialog.showOpenDialog({
      title: '选择文件夹',
      properties: ['openDirectory', 'createDirectory']
    })
  );
  ipcMain.handle('get-settings', () => settings);
  ipcMain.on('set-settings', (_event, settings) =>
    outputJSON(path.join(app.getPath('userData'), 'settings.json'), settings, { spaces: 2 })
  );
};
