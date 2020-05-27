/* 上传表情包云函数
 * 作者：wyq
 * 时间：2020.5.27
 */

const cloud = require('wx-server-sdk');
const nodejieba = require('nodejieba');
nodejieba.load();       // 加载jieba分词模型

cloud.init();
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const images = event.images;        // base64编码后的表情包文件
    const paths = event.paths;          // 表情包在本地的路径，用于解析type信息
    const tag = event.tag;
    const style = event.style;
    const description = event.description;  // 表情包类别、风格、用户描述

    const openid = wxContext.OPENID;
    const time = formatTime(new Date());

    // 遍历每个表情包，执行上传函数，并记录每个表情包在数据库中的_id返回。
    stickerIDs = []
    for (idx in images){
        let stickerID = upload(images[idx], paths[idx], tag, style, description, openid);
        stickerIDs.push(stickerID)
    }

    return {
        event,
        openid: openid,
        stickerIDs: stickerIDs
    }
}

var upload = async(image, path, tag, style, description, openid) => {
    // 完成一个表情包的上传工作
    var stickerID = ''
    const type = path.slice(path.lastIndexOf('.') + 1, path.length) // 如：jpg
    const uploadTime = formatTime(new Date());
    
    // 对用户描述进行分词
    let segmentedDescription = nodejieba.cut(description)

    // 第一次上传数据库，目的只是获取一个_id作为图片的文件名，所以随便传点东西就行
    await db.collection('sticker').add({
        data: {
            tags: [tag, style, description],
            author: openid
        },
        success: async(res) => {
            stickerID = res._id;
            // 上传图片
            await cloud.uploadFile({
                cloudPath: stickerID + type,
                fileContent: new Buffer(image, 'base64'),
                success: async(res) => {
                    // 在数据库sticker集合，写入实际信息
                    db.collection('sticker').doc(stickerID).set({
                        data: {
                            tags: [tag, style, description],
                            img: res.fileID,
                            type: type,
                            uplodaTime: uploadTime,
                            downloadTimes: 0,
                            point: 0,
                            commentTimes: 0,
                            author: openid
                        },
                    })
                }
            })
        }
    })

    // 更新倒排档文件
    for(let term of segmentedDescription){
        await db.collection('inv_idx').doc(term).update({
            data:{
                postings: _.addToSet(stickerID)
            },
            fail: (res) => {
                // 如果失败了，说明这个term还没出现在倒排档中，需要新建一个doc
                db.collection('inv_idx').add({
                    data: {
                        _id: term,
                        postings: [stickerID]
                    }
                })
            },
        })
    }

    return stickerID    // 将数据库中本表情包对应的_id作为返回值
}