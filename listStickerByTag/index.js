// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database().collection("sticker")
// 云函数入口函数
exports.main = async (event, context) => {
  return db.where({
    'tags.0': db.RegExp({
      regexp : ".*" + event.tag + ".*",
      options : "i",})
    }).limit(10).skip(event.skipNumber).get()

  
}