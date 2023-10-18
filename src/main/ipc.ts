import { dialog, ipcMain } from 'electron';

export default () => {
  ipcMain.handle('form-select-path', () =>
    dialog.showOpenDialog({
      title: '选择文件夹',
      properties: ['openDirectory', 'createDirectory']
    })
  );
};
