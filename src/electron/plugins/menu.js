"use strict";

import { app, Menu } from "electron";
import Common from "../configs/common";
import AppProcess from "./appProcess";
import updater from "./updater";

// 菜单项点击事件
function _clickMenuItem(url) {
  // 这个检查很重要，否则会导致错误，例如聚焦窗口是关于pannel的
  return (item, focusedWindow) => {
    if (focusedWindow) {
      focusedWindow.loadURL(url);
    }
  };
}

let menu = [
  {
    label: (() => {
      if (process.platform === "darwin") return Common.menu.name;
      return Common.menu.option;
    })(),
    submenu: [
      {
        label: Common.menu.about,
        role: "about",
        visible: (() => {
          if (process.platform === "darwin") return true;
          return false;
        })()
      },
      {
        type: "separator",
        visible: (() => {
          if (process.platform === "darwin") return true;
          return false;
        })()
      },
      {
        label: Common.menu.version + `${app.getVersion()}`,
        enabled: false
      },
      {
        label: Common.menu.update,
        click: updater.checkForUpdates
      },
      {
        type: "separator"
      },
      {
        label: Common.menu.close,
        accelerator: "Cmd+W",
        visible: (() => {
          if (process.platform === "darwin") return true;
          return false;
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) focusedWindow.hide();
        }
      },
      {
        label: Common.menu.quit,
        accelerator: "CmdOrCtrl+Q",
        click: () => AppProcess.exit(true)
      }
    ]
  },
  {
    label: Common.menu.edit,
    submenu: [
      {
        label: Common.menu.undo,
        role: "undo"
      },
      {
        label: Common.menu.redo,
        role: "redo"
      },
      {
        type: "separator"
      },
      {
        label: Common.menu.copy,
        role: "copy"
      },
      {
        label: Common.menu.paste,
        role: "paste"
      }
    ]
  },
  {
    label: Common.menu.view,
    submenu: [
      {
        label: Common.menu.home,
        click: _clickMenuItem(Common.url.home),
        accelerator: "CmdOrCtrl+H"
      },
      {
        type: "separator"
      },
      {
        label: Common.menu.archives,
        click: _clickMenuItem(Common.url.archives),
        accelerator: "CmdOrCtrl+A"
      },
      {
        label: Common.menu.topics,
        click: _clickMenuItem(Common.url.topics),
        accelerator: "CmdOrCtrl+T"
      },
      {
        type: "separator"
      },
      {
        label: Common.menu.tags,
        click: _clickMenuItem(Common.url.tags),
        accelerator: "CmdOrCtrl+G"
      }
    ]
  },
  {
    label: Common.menu.help,
    role: "help",
    submenu: [
      {
        label: Common.menu.dev,
        accelerator: "CmdOrCtrl+Shift+I",
        visible: (() => {
          if (process.env.NODE_ENV === "development") return true;
          return false;
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) focusedWindow.toggleDevTools();
        }
      },
      {
        label: Common.menu.aboutMe,
        click: _clickMenuItem(Common.url.about),
        accelerator: "CmdOrCtrl+B"
      },
      {
        type: "separator"
      },
      {
        label: Common.menu.thanks,
        click: _clickMenuItem(Common.url.thanks)
      },
      {
        label: Common.menu.contact,
        click: () => {
          AppProcess.externalOpenURL(Common.url.mail);
        },
        accelerator: "CmdOrCtrl+M"
      }
    ]
  }
];

/**
 * 创建菜单
 * @author peijunke
 */
export default function createMenu() {
  menu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(menu);
}
