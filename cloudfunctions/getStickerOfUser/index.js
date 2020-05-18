// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //获取微信用户的stickerList中的id获取其可供呈现的url
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  var userID = event.userID;
  console.log(userID);
  const _ = db.command;
  var stickerUrlList = await db.collection('sticker').where({author: userID}).get()
  return {
    stickerUrlList: stickerUrlList,
    userID: userID
  }
  
}