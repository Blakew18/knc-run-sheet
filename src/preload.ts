// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.ts

import { printRunSheet } from "./frontend/providers/Services";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // Invokes - We Want to Wait for the Data to return.
  getAppVersion: async () => {
    const appVersion = await ipcRenderer.invoke("get-app-version");
    return appVersion;
  },
  getExpressPort: async () => {
    const expressPort = await ipcRenderer.invoke("get-express-port");
    return expressPort;
  },
  getHostName: async () => {
    const hostname = await ipcRenderer.invoke("get-hostname");
    return hostname;
  },
  getPrinters: async () => {
    const printers = await ipcRenderer.invoke("get-printers");
    return printers;
  },
  getWindowType: async () => {
    const windowType = await ipcRenderer.invoke("get-window-type");
    return windowType;
  },
  printRunSheet: async (printSettings: PrinterModelForElectronType) => {
    const print = await ipcRenderer.invoke("print-run-sheet", printSettings);
    return print;
  },
  printLabels: async (printSettings: PrinterModelForElectronType) => {
    const print = await ipcRenderer.invoke("print-labels", printSettings);
    return print;
  },

  //Sends - We Don't Need to Wait for the Data
  // getWindowType: (callback: (windowType: string) => void) =>
  //   ipcRenderer.on("set-window-type", (event, windowType) =>
  //     callback(windowType)
  //   ),
  restartApp: () => ipcRenderer.send("restartApp"),
  updateStore: (storeSnapshot: any) =>
    ipcRenderer.send("update-store", storeSnapshot),

  //Listeners - We Want to Wait for the Data that is initialised by the server
  onStoreUpdated: (
    callback: (event: Electron.IpcRendererEvent, storeSnapshot: any) => void
  ) => ipcRenderer.on("store-updated", callback),
  onUpdateDownloaded: (
    callback: (event: Electron.IpcRendererEvent, message: string) => void
  ) => {
    ipcRenderer.on("updateDownloaded", callback);
  },
  onAutoUpdateError: (
    callback: (event: Electron.IpcRendererEvent, message: string) => void
  ) => {
    ipcRenderer.on("autoUpdateError", callback);
  },
  removeUpdateDownloadedListener: (
    callback: (event: Electron.IpcRendererEvent, message: string) => void
  ) => {
    ipcRenderer.removeListener("updateDownloaded", callback);
  },
  removeAutoUpdateErrorListener: (
    callback: (event: Electron.IpcRendererEvent, message: string) => void
  ) => {
    ipcRenderer.removeListener("autoUpdateError", callback);
  },
});
