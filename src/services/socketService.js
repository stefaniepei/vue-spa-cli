import Env from "@/configs/env";
import {
  WS_RECONNECT_MAX,
  WS_RECONNECT_TIME,
  WS_READY_STATE_OPEN,
  WS_READY_STATE_CLOSING,
  WS_READY_STATE_CLOSED,
  WS_COMMAND_HEARTBEAT_REQ
} from "@/configs/constants";

import _debug from "debug";
const debug = _debug("app:service:webSocketService");

export default class SocketService {
  constructor({
    url,
    onOpenFn = null,
    onMessageFn = null,
    onErrorFn = null,
    onCloseFn = null
  }) {
    this.url = `${Env.DEFAULT.WS_API}/${url}`; // webSocket连接的地址
    this.io = null; // 当前连接的webSocket
    this.socketType = false; // 当前webSocket是否已连接
    this.onOpenFn = onOpenFn; // 连接成功的回调函数-通常是心跳检测
    this.onMessageFn = onMessageFn; // 接收消息的回调函数
    this.onErrorFn = onErrorFn; // 连接错误的回调函数
    this.onCloseFn = onCloseFn; // 关闭的回调函数
    this.reConnectTimes = 0; // 重连次数

    //心跳检测
    this.heartCheck = {
      timeout: 30000, //30秒
      timeoutObj: null,
      serverTimeoutObj: null,
      reset: function() {
        clearTimeout(this.timeoutObj);
        return this;
      },
      start: function() {
        this.timeoutObj = setTimeout(() => {
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
          //onmessage拿到返回的心跳就说明连接正常
          this.io &&
            this.io.send(
              JSON.stringify({
                cmd: WS_COMMAND_HEARTBEAT_REQ,
                hbbyte: -127
              })
            );
        }, this.timeout);
      }
    };
    this._initSocket();
  }

  /**检查websocket是否合法 */
  _checkIsWebsocket() {
    if (this.io && typeof this.io === WebSocket) {
      return true;
    }
    return false;
  }

  /**
   * 初始化socket
   * 1. 进入页面 正常连接
   * 2. 进入页面 连接不上 （n秒后重连）
   * 3. 连接上了，中途断连 （n秒后重连）
   * 4. 离开页面 （断开，关闭setTimeout）
   * **/
  _initSocket() {
    this.socketType = false;
    debug("_initSocket url:", this.url);
    debug("_initSocket io:", this.io);
    if (!this._checkIsWebsocket()) {
      this.io = new WebSocket(this.url);
      this._onOpen();
      this._onMessage();
      this._onError();
      this._onClose();
    } else {
      this._reConnect();
    }
  }

  /** socket连上后触发 **/
  _onOpen(cb) {
    this.io.onopen = ev => {
      // 判断socket确实连接上了才开始监听，否则挂起n秒后重试
      if (!this._checkIsWebsocket()) {
        this._reConnect();
        return;
      }
      this.socketType = true;
      //心跳检测重置
      this.heartCheck.reset().start();
      debug("websocket连接成功");
      cb && cb(ev);
    };
  }

  /** 接收消息时触发 **/
  _onMessage(cb) {
    this.io.onmessage = ev => {
      // 判断socket确实连接上了才开始监听，否则挂起n秒后重试
      if (!this._checkIsWebsocket()) {
        this._reConnect();
        return;
      }
      this.socketType = true;
      debug("websocket 消息接收成功");
      cb && cb(ev);
    };
  }

  /** socket连接错误触发 **/
  _onError(cb) {
    this.io.onerror = err => {
      debug("websocket连接断开，5秒后自动重连", err);
      this.socketType = false;
      this._reConnect();
      cb && cb(err);
    };
  }

  /** socket关闭时触发 **/
  _onClose(cb) {
    this.io.onclose = ev => {
      this.socketType = false;
      this.io.close();
      this.io = null;
      cb && cb(ev);
    };
  }

  /** socket断开重连 **/
  _reConnect() {
    if (this.reConnectTimes <= WS_RECONNECT_MAX) {
      const timer = setTimeout(() => {
        debug("_reConnect", this.io, this._checkIsWebsocket());
        if (!this._checkIsWebsocket()) {
          this.reConnectTimes++;
          this._initSocket();
        } else if (
          this.io.readyState === WS_READY_STATE_CLOSING ||
          this.io.readyState === WS_READY_STATE_CLOSED
        ) {
          this.reConnectTimes++;
          this.io._onOpen();
        } else if (this.io.readyState === WS_READY_STATE_OPEN) {
          clearTimeout(timer);
        }
      }, WS_RECONNECT_TIME);
    } else {
      debug(`socket断开重连超过${WS_RECONNECT_MAX}次`);
      this.close();
    }
  }

  /** 发送消息 **/
  send(msg) {
    this.io && this.io.send(msg);
  }

  /** 关闭socket **/
  close() {
    this.io && this.io.close();
    this.reConnectTimes = 0;
  }
}
