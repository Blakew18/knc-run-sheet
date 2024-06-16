interface Window {
  electronAPI: {
    getWindowType: () => Promise<string>;
    getExpressPort: () => Promise<string>;
    getAppVersion: () => Promise<string>;
    getHostName: () => Promise<string>;
    getPrinters: () => Promise<printerType>;

    restartApp: () => void;
    printRunSheet: (arg: PrinterModelForElectronType) => void;
    onPrintRunSheetReply: (
      callback: (event: Electron.IpcRendererEvent, response: any) => void
    ) => void;
    printLabels: (arg: PrinterModelForElectronType) => void;
    onPrintLabelsReply: (
      callback: (event: Electron.IpcRendererEvent, response: any) => void
    ) => void;
    updateStore: (storeSnapshot: any) => void;
    onStoreUpdated: (
      callback: (event: Electron.IpcRendererEvent, storeSnapshot: any) => void
    ) => void;
    removeStoreUpdatedListener: (
      callback: (event: Electron.IpcRendererEvent, storeSnapshot: any) => void
    ) => void;
    onUpdateDownloaded: (
      callback: (event: Electron.IpcRendererEvent, message: string) => void
    ) => void;
    onAutoUpdateError: (
      callback: (event: Electron.IpcRendererEvent, message: string) => void
    ) => void;
    removeUpdateDownloadedListener: (
      callback: (event: Electron.IpcRendererEvent, message: string) => void
    ) => void;
    removeAutoUpdateErrorListener: (
      callback: (event: Electron.IpcRendererEvent, message: string) => void
    ) => void;
  };
}

// Define the types used in the interfaces
type PrinterModelForElectronType = {
  silent: boolean;
  printBackground: boolean;
  deviceName?: string;
  color: boolean;
  margins: {
    marginType: string;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  landscape: boolean;
  pageSize:
    | string
    | {
        height: number;
        width: number;
      };
};

type printerType = {
  name: string;
  displayName: string;
}[];
