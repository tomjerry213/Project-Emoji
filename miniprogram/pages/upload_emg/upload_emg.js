// miniprogram/pages/upload/upload.js
wx.cloud.init({})
const db = wx.cloud.database()
const stickerCollection = db.collection("sticker")
const userCollection = db.collection("user")
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
    // i:0,
    // success:0,
    // fail:0,

    //for save path
    // tmpStickerId:'',
    // tmpType:'',
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
              //大哥，谁把我这个之前的给删了？不看就别瞎碰行吧
              images.splice(index,1);
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

    showBusy: function () 
    {    
      wx.showToast({
      title: '上传中...',      
      mask: true,       
      icon: 'loading'    
    })  
  },  
  showSuccess: function () 
  {  
    wx.showToast({      
    title: '上传成功',
    mask: true,       
    icon: 'success'})
  },
  showEmpty: function () 
  {    
    wx.showToast({
    title: '没有要上传的文件！',      
    mask: true,       
    icon: 'none'    
  })  
}, 
showFail: function () 
{    
  wx.showToast({
  title: '上传失败orz',      
  mask: true,       
  icon: 'none'    
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
  uploadImg: function(data){
    this.showBusy()
    console.log(data)
    var i = data.i?data.i:0;
    // success = data.success ? data.success : 0,
    // fail = data.fail ? data.fail : 0;
    var detailPics = this.data.detailPics;
    var that = this
    var description = this.data.emgDescription
    var oldDes = description
    const uploadTime = formatTime(new Date());
    console.log(detailPics)
    if(detailPics.length!=0){
      let images = []
      
      // 对每一张图片编码为base64格式，作为参数上传给云函数
      //转码
      for (let picPath of detailPics){
        wx.getFileSystemManager().readFile({
          filePath: picPath,
          encoding: 'base64',
          success: res => {
            images.push(res.data)
          }
        })
      }
      console.log("images: ", images);
      //分词
      var formData = {
        msg: description,
        type: "fenci"
        }; 
        console.log(formData)
        wx.request({
          url: 'https://jsonin.com/fenci.php',
          method: 'post',
          data: JSON.stringify(formData),
          header: {
          "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res.data)
            // return res.data，对data去重
            var des = res.data
            des.push(that.data.typeArray[that.data.typeIndex])
            des.push(that.data.styleArray[that.data.styleIndex])
            var tmpdata = that.delRepeat(des)

            console.log(tmpdata)
            wx.cloud.callFunction({
              name: 'uploadSticker',
              data: {
                images: images, paths: detailPics, 
                tag: that.data.typeArray[that.data.typeIndex],
                style:  that.data.styleArray[that.data.styleIndex],
                // description: that.data.emgDescription
                uploadTime:uploadTime,
                description:tmpdata,
                fullDes: oldDes
              },
              success: res => {
                that.showSuccess()
                console.log("上传完成，云函数返回结果为：",res)
              },
              faile: res=>{
                console.log("上传失败")
              },
              complete:res=>{
                
                console.log("ret is",res)
                that.setData({
                  detailPics:[],
                  currentLen:0,
                  maxDesLen:30,
                  // emgDescription:""
                  })
              }
            })
          },
          fail:function (res){
            // return []
            console.log("分词失败,仍然上传")
            wx.cloud.callFunction({
              name: 'uploadSticker',
              data: {
                images: images, paths: detailPics, 
                tag: that.data.typeArray[that.data.typeIndex],
                style:  that.data.styleArray[that.data.styleIndex],
                // description: that.data.emgDescription
                description:[description],
                fullDes:oldDes
              },
              success: res => {
                console.log("上传完成，云函数返回结果为：",res.data)
                that.showSuccess()
              },
              faile: res=>{
                console.log("上传失败")
              },
              complete:res=>{
                
                console.log("ret is",res)
                that.setData({
                  detailPics:[],
                  currentLen:0,
                  maxDesLen:30,
                  // emgDescription:""
                  })
              }
            })
          }
        })

      //本地上传的版本
    //   var tmpPath = detailPics[i]
    //   var type = tmpPath.slice(tmpPath.lastIndexOf('.')+1,tmpPath.length)
    //   var time = formatTime(new Date());
    //   var that = this
    //   const tags = [
    //     this.data.typeArray[this.data.typeIndex],
    //     this.data.styleArray[this.data.styleIndex],
    //     this.data.emgDescription
    //   ];

    // const db = wx.cloud.database()
    //   stickerCollection.add({
    //     data:{
    //       tags:[this.data.typeArray[this.data.typeIndex],
    //       this.data.styleArray[this.data.styleIndex],
    //       this.data.emgDescription],//2 fixed type + all description
    //       img:"",//get a ret id + type
    //       type:type,
    //       uploadTime:time,
    //       downloadTimes:0,
    //       point:0,
    //       commentTimes:0,
    //       likeTimes:0,
    //       starTimes:0,
    //       author:app.globalData.userInfo._id,//find in user collention?
    //     },
    //     success: (res)=>{
    //       that.setData({
    //         tmpStickerId:res._id,
    //         tmpType:type
    //       })
    //       console.log(tmpPath)
    //       console.log(type)
    //       console.log(time)

    //       //then upload img, path use id in collection
    //       //         userID:app.globalData.userInfo._id获取数据库中的user

    //       console.log("target cloud path:"+that.data.tmpStickerId+'.'+that.data.tmpType)
    //       wx.cloud.uploadFile({
    //         cloudPath: that.data.tmpStickerId+'.'+that.data.tmpType,//先上传表单生成id，再根据id命名？
    //         filePath: detailPics[i], // 文件路径
    //         success: (res)=>{
    //           //获取id和filepath之后再修改collection
    //           console.log("uploadImg success")
    //           console.log(res)
    //           console.log('get fileID'+res.fileID)//貌似后续操作是根据文件id而不是url和path
    //           stickerCollection.doc(that.data.tmpStickerId).update({
    //             data:{
    //               tags:[that.data.typeArray[that.data.typeIndex],
    //               that.data.styleArray[that.data.styleIndex],
    //               that.data.emgDescription],//2 fixed type + all description
    //               img:res.fileID,//get a ret id + type
    //               type:type,
    //               uploadTime:time,
    //               downloadTimes:0,
    //               point:0,
    //               commentTimes:0,
    //               author:app.globalData.userInfo._id,
    //             },//set sticker, then set author
    //             success: (res)=>{
    //               console.log("change sticker collection success")
    //               //call user? 我实在不想嵌套了
    //             },
    //             fail: (err)=>{
    //               console.log("Err when change path in sticker collection")
    //             },
    //             complete: () => {
    //               //上传完成后更新倒排索引
    //               console.log("In complete")
    //               for(let term of segmentedDescription)
    //               {
    //                   db.collection('inv_idx').doc(term).update({
    //                       data:{
    //                           postings: _.addToSet(stickerID)
    //                       },
    //                       success:(res)=>{
    //                           console.log("term已存在")
    //                       },
    //                       fail: (res) => {
    //                           // 如果失败了，说明这个term还没出现在倒排档中，需要新建一个doc
    //                           console.log('新建term')
    //                           db.collection('inv_idx').add({
    //                               data: {
    //                                   _id: term,
    //                                   postings: [stickerID]
    //                               }
    //                           })
    //                       },
    //                       complete:(res)=>{
    //                         console.log("in comlpete "+ String(i))//嵌套之后不能用that了
    //                         i++;
    //                         if(i==detailPics.length)
    //                         {
    //                           console.log('上传图片完成')
    //                           that.showSuccess()
    //                           that.setData({
    //                                 detailPics:[],
    //                                 i:0,
    //                                 success:0,
    //                                 fail:0,
    //                                 currentLen:0,
    //                                 maxDesLen:30,
    //                                 emgDescription:""
    //                           })
    //                         }
    //                         else{
    //                           data.i = i;
    //                           // data.success = success;
    //                           // data.fail = fail;
    //                           console.log('recurrent')
    //                           that.uploadImg(data);//递归，回调
    //                         }
    //                       }
    //                   })
    //               }

    //             }
    //           })
    //         },
    //         fail: err => {//remove collention
    //           // handle error
    //           console.log("upload File error")
    //         }
    //       })
    //     },
    //     fail: err=>{
    //       console.log("Err when create in sticker collection")
    //     }
    //   })
    }
    else{
      that.showEmpty(),
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
