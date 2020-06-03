// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
const db = cloud.database();
const _ = db.command;
const inv = db.collection('inv_idx')
// 云函数入口函数

// function loopTerm(idx,description){
//   x = idx;
//   if(x<description.length)
//   {
//     //更新weight

//   }
// }


var weightDic={};//循环有必要promise吗

exports.main = async (event, context) => {
  const description = event.description;  // a list
  //search in database
  //构建候选stickerIDs，按照文档中的占比权重返回sticker weight
  //排序后返回stickerIDs
  //会有奇怪的初始值
  weightDic = {}
  console.log("init weight dict",weightDic)
    await getFrequency(description)//为什么一次循环return了？
    console.log("sort now")
    //从大到小排序
    var res = Object.keys(weightDic)//.sort(function(a,b){ return weightDic[b]-weightDic[a];}); 
    console.log(res)
    // return weightDic
    var data = await db.collection('sticker').where({_id:_.in(res)}).get()//这里发现userList的效率有问题，但是我懒得改了
    console.log(data)//哦没有排序，在查询之后为data排序
    var ret = data.data.sort(function(a,b){ return weightDic[b._id]-weightDic[a._id];}); 
    console.log(ret)
    return ret
}
//每次都写一个function 然后用P作为res，我只是想让你异步访问数据库
// async是返回的promise
var getFrequency = async(description)=>{
// function getFrequency(description){
  // return new Promise(res=>{
  console.log("constructing weightDic")
  console.log(description)
  for(term in description)//is idx,并行应该没问题
  {
    var tmpterm =description[term]
    console.log("tmp term is ",tmpterm)
    //如何同步呢
    var data = await changeDict(tmpterm)
    // changeDict(tmpterm)
    // console.log(data)
    console.log("after term, weight dict is",weightDic)//这里并行也罢
  }
  // })
  // return p
}

var changeDict = async(tmpterm)=>{
// function changeDict(tmpterm){
  // return new Promise(res=>{
      const resu = await inv.where({term:tmpterm}).get()
      console.log(resu)
      if(resu.data.length != 0)//没有这个term的话就搜不到呗
      {
        console.log("inv have")
        var stIDs = resu.data[0].postings
        var len = resu.data[0].postings.length
        console.log(stIDs)
        for(stID in stIDs)
        {
          stID = stIDs[stID]
          console.log("tmp sstID is",stID)
          console.log(weightDic)
          if(weightDic[stID]==undefined)
          {
            weightDic[stID] = 1/len;
          }
          else{
            weightDic[stID] += 1/len;//update w
          }
        }
      }
}