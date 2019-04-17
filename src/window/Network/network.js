// 无需窗口的网络检测窗口
import { ipcRenderer } from "electron";
import log from "electron-log";
log.warn("in networkPage");
const updateOnlineStatus = () => {
  log.warn("set network");
  ipcRenderer.send("network", navigator.onLine ? "online" : "offline");
};
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();
export default {};
