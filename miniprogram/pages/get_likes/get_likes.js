//index.js
const app = getApp()
//TODO: update rec_rputers use algorithm instead of fixed
Page({
    data: {
        imageUrl:[],
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        /*actually a paser is enough, for further use 请搭配多级目录*/

        // TODO: 未来将要从云存储（而不是本地）加载这些图片和类
        figTypeRouters: [
            {
                name: '动漫',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_type/rec_0.jpg',

            },
            {
                name: '人像',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_type/rec_1.jpg',
            },
            {
                name: '简笔',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_type/rec_2.jpg',
            },
            {
                name: '动漫GIF',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_type/吃.gif',
            },
            {
                name: '人像GIF',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_type/rec_4.jpg',
            },
            {
                name: '其他',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_type/rec_5.jpg',
            },

        ],
        styleRouters: [
            {
                name: '正经',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_style/rec_0.jpg',

            },
            {
                name: '复古',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_style/祝愿.jpg',
            },
            {
                name: '悲伤',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_style/rec_2.jpg',
            },
            {
                name: '快乐',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_style/rec_3.jpg',
            },
            {
                name: '互损',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_style/rec_4.jpg',
            },
            {
                name: '其他',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_style/rec_5.jpg',
            },
        ]
    },
    //for search bar
    search: function () {
        wx.navigateTo({
            url: '../searchscreen/searchscreen'
        })
    },

    onLoad: function() {
        var that = this;
        var id = app.globalData.userInfo._id;
        var likeList = app.globalData.userInfo.likeList;
        console.log(likeList);
        wx.cloud.callFunction(
        {
            name:"getLikeList",
            data:{
                likeList:likeList
            },
            success(res)
            {
                console.log(res);
                let data = res.result.response;
                var result = new Array();
                for(let i = 0;i<data.length;i++)
                {   
                    result.push({"img":data[i].img,"likeTimes":data[i].likeTimes,"tag":data[i].tags});
                }
                that.setData({imageUrl:result});
                console.log(that.data.imageUrl);
            },
            fail(res)
            {
                console.error;
            }
        })
    },

})
