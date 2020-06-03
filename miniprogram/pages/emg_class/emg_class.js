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
  data: {
    className:"xxx",//get name onload, search in db
    rpp:20,
    loading:true,//开始true, load结束后改为false
    testtags:["软工作业",'程序员','在改了','就硬拖'],
    searchFor:'',//决定是搜索tags的type还是style，即tags的0/1
    testUrl: '/emg_test/rec_0.jpg',
    // test photos, 这些是备用的，如果load失败
    /*photos:[
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
    ],*/
    //放弃备用图片，因为会导致用户在加载完成前看到它们
  photos:[],
    featureOptionHidden: true,
    hasMore: false,
  },
  
  // just for test
  lookPhoto: function(event) {
    var that = this;
    var id = (event.currentTarget.id)-1;
    // var url = '../emg_display/emg_display?ImgUrl=' + this.data.testUrl+'&tags='+JSON.stringify(this.data.testtags)+'&numLike=0&numStar=0&author=匿名';
    var url = '../emg_display/emg_display?ImgUrl=' + this.data.photos[id].url+
    '&tags='+JSON.stringify(this.data.photos[id].tags)+
    '&numLike=' + this.data.photos[id].likeTimes+
    '&numStar=' + this.data.photos[id].starTimes+
    '&author=' + this.data.photos[id].author+
    '&imgID=' + this.data.photos[id]._id;//this is id not name！！
    console.log(url)
    wx.navigateTo({
      url: url
    })
  },

// not used now, 动态加载需要吗
/*
  initData: function(f){
    var cachedPhotos = wx.getStorageSync(f);

    if (!cachedPhotos) 
    {
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
  loadMore: function(e) 
  {
    console.log('down');
    if (this.data.hasMore) {
      this.fetchData();
    }
  },
  //add more and connect to database
  fetchData: function(e){
    
  },
*/
  listStickerByTypeUI() {
    let that = this
    wx.cloud.callFunction({
      name: "listStickerByType",
      data: {
        tag: that.data.className
      },
      success: (res) => {
        console.log("get sticker by type succeed", res)
        that.image_info = res.result.data
        that.extractInfo(that.image_info)
      },
      fail: (res) => {
        console.log("get sticker by type failed", res)
      }
    })
  },
  listStickerByStyleUI() {
    let that = this
    wx.cloud.callFunction({
      name: "listStickerByStyle",
      data: {
        tag: that.data.className
      },
      success: (res) => {
        console.log("get sticker by style succeed", res)
        that.image_info = res.result.data
        that.extractInfo(that.image_info)
      },
      fail: (res) => {
        console.log("get sticker by style failed", res)
      }
    })
  },

  //need change here, we need a search function!!!
  listStickerByPointUI() {
    let that=this
    wx.cloud.callFunction({
      name: "listStickerByPoint",
      data: {
        tag: that.data.className
      },
      success: (res) => {
        console.log("list Sticker By Point succeed", res)
        that.image_info = res.result.data
        that.extractInfo(that.image_info)
      },
      fail: (res) => {
        console.log("list Sticker By Point failed", res)
      }
    })
  },
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
  listStickerBySearch:function(description)//传入分词之后的东西
  {
    var that = this
    console.log("search for ",description)
      var formData = {
            // msg: "你是不是没吃饭啊，我很高兴",
            msg: description,
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
                // console.log(res.data)
                var tmpdata = that.delRepeat(res.data)
                console.log("tmp data is ",tmpdata)
                wx.cloud.callFunction({
                  name: 'searchInv',
                  data:{
                    description:tmpdata
                  },
          success:function (res){//搜索
            console.log("search res ",res)
            // that.image_info = res.result.data
            that.image_info = res.result
            that.extractInfo(that.image_info)
          },
          fail:function(res){
            console.log("搜索失败")//啥都不干就是啥都莫得
          }
        })
      },
      fail:function(res){
        console.log("分词失败")
      }
    })
  },
  // assist func
  extractInfo(info) {
    var image_URL = new Array()
    console.log(info)
    for (let i = 0; i < info.length; ++i) {
      image_URL.push({
        id:i+1,
        author:info[i].author,
        _id: info[i]._id,//bqb的_id
        tags : info[i].tags,
        likeTimes:info[i].likeTimes,
        starTimes: info[i].starTimes,
        url:info[i].img
      })
    }
    console.log("image_URL",image_URL)
    var that = this
    this.setData({
      photos: image_URL
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  showBusy: function () 
  {    
    wx.showToast({
    title: '搜索中...',      
    mask: true,       
    icon: 'loading'    
  })  
},  
  onLoad: function (options) {
    var inpVal = options.name
    var searchfor = options.searchFor
    var that = this
    that.showBusy()
    console.log(options)
    this.setData({
      className:inpVal,
      searchFor:searchfor//作为要搜索的东西，是type/style
    })
    console.log(inpVal)
    console.log(searchfor)
    if(searchfor == 'type')//根据跳转信息
    {
      that.listStickerByTypeUI();
    }
    else if(searchfor == 'style'){//根据跳转信息
      that.listStickerByStyleUI();
    }
    else if(searchfor == 'search'){
      console.log("in Search")
      that.listStickerBySearch(inpVal)
    }
    else{

    }
    var url = name2url[inpVal]
     this.setData({
      loading: false
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