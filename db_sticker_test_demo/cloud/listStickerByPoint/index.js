// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database().collection("test")
// 云函数入口函数
exports.main = async (event, context) => {
  const _ = cloud.database().command
  return db.where({
    point:_.eq(event.input)
  }).get()
}