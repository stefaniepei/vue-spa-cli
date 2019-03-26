// 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
export default () => (target, name, descriptor) => {
  const _copy = descriptor.value;

  descriptor.value = function(...args) {
    this.$nextTick(() => {
      _copy.apply(this, args);
    });
  };
};
