// miniprogram/pages/emg_class/emg_class.js
// test 
var name2url = {
  '软工作业': '/emg_test/rec_0.jpg',
  '快乐' : '/emg_test/rec_1.jpg',
  '悲伤': '/emg_test/rec_2.jpg',
  'JOJO':'/emg_test/rec_3.jpg',
  '酸了': '/emg_test/rec_4.jpg',
  '真人':'/emg_test/rec_5.jpg'
};

const db = wx.cloud.database({});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    className:"xxx",//get name onload, search in db
    rpp:20,
    loading:false,//开始true, load结束后改为false

    testUrl: '/emg_test/rec_0.jpg',
    // while linked to database ,change wxml and use here and load more
    // not used now
    photos:[
      {
        id:1,
        url:'/emg_type/rec_0.jpg',
      },
      {
        id:2,
        url:'/emg_type/rec_1.jpg',
      },
      {
        id:3,
        url:'/emg_type/rec_2.jpg',
      },
      {
        id:4,
        url:'/emg_type/rec_3.jpg',
      },
    ],
    
    featureOptionHidden: true,
    hasMore: false,
  },
  
  // just for test
  lookPhoto: function(event) {
    var that = this;
    var id = (event.currentTarget.id);
    var url = '../emg_display/emg_display?ImgUrl=' + this.data.testUrl;
    console.log(url)
    wx.navigateTo({
      url: url
    })
  },

// not used now, can use while using cloud database
  initData: function(f){
    var cachedPhotos = wx.getStorageSync(f);

    if (!cachedPhotos) {
      this.fetchData();
    } else {
      var nowTs = Date.now();
      var oldTs = parseInt(wx.getStorageSync('requestTs') || 0);

      if (nowTs - oldTs > CACHED_TIME || !oldTs) {
        this.fetchData();
      } 
      else {
        this.setData({
          loading: false,
          photos: cachedPhotos
        })
      }
    }
  },

  //add more
  loadMore: function(e) {
    console.log('down');
    if (this.data.hasMore) {
      this.fetchData();
    }
  },
  //add more and connect to database
  fetchData: function(e){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inpVal = options.name
    this.setData({
      className:inpVal
    })
    console.log(inpVal)
    var url = name2url[inpVal]

    if(url == undefined){
      this.setData({
        testUrl:'/emg_type/rec_0.jpg'
      })
    }
    else{
      console.log(url)
      this.setData({
        testUrl:url
      })
    }//test url
    //load database,搜索处理和获取长度在哪啊..
    const db = wx.cloud.database({
    })
    db.collection('sticker').get({
      success: res=>{
        console
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