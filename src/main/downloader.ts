import { BrowserWindow, Notification, ipcMain } from 'electron';
import { join } from 'path';
import { ArchiveDownloader } from 'minyami';

// let downloader: ArchiveDownloader;
ipcMain.on('download-archive', async (_event, url, options, path) => {
  global.downloader = new ArchiveDownloader(url, {
    ...options,
    output: join(path, options.output)
  });
  await global.downloader.init();
  global.downloader.download();
  global.downloader.on('finished', () => {
    new Notification({ title: `${options.output} 下载成功` }).show();
    BrowserWindow.fromId(1)!.webContents.send('download-finish');
  });
  global.downloader.on('downloaded', () => {});
  global.downloader.on(
    'critical-error',
    () => new Notification({ title: '发生错误', body: '请检查日志' })
  );
  global.downloader.on('chunk-downloaded', (currentChunkInfo) => {
    BrowserWindow.fromId(1)!.webContents.send('chunk-info', currentChunkInfo);
  });
});
ipcMain.on('stop-download', () => {
  global.downloader.downloadTasks = [];
  global.downloader.checkQueue();
  // downloader.clean();
});
