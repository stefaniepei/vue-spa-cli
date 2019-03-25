import _debug from "debug";
import * as zlib from "zlib";
// import cookies from 'js-cookie';
const debug = _debug("app:StorageService");

const StorageService = {
  // getCookie(key) {
  //   let value;
  //   try {
  //     value = cookies.get(key);
  //   } catch (ex) {
  //     // debug('cookies.get报错, ', ex.message);
  //   } finally {
  //     return value;
  //   }
  // },
  // setCookie(key, val, path = '/') {
  //   try {
  //     cookies.set(key, val, { path: path });
  //   } catch (ex) {
  //     // debug('cookies.set报错, ', ex.message);
  //   }
  // },
  // removeCookie(key) {
  //   cookies.remove(key);
  // },

  getItem(key) {
    let value;
    try {
      value = localStorage.getItem(key);
    } catch (ex) {
      debug("localStorage.getItem报错, ", ex.message);
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return value;
    }
  },
  setItem(key, val) {
    try {
      // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
      localStorage.setItem(key, val);
    } catch (ex) {
      debug("localStorage.setItem报错, ", ex.message);
    }
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  },

  /**
   * 使用zlib加密
   * @param str 加密字符串
   */
  zlibEncryption(str = "") {
    return zlib.deflateSync(new Buffer(str)).toString("base64");
  },

  /**
   * 使用zlib解密
   * @param str 解密字符串
   */
  zlibDecryption(str = "") {
    return zlib.unzipSync(Buffer.from(str, "base64")).toString();
  },

  // Basic Data Type for zlib 加密方式暂时注释
  getItemBasicZlib(key) {
    return this.zlibDecryption(this.getItem(key));
  },
  setItemBasicZlib(key, val) {
    this.setItem(key, this.zlibEncryption(val));
  },

  // Reference Data Type
  getItemJson(key) {
    return this.getItem(key) !== null ? JSON.parse(this.getItem(key)) : {};
  },
  setItemJson(key, val) {
    this.setItem(key, JSON.stringify(val));
  },

  getItemJsonZlib(key) {
    return this.getItem(key) !== null
      ? JSON.parse(this.zlibDecryption(this.getItem(key)))
      : {};
  },
  setItemJsonZlib(key, val) {
    this.setItem(key, this.zlibEncryption(JSON.stringify(val)));
  }
};

export default StorageService;
