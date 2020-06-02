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


  onLoad: function (options) {

    var formData = {
    msg: "原来不是你不行，是我不行",
    type: "fenci"
    }; 
    wx.request({
      url: 'https://jsonin.com/fenci.php',
      method: 'post',
      data: JSON.stringify(formData),
      header: {
      "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
      console.log(res)
      }
      })

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