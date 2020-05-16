// miniprogram/pages/upload/upload.js
wx.cloud.init({})
const db = wx.cloud.database()
const stickerCollection = db.collection("sticker")
var app = getApp()
//from a missing utils.js
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
 
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
} 
module.exports = {
  formatTime: formatTime
}

Page({

  /**
   * 页面的初始数据
   * 先把用户文件夹管理去掉吧
   */
  data: {
    //for upload many imgs
    i:0,
    success:0,
    fail:0,

    //for save path
    tmpStickerId:'',
    tmpType:'',
    // tmpCloudPath:'',
    // tmpFileID:'',

    typeArray: ['动漫', '人像', '动漫GIF', '人像GIF','简笔','其他'],
    styleArray:['正经','复古','悲伤','快乐','互损','其他' ],
    folderArray:['userMain1','userMain2'],
    typeIndex: 0,
    styleIndex:0,
    folderIndex:0,

    /*bqb输入描述*/ 
    currentLen:0,
    maxDesLen:30,
    emgDescription:"",
    detailPics: [],//本地img path List
  },
  //限制描述的字数和展示
  limit: function (e)  {
    var value = e.detail.value;
    var length = parseInt(value.length);

    if  (length > this.data.noteMaxLen) {
      return;
    }
    this.setData({
      currentLen: length,
      emgDescription:value,
    });
  },
  //选择类型，风格，文件夹操作
  bindTypeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindStyleChange: function(e) {
    this.setData({
      styleIndex: e.detail.value
    })
  },
  bindFolderChange: function(e) {
    this.setData({
      floderIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("user id in database:")
    console.log(app.globalData.userInfo._id)

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

  },

    //添加上传图片
    uploadDetailImage: function (e) { //这里是选取图片的方法
      var that = this;
      var pics = [];
      var detailPics = that.data.detailPics;
      if (detailPics.length >= that.data.count) {
        wx.showToast({
          title: '最多选择' + that.data.count + '张！',
        })
        return;
      }
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          var imgs = res.tempFilePaths;
          for (var i = 0; i < imgs.length; i++) {
            pics.push(imgs[i])
          }

          var tempFilePaths = res.tempFilePaths
          that.setData({
            detailPics: that.data.detailPics.concat(tempFilePaths)
          })
        },
      })

    },
    //图片预览
    previewImage: function (e) {
      var current = e.target.dataset.src
      wx.previewImage({
        current: current,
        urls: this.data.detailPics
      })
    },
    //长按删除
    bindLongPressimg:function(e) {
        console.log(e)
        var that = this;    
        var images = that.data.detailPics;    
        var index = e.currentTarget.dataset.id; //获取当前长按图片下标
        wx.showModal({
          title: '操作提示',
          content: '确定要放弃上传此图片吗？',
          success: function(res) {
            if (res.confirm) {
              console.log("delete img")
            } 
            else if (res.cancel) {
                return false;
            }
            that.setData({
              detailPics :images
            });
          }
        })
    },
    //对应数据库的上传操作
    //success风格是并行的wdnmd,以下为错误示例
    /*
    uploadImg: function(data){
      const db = wx.cloud.database()
      var detailPics = this.data.detailPics;
      var i = this.data.i
      var tmpPath = detailPics[i]
      var type = tmpPath.slice(tmpPath.lastIndexOf('.')+1,tmpPath.length)
      var time = formatTime(new Date());
      
      stickerCollection.add({
        data:{
          tags:[this.data.typeArray[this.data.typeIndex],
          this.data.styleArray[this.data.styleIndex],
          this.data.emgDescription],//2 fixed type + all description
          img:"",//get a ret id + type
          type:type,
          uploadTime:time,
          downloadTimes:0,
          point:0,
          commentTimes:0,
          author:app.globalData.userInfo._id,//find in user collention?
        },
        success: res=>{
          this.setData({
            tmpStickerId:res._id,
            tmpType:type
          })
          console.log(tmpPath)
          console.log(type)
          console.log(time)
        },
        fail: err=>{
          console.log("Err when create in sticker collection")
        }
      })
      //then upload img, change path in collention
      console.log("target cloud path:"+this.data.tmpStickerId+'.'+this.data.tmpType)
      wx.cloud.uploadFile({
        cloudPath: this.data.tmpStickerId+'.'+this.data.tmpType,//先上传表单生成id，再根据id命名？
        filePath: detailPics[i], // 文件路径
        success: res => {
          console.log("uploadImg success")
          // get resource ID
          this.setData({
            tmpCloudPath:cloudPath
          })
          
          console.log(res.fileID)//貌似后续操作是根据文件id而不是url和path
          
        },
        fail: err => {//remove collention
          // handle error
          console.log("upload File error")
        }
      })
      //获取id和filepath之后再修改collection
      stickerCollection.doc(this.data.tmpStickerId).update({
        data:{
          tags:[this.data.typeArray[this.data.typeIndex],
          this.data.styleArray[this.data.styleIndex],
          this.data.emgDescription],//2 fixed type + all description
          img:this.data.tmpCloudPath,//get a ret id + type
          type:type,
          uploadTime:time,
          downloadTimes:0,
          point:0,
          commentTimes:0,
          author:app.globalData.userInfo._id,//find in user collention?
        },
        success: res=>{
          console.log("change sticker collection success")
        },
        fail: err=>{
          console.log("Err when change path in sticker collection")
        }
      })
    }*/

    uploadImg: function(data){
      console.log(data)
      var i = data.i?data.i:0;
      // success = data.success ? data.success : 0,
      // fail = data.fail ? data.fail : 0;
      var detailPics = this.data.detailPics;
      console.log(detailPics)
      if(detailPics.length!=0)
      {
        const db = wx.cloud.database()
        var tmpPath = detailPics[i]
        var type = tmpPath.slice(tmpPath.lastIndexOf('.')+1,tmpPath.length)
        var time = formatTime(new Date());
        var that = this
        stickerCollection.add({
          data:{
            tags:[this.data.typeArray[this.data.typeIndex],
            this.data.styleArray[this.data.styleIndex],
            this.data.emgDescription],//2 fixed type + all description
            img:"",//get a ret id + type
            type:type,
            uploadTime:time,
            downloadTimes:0,
            point:0,
            commentTimes:0,
            author:app.globalData.userInfo._id,//find in user collention?
          },
          success: (res)=>{
            that.setData({
              tmpStickerId:res._id,
              tmpType:type
            })
            console.log(tmpPath)
            console.log(type)
            console.log(time)

            //then upload img, path use id in collection
            console.log("target cloud path:"+that.data.tmpStickerId+'.'+that.data.tmpType)
            wx.cloud.uploadFile({
              cloudPath: that.data.tmpStickerId+'.'+that.data.tmpType,//先上传表单生成id，再根据id命名？
              filePath: detailPics[i], // 文件路径
              success: (res)=>{
                //获取id和filepath之后再修改collection
                console.log("uploadImg success")
                console.log(res)
                // 不知为什么在这里setData会卡住不运行，直接弃了
                // that.setData({
                //   tmpCloudPath:cloudPath,
                //   tmpFileID:res.fileID
                // })
                console.log('get fileID'+res.fileID)//貌似后续操作是根据文件id而不是url和path
                stickerCollection.doc(that.data.tmpStickerId).update({
                  data:{
                    tags:[that.data.typeArray[that.data.typeIndex],
                    that.data.styleArray[that.data.styleIndex],
                    that.data.emgDescription],//2 fixed type + all description
                    img:res.fileID,//get a ret id + type
                    type:type,
                    uploadTime:time,
                    downloadTimes:0,
                    point:0,
                    commentTimes:0,
                    author:app.globalData.userInfo._id,//find in user collention?
                  },
                  success: (res)=>{
                    console.log("change sticker collection success")
                    //加一个提示上传成功，然后全set空

                  },
                  fail: (err)=>{
                    console.log("Err when change path in sticker collection")
                  },
                  complete: () => {
                    i++;
                    console.log("in comlpete "+ String(i))//嵌套之后不能用that了就离谱,全是0也离谱
                    if(i==detailPics.length)
                    {
                      console.log('上传图片完成')
                    }
                    else{
                      data.i = i;
                      // data.success = success;
                      // data.fail = fail;
                      console.log('recurrent')
                      that.uploadImg(data);//递归，回调
                    }
                  }
                })
              },
              fail: err => {//remove collention
                // handle error
                console.log("upload File error")
              }
            })
          },
          fail: err=>{
            console.log("Err when create in sticker collection")
          }
        })
      }
      else{
        console.log("no img to upload")
      }
    }
    //点击上传按钮执行上传操作，对应url的服务器
    /*
    uploadImg: function (data) {
      wx.showLoading({
        title: '上传中...',
        mask: true,
      })
      var that = this,
        i = data.i ? data.i : 0,
        success = data.success ? data.success : 0,
        fail = data.fail ? data.fail : 0;

      wx.uploadFile({
        url: data.url,
        filePath: data.detailPics[i],
        name: 'file',
        formData: {"userId":"35"},
        success: (resp) => {
          wx.hideLoading();
          success++;
          var str = resp.data
          
          console.log(str);
        },
        fail: (res) => {
          fail++;
          console.log('fail:' + i + "fail:" + fail);
        },
        complete: () => {
          i++;
          if (i == data.detailPics.length) { //当图片传完时，停止调用     
            console.log('执行完毕');
            console.log('成功：' + success + " 失败：" + fail);
            var myEventDetail = {
              picsList: that.data.detailPics
            } // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            that.triggerEvent('myevent', myEventDetail, myEventOption)//结果返回调用的页面
          } 
          else { //若图片还没有传完，则继续调用函数
            data.i = i;
            data.success = success;
            data.fail = fail;
            that.uploadImg(data);//递归，回调
          }
        }
      });
    }*/
    
})
