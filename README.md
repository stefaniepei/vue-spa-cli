# vue-spa-cli
vue-spa-cli electron分支 桌面electron端+web端(pc+mobile)

## 开发规范 为保证结构统一

### JS
1. 请使用常量：方便维护
2. 访问接口的方法请使用@auto_catch装饰器捕捉错误
3. 请使用工具类：主渲染程序的工具类位于src/electron/utils，页面的工具类位于src/utils:arrayUtils,stringUtils,objectUtils...
4. 主渲染程序请使用log注释(可写入磁盘文件并带console.log功能)，其它统一请使用debug注释(可在线上环境查看注释)
5. 请尽量编写注释

### CSS
1. 页面布局请优先使用element-ui的栅栏响应式布局 http://element-cn.eleme.io/#/zh-CN/component/layout 其次用flex布局...
2. 每个页面底部的css|scss都请放在各自的命名空间下，尽量使用scope私有作用域
3. 请使用scss的规则(详细请见src/assets/css/readme.md)
4. 公共组件里面放 window,pc,mobile三套样式，调用组件时传mode参数

## src下目录说明
- :assets：静态资源-公共样式，图片，第三方js类库等
- :components：公共组件
- :configs：配置文件-环境配置,axios配置,公共常量配置,过滤器配置,桌面端路由配置,PC端路由配置,状态机配置
- :decorators：装饰器(不够可再加vue-property-decorator)
- :services：http服务,websocket服务(socket.io,sockjs-client),本地存储或cookie存储服务
- :stores：vuex状态管理-状态类型,状态管理,接口请求
- :utils：工具-数组处理工具,日期处理工具,数字处理工具,对象处理工具,字符串处理工具,检查/验证工具(不够可再加lodash/ramda)
- :window：桌面端页面-vue页面+js页面+常量
- :pc：pc端页面+js页面+常量
- :mobile：h5端页面+js页面+常量
- :electron: 用于写主进程逻辑,其它文件夹用来写渲染进程逻辑 !!!慎慎慎

## components/window 目录说明
- 各个模块组件/页面统一存放在 各自的 文件夹目录下
- 文件夹命名规则和组件规则一样使用大驼峰命名，内部页面使用小驼峰命名。
- 各个模块统一内部有三个文件： xx.vue、xx.js、type.js，分别存放html和css代码、js逻辑代码、常量代码。

## stores 目录说明
- 各个模块状态统一存放在 各自的 文件夹目录下
- 各个模块统一内部有三个文件： index.js、api.js、type.js，分别存放逻辑代码、api 接口代码、常量代码。

### 参考文档
- vue文档 https://cn.vuejs.org/v2/guide/
- vuex文档 https://vuex.vuejs.org/zh/guide/
- vue-router文档 https://router.vuejs.org/zh/
- element-ui文档 http://element-cn.eleme.io/#/zh-CN/component/quickstart
- scss文档 https://www.sass.hk/docs/      https://www.sass.hk/guide/
- vue-cli3文档 https://cli.vuejs.org/zh/guide
- electron文档 http://electronjs.org/docs
- 深入浅出electron https://blog.csdn.net/sinat_36422236/article/details/84988291
- electron Demos https://github.com/demopark/electron-api-demos-Zh_CN

### 安装教程

```
npm i
```

### 使用说明

本地开发环境 

```
npm run dev // 桌面端
npm run dev:web // web端

```

打包

```
npm run build // 桌面端打包development环境+web端打包development环境  测试打包是否正常用
npm run build:xxx:window // 桌面端xxx环境打包
npm run build:xxx:web // web端xxx环境打包
```

#### eslint
- /* eslint-disable */
- // eslint-disable-line
- // eslint-disable-next-line

##### vue-cli3搭建electron项目
- 1.vue create xxx
- 2.vue add electron-builder

### electron实用技巧/坑
1. 主进程修改代码必须重启服务,渲染进程则有热更新
2. 主进程加载文件使用 __static => 即根目录下的Public文件夹
3. <link rel="icon" href="favicon.ico"> 会影响打包生成的图标文件
4. 打包时有时会出现文件占用,可用任务管理器结束相关进程(几个种的最下面一个)和关闭VSCode
5. render端读取图片 const content = require('fs').readFileSync('/path/to/file'); 【require前加 remote 待测试】
6. 为保证多窗口的vuex通讯，故使用vuex-electron，但store里面的各模块state请保证命名唯一
7. 调试 xxBroswerWindow.webContents.openDevTools();
8. 日志记录 // 服务器写日志用 可能地址：C:\Users\Admin\AppData\Roaming\vue-spa-cli\log.log
              import log from "electron-log";
              log.error("error");
              log.warn("warn");
              log.info("info");
              log.verbose("verbose");
              log.debug("debug");
              log.silly("silly");

### electron数据通信
1. 如何在两个网页间共享数据？localStorage等,状态机 或以下方案

// 在主进程中
global.sharedObject = { someProperty: 'default value' }
// 在第一个页面中
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
// 在第二个页面中
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)

2. ipcMain 从主进程到渲染进程的异步通信 https://electronjs.org/docs/api/ipc-main

// 在主进程中.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.sender.send('asynchronous-reply', 'pong') // imgWin.webContents.send("render-image", arg);如果是browerWindow窗口则用此方法
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})

3. ipcRenderer 从渲染器进程到主进程的异步通信 https://electronjs.org/docs/api/ipc-renderer

//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
