/**
 * Description:
 *
 * Author: zoe
 * Time: 2018/5/4 0004
 */
export default class TimeUtil {

    /**
     * 例如:2017-06-28 10:48:46转成date类,
     * 可把- replace成/
     * @param dateString
     * @return Date
     */
    static parserDateString(dateString){
        if(dateString){
            let regEx = new RegExp("\\-","gi");
            let validDateStr=dateString.replace(regEx,"/");
            let milliseconds=Date.parse(validDateStr);
            return new Date(milliseconds);

        }
    }

    // timestamp时间戳 formater时间格式
    static formatDate(timestamp, formater) {
        let date = new Date();
        date.setTime(parseInt(timestamp));
        formater = (formater != null)? formater : 'yyyy-MM-dd hh:mm';
        Date.prototype.Format = function (fmt) {
            let o = {
                "M+": this.getMonth() + 1, //月
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };

            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
                    (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return fmt;
        }
        return date.Format(formater);
    }

    static getDateDiff(dateTimeStamp) {

        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();

        var diffValue = now - dateTimeStamp * 1000;
        if (diffValue < 0) {
            return;
        }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        let result = '';
        if (monthC >= 1) {
            result = "" + parseInt(monthC) + '月前';
        }
        else if (weekC >= 1) {
            result = "" + parseInt(weekC) + '周前';
        }
        else if (dayC >= 1) {
            result = "" + parseInt(dayC) + '天前';
        }
        else if (hourC >= 1) {
            result = "" + parseInt(hourC) + '小时前';
        }
        else if (minC >= 1) {
            result = "" + parseInt(minC) + '分钟前';
        } else
            result = '刚刚';
        return result;
    }
}