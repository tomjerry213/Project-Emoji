// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database().collection("sticker")
// 云函数入口函数，主要是要后端的search
exports.main = async (event, context) => {
  const _ = cloud.database().command
  return db.where({
    point:_.eq(event.input)
  }).get()
}