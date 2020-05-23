// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    const db = cloud.database();
    var openid = wxContext.OPENID;
    console.log(wxContext)
    // 根据openid查询user集合中的记录。
    var result = await db.collection('user').where({openid: openid}).get();
    if (result.data.length != 0) 
    {
        console.log('uesr already in database')
        result = result.data[0];
    }
    // 如果目前user集合中还没有和当前用户的openid有关的记录，则添加一条新的。
    // 为什么我清空了数据库但是没有运行新建用户呢？？？
    else {
        console.log("adding new userInfo into database.");
        var new_id = await db.collection('user').add({
            data: {
                openid: openid,
                privilege: 2, // 默认权限是普通该用户
                score: 0,
                stickerList: [],
                likeList: [],
                starList: [],
                followedUserList: []
            }
        });
        result = await db.collection('user').get(new_id);
        result = result.data[0];
    }
    console.log("result:", result);
    
    return {
        result: result,
        wxContext: wxContext
    }
}