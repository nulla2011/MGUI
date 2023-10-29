import { BrowserWindow, Notification, ipcMain } from 'electron';
import { join } from 'path';
import { ArchiveDownloader } from 'minyami';

let downloader: ArchiveDownloader;
ipcMain.on('download-archive', async (_event, url, options, path) => {
  downloader = new ArchiveDownloader(url, {
    ...options,
    output: join(path, options.output)
  });
  await downloader.init();
  downloader.download();
  ipcMain.on('stop-download', () => {
    downloader.downloadTasks = [];
    downloader.checkQueue();
    // downloader.clean();
  });
  downloader.on('finished', () => {
    new Notification({ title: `${options.output} 下载成功` }).show();
    BrowserWindow.fromId(1)!.webContents.send('download-finish');
  });
  downloader.on('downloaded', () => {});
  downloader.on(
    'critical-error',
    () => new Notification({ title: '发生错误', body: '请检查日志' })
  );
  downloader.on('chunk-downloaded', (currentChunkInfo) => {
    BrowserWindow.fromId(1)!.webContents.send('chunk-info', currentChunkInfo);
  });
});