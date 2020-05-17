// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //获取微信用户的stickerList中的id获取其可供呈现的url
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  var stickerIDList = event.stickerList;
  console.log(event);
  const _ = db.command;
  const stickerUrlList = await db.collection('sticker').where({_id:_.in(stickerIDList)}).get()
  return {
    stickerUrlList
  }
  
}