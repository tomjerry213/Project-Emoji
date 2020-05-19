// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database().collection("test")

// 云函数入口函数
exports.main = async (event, context) => {
  
  
  let res=db.doc(event.id).get()
  db.doc(event.id).remove()
  return res
  //let fileId=res.result.data.fileId
  /*let _return =""
  */

}