// miniprogram/pages/my_upload/my_upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //这是个数组
    imageUrl:[]
  },
  // 理论上是一样的
  // listStickerByAuthorUI() {
  //   let that=this
  //   wx.cloud.callFunction({
  //     name: "listStickerByAuthor",
  //     data: {
  //       value: global_author_id
  //     },
  //     success: (res) => {
  //       console.log("list Sticker By author succeed", res)
  //       that.image_info = res.result.data
  //       that.extractInfo(that.image_info)
  //     },
  //     fail: (res) => {
  //       console.log("list Sticker By author failed", res)
  //     }
  //   })
  // },
  // extractInfo(info) {
  //   var image_URL = new Array()
  //   console.log(info)
  //   for (let i = 0; i < info.length; ++i) {
  //     image_URL.push({
  //       id:i+1,
  //       url:info[i].img
  //     })
  //   }
  //   console.log("image_URL",image_URL)
  //   var that = this
  //   this.setData({
  //     photos: image_URL
  //   })
  // },

  jumpDisplay: function (event) {
    var tmpItem = event.currentTarget.dataset.item;
    var tmpUrl = '../emg_display/emg_display?ImgUrl='+tmpItem.img+'&tags='+JSON.stringify(tmpItem.tag)+'&numLike=0&boolLike=false&boolCollect=false&author=KAISHUI'
    wx.navigateTo({
        url: tmpUrl
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
     const app = getApp()
     console.log(app.globalData.userInfo._id)
     var that = this
     wx.cloud.callFunction({
       name:"getStickerOfUser",
       data:{
         userID:app.globalData.userInfo._id
       },

       success(res){
          console.log(res.result.stickerUrlList)
          console.log(res.result.userID)
          const data =res.result.stickerUrlList.data
          //console.log(data)
          const temp = new Array()
          for(let i = 0;i<data.length;i++)
          {
            temp.push({"img":data[i].img,"tag":data[i].tags})
          }
          that.setData({imageUrl:temp})
       },
       fail(res){
         console.log(res)
       },
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