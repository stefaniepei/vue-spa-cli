// 将一个对象绑定在 Vue 的实例下，非响应。这在非常多数据需要绑定却不想全部都放在 data 中(无需响应)时很有用。
export default (sources = {}) => target => {
  const _created = target.created;
  target.created = function() {
    _created && _created.call(this);
    Object.keys(sources).forEach(key => {
      this[key] = sources[key];
      if (typeof this[key] === "function") {
        this[key] = (...args) => sources[key].apply(this, args);
      }
    });
  };
};
