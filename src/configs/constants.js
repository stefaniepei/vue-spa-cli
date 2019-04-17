// HTTP状态码
export const SUCCESS_CODE = 200;
export const NO_LOGIN_CODE = 401;
export const NO_PERMISSION_CODE = 403;
export const NOT_FOUND_CODE = 404;
export const CLIENT_CODE = 422;
export const SERVER_ERROR_CODE = 500;
export const GATEWAY_CODE = 504;
export const TIME_OUT = 1000000; // 超时

// webSocket状态码
export const WS_RECONNECT_MAX = 5; // 最大重连次数
export const WS_RECONNECT_TIME = 5000; // 断连的重连时间
export const WS_READY_STATE_CONNECTING = 0;
export const WS_READY_STATE_OPEN = 1;
export const WS_READY_STATE_CLOSING = 2;
export const WS_READY_STATE_CLOSED = 3;
export const WS_COMMAND_HEARTBEAT_REQ = 13; // 客户端（客户或者客服）发起的心跳检测

// store里面的公共设置值
export const SET_STATE = "global/setState";
