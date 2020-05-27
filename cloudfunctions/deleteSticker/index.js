// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const db = cloud.database();
    const wxContext = cloud.getWXContext()
    let response = "s";
    let fileId = event.fileId;
    let userId = wxContext._id;
    let stickerToBeDelete = await db.collection('sticker').where({_id: fileId}).get();
    if(stickerToBeDelete.author != userId){
        response = "该文件并非本用户上传"
    }
    else{
        console.log(stickerToBeDelete.data[0])
        let stickerToBeUpdate = stickerToBeDelete.data[0];
        if(stickerToBeUpdate.img_bak == undefined)
        {
            stickerToBeUpdate.img_bak=stickerToBeDelete.data[0].img
        }
        stickerToBeUpdate.img = "cloud://local-rh75e.6c6f-local-rh75e-1301923352/d721728a5ecced2d00413a714afbeff6.jpg"
        stickerToBeUpdate.tags = ["此图片已被删除"]
        stickerToBeUpdate.author = "";
        delete stickerToBeUpdate._id;
        console.log(stickerToBeUpdate)
        db.collection('sticker').doc(fileId).set({
            // data 传入需要局部更新的数据
            data: stickerToBeUpdate,
            success: function(res) {
                console.log(res.data)
            }
        })
        response = "删除成功"
    }
    return {
        response
    }
}