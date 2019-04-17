"use strict";
import { Menu, Tray, BrowserWindow } from "electron";
import path from "path";
import Common from "../configs/common";
import AppProcess from "./appProcess";

let tray = null;

export default function createTray() {
  if (process.platform === "darwin") {
    tray = new Tray(path.join(__dirname, "../assets/logo.png"));
    tray.setToolTip(path.join(__dirname, "../assets/logo.png"));
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: Common.tray.show,
          click: () => BrowserWindow.getAllWindows().forEach(win => win.show())
        },
        {
          label: Common.tray.exit,
          click: () => AppProcess.exit(true)
        }
      ])
    );
  }
}
