// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数, inp a user
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const _ =db.command
  const stickerCollection = db.collection("sticker")
  const uesrCollection = db.collection("user")

  var userID = event.userID
  console.log(userID)
  var Info = await uesrCollection.where({_id: userID}).get()//sticker ids
  var starList = Info.data[0].starList
  console.log(starList)
  var stickerList = new Array()
  // for(let i = 0;i<starList.length;i++)
  // {
  //   console.log(starList[i])
  //   var tmp =await stickerCollection.where({_id:starList[i]}).get()
  //   console.log(tmp.data[0])
  //   stickerList.push(tmp.data[0])
  // }
  stickerList = await stickerCollection.where({_id:_.in(starList)}).get()
  console.log(stickerList)
  return stickerList
}