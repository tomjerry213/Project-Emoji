// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  var userID = event.id;
  var likeList = event.likeList;
  console.log(likeList);
  const _ = db.command;
  var stickerUrlList = await db.collection('sticker').where({_id: _.in(likeList)}).get();
  console.log(stickerUrlList.data);
  
  var stickerUrlList = stickerUrlList.data;
  var response = new Array;
  for(let i = 0;i<stickerUrlList.length;i++)
  {
    response.push(stickerUrlList[i])
  }
  console.log(response)
  return {
    response
  }
}