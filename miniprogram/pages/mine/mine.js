//前端这部分我的界面还没有实现跳转和界面搭建，我的
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  clickMyCollection: function(){
    wx.navigateTo({
      url: '../my_collection/my_collection',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  delRepeat: function (array) {
    var temp = {}, len = array.length;
    for (var i = 0; i < len; i++) {
        var tmp = array[i];
        if (!temp.hasOwnProperty(tmp)) {//hasOwnProperty用来判断一个对象是否有你给出名称的属性或对象
            temp[array[i]] = "yes";
        }
    }
    len = 0;
    var tempArr = [];
    for (var i in temp) {
        tempArr[len++] = i;
    }
    return tempArr;
  },
  onLoad: function (options) {
    //测试分词
    // var formData = {
    // // msg: "你是不是没吃饭啊，我很高兴",
    // msg: "我很不是乐意是吧",
    // type: "fenci"
    // }; 
    // var that = this
    // wx.request({
    //   url: 'https://jsonin.com/fenci.php',
    //   method: 'post',
    //   data: JSON.stringify(formData),
    //   header: {
    //   "content-type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     // var des = 
    //     var tmpdata = that.delRepeat(res.data)

    //     console.log(tmpdata)
    //     wx.cloud.callFunction({
    //       name: 'searchInv',
    //       data:{
    //         description:tmpdata
    //       },
    //       success:function (res){
    //         console.log("function res ",res)
    //       }
    //     })
    //   },
    //   fail:function(res){
    //     console.log("分词失败")
    //   }
    // })

    //测试分词和搜索

},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})