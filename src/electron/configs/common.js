"use strict";

export default class Common {
  static get url() {
    return {
      home: "https://www.runxsports.com",
      archives: "https://www.runxsports.com/archives",
      topics: "https://www.runxsports.com/topics",
      tags: "https://www.runxsports.com/tags",
      about: "https://www.runxsports.com/about",
      thanks: "https://www.runxsports.com/thanks",
      mail: "mailto:hi[at]runxsports.com",
      release: "https://github.com/runxsports/runxsports-blog-clients/releases"
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
