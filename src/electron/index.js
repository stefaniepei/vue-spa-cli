"use strict";

import { app, protocol } from "electron";
// import { installVueDevtools } from "vue-cli-plugin-electron-builder/lib";
import log from "electron-log";

// 在应用程序准备好之前，必须先注册标准方案
protocol.registerStandardSchemes(["app"], { secure: true });

import {
  createNetworkCheckerWindow,
  createMainWindow,
  createWindow
} from "./plugins/window";
import createMenu from "./plugins/menu";
import createTray from "./plugins/tray";

const isDevelopment = process.env.NODE_ENV === "development";

app.on("ready", async () => {
  log.info("App is ready");
  if (isDevelopment) {
    // 安装 Vue Devtools
    try {
      await 1; // installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools 安装失败:", e.toString());
    }
  }
  log.info("createNetworkCheckerWindow before");
  createNetworkCheckerWindow(() => {
    createMainWindow();
    createWindow("/imageWindow");
    createMenu();
    createTray();
  });
});

app.on("activate", () => {
  createMainWindow();
});

// 在开发模式下，根据父进程的请求完整的退出
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
