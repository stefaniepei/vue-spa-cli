import { dialog, autoUpdater } from "electron";

let updater;
autoUpdater.autoDownload = false;
autoUpdater.on("error", (event, error) => {
  dialog.showErrorBox(
    "出现错误: ",
    !error ? "unknown" : (error.stack || error).toString()
  );
});
autoUpdater.on("checking-for-update", () => {});
autoUpdater.on("update-available", () => {
  dialog.showMessageBox(
    {
      type: "info",
      title: "发现可用更新",
      message: "发现可用更新, 是否现在更新?",
      buttons: ["确定", "取消"]
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      } else {
        updater.enabled = true;
        updater = null;
      }
    }
  );
});
autoUpdater.on("update-not-available", () => {
  updater.enabled = true;
  updater = null;
});
autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox(
    { title: "安装更新", message: "应用将在退出后完成更新..." },
    () => {
      autoUpdater.quitAndInstall();
    }
  );
});

/**
 * 检查app更新
 * @author peijunke
 * @param {Object} menuItem 通过菜单项更新
 */
export default function checkForUpdates(menuItem) {
  updater = menuItem;
  updater.enabled = false;
  autoUpdater.checkForUpdates();
}
