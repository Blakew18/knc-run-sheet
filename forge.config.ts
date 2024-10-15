import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

import dotenv from "dotenv";

const dotEnv = dotenv.config();

const config: ForgeConfig = {
  packagerConfig: {
    icon: "./src/assets/knc.ico",
    asar: true,
    extraResource: ["adodb.js", "knc.svg"],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      authors: "Intique Projects Pty Ltd",
      description: "KNC Runsheet App",
      iconUrl: "static://assets/knc.svg",
    }),
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "blakew18",
          name: "knc-run-sheet",
        },
        prerelease: true,
        draft: true,
      },
    },
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      devContentSecurityPolicy: `default-src 'self' 'unsafe-eval' 'unsafe-inline' static: http: https: ws:`,
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/frontend/index.html",
            js: "./src/frontend/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
