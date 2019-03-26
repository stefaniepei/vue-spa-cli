// 包含普通检查工具，验证工具和正则验证处理工具
const ValidateUtils = {
  isEmpty(_o) {
    if (!_o) {
      return true;
    }
    if (!_o.length) {
      return true;
    }
    return false;
  },
  isEmptyString(_o) {
    if (this.isString(_o) && !_o) {
      return true;
    }
    if (this.isString(_o) && !_o.length) {
      return true;
    }
    return false;
  },
  isString(_o) {
    return Object.prototype.toString.call(_o) === "[object String]";
  },
  isArray(_o) {
    return Object.prototype.toString.call(_o) == "[object Array]";
  },
  isObj(_o) {
    return Object.prototype.toString.call(_o) == "[object Object]";
  },
  isObject(_o) {
    return Object.prototype.toString.call(_o) === "[object Object]";
  },
  isMobile() {
    if (
      window.navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      return true;
    } else {
      return false;
    }
  },
  getBrowserInfo() {
    //获取浏览器版本号信息
    let agent = navigator.userAgent.toLowerCase();
    let regStr_ie = /msie [\d.]+;/gi;
    let regStr_ff = /firefox\/[\d.]+/gi;
    let regStr_chrome = /chrome\/[\d.]+/gi;
    let regStr_saf = /safari\/[\d.]+/gi;

    //IE
    if (agent.indexOf("msie") > 0) {
      return agent.match(regStr_ie)[0];
    }
    //firefox
    if (agent.indexOf("firefox") > 0) {
      return agent.match(regStr_ff)[0];
    }
    //Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
      return agent.match(regStr_saf)[0];
    }
    //Chrome
    if (agent.indexOf("chrome") > 0) {
      return agent.match(regStr_chrome)[0];
    }
  },
  getPlaformInfo() {
    return `language:${navigator.language}|os:${
      navigator.platform
    }|useragent:${this.getBrowserInfo()}|`;
  }
};
export default ValidateUtils;

// 常用正则
//匹配特殊字符 注意 1 和 2 配合使用 逻辑 用 1'或"2=>true
export const testSpecialChar1 = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im; // eslint-disable-line
export const testSpecialChar2 = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im; // eslint-disable-line
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
export const testUsername = /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
//至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符：
export const testPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
//正整数
export const testPositiveInteger = /^[0-9]*[1-9][0-9]*$/;
//负整数
export const testNegativeInteger = /^-[0-9]*[1-9][0-9]*$/;
//正浮点数
export const testPositiveFloat = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
//负浮点数
export const testNegativeFloat = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
//浮点数
export const testFloating = /^(-?\d+)(\.\d+)?$/;
export const testDecimalEightNums = /^\d+(\.\d{0,8})?$/; //8位小数
//email地址
export const testEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url地址
export const testUrl = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/; // eslint-disable-line
//年/月/日（年-月-日、年.月.日）
export const testYmd = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
//匹配中文字符
export const testZh = /[\u4e00-\u9fa5]/;
//匹配空白行的正则表达式
export const testSpaceLine = /\n\s*\r/;
//匹配中国邮政编码
export const testZhZipCode = /[1-9]\d{5}(?!\d)/;
//匹配身份证
export const testIDNumber = /\d{15}|\d{18}/;
//匹配国内电话号码
export const testTel = /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//匹配IP地址
export const testIp = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//匹配首尾空白字符的正则表达式
export const testTrim = /^\s*|\s*$/;
//匹配HTML标记的正则表达式
export const testHtml = /<("[^"]*"|'[^']*'|[^'">])*>/;
//sql 语句
export const testSql = /^(select|drop|delete|create|update|insert).*$/;
//提取信息中的网络链接
export const testNetwork = /(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?/;
//提取信息中的图片链接
export const testImgsrc = /(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?/;
//手机号正则
export const testPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
//4-11位数字的国外手机号码和国内手机号码
export const testInterPhone = /^(\d{4,11})$/;
//提取信息中的任何数字
export const testNumber = /(-?\d*)(\.\d+)?/;
//电话区号
export const testAreaCode = /^0\d{2,3}$/;
//腾讯 QQ 号
export const testQQ = /^[1-9]*[1-9][0-9]*$/;
