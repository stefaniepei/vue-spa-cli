const DateUtils = {
  /**
   * element-ui 日期选择框-开始日期选择框的禁用日期
   * @param _time 当前时间
   * @returns true为禁用
   */
  disableElDatePickerStartTime(_time){
    return _time.getTime() > Date.now()
  },
  /**
   * element-ui 日期选择框-截至日期选择框的禁用日期
   * @param _time 当前时间
   * @param _startDate 开始日期选择框的日期
   * @param _days 时间范围,以天为单位，默认前三个月~后三个月(90天)
   * @returns true为禁用
   */
  disableElDatePickerEndTime(_time, _startDate, _days=90){
    if(!_startDate){
      return true;
    }else{
      const curDate = (new Date(_startDate)).getTime()
     // 这里算出一个月的毫秒数,这里使用30的平均值
     const nextAnyMonths = curDate + 24 * 3600 * 1000 * _days;
     const lastAnyMonths = curDate - 24 * 3600 * 1000 * 1;
     return _time.getTime() > nextAnyMonths || _time.getTime() < lastAnyMonths || _time.getTime() > Date.now();
    }
  },
  /**
   * 时间转成时间戳用来比较大小
   * @param str 时间字符串
   * @returns 时间戳
   */
  toDate(str, separator = '-') {
    const sd = !!str && str.split(separator);
    return new Date(sd[0], sd[1], sd[2]);
  }

}
export default DateUtils