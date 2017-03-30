#   项目说明
### reserve
### 姓名：毛武林
### 电话：18829224680
### 邮箱：18829224680@163.com
># 项目思路
>> #### 功能设计
>>>项目整体可概述为教育活动推广，所需的功能模块应当有活动内容的展示、客户信息的提交、表单的验证以及需求概述中提到的数据提交后自动跳转、客户信息的保存、使用微信平台的推广、客户信息的提交。
>> #### 页面设计
>>>项目为教育相关、面向高端用户，因此整体设计上应当避免排版复杂、杂乱，色彩上避免太过艳丽刺眼，应当以简约、低调、内涵风格为主。
>>>因为使用到微信平台推送，所以必须支持移动端响应式布局。
># 工作流程
>> #### 环境配置
>>>首先搭建项目结构：reserve项目文件夹，index.html项目入口，css样式表文件夹，img项目所用图片文件夹，font项目字体文件 夹，js项目javascript文件夹。<br>
>>>然后搭建node.js环境，版本号V6.7.0, 服务器端口号8888，地址http://localhost:8888/， 配置路径为相对路径“./” <br>
>>>最后开始编写项目
>> #### 文件说明
>>> ##### css文件
>>> global -- 全局样式文件<br>
>>> pc     -- pc端样式文件<br>
>>> mobile -- 移动端样式页面
>>> ##### js文件
>>> server -- 服务器端主文件，包括了服务器的创建，表单的接收，数据流的操作等等<br>
>>> jquery -- 类库<br>
>>> index  -- 前台主js文件，包括了表单的验证，事件的监听，页面的跳转<br>
>>> config -- 项目配置文件<br>
>>> mine   -- 常用问价路径<br>
>>> ##### font文件
>>> [阿里巴巴矢量图标库](http://www.iconfont.cn/)
>>> ##### userinfo文件
>>> 客户信息本地存贮文本文件
