import _debug from "debug";
const debug = _debug("app:decorators:autoCatch");

const defaultCatchType = "log";

const dynamicCatchType = "dynamic_catch";

const errorCatch = {
  // error: err => console.error(err),
  log: err => debug(err),
  slient: () => {}
};

const dispenseCatch = type => {
  if (typeof type === "function") return type;
  if (errorCatch[type]) return errorCatch[type];
  if (typeof type === "string") return dynamicCatchType;
  return errorCatch[defaultCatchType];
};
// 可以帮助你自动捕获 async 函数中的错误，不需要额外的 then catch 或是 try catch
export default (catchType = defaultCatchType) => (target, name, descriptor) => {
  const _copy = descriptor.value;
  let catchHandler = dispenseCatch(catchType);

  descriptor.value = function(...args) {
    if (catchHandler === dynamicCatchType && this[catchType]) {
      catchHandler = this[catchType];
    }
    return Promise.resolve(_copy.apply(this, args)).catch(
      catchHandler.bind(this)
    );
  };
};
