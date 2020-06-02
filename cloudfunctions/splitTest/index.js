// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
    var inp = event.description
    var formData = {
    msg: inp,
    type: "fenci"
    }; 
    wx.request({
      url: 'https://jsonin.com/fenci.php',
      method: 'post',
      data: JSON.stringify(formData),
      header: {
      "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
        return res.data
      },
      fail:function (res){
        return []
      }
    })
  
  // console.log(inp)
  // let segmentedDescription = nodejieba.cut(inp)
  // console.log(segmentedDescription)
  // return segmentedDescription
  // return inp
}