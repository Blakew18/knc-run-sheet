//NMP Imports
import { app, BrowserWindow, ipcMain, protocol, net } from "electron";
import portscanner from "portscanner";
import path from "path";
import fs from "fs";
import isDev from "electron-is-dev";
import os from "os";
//Local Imports
import { startExpressServer } from "../server/server";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
// declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
// const resolveToAbsolutePath = (path: string) => {
//   return path.replace(/%([^%]+)%/g, function (_, key) {
//     return process.env[key];
//   });
// };
// const reactDevToolsPath = resolveToAbsolutePath(
//   "%LOCALAPPDATA%/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.28.5_0"
// );

//Ensure Single Instance Only
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

app.whenReady().then(async () => {
  protocol.handle("static", (request) => {
    const fileUrl = request.url.replace("static://", "");
    const filePath = path.join(app.getAppPath(), ".webpack/renderer", fileUrl);
    return net.fetch(filePath);
  });

  //Create New Window
  console.log(os.hostname());
  const mainWindow = new BrowserWindow({
    height: 900,
    autoHideMenuBar: true,
    icon: "/knc.svg",
    webPreferences: {
      // preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.setAspectRatio(Math.sqrt(2));
  mainWindow.setMinimumSize(1232, 845);
  // const runSheetWindow = new BrowserWindow({
  //   height: 2480,
  //   width: 3508,
  //   show: isDev,
  //   webPreferences: {
  //     preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
  //   },
  // });

  //Get Available Port for Express DB
  process.env.EXPRESSPORT = await getAvailablePort();

  ipcMain.on("get-express-port", (event) => {
    event.returnValue = process.env.EXPRESSPORT;
  });
  ipcMain.on("get-hostname", (event) => {
    event.returnValue = os.hostname();
  });
  ipcMain.on("get-app-version", (event) => {
    event.returnValue = app.getVersion();
  });
  ipcMain.on("get-printers", async function (event) {
    const contents = mainWindow.webContents;
    const printers = await contents.getPrintersAsync();
    event.returnValue = printers;
  });
  // ipcMain.on("print-run-sheet", (event, arg) => {
  //   console.log(arg);
  //   const contents = mainWindow.webContents;
  //   contents.print({}, (success, error) => {
  //     console.log("SUCORERR", success || error);
  //     if (!success) console.log(error);
  //     if (!success) event.returnValue = false;
  //     event.returnValue = true;
  //   });
  // });

  ipcMain.on("print-run-sheet", (event, arg) => {
    console.log(arg);
    const contents = mainWindow.webContents;

    // Using the callback of contents.print to handle async operation
    contents.print(arg, (success, errorType) => {
      console.log("Print Result:", success, errorType);

      // Sending a reply back to the renderer process with the result
      if (success) {
        event.reply("print-run-sheet-reply", { success: true });
      } else {
        console.log("Print Error:", errorType);
        event.reply("print-run-sheet-reply", {
          success: false,
          error: errorType,
        });
      }
    });
  });

  // ipcMain.on("print-run-sheet", async (event, arg) => {
  //   console.log(arg);
  //   const pdfPath = path.join(os.homedir(), "Desktop", "temp.pdf");
  //   console.log(pdfPath);
  //   const contents = mainWindow.webContents;
  //   try {
  //     const printedContent = await contents.printToPDF(arg);
  //     console.log("PRINTED CONTENTS");
  //     fs.writeFileSync(pdfPath, printedContent);
  //     event.returnValue = true;
  //   } catch (error) {
  //     console.log(error);
  //     event.returnValue = true;
  //   }
  // });

  //if (process.mainModule.filename.indexOf('app.asar') !== -1) {
  if (__filename.indexOf("app.asar") !== -1) {
    process.env.PATHFORWSF = path.join(
      path.dirname(app.getPath("exe")),
      "./resources/vbs"
    );
    process.env.ADODBPATH = "./resources/adodb.js";
  }

  //Start Express Server
  await startExpressServer();

  //Load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  //runSheetWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY + "#/runsheet");
  //Set Dev Tools
  if (isDev) {
    // await session.defaultSession.loadExtension(reactDevToolsPath);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  console.log("Electron Main Complete");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const getAvailablePort = async () => {
  try {
    const portNumber = await portscanner.findAPortNotInUse(25000, 35000);
    return String(portNumber);
  } catch (error) {
    console.log("Error in getAvailablePort:", error);
    const portNumber = String(25000);
    return portNumber;
  }
};
