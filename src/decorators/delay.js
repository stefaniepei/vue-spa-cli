// 每次调用函数都会延迟一段时间
export default (time = 0) => (target, name, descriptor) => {
  const _copy = descriptor.value;

  descriptor.value = function(...args) {
    const timer = setTimeout(() => {
      _copy.apply(this, args);
      clearTimeout(timer);
    }, time);
  };
};
