// miniprogram/pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    detailPics: [],
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
          //实施上传
          // that.uploadimg({
          //   // url: "/page/image", 
          //   path: pics, 
          // });
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
        var that = this;    var images = that.data.detailPics;    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
        wx.showModal({
          title: '操作提示',
          content: '确定要放弃上传此图片吗？',
          success: function(res) {
            if (res.confirm) {
              images.splice(index, 1);
            } else if (res.cancel) {
                return false;
            }
            that.setData({
              detailPics :images
            });
          }
        })
    },
    //点击上传按钮执行上传操作，没有测试
    uploadimg: function (data) {
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
        filePath: data.path[i],
        name: 'file',
        formData: {"userId":"35"},
        success: (resp) => {
          wx.hideLoading();
          success++;
          var str = resp.data
          
          console.log(str);
          // var pic = JSON.parse(str);
          // var pic_name = that.data.showUrl + pic.Data;
          // var detailPics = that.data.detailPics;
          // detailPics.push(pic_name)
          // that.setData({
          //   detailPics: detailPics
          // })
        },
        fail: (res) => {
          fail++;
          console.log('fail:' + i + "fail:" + fail);
        },
        complete: () => {
          i++;
          if (i == data.path.length) { //当图片传完时，停止调用     
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
            that.uploadimg(data);//递归，回调
          }
        }
      });
    }

})
