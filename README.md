# reserve
### 姓名：毛武林
### 电话：18829224680
### 邮箱：18829224680@163.com
># 项目思路
>>#### 功能设计
>>>项目整体可概述为教育活动推广，所以所需的功能模块应当包括活动内容的展示、客户信息的提交、表单的验证以及需求概述中提到的数据提交后自动跳转、客户信息的保存、使用微信平台的推广、客户信息的提交。
>>#### 页面设计
>>>项目为教育相关、面向高端用户，因此整体设计上应当避免排版复杂、杂乱，色彩上避免太过艳丽刺眼，应当以简约、低调、内涵风格为主。
>>>因为使用到微信平台推送，所以必须支持移动端响应式布局。
># 项目说明
>>#### 环境配置
>>>* 首先搭建项目结构：reserve项目文件夹，index.html项目入口，css样式表文件夹，img项目所用图片文件夹，font项目字体文件 夹，js项目javascript文件夹。<br>
>>>* 然后搭建node.js环境，版本号V6.7.0, 服务器端口号8888, 配置路径为“./” <br>
>>>* 开始编写项目
>>#### 文件说明
>>>##### css文件
>>>global -- 全局样式文件<br>
>>>pc     -- pc端样式文件，规则为页面宽度大于1024px<br>
>>>mobile -- 移动端样式页面 规则为页面宽度大于1023px
>>>##### js文件
>>>server -- 服务器端主文件，包括了服务器的创建，表单的接收，数据流的操作等等<br>
>>>jquery -- 类库<br>
>>>index  -- 前台主js文件，包括了表单的验证，事件的监听，页面的跳转<br>
>>>config -- 项目配置文件<br>
>>>mine   -- 常用文件路径<br>
>>>##### font文件
>>>来自[阿里巴巴矢量图标库](http://www.iconfont.cn/)
>>>##### userinfo文件
>>>客户信息本地存贮文本文件
># 工作流程
>>>* 服务器端口号为8888，请保证没有冲突进程存在
>>>* 项目访问路劲为http://localhost:8888/inde.html
>>>* 请安装nodemailer与nodemailer-smtp-transport，命令如下<br>
>>>> `npm install nodemailer` <br>
>>>> `npm install nodemailer-smtp-transport` <br>
>>>* 配置config中services:"邮箱类型”，uer:"你的邮箱名称"， pass:"邮箱密码/授权码"，授权码获取方式为开启对应邮箱POP3/SMTP服务,生成授权码
>>>* 在node服务器端运行node server.js, 成功后提示服务器已经在8888端口运行
>>>* 进入主页，输入姓名，电话号码，邮箱，留言后点击预约，弹出提示框预约成功并跳转至http://m.souke.xdf.cn/ 页面，数据会保存至根目录下userInfo.txt文件中，服务器控制台提示邮件发送成功。
># 测试方案
>>>* 测试表单验证正确率
>>>* 测试页面布局
>>>* 测试数据提交正确率
>>>* 测试工作流程与业务符合度
># 表单验证规则
>>> name    -- 随意输入,不能为空<br>
>>> phone   -- 11位手机号码<br>
>>> email   -- 正确格式为xx@xx.com<br>
>>> massage -- 选填，可以为空
># 实现的功能
>>>* 在线预约<br>
>>>* 用户信息填写<br>
>>>* 验证成功后跳转至 http://m.souke.xdf.cn/ <br>
>>>* 提交后页面记录用户输入内容并保存 <br>
>>>* 每当有用户预约会将用户信息发送至指定邮箱(业务部门)<br>
>>>* 因域名为通过ICP备案与时间关系，微信推送功能暂未实现
># 数据格式说明
>>> 每次表单提交都会将表单信息存入userInfo.txt文件中，样式如下:<br>
>>>> 编号     : 1 <br>
>>>> 用戶姓名 : 老毛 <br>
>>>> 用戶电话 : 18829224680 <br>
>>>> 用戶邮箱 : 18829224680@163.com <br>
>>>> 用户留言 : Hello World! <br>
>>> 其中编号代表用户预约顺序，其他包含有用户姓名，电话号码，邮箱地址，留言信息等。
 
