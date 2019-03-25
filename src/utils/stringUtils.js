const StringUtils = {
   /**
   * 返回中英文字符串长度
   * @param _str 字符串
   * @returns 字符串长度
   */
  enZhStrLength(_str) {
    let len = 0
    for (let i = 0; i < _str.length; i++) {
      if (_str.charCodeAt(i) > 127 || _str.charCodeAt(i) === 94) {
        len += 2
      } else {
        len++
      }
    }
    return len
  }
}
export default StringUtils