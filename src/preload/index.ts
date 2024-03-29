import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  downloadArchive: (url, options, path) => ipcRenderer.send('download-archive', url, options, path),
  stopDownload: () => ipcRenderer.send('stop-download'),
  selectPath: () => ipcRenderer.invoke('select-path'),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  setSettings: (settings) => ipcRenderer.send('set-settings', settings),
  setProxy: (url) => ipcRenderer.send('set-proxy', url),
  downloadFinished: (callback) => ipcRenderer.on('download-finish', callback),
  m3u8Finished: (callback) => ipcRenderer.on('m3u8-fetch-finished', callback),
  getChunkInfo: (callback) => ipcRenderer.on('chunk-info', callback),
  logInfo: (callback) => ipcRenderer.on('log:info', callback),
  logWarn: (callback) => ipcRenderer.on('log:warn', callback),
  logErr: (callback) => ipcRenderer.on('log:err', callback),
  openExternal: (url) => ipcRenderer.send('open-external', url)
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
