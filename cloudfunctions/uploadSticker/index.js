/* 上传表情包云函数
 * 作者：wyq
 * 时间：2020.5.27
 * lsl changed in 6.1
 */

const cloud = require('wx-server-sdk');
// const nodejieba = require('nodejieba');
// nodejieba.load();       // 加载jieba分词模型

cloud.init();
const db = cloud.database();
const _ = db.command;
var uploadTime = ''
// 云函数入口函数
exports.main = async (event, context) => {
//test 是不是成功
    // return event
    const wxContext = cloud.getWXContext();
    const images = event.images;        // base64编码后的表情包文件
    const paths = event.paths;          // 表情包在本地的路径，用于解析type信息
    const tag = event.tag;
    const style = event.style;
    var description = event.description;  // 表情包类别、风格、用户描述
    // description.push(tag);
    // description.push(style);
    const fullDes = event.fullDes;
    uploadTime = event.uploadTime
    const openid = wxContext.OPENID;
    // const time = formatTime(new Date());

    // 遍历每个表情包，执行上传函数，并记录每个表情包在数据库中的_id返回。
    stickerIDs = []
    for (idx in images){
        await upload(images[idx], paths[idx], tag, style, description, openid,fullDes);//返回的是一个promise对象
        // console.log("stID is",stickerID)//这是个promise对象？
        // await stickerIDs.push(stickerID)
    }
    // await console.log("return now")
    return {
        event,
        openid: openid,
        stickerIDs: stickerIDs
    }
}


function loopTerm(idx,des,stickerID)
{
    x = idx
    if(x<des.length)
    {
        add_inv(des[idx],stickerID)
        x++;
        console.log("inloop",x)
        console.log(stickerID)
        loopTerm(x,des,stickerID)
    }
}
// var add_inv = async(term,stickerID)=>{
function add_inv(term,stickerID)
{
    console.log("tmp term is " ,term)//update会自动创建吗
    db.collection('inv_idx').where({term:term}).get().then((res)=>{
        console.log(res)
        if(res.data.length!=0)//存在term
        {
            db.collection('inv_idx').where({term:term}).update({
            data:{
            term:term,
            postings: _.addToSet(stickerID)
            },
            }).then((res)=>{
            console.log("term已存在，更新成功",res)
        })
        }
        else{
        console.log('新建term')
        db.collection('inv_idx').add({
            data: {
                term: term,
                postings: [stickerID]
             }
        })
        }
    })
    
}

// var upload = async(image, path, tag, style, description, openid) => {//这东西是同步的
function upload(image, path, tag, style, description, openid,fullDes){
    let p = new Promise(res=>{
    // 完成一个表情包的上传工作
    var stickerID = ''
    const type = path.slice(path.lastIndexOf('.'), path.length) // 如：.jpg
    console.log("type",type)
    // const uploadTime = formatTime(new Date());
    // let segmentedDescription = nodejieba.cut(description)
    // var segmentedDescription = description
    // 第一次上传数据库，目的只是获取一个_id作为图片的文件名，所以随便传点东西就行
    db.collection('sticker').add({
        data: {
            tags: [tag, style, description],
            author: openid
        },}).then((res)=>{
            stickerID = res._id;
            // 上传图片
            console.log('sticker ret id is',stickerID)
            console.log(uploadTime)
            cloud.uploadFile({
                cloudPath: stickerID + type,
                fileContent: Buffer.from(image, 'base64'),
            }).then((res)=>{
                console.log('upload file succeeded')
                db.collection('sticker').doc(stickerID).set({
                    data: {
                        tags: [tag, style, fullDes],//用分词前的description，在display中显示
                        img: res.fileID,
                        type: type,
                        uplodaTime: uploadTime,
                        downloadTimes: 0,
                        point: 0,
                        commentTimes: 0,
                        author: openid,
                        // fullDes:fullDes
                    },
                }).then((res)=>{//在这里使用promise的循环，祝我好运
                    // console.log("ssssss"+ stickerID)
                    loopTerm(0,description,stickerID)
                    return stickerID
                    })
                })
            })
        })
        return p
}
            