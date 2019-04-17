import { app, shell, BrowserWindow } from "electron";

/**
 * App进程控制
 * @author peijunke
 * @param {Function} onlineProcessCallback 在线状态回调函数
 */
export default class AppProcess {
  /**
   * 退出程序是否清除cookie
   * @param {Boolean} isCleanCookie 是否清除cookie
   */
  static exit(isCleanCookie) {
    if (isCleanCookie) {
      BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.session.clearStorageData(
          { storages: ["cookies"] }, //ppcache, cookies, filesystem, indexdb, localstorage, shadercache, websql, serviceworkers, cachestorage
          () => {}
        );
      });
    }
    app.quit();
    app.exit(0);
  }

  /**
   * 在用户的默认浏览器中打开 URL
   * @param {String} url URL地址
   */
  static externalOpenURL(url) {
    shell.openExternal(url);
  }
}
