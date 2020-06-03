// miniprogram/pages/emg_display/emg_display.js
Page({

  /**
   * 页面的初始数据
   * 单个表情包的各种数据，后续与后端可以再加
   * 用户打开即显示like/star数目，在界面退出的时候再更新数字
   */
  data: {
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
    var inpID = options.imgID
    var inpVal = options.ImgUrl
    var inpAuthor = options.author
    var inpTag = JSON.parse(options.tags) 
    var inpLike = options.numLike
    var inpStar = options.numStar
    // var inpBoolLike = JSON.parse(options.boolLike)
    // var inpBoolCollect = JSON.parse(options.boolCollect)
    console.log(inpLike)
    console.log(inpStar)
    // 从App()中缓存的用户信息判断用户是否点赞/收藏过本表情包
    var inpBoolLike = getApp().globalData.userInfo.likeList.includes(inpID)
    var inpBoolStar = getApp().globalData.userInfo.starList.includes(inpID)
    
    // console.log(getApp().globalData.userInfo.likeList)
    console.log(inpVal)
    console.log('inpBoolLike:', inpBoolLike)
    console.log('inpBoolStar:', inpBoolStar)
    console.log(inpAuthor)
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
      this.setData({ boolLike: false, numLike: this.data.numLike - 1 })

      // 从App()中缓存的用户信息likeList中删除本表情包
      var idxToRemove = getApp().globalData.userInfo.likeList.indexOf(this.data.imgID)
      if (idxToRemove != 1) getApp().globalData.userInfo.likeList.splice(idxToRemove, 1)

      console.log(getApp().globalData.userInfo.likeList)

      // 调用云函数，修改数据库中user集合和sticker集合的信息
      wx.cloud.callFunction({
        name: 'changeLikeOrStarStatus',
        data: { imgID: this.data.imgID, method: 'removeLike' }
      })
    }
    else{   // 如果用户还没点赞过这个表情包
      this.setData({ boolLike: true, numLike: Number(this.data.numLike - 1 + 2) })

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
    if (this.data.boolStar)
    {  // 如果用户已经收藏过这个表情包了
      this.setData({ boolStar: false, numStar: this.data.numStar - 1 })

      // 从App()中缓存的用户信息starList中删除本表情包
      var idxToRemove = getApp().globalData.userInfo.starList.indexOf(this.data.imgID)
      if (idxToRemove != 1) getApp().globalData.userInfo.starList.splice(idxToRemove, 1)

      // 调用云函数，修改数据库中user集合和sticker集合的信息
      wx.cloud.callFunction({
        name: 'changeLikeOrStarStatus',
        data: { imgID: this.data.imgID, method: 'removeStar' }
      })
    }
    else{   // 如果用户还没收藏过这个表情包
      this.setData({ boolStar: true, numStar: Number(this.data.numStar - 1 + 2) })

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
  //图片preview/下载
  showPhotoInfo: function(e)
  {
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: [this.data.ImgUrl]
      })
  },


  getAuthorOtherImgs: function(){
    var that = this
    wx.navigateTo({
      url: '../authorOtherImgs/authorOtherImgs?targetAuthor=' + that.data.author,
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
   * we need a reset! 
   */
  onUnload: function () {
    // var that = this
    // that.setData({
    //   ImgUrl: '',
    //   imgID: '',
    //   author: '匿名',
    //   tags: ["软工作业", "程序员", "在改了", "就硬拖"],
    //   type: '',
    //   style: '',
    //   numLike: 0,
    //   numStar: 0,
    //   boolLike: false,
    //   boolStar: false
    // })
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