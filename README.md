# Project-Emoji - 表情包分享微信小程序
2020春季软件工程课程实践，虽然它现在只是个Hello World Demo...而且还是小程序工程创建时就自带的...

## 关于小程序类型的说明
微信小程序分为普通小程序和云开发小程序两种。前者只包括前端，需要自己搭建后端服务器，后者则可以直接通过接口访问免费的腾讯云服务器；前者在正式上线前可以使用临时测试号，而后者创建小程序工程时就需要AppID，AppID需要在微信公众平台注册，涉及绑定邮箱、实名等问题。

在当前后端使用腾讯云（个人推荐）还是老师提供的服务器[1]（虽然现在还不知道老师会不会提供且能不能用）还没有确定的情况下，我暂时用测试号创建了一个普通小程序工程作为Demo，因此最后真正开发时会不会继续用这个工程也还不确定。

注：

[1] 微信小程序服务器不能设置为本机IP或localhost。详见https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html

## 微信小程序开发入门指南
### 如何预览这个Demo？
1. 下载并安装微信开发者工具 https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. 安装完成后打开，通过微信扫码登录
3. 左边选择小程序，点击右边加号创建新小程序
4. 在上面的tab中选择“导入项目”，输入目录，项目名称会自动生成，AppID点击测试号，点击右下角导入
5. 打开后即可在开发者工具的模拟器上预览，或使用窗口上方功能中的预览/真机调试。

### 预览UI
Open_emg_UI文件夹为新的项目，类似预览demo的做法，不过需要导入Open_emg_UI文件夹作为项目而不是整个文件夹

更多微信开发者工具信息见https://developers.weixin.qq.com/miniprogram/dev/devtools/page.html

### 如何快速入门微信小程序？
这是微信小程序官方文档https://developers.weixin.qq.com/miniprogram/dev/framework/

对没接触过小程序开发的人而言，我个人建议在开发前阅读以下内容：

1. 指南 - 从“起步”到“小程序运行时”、基础能力
2. 框架 - 小程序配置、WXML语法参考
