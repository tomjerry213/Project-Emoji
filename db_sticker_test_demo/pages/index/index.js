
const db = wx.cloud.database().collection("test");
let global_type=""
let global_imgId=""
let global_author_id=""
let global_tags=""
let global_downloadTimes=""
let global_points=""
let global_others=0

Page({
  data:{
    cloudPath:"",
    id:""

  },
  //the following 3 func are to get the input and
  //transform into the global variables
  //for test 
  showData(){
    console.log(this.cloudPath)
    console.log(this.id)

  },
  getImgIdUI(input){
    console.log("get img id",input)
    global_imgId=input.detail.value
  },
  getTagUI(input){
    console.log("get tag",input)
    global_tags=input.detail.value
  },
  getAuthorUI(input){
    console.log("get Author",input)
    global_author_id=input.detail.value
  },
  getOthersUI(input){
    console.log("get Others",input)
    global_others=input.detail.value
  },
  checkPrivilege(){
    //for test
    return true
  },
  //the following func are manipulating the imgs
  //including getting the img and search the image
  appendStickerUI(){
    let that=this
    
    wx.chooseImage({
      count: 1,//maxinum for 1
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res)=>{
        let imgRes=res
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+Math.floor(Math.random()*100)+".png",
          filePath:res.tempFilePaths[0],
          success:(res)=>{
            console.log("upload file succeed",res)
            that.appendStickerInfo(imgRes,res.fileID)
          },
          fail:(res)=>{
            console.log("upload file failed",res)
          }
        })
      },
      fail: (res)=>{
        console.log("choose file failed",res)
      }
    });
  },
  //add the DB info of a img
  //add op shall not use the cloud funcs
  appendStickerInfo(info,cloudPath){
    db.add({
      data:{
        id:new Date().getTime()+Math.floor(Math.random()*100),
        type:"unsolved",
        tags:"test"+Math.floor(Math.random()*5),
        uploadTime:new Date().getTime(),
        downloadTimes:0,
        point:0,
        commentTimes:0,
        author:"use openid instead",
        fileId:cloudPath
      },
      success:(res)=>{
        console.log("add db item succeed",res)
      },
      fail:(res)=>{
        console.log("add db item failed:",res)
      }
    })
  },
  //
  deleteStickerUI(){
    if(this.checkPrivilege()){
      this.deleteStickerInfo(global_imgId)
    }
  },
  //delete the db item
  //what the hell is the res?? why can be parsed via cloud?
  deleteStickerInfo(imgId){
    console.log(imgId);
    wx.cloud.callFunction({
      name:"deleteStickerInfo",
      data:{
        id:imgId
      },
      success:(res)=>{
        console.log("delete db item succeed",res)
        wx.cloud.deleteFile({
          fileList:[res.result.data.fileId],
          success: res => {
            console.log("delete file succeed",res)
          },
          fail: res => {
            console.log("delete file failed",res)
          }
        })
      },
      fail:(res)=>{
        console.log("delete db item failed",res)
      }
    })
  },
  
  //we returned all the db info  
  //
  getStickerByIdUI(){
    let that= this
    let temp=""
    wx.cloud.callFunction({
      name:"getStickerById",
      data:{
        id:global_imgId
      },
      success:(res)=>{
        console.log("get sticker by id succeed",res)
        temp=res.result.data.fileId
        that.cloudPath=temp
      },
      fail:(res)=>{
        console.log("get sticker by id failed",res)
      }
    })
  },
  downloadSticker(){
    let that= this
    wx.cloud.downloadFile({
      fileID: that.cloudPath, // 文件 ID
      success: res => {
        console.log("download file succeed",res)
      },
      fail(res){
        console.log("download file failed",res)

      }
    })
    
  },
  //list series
  listStickerByTagUI(){
    wx.cloud.callFunction({
      name:"listStickerByTag",
      data:{
        tag:global_tags
      },
      
      success:(res)=>{
        console.log("get sticker by tag succeed",res)
      },
      fail:(res)=>{
        console.log("get sticker by tag failed",res)
      }
    })
  },
  //sth wrong
  listStickerByDownloadTimesUI(){
    wx.cloud.callFunction({
      name:"listStickerByDownloadTimes",
      data:{
        input:global_others
      },
      success:(res)=>{
        console.log("list sticker  By DownloadTimes succeed",res)
      },
      fail:(res)=>{
        console.log("list sticker  By DownloadTimes failed",res)
      }
    })
  },
  //sth wrong
  listStickerByPointUI(){
    wx.cloud.callFunction({
      name:"listStickerByPoint",
      data:{
        input:global_others
      },
      success:(res)=>{
        console.log("list Sticker By Point succeed",res)
      },
      fail:(res)=>{
        console.log("list Sticker By Point failed",res)
      }
    })
  },
  //???unsolved--- unspecified request
  listStickerByPersonalInterestUI(){
    wx.cloud.callFunction({
      name:"listStickerByPoint",
      success:(res)=>{
        //console.log("call cloud func:")
      },
      fail:(res)=>{
        //
      }
    })
  },
  listStickerByAuthorUI(){
    wx.cloud.callFunction({
      name:"listStickerByAuthor",
      data:{
        value:global_author_id
      },
      success:(res)=>{
        console.log("list Sticker By author succeed",res)
      },
      fail:(res)=>{
        console.log("list Sticker By author failed",res)
      }
    })
  },
  //the following func are for Point
  getPointUI(){
    let temp_point=0;
    wx.cloud.callFunction({
      name:"getStickerById",
      data:{
        id:global_imgId
      },
      success:(res)=>{
        console.log("get Point by id succeed",res)
        temp_point=res.result.data.point
        console.log("the value is ",temp_point)
      },
      fail:(res)=>{
        console.log("get Point by id failed",res)
      }
    })
  },
  modifyPointByIdUI(){
    wx.cloud.callFunction({
      name:"modifyPoint",
      data:{
        id:global_imgId,
        value:global_others
      },
      success:(res)=>{
        console.log("modify Point By Id succeed",res)
      },
      fail:(res)=>{
        console.log("modify Point By Id failed",res)
      }
    })
  },
  //the following func are for downloadtimes
  getDownloadTimesUI(){
    let temp_downloadTimes=0;
    wx.cloud.callFunction({
      name:"getStickerById",
      data:{
        id:global_imgId
      },
      success:(res)=>{
        console.log("get downloadTimes by id succeed",res)
        temp_downloadTimes=res.result.data.downloadTimes
        console.log("the value is ",temp_downloadTimes)
      },
      fail:(res)=>{
        console.log("get downloadTimes by id failed",res)
      }
    })
  },
  modifyDownloadTimesByIdUI(){
    wx.cloud.callFunction({
      name:"modifyDownloadTimes",
      data:{
        id:global_imgId,
        value:global_others
      },
      success:(res)=>{
        console.log("modify Download Times By Id succeed",res)
      },
      fail:(res)=>{
        console.log("modify Download Times By Id failed",res)
      }
    })
  },
  
  //the following func are for tags
  getTagsUI(){
    let temp_tags="";
    wx.cloud.callFunction({
      name:"getStickerById",
      data:{
        id:global_imgId
      },
      success:(res)=>{
        console.log("get tags by id succeed",res)
        temp_tags=res.result.data.tags
        console.log("the value is ",temp_tags)
      },
      fail:(res)=>{
        console.log("get tags by id failed",res)
      }
    })
  },
  //need further implement make it a array rather than string
  modifyTagByIdUI(){
    wx.cloud.callFunction({
      name:"modifyTag",
      data:{
        id:global_imgId,
        value:global_others
      },
      success:(res)=>{
        console.log("append tags By Id succeed",res)
      },
      fail:(res)=>{
        console.log("append tags By Id failed",res)
      }
    })
  },
  //the following func are for the num
  getNumUI(){
    wx.cloud.callFunction({
      name:"getNum",
      success:(res)=>{
        console.log("get Sticker Num succeed",res)
        console.log("the value is",res.result.total)

      },
      fail:(res)=>{
        console.log("get Sticker Num failed",res)
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
