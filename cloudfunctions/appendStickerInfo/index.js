// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  // this function shall not be activated
  /*
  const db=cloud.database({
    env:"emoji-sxwx4"
  })
  const list=db.collection("test")
  let result="";
  await list.add({  
    data:{
      id:event.id,
      type:event.type,
      tags:event.tags,
      uploadTime:event.uploadTime,
      downloadTimes:event.downloadTimes,
      point:event.point,
      commentTimes:event.commentTimes,
      author:event.author,
      fileId:event.fileId
    },
    success(res){
      result=res
    },
    fail(res){
      result=res
    }

  })
  return result
*/
  
}