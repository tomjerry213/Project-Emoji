### 本部分主要实现了和sticker有关的部份，主要分为两块
第一为整体的表，记录表情包的所有信息
第二则是存储，记录了文件名和cloudpath。

### 主要设置之时需要更改一些地方：
1. app.js ：
   ```js
   onLaunch: function () {
    wx.cloud.init({
      env: 'emoji-sxwx4' // 此处应该修改为对应的环境编号
    })
  },
  ```
2.project.config.json中应该具有"cloudfunctionRoot": "cloud/"的项
3.每一个云函数的const db=cloud.database().collection("test")中的test字样应该更改为对应的表名
4.云函数需要部署方可使用。具体方法见google
### 使用方法
make sure that everyinpt is valid or the cloud func will return error
index.js中前6个函数为测试用函数，其中第六个需要补全
index.wxml中为测试用前端，可根据需要随意修改
#### 函数名称以UI结尾的是假定的UI界面，可将里面的函数内容直接复制即可
其余函数为实现用函数，将整个函数复制即可。
大多数函数调用后得到的值在其回调的success的res中，以console.log展示的信息为重要信息，其中包含所需文件或者直接打印了所需信息
global_others 为一些输入信息，例如downloadtimes，point

### 需要进一步修改的内容
标注有sth wrong的内容，修改理论只涉及云函数，所以UI部份应该不会变化
标注有further的内容
