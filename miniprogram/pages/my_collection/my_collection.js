//index.js
const app = getApp()
//TODO: update rec_rputers use algorithm instead of fixed
Page({
    data: {
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
                url: '/pages/emg_display/emg_display',
                icon: '/emg_type/rec_0.jpg',
                tag: ["软工作业",'程序员','在改了','就硬拖']
            },
        ],
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

    onLoad: function() {

    },

})
