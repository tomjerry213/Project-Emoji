// 云函数入口文件
// 有了api我为什么发疯自己写呢？
const cloud = require('wx-server-sdk')
const nodejieba = require('nodejieba');
nodejieba.load();       // 加载jieba分词模型
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var inp = event.description
  console.log(inp)
  let segmentedDescription = nodejieba.cut(inp)
  console.log(segmentedDescription)
  return segmentedDescription
  // return inp
}