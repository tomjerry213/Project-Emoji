# Openemg UI：
## author：lsl

* 请谨慎，一个微信号只能创建五个微信小程序（也就是只能申请五个AppID）
* 界面路径加入app.json中，主路径中的app下保存了全局的信息如tabbar等
* 基于weUI库开发，使用包的方法为在wxss中@import '/style/weui.wxss';（主路径也OK）每个page下的wxml文件为定义组件和操作，js文件与后端交接定义data和实现操作，wxss文件与数据操作等无关，定义组件的颜色格式等。
* 记录用户操作界面调用关系和数据结构等：
    * 首页为index，“为你推荐”和“最近热门”中点击图片（数据结构定义在index.js中的rec_routers和hot_routers,路径 + name + target url）调用page/emg_class/emg_class界面（尚未完善，不过onload中有了参数传递，目前传递的是name）
    * 点击搜索框跳转到/pages/searchscreen/searchscreen界面，为输入界面，包括取消按钮，按回车键确定搜索后会将参数传递至/pages/searchres/searchres界面（也未完善，只有display search的关键词）
    * 以上两种js控制跳转比较简单，navigateTo可以写成function和直接在wxml文档中设置，详情还是见代码。
    * 有的代码是借鉴于weUI文档，故有的style写在了wxss文件，有的直接在wxml文件中定义了
    * 上传部分在/pages/upload/upload中，选择部分是调用的滑块选择操作，目标文件夹我的想法是每个用户有一个主文件夹和可以在此之下自己创建文件夹。
    js部分中uploadDetailImage选择本地图片（如果使用按钮上传，就是调用uploadimg的话就是直接上传到服务器，不过未指定目标url后续再用），bindlongpressimg取消文件上传，并提供预览功能previewImage
    * 我的 界面目前只写了大致的界面，跳转的界面尚未提供，后续改.jpg


### 修改记录
* wyq 2020.4.22

## 修改记录
* lsl 2020.4.30
之后需要进行云开发，云开发貌似测试号是不行的，需要注册appid或者找lsl要appid用于测试云函数   

## 修改记录
* lyx 2020.5.18
增加表情包点赞/收藏功能的框架
增加“我的”界面下四个按钮的页面跳转以及显示框架
以上内容基本只有表面的视觉效果，有待配合后端进行进一步实现 
