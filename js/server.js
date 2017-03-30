
var PORT = 8888;
var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
var querystring = require('querystring');

//用于邮件发送
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./config');

//邮件发送前置
smtpTransport = nodemailer.createTransport(smtpTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject, html) {

    smtpTransport.sendMail({

        from: config.email.user,
        to: recipient,
        subject: subject,
        html: html

    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送成功')
    });
}

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('../userInfo.txt');
var info = "";
var user = [];

//創建服務器
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("../", pathname);
//    console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    
                    //接收表單數據
                    request.addListener('data', function(data){
                    	// data转string再转json
						info = querystring.parse(data.toString());
						
						if (info.name !== undefined && info.name!=='') {
							user.push({
								"name"    : info.name,
								"phone"   : info.phone,
								"email"   : info.email,
								"massage" : info.massage
							});
						}
						
						var str = "";
						for (var i = 0; i<user.length; i++) {
							str = "编号 : " + (i+1)           + '\r\n' 
							+ "用戶姓名 : "  + user[i].name    + '\r\n'
							+ "用戶电话 : "  + user[i].phone   + '\r\n'
							+ "用戶邮箱 : "  + user[i].email   + '\r\n'
							+ "用户留言 : "  + user[i].massage + '\r\n'
							+ "-----------------------------------------------" + '\r\n';
						}
						//发送邮件
						sendMail("1205149887@qq.com", "预约客户信息", str);
						// 保存数据到本地
						writerStream.write(str,'UTF8');
						
						
					});
					request.addListener("end", function(){
						
					});
                    
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
module.exports = sendMail;
console.log("Server runing at port: " + PORT + ".");
