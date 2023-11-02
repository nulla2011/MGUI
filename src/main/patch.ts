import { BrowserWindow } from 'electron';

const originInfo = console.info;
const originWarn = console.warn;
console.info = (log) => {
  originInfo(log);
  if (typeof log === 'string') {
    if (log.startsWith('[MINYAMI][INFO]')) {
      BrowserWindow.fromId(1)!.webContents.send('log:info', log.replace('[MINYAMI]', ''));
      const message = log.replace('[MINYAMI][INFO] ', '');
      if (message.startsWith('Start downloading')) {
        BrowserWindow.fromId(1)!.webContents.send('m3u8-fetch-finished');
      }
    } else if (log.startsWith('[MINYAMI][ERROR]')) {
      BrowserWindow.fromId(1)!.webContents.send('log:err', log.replace('[MINYAMI]', ''));
    }
  }
};
console.warn = (log) => {
  originWarn(log);
  if (typeof log === 'string') {
    if (log.startsWith('[MINYAMI][WARN]')) {
      BrowserWindow.fromId(1)!.webContents.send('log:warn', log.replace('[MINYAMI]', ''));
    }
  }
};
