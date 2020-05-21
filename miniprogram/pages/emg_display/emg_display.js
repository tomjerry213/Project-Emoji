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
    //ImgUrl:'/emg_type/rec_0.jpg',
    ImgUrl: '',
    imgID: '',
    author: '匿名',
    tags: ["软工作业", "程序员", "在改了", "就硬拖"],
    type: '',
    style: '',
    numLike: 0,
    numStar: 0,
    boolLike: false,
    boolStar: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inpID = "a9bfcffc5ebfcf8300b1633c474830cb"   // TODO: 应该作为参数从emg_class页面传入
    var inpVal = options.ImgUrl
    var inpAuthor = options.author
    var inpTag = JSON.parse(options.tags)
    var inpLike = JSON.parse(options.numLike)
    var inpStar = JSON.parse(options.numStar)
    // var inpBoolLike = JSON.parse(options.boolLike)
    // var inpBoolCollect = JSON.parse(options.boolCollect)

    // 从App()中缓存的用户信息判断用户是否点赞/收藏过本表情包
    var inpBoolLike = getApp().globalData.userInfo.likeList.includes(inpID)
    var inpBoolStar = getApp().globalData.userInfo.starList.includes(inpID)
    
    console.log(inpVal)
    console.log('inpBoolLike:', inpBoolLike)
    console.log('inpBoolStar:', inpBoolStar)
    
    this.setData({
      imgID: inpID,
      ImgUrl: inpVal,
      tags: inpTag,
      numLike: inpLike,
      numStar: inpStar,
      boolLike: inpBoolLike,
      boolStar: inpBoolStar,
      author: inpAuthor
    })
  },

  changeLikeStatus: function(){
    if (this.data.boolLike){  // 如果用户已经点赞过这个表情包了
      this.setData({ boolLike: false, numLike: this.data.numLike-1 })

      // 从App()中缓存的用户信息likeList中删除本表情包
      var idxToRemove = getApp().globalData.userInfo.likeList.indexOf(this.data.imgID)
      if (idxToRemove != 1) getApp().globalData.userInfo.likeList.splice(idxToRemove, 1)

      // 调用云函数，修改数据库中user集合和sticker集合的信息
      wx.cloud.callFunction({
        name: 'changeLikeOrStarStatus',
        data: { imgID: this.data.imgID, method: 'removeLike' }
      })
    }
    else{   // 如果用户还没点赞过这个表情包
      this.setData({ boolLike: true, numLike: this.data.numLike+1 })

      // 从App()中缓存的用户信息likeList中加入本表情包
      var idxToAdd = getApp().globalData.userInfo.likeList.indexOf(this.data.imgID)
      if (idxToAdd == -1) getApp().globalData.userInfo.likeList.push(this.data.imgID)

      // 调用云函数，修改数据库中user集合和sticker集合的信息
      wx.cloud.callFunction({
        name: 'changeLikeOrStarStatus',
        data: { imgID: this.data.imgID, method: 'addLike' }
      })
    }
  },

  changeStarStatus: function(){     // 处理逻辑和上面的changeLikeStatus一样
    if (this.data.boolStar){  // 如果用户已经点赞过这个表情包了
      this.setData({ boolStar: false, numStar: this.data.numStar-1 })

      // 从App()中缓存的用户信息starList中删除本表情包
      var idxToRemove = getApp().globalData.userInfo.starList.indexOf(this.data.imgID)
      if (idxToRemove != 1) getApp().globalData.userInfo.starList.splice(idxToRemove, 1)

      // 调用云函数，修改数据库中user集合和sticker集合的信息
      wx.cloud.callFunction({
        name: 'changeLikeOrStarStatus',
        data: { imgID: this.data.imgID, method: 'removeStar' }
      })
    }
    else{   // 如果用户还没点赞过这个表情包
      this.setData({ boolStar: true, numStar: this.data.numStar+1 })

      // 从App()中缓存的用户信息starList中加入本表情包
      var idxToAdd = getApp().globalData.userInfo.starList.indexOf(this.data.imgID)
      if (idxToAdd == -1) getApp().globalData.userInfo.starList.push(this.data.imgID)

      // 调用云函数，修改数据库中user集合和sticker集合的信息
      wx.cloud.callFunction({
        name: 'changeLikeOrStarStatus',
        data: { imgID: this.data.imgID, method: 'addStar' }
      })
    }
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