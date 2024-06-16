// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.ts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getExpressPort: 





  // getExpressPort: () => ipcRenderer.sendSync('get-express-port'),
  // getHostname: () => ipcRenderer.sendSync('get-hostname'),
  // getAppVersion: () => ipcRenderer.sendSync('get-app-version'),
  // getPrinters: async () => {
  //   console.log("GET PRINTERS")
  //   const printers = await ipcRenderer.invoke('get-printers')
  //   return printers
  // },
  // restartApp: () => ipcRenderer.send('restartApp'),
  // printRunSheet: (arg: any) => ipcRenderer.send('print-run-sheet', arg),
  // onPrintRunSheetReply: (callback: (event: Electron.IpcRendererEvent, response: any) => void) => ipcRenderer.on('print-run-sheet-reply', callback),
  // printLabels: (arg: any) => ipcRenderer.send('print-labels', arg),
  // onPrintLabelsReply: (callback: (event: Electron.IpcRendererEvent, response: any) => void) => ipcRenderer.on('print-labels-reply', callback),
  // updateStore: (storeSnapshot: any) => ipcRenderer.send('update-store', storeSnapshot),
  // onStoreUpdated: (callback: (event: Electron.IpcRendererEvent, storeSnapshot: any) => void) => ipcRenderer.on('store-updated', callback),
  // getWindowType: (callback: (windowType: string) => void) => ipcRenderer.on('set-window-type', (event, windowType) => callback(windowType)),
  // onUpdateDownloaded: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => {
  //   ipcRenderer.on('updateDownloaded', callback);
  // },
  // onAutoUpdateError: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => {
  //   ipcRenderer.on('autoUpdateError', callback);
  // },
  // removeUpdateDownloadedListener: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => {
  //   ipcRenderer.removeListener('updateDownloaded', callback);
  // },
  // removeAutoUpdateErrorListener: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => {
  //   ipcRenderer.removeListener('autoUpdateError', callback);
  // },
});
