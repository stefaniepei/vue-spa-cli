/* eslint-disable */
// 在 wait 秒内最多执行 fn 一次的函数。
export default (wait = 300) => (target, key, descriptor) => {
  const _copy = descriptor.value;
  let timeout;

  const limit = (func, wait) => (...args) => {
    const throttler = () => {
      timeout = null;
      func.apply(this, args);
    };

    timeout = timeout || setTimeout(throttler, wait);
  };

  descriptor.value = function(...args) {
    return limit(_copy.bind(this), wait)(...args);
  };
};
