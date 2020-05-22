
const db = wx.cloud.database().collection("test");
let global_type = ""
let global_imgId = ""
let global_author_id = ""
let global_tags = ""
let global_downloadTimes = ""
let global_points = ""
let global_others = 0

Page({
  data: {
    cloudPath: "",
    httpPath: "",
    image_info: "", // an array stored info of DB need to be parsed to extract URL
    image_URL: "",
    point:"",
    downloadTimes:"",
    databaseImgNum:"",
    tags:""
  },
  //the following  func are to get the input and
  //transform into the global variables
  //for test 
  showData() {
    console.log(this.cloudPath)
    console.log(this.httpPath)
    console.log(this.image_info)
    console.log(this.image_URL)

  },
  getImgIdUI(input) {
    console.log("get img id", input)
    global_imgId = input.detail.value
  },
  getTagUI(input) {
    console.log("get tag", input)
    global_tags = input.detail.value
  },
  getAuthorUI(input) {
    console.log("get Author", input)
    global_author_id = input.detail.value
  },
  getOthersUI(input) {
    console.log("get Others", input)
    global_others = input.detail.value
  },
  checkPrivilege() {
    //for test
    return true
  },

  //the following func are manipulating the imgs
  //including getting the img and search the image


  appendStickerUI() {
    let that = this

    wx.chooseImage({
      count: 9,//maximum to 9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let imgRes = res
        console.log("choose img succeed", res)
        if (res.tempFilePaths.length == 0) {
          return;
        }
        else {
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            wx.cloud.uploadFile({
              cloudPath: new Date().getTime() + Math.floor(Math.random() * 100) + ".png",
              filePath: res.tempFilePaths[i],
              success: (res) => {
                console.log("upload file succeed:", i, res)
                that.appendStickerInfo(imgRes, res.fileID)
              },
              fail: (res) => {
                console.log("upload file failed", res)
              }
            })
          }
        }
      },
      fail: (res) => {
        console.log("choose file failed", res)
      }
    });
  },
  //add the DB info of a img
  //add op shall not use the cloud funcs
  //delete the property of author, using the _openid to identify the user 
  appendStickerInfo(info, cloudPath) {
    db.add({
      data: {
        id: new Date().getTime() + Math.floor(Math.random() * 100),
        type: "unsolved",
        tags: "test" + Math.floor(Math.random() * 5),
        uploadTime: new Date().getTime(),
        downloadTimes: 0,
        point: 0,
        commentTimes: 0,

        fileId: cloudPath
      },
      success: (res) => {
        console.log("add db item succeed", res)
      },
      fail: (res) => {
        console.log("add db item failed:", res)
      }
    })
  },
  //
  deleteStickerUI() {
    if (this.checkPrivilege()) {
      this.deleteStickerInfo(global_imgId)
    }
  },
  //delete the db item
  //every time you can only delete one of it
  //what the hell is the res?? why can be parsed via cloud?
  deleteStickerInfo(imgId) {
    console.log(imgId);
    wx.cloud.callFunction({
      name: "deleteStickerInfo",
      data: {
        id: imgId
      },
      success: (res) => {
        console.log("delete db item succeed", res)
        wx.cloud.deleteFile({
          fileList: [res.result.data.fileId],
          success: res => {
            console.log("delete file succeed", res)
          },
          fail: res => {
            console.log("delete file failed", res)
          }
        })
      },
      fail: (res) => {
        console.log("delete db item failed", res)
      }
    })
  },

  //we returned all the db info  
  //this function has stored the cloudpath into the Page.data.cloudpath
  //the rest info is stored in result
  // the diff between this and the following is that this func return the URL begin with cloud://
  //while the following one with http://temp
  getStickerByIdUI() {
    let that = this
    let result = ""
    wx.cloud.callFunction({
      name: "getStickerById",
      data: {
        id: global_imgId
      },
      success: (res) => {
        console.log("get sticker by id succeed", res)
        result = res.result.data
        that.cloudPath = result.fileId
      },
      fail: (res) => {
        console.log("get sticker by id failed", res)
      }
    })
  },
  //besides return the httpPath
  downloadSticker() {
    let that = this
    wx.cloud.downloadFile({
      fileID: that.cloudPath, // 
      success: res => {
        console.log("download file succeed", res)
        that.httpPath = res.tempFilePath
        that.saveToLocal(that.httpPath)
      },
      fail(res) {
        console.log("download file failed", res)

      }
    })

  },
  //as the name implies
  saveToLocal(path) {
    wx.saveImageToPhotosAlbum({　　　　　　　　　//保存到本地
      filePath: path,
      success(res) {
        console.log("save to local succeed", res)
      },
      fail(res) {
        if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          console.log("save to local failed due to no authentication", res)
          console.log("attention!:the user has blocked us from writing files")
          console.log("need re-apply for the rights")
          console.log("for more details:https://blog.csdn.net/weixin_42401132/article/details/94175340")
          console.log("greetings from backend ")
        }
        else {
          console.log("save to local failed", res)
        }
      }
    })
  },
  //list series
  listStickerByTagUI() {
    let that = this
    wx.cloud.callFunction({
      name: "listStickerByTag",
      data: {
        tag: global_tags
      },

      success: (res) => {
        console.log("get sticker by tag succeed", res)
        that.image_info = res.result.data
        that.extractInfo(that.image_info)
      },
      fail: (res) => {
        console.log("get sticker by tag failed", res)
      }
    })
  },
  // assist func
  extractInfo(info) {
    this.image_URL = new Array()
    for (let i = 0; i < info.length; ++i) {
      this.image_URL.push(info[0].fileId)
    }
  },
  //sth wrong with cloud func but ok the the UI func
  listStickerByDownloadTimesUI() {
    let that=this
    wx.cloud.callFunction({
      name: "listStickerByDownloadTimes",
      data: {
        input: global_others
      },
      success: (res) => {
        console.log("list sticker  By DownloadTimes succeed", res)
        that.image_info = res.result.data
        that.extractInfo(that.image_info)
      },
      fail: (res) => {
        console.log("list sticker  By DownloadTimes failed", res)
      }
    })
  },
  //sth wrong with cloud func but ok the the UI func
  listStickerByPointUI() {
    let that=this
    wx.cloud.callFunction({
      name: "listStickerByPoint",
      data: {
        input: global_others
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
  //???unsolved--- unspecified request
  listStickerByPersonalInterestUI() {
    wx.cloud.callFunction({
      name: "listStickerByPoint",
      success: (res) => {
        //console.log("call cloud func:")
      },
      fail: (res) => {
        //
      }
    })
  },
  //ok
  listStickerByAuthorUI() {
    let that=this
    wx.cloud.callFunction({
      name: "listStickerByAuthor",
      data: {
        value: global_author_id
      },
      success: (res) => {
        console.log("list Sticker By author succeed", res)
        that.image_info = res.result.data
        that.extractInfo(that.image_info)
      },
      fail: (res) => {
        console.log("list Sticker By author failed", res)
      }
    })
  },
  //the following func are for Point
  getPointUI() {
    let that=this
    wx.cloud.callFunction({
      name: "getStickerById",
      data: {
        id: global_imgId
      },
      success: (res) => {
        console.log("get Point by id succeed", res)
        that.point = res.result.data.point
        //console.log("the value is ", that.point)
      },
      fail: (res) => {
        console.log("get Point by id failed", res)
      }
    })
  },
  modifyPointByIdUI() {
    wx.cloud.callFunction({
      name: "modifyPoint",
      data: {
        id: global_imgId,
        value: global_others
      },
      success: (res) => {
        console.log("modify Point By Id succeed", res)
      },
      fail: (res) => {
        console.log("modify Point By Id failed", res)
      }
    })
  },
  //the following func are for downloadtimes
  getDownloadTimesUI() {
    let that = this;
    wx.cloud.callFunction({
      name: "getStickerById",
      data: {
        id: global_imgId
      },
      success: (res) => {
        console.log("get downloadTimes by id succeed", res)
        that.downloadTimes = res.result.data.downloadTimes
        //console.log("the value is ", that.downloadTimes)
      },
      fail: (res) => {
        console.log("get downloadTimes by id failed", res)
      }
    })
  },
  modifyDownloadTimesByIdUI() {
    wx.cloud.callFunction({
      name: "modifyDownloadTimes",
      data: {
        id: global_imgId,
        value: global_others
      },
      success: (res) => {
        console.log("modify Download Times By Id succeed", res)
      },
      fail: (res) => {
        console.log("modify Download Times By Id failed", res)
      }
    })
  },

  //the following func are for tags
  getTagsUI() {
    let that=this;
    wx.cloud.callFunction({
      name: "getStickerById",
      data: {
        id: global_imgId
      },
      success: (res) => {
        console.log("get tags by id succeed", res)
        that.tags = res.result.data.tags
        //console.log("the value is ", that.tags)
      },
      fail: (res) => {
        console.log("get tags by id failed", res)
      }
    })
  },

  //need further implement make it a array rather than string
  modifyTagByIdUI() {
    wx.cloud.callFunction({
      name: "modifyTag",
      data: {
        id: global_imgId,
        value: global_others
      },
      success: (res) => {
        console.log("append tags By Id succeed", res)
      },
      fail: (res) => {
        console.log("append tags By Id failed", res)
      }
    })
  },
  //the following func are for the num
  getNumUI() {
    let that=this
    wx.cloud.callFunction({
      name: "getNum",
      success: (res) => {
        console.log("get Sticker Num succeed", res)
        that.databaseImgNum=res.result.total
        //console.log("the value is", res.result.total)
      },
      fail: (res) => {
        console.log("get Sticker Num failed", res)
      }
    })
  },

  //redundant function 
  /*
  modifyNumUI(){
    wx.cloud.callFunction({
      name:"modifyNum",
      success:(res)=>{
        //console.log("call cloud func:")
      },
      fail:(res)=>{
        //
      }
    })
  },*/



})
