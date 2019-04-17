const prefix = "DEPRECATION ";
const MESSAGE = "This function will be removed.";

import _debug from "debug";
const debug = _debug("app:decorators:deprecated");

// 声明一个函数将被废弃
export default (message = MESSAGE) => (target, name, descriptor) => {
  const _copy = descriptor.value;
  const text = `${prefix} ${name} :${message}`;

  descriptor.value = function(...args) {
    debug(text);
    return _copy.apply(this, args);
  };
};
