/* 
 * 云函数：changeLikeOrStarStatus
 * 参数：   imgID: 要修改的图片的_id
 *          method: 操作方法。可选参数有"addLike", "removeLike", "addStar", "removeStar"
 * 作者：wyq
 */



// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const imgID = event.imgID
    const method = event.method
    const openid = wxContext.OPENID

    if (method == "addLike"){
        // sticker集合中对应图片的likeTimes += 1
        await db.collection('sticker').doc(imgID).update({
            data: {likeTimes: _.inc(1)}
        })
        // user集合中likeList加入对应图片id
        await db.collection('user').where({
            openid: openid
        }).update({
            data: {likeList: _.addToSet(imgID)}
        })
    }

    else if (method == "removeLike"){
        // sticker集合中对应图片的likeTimes -= 1
        await db.collection('sticker').doc(imgID).update({
            data: {likeTimes: _.inc(-1)}
        })
        // user集合中likeList删除对应图片id
        await db.collection('user').where({
            openid: openid
        }).update({
            data: {likeList: _.pull(imgID)}
        })
    }

    else if (method == "addStar"){
        // sticker集合中对应图片的starTimes += 1
        await db.collection('sticker').doc(imgID).update({
            data: {starTimes: _.inc(1)}
        })
        // user集合中likeList加入对应图片id
        await db.collection('user').where({
            openid: openid
        }).update({
            data: {starList: _.addToSet(imgID)}
        })
    }

    else if (method == "removeStar"){
        // sticker集合中对应图片的starTimes -= 1
        await db.collection('sticker').doc(imgID).update({
            data: {starTimes: _.inc(-1)}
        })
        // user集合中starList删除对应图片id
        await db.collection('user').where({
            openid: openid
        }).update({
            data: {starList: _.pull(imgID)}
        })
    }

    else {
        // 如果没进入上述任何一个分支，说明method参数不合法
        return {
            errmsg: "method invalid"
        }
    }

    return {
        event,
        openid: wxContext.OPENID,
        imgID: imgID,
        method: method
    }
}