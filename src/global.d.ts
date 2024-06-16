interface Window {
  electronAPI: {
    getWindowType: (callback: (windowType: string) => void) => void;
    getExpressPort: () => string;
    getHostname: () => string;
    getAppVersion: () => string;
    getPrinters: () => Promise<printerType>;
    restartApp: () => void;
    printRunSheet: (arg: PrinterModelForElectronType) => void;
    onPrintRunSheetReply: (callback: (event: Electron.IpcRendererEvent, response: any) => void) => void;
    printLabels: (arg: PrinterModelForElectronType) => void;
    onPrintLabelsReply: (callback: (event: Electron.IpcRendererEvent, response: any) => void) => void;
    updateStore: (storeSnapshot: any) => void;
    onStoreUpdated: (callback: (event: Electron.IpcRendererEvent, storeSnapshot: any) => void) => void;
    removeStoreUpdatedListener: (callback: (event: Electron.IpcRendererEvent, storeSnapshot: any) => void) => void;
    onUpdateDownloaded: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => void;
    onAutoUpdateError: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => void;
    removeUpdateDownloadedListener: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => void;
    removeAutoUpdateErrorListener: (callback: (event: Electron.IpcRendererEvent, message: string) => void) => void;
  };
}

// Define the types used in the interfaces
type PrinterModelForElectronType = {
  // Define the properties based on your specific requirements
};

type printerType = {
  name: string;
  displayName: string;
}[];
