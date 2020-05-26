// miniprogram/pages/my_upload/my_upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //这是个数组
    imageUrl:[]
  },
  //这里也需要load进去
  jumpDisplay: function (event) {
    console.log(event)
    var tmpItem = event.currentTarget.dataset.item;
    console.log(tmpItem)
    /*    
    var url = '../emg_display/emg_display?ImgUrl=' + this.data.photos[id].url+
    '&tags='+JSON.stringify(this.data.photos[id].tags)+
    '&numLike=' + this.data.photos[id].likeTimes+
    '&numStar=' + this.data.photos[id].starTimes+
    '&author=' + this.data.photos[id].author+
    '&imgID=' + this.data.photos[id]._id; */
    var tmpUrl = '../emg_display/emg_display?ImgUrl='+tmpItem.img
    +'&tags='+JSON.stringify(tmpItem.tags)+
    // +'&numLike=0&boolLike=false&boolCollect=false&author=KAISHUI'
    '&numLike=' + tmpItem.likeTimes+
    '&numStar=' + tmpItem.starTimes+
    '&author=' + tmpItem.author+
    '&imgID=' + tmpItem._id;
    console.log(tmpUrl)
    wx.navigateTo({
        url: tmpUrl
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    var targetAuthor = options.targetAuthor
     var that = this
     wx.cloud.callFunction({
       name:"getStickerOfUser",
       data:{
         userID:targetAuthor
       },

       success(res){
          // console.log(res.result.stickerUrlList)
          const data =res.result.stickerUrlList.data
          //console.log(data)
          const temp = new Array()
          for(let i = 0;i<data.length;i++)
          {
            // temp.push({"img":data[i].img,"tag":data[i].tags})
            temp.push(data[i])
          }
          that.setData({imageUrl:temp})
       },
       fail(res){
         console.log(res)
       },
     })  
  },

  /**
   *  删除已上传的图片的函数
   */
  delteSticker:function()
  {
    console.log
    wx.cloud.callFunction({
      name:"deleteSticker",
      data:{
        fileId:"54bac78c5eccee21004e46f41d59e532"
      },
      success(res)
      {
        console.log(res);
      },
      fail(res)
      {
        console.error(res);
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