//清除ES日志  
var ClearHistoryES = function ClearHistoryES(client,appConfig,logs) {  
    /* curl -XGET http://localhost:9200/_all  
    * curl 方式*/  
    /* 
    var request = require('request'); 
    var $ = require('jquery')(require("jsdom").jsdom().defaultView); 
    request.get(appConfig.elasticSearch.host[0] + "/_all", function (err, res, body) { 
        console.log("[_all:]" + body); 
        var json = $.parseJSON(body); 
        console.log(json); 
        var allIndex = getAllIndex(body); 
        var allDelIndex = getAllDelIndex(allIndex); 
 
        if(allDelIndex==''){ 
            //console.log("清理完毕：") 
            delIndex(allDelIndex); 
        }else { 
            delIndex(allDelIndex); 
        } 
    }); 
    */  
    client.indices.get({index:'_all'},function (error,response) {  
        //console.log("gel_allindex:"+ JSON.stringify(response));  
        if (error != undefined) {  
            console.log("[获取全部索引异常：]" + JSON.stringify(error));  
            logs.error(JSON.stringify(error));  
            //logs.info(data);  
        }  
        else {  
            var allIndex = getAllIndex(response);  
            var allDelIndex = getAllDelIndex(allIndex);  
            console.log("allDelIndex："+allDelIndex);  
            if(allDelIndex==''){  
                console.log("没有需要清理的数据！");  
            }else {  
                delIndex(allDelIndex);  
            }  
        }  
    });  
    //获取ES的index  
    function getAllIndex(indexInfo) {  
        //var json = $.parseJSON(indexInfo);  
        var json = indexInfo;//JSON.parse(indexInfo);  
        //console.log(json);  
        var arry = [];  
        for (var key in json) {  
            arry.push(key);  
        }  
        //console.log(arry);  
        return arry;  
    }  
  
    function getAllDelIndex(allIndex) {  
        var result = [];  
        for (var index in allIndex) {  
            var value = allIndex[index];  
            if (isDelIndex(value)) {  
                result.push(value);  
            }  
        }  
        return result;  
        function isDelIndex(value) {  
            //var delIndex = '';  
            var dateNow = getDateNow();  
            for (var index in appConfig.clearhistory) {  
                var prefix = value.substring(0, value.lastIndexOf("_") + 1);  
                var dateValue = value.substring(value.lastIndexOf("_") + 1, value.length);  
                //console.log(prefix);  
                //对比索引前缀是否符合自动清理规则  
                if (appConfig.clearhistory[index].indexPrefix == prefix) {  
                    var deadline = dateNow;  
                    //console.log(dateValue);  
                    //console.log("dateNow:" + dateNow);  
                    //要求保留的月时长  
                    if (appConfig.clearhistory[index].month > 0) {  
                        deadline = addMonths(deadline, -appConfig.clearhistory[index].month);  
                        //console.log("月：" + deadline);  
                    }  
                    //要求保留的天数  
                    if (appConfig.clearhistory[index].day > 0) {  
                        deadline = addDays(deadline, -appConfig.clearhistory[index].day);//加保留的天数  
                        //console.log("天：" + deadline);  
                    }  
                    /* 
                     if (isDateLimit(formatStringToDate(dateValue), deadline)) {//日期是否超限 
                     delIndex += value + ","; 
                     console.log("日期是否超限:"+value); 
                     console.log("delIndex:"+delIndex); 
                     }*/  
                    return isDateLimit(formatStringToDate(dateValue), deadline);  
                    break;  
                }  
            }  
            //console.log("delIndex:"+delIndex);  
            //return delIndex == '' ? '' : delIndex.substring(0, delIndex.length - 1);  
            //字符串格式化为日期  
            function formatStringToDate(valueDate) {  
                //console.log("formatStringToDate:" + valueDate.replace(/-/g, "/"));  
                return new Date(Date.parse(valueDate.replace(/-/g, "/")));  
            }  
  
            function getDateNow() {  
                var dateNow = new Date();  
                var year = dateNow.getFullYear();  
                var month = dateNow.getMonth();  
                var day = dateNow.getDate();  
                return new Date(year, month, day);  
                //return year + "-" + month + "-" + day;  
                //return new Date("yyyy-MM-dd");  
            }  
  
            //添加月份  
            function addMonths(date, month) {  
                var dateNow = date;  
                var year = dateNow.getFullYear();  
                var month = dateNow.getMonth() + month;  
                var day = dateNow.getDate();  
                if (parseInt(month / 12) > 0) {  
                    year += parseInt(month / 12)  
                }  
                //console.log("year:" + year + " month:" + month + " day:" + day);  
                return new Date(year, month, day);  
  
            }  
  
            //添加日  
            function addDays(date, days) {  
                return new Date(date.setDate(date.getDate() + days));  
            }  
  
            //是否超过时限，超过返回true，没有是false  
            function isDateLimit(indexDate, limitDate) {  
                //console.log("【indexDate:】" + indexDate + " 【limitDate:】" + limitDate);  
                //console.log(indexDate <= limitDate ? true : false);  
                return indexDate <= limitDate ? true : false;  
            }  
        }  
    }  
  
    function delIndex(allDelIndex){  
        console.log(allDelIndex);  
        //删除多个client.indices.delete({index: ['  
        // xxx_2017-02-16','xxx_2017-02-15']})；  
        //"{index: ['xxx_2017-02-16','xxx_2017-02-15']}";  
        client.indices.delete({index: allDelIndex}, function (error, response) {  
            //console.log("client.indices.delete:"+error);  
            if (error != undefined) {  
                console.log("[清理异常]" + error);  
                logs.error(error);  
            }else{  
                console.log("[清理完毕]" + allDelIndex);  
            }  
  
        });  
        /* 
         //使用$ curl -XDELETE 'http://localhost:9200/twitter,fgfg,ghjg/' 
         //allDelIndex ="['xxx_2017-02-16,xxx_sdk_2017-02-16']"; 
         request.delete(appConfig.elasticSearch.host[0] + allDelIndex, function (err, res, body) { 
         console.log("清理情况：" + body); 
         });*/  
    }  
}  
module.exports = ClearHistoryES;  