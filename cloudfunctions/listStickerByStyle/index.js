// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database().collection("sticker")
// 云函数入口函数
//针对type的检索
exports.main = async (event, context) => {
  console.log(event.tag)
  return db.where({
    'tags.1':event.tag
  }).get()
}