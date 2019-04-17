"use strict";
/* eslint-disable indent */
import { BrowserWindow, ipcMain, dialog, shell } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import Common from "../configs/common";
import AppProcess from "./appProcess";
import path from "path";

let checkerWindiw;
let mainWindow;
let otherWindow;
let createdAppProtocol = false; // 是否已经创建协议

// 服务器写日志用 可能地址：C:\Users\Admin\AppData\Roaming\oa-front-pc\log.log
import log from "electron-log";
log.warn("----------------------------------------------------------");
log.warn("NODE_ENV：", process.env.NODE_ENV);
log.warn("VUE_APP_ENV", process.env.VUE_APP_ENV);

// log.error("error");
// log.warn("warn");
// log.info("info");
// log.verbose("verbose");
// log.debug("debug");
// log.silly("silly");

/**
 * 创建网络检查器窗口-打开隐藏的检查窗口
 * @author peijunke
 * @param {Function} onlineProcessCallback 在线状态回调函数
 */
export function createNetworkCheckerWindow(onlineProcessCallback) {
  log.info("CreateNetworkCheckerWindow Start");
  checkerWindiw = new BrowserWindow({ width: 0, height: 0, show: false });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    log.info("WEBPACK_DEV_SERVER_URL: " + process.env.WEBPACK_DEV_SERVER_URL);
    checkerWindiw.loadURL(
      process.env.WEBPACK_DEV_SERVER_URL + "#/networkWindow"
    );
  } else {
    if (!createdAppProtocol) {
      createProtocol("app");
      createdAppProtocol = true;
    }
    log.info("loadURL networkWindow");
    checkerWindiw.loadURL("app://./index.html#networkWindow"); // 非开发模式下运行index.html
  }
  ipcMain.on("network", (event, status) => {
    log.info("ipcMain network: " + status);
    switch (status) {
      case "online":
        onlineProcessCallback();
        break;
      case "offline":
      default:
        dialog.showMessageBox(
          {
            type: "error",
            buttons: [],
            title: "警告",
            message: "设备离线, 应用必须退出"
          },
          () => {
            AppProcess.exit(true);
          }
        );
        break;
    }
  });
  log.info("CreateNetworkCheckerWindow OK");
}

// 创建主窗口
export function createMainWindow() {
  log.info("createMainWindow Start");
  // for macOS
  if (mainWindow) {
    mainWindow.show();
    return;
  }
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 1000,
    minHeight: 800,
    icon: path.join(__static, "icon.png") // eslint-disable-line
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    if (!createdAppProtocol) {
      createProtocol("app");
      createdAppProtocol = true;
    }
    mainWindow.loadURL("app://./index.html"); // 非开发模式下运行index.html
  }

  mainWindow.on("close", event => {
    if (process.platform === "darwin") {
      if (mainWindow.isVisible()) {
        event.preventDefault();
        mainWindow.hide();
      }
    } else AppProcess.exit(true);
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    event.preventDefault();
    if (url.match("login-callback")) mainWindow.loadURL(Common.url.home);
    else if (!url.match("runxsports")) shell.openExternal(url);
    else mainWindow.loadURL(url);
  });
  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    if (url.match("login-callback")) mainWindow.loadURL(Common.url.home);
    else if (!url.match("runxsports")) shell.openExternal(url);
    else mainWindow.loadURL(url);
  });

  log.info("createMainWindow OK");
}

// 创建其它窗口
export function createWindow(url) {
  log.info("createWindow Start");
  // for macOS
  if (otherWindow) {
    otherWindow.show();
    return;
  }
  otherWindow = new BrowserWindow({
    width: 500,
    height: 400,
    minWidth: 500,
    minHeight: 400,
    show: false,
    parent: mainWindow,
    icon: path.join(__static, "icon.png") // eslint-disable-line
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    const windowUrl = process.env.WEBPACK_DEV_SERVER_URL + "#" + url;
    otherWindow.loadURL(windowUrl);
    log.warn("加载页面：", windowUrl);
    otherWindow.webContents.openDevTools();
  } else {
    if (!createdAppProtocol) {
      createProtocol("app");
      createdAppProtocol = true;
    }
    otherWindow.loadURL("app://./index.html#imageWindow"); // 非开发模式下运行index.html
  }

  otherWindow.on("close", e => {
    e.preventDefault();
    otherWindow.hide();
  });

  log.info("createWindow OK");
}

ipcMain.on("main-image", (event, arg) => {
  otherWindow.show();
  otherWindow.webContents.send("render-image", arg);
});
