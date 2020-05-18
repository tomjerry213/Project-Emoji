// miniprogram/pages/emg_display/emg_display.js
Page({

  /**
   * 页面的初始数据
   * 单个表情包的各种数据，后续与后端可以再加
   */
  data: {
    /** get Image url from other pages like emg_class
     *  or maybe load it from database
     *  load from database please also load its features
     * some are just for demo 
    */
    ImgUrl:'/emg_type/rec_0.jpg',
    author:'匿名',
    tags:["软工作业",'程序员','在改了','就硬拖'],
    type:'',
    style:'',
    numLike:0,
    boolLike:false,
    boolCollect:false
  },

  //点击“点赞”
  clickLike: function () {
    this.setData({
      numLike:(this.data.numLike + 1),
      boolLike:true
    })
  },

  //点击“收藏”
  clickCollect: function () {
    this.setData({
      boolCollect:true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inpVal = options.ImgUrl
    console.log(inpVal)
    this.setData({
      ImgUrl: inpVal//["detail"]["ImgUrl"]//or other
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