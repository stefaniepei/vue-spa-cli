"use strict";

export default class Common {
  static get url() {
    return {
      home: "https://www.electron",
      archives: "https://www.electron/archives",
      topics: "https://www.electron/topics",
      tags: "https://www.electron/tags",
      about: "https://www.electron/about",
      thanks: "https://www.electron/thanks",
      mail: "mailto:hi[at]electron",
      release: "https://github.com/electron/releases"
    };
  }

  static get menu() {
    return {
      name: "Demo",
      option: "选项",
      about: "关于",
      version: "当前版本: ",
      update: "检查更新",
      close: "关闭窗口",
      quit: "退出 Demo",
      edit: "编辑",
      undo: "撤销",
      redo: "重做",
      copy: "复制",
      paste: "粘贴",
      view: "查看",
      home: "主页",
      archives: "文章",
      topics: "专题",
      tags: "标签",
      help: "帮助",
      dev: "开发者工具",
      aboutMe: "关于我",
      thanks: "鸣谢",
      contact: "联系我"
    };
  }

  static get tray() {
    return {
      show: "显示",
      exit: "退出"
    };
  }
}
