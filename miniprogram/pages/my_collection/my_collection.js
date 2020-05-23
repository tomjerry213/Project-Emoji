//index.js
const app = getApp()
//TODO: update rec_rputers use algorithm instead of fixed
Page({
    data: {
        imageUrl:[]
        // avatarUrl: './user-unlogin.png',
        // userInfo: {},
        // logged: false,
        // takeSession: false,
        // requestResult: '',
        // /*actually a paser is enough, for further use 请搭配多级目录*/

        // // TODO: 未来将要从云存储（而不是本地）加载这些图片和类
        // figTypeRouters: [
        //     {
        //         name: '动漫',
        //         url: '/pages/emg_display/emg_display',
        //         icon: '/emg_type/rec_0.jpg',
        //         tag: ["软工作业",'程序员','在改了','就硬拖']
        //     },
        // ],
    },

    jumpDisplay: function (event) {
        var tmpItem = event.currentTarget.dataset.item;
        var tmpUrl = tmpItem.url+'?ImgUrl='+tmpItem.icon+'&tags='+JSON.stringify(tmpItem.tag)+'&numLike=1&boolLike=true&boolCollect=true&author=匿名'
        wx.navigateTo({
            url: tmpUrl
        })
    },

    //for search bar
    search: function () {
        wx.navigateTo({
            url: '../searchscreen/searchscreen'
        })
    },

    //收藏列表
    onLoad: function() {
        const app = getApp()
        console.log(app.globalData.userInfo._id)
        var that = this
        wx.cloud.callFunction({
          name:"listUserStarSticker",
          data:{
            userID:app.globalData.userInfo._id
          },
          success(res){
            console.log(res)
             console.log(res.result)
             const data =res.result//this is already sticler list
             //console.log(data)
             const temp = new Array()
             for(let i = 0;i<data.length;i++)
             {
               temp.push({"img":data[i].img,"tag":data[i].tags})
             }
             that.setData({imageUrl:temp})
          },
          fail(res){
            console.log(res)
          },
        })
    },

})
