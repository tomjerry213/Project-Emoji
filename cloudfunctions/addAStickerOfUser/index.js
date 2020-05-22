// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  //获取微信用户的stickerList中的id获取其可供呈现的url
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  var userID = event.userID;
  var newsticker = event.sticker;
  console.log(userID);
  const _ = db.command;
  var stickerUrlList = await db.collection('sticker').where({author: userID}).get()
  return {
    stickerUrlList: stickerUrlList,
    userID: userID
  }
  
}