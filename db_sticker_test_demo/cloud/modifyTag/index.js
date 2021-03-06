// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database().collection("test")

// 云函数入口函数
exports.main = async (event, context) => {
  const _=cloud.database().command
  return db.doc(event.id).update({
    data: {
      tags:event.value
    },
    success: function(res) {
      console.log(res.data)
    }
  })
}