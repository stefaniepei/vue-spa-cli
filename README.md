# vue-spa-cli
vue 脚手架 by vue-cli3

普通版：https://github.com/stefaniepei/vue-spa

## 使用
- :assets：静态资源-公共样式，图片，第三方js类库等
- :components：公共组件
- :configs：配置文件-环境配置,axios配置,公共常量配置,过滤器配置,路由配置,状态机配置
- :decorators：装饰器(不够可再加vue-property-decorator)
- :services：http服务,websocket服务(socket.io,sockjs-client),本地存储或cookie存储服务
- :stores：vuex状态管理-状态类型,状态管理,接口请求
- :utils：工具-数组处理工具,日期处理工具,数字处理工具,对象处理工具,字符串处理工具,检查/验证工具(不够可再加lodash/ramda)
- :pc：pc端页面+js页面+常量
- :mobile：h5端页面+js页面+常量

## components/views 目录说明
- 各个模块组件/页面统一存放在 各自的 文件夹目录下
- 文件夹命名规则和组件规则一样使用大驼峰命名，内部页面使用小驼峰命名。
- 各个模块统一内部有三个文件： xx.vue、xx.js、type.js，分别存放html和css代码、js逻辑代码、常量代码。

## stores 目录说明
- 各个模块状态统一存放在 各自的 文件夹目录下
- 各个模块统一内部有三个文件： index.js、api.js、type.js，分别存放逻辑代码、api 接口代码、常量代码。

### 安装教程

```
npm i
```

### 使用说明

本地开发环境

```
npm run dev
```

打包

```
npm run buld
```

### 文档
- vue文档 https://cn.vuejs.org/v2/guide/
- vuex文档 https://vuex.vuejs.org/zh/guide/
- vue-router文档 https://router.vuejs.org/zh/
- element-ui文档 http://element-cn.eleme.io/#/zh-CN/component/quickstart
- scss文档 https://www.sass.hk/docs/      https://www.sass.hk/guide/
- vue-cli3文档 https://cli.vuejs.org/zh/guide

#### 其他
/* eslint-disable */
// eslint-disable-next-line