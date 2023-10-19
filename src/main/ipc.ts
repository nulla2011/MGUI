import { dialog, ipcMain } from 'electron';
import { settings } from './init';

export default () => {
  ipcMain.handle('form:select-path', () =>
    dialog.showOpenDialog({
      title: '选择文件夹',
      properties: ['openDirectory', 'createDirectory']
    })
  );
  ipcMain.handle('get-settings', () => settings);
};
