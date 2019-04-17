"use strict";
import { app, protocol, BrowserWindow, ipcMain } from "electron";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV === "development";
import path from "path";

// 保存窗口对象的全局引用,以防JavaScript对象被垃圾收集时自动关闭
/*==========窗口开始==========*/
let win; // 根窗口
let imgWin; // 图片放大窗口

/*==========窗口结束==========*/

// 在应用程序准备好之前，必须先注册标准方案
protocol.registerStandardSchemes(["app"], { secure: true });
function createWindow() {
  /*==========创建BrowserWindow窗口开始==========*/
  // 根窗口的BrowserWindow
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__static, "icon.png") // eslint-disable-line
  });
  // 图片窗口的BrowserWindow
  const imgBrowserWindow = new BrowserWindow({
    width: 400,
    height: 400,
    parent: win,
    show: false,
    webPreferences: { webSecurity: false }
  });

  /*==========创建BrowserWindow窗口结束==========*/

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 开发模式下加载路由
    /**  路由Group开始 */
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    imgBrowserWindow.loadURL(
      process.env.WEBPACK_DEV_SERVER_URL + "/#/imageWindow"
    );

    /*==========路由结束==========*/

    // 开发模式下开启调试窗口
    win.webContents.openDevTools();
    imgBrowserWindow.webContents.openDevTools();
  } else {
    createProtocol("app");
    // 非开发模式下运行index.html
    win.loadURL("app://./index.html");
  }

  // 监听窗口即将关闭
  /*==========窗口关闭开始==========*/
  win.on("closed", () => {
    win = null;
  });
  imgBrowserWindow.on("close", e => {
    e.preventDefault();
    imgBrowserWindow.hide();
  });

  /*==========窗口关闭结束==========*/

  /*==========防止自动关闭窗口开始==========*/
  imgWin = imgBrowserWindow;
  /*==========防止自动关闭窗口结束==========*/
}

// 监听所有窗口关闭
app.on("window-all-closed", () => {
  // 兼容macOS  显示退出Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // 兼容macOS 重新创建新窗口
  if (win === null) {
    createWindow();
  }
});

// Electron 初始化创建窗口 有些api只能在此Ready事件开始后使用
app.on("ready", async () => {
  if (isDevelopment) {
    // 安装 Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools 安装失败:", e.toString());
    }
  }
  createWindow();
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

/*==========窗口通信开始==========*/
ipcMain.on("main-image", (event, arg) => {
  imgWin.show();
  imgWin.webContents.send("render-image", arg);
});

/*==========窗口通信结束==========*/
