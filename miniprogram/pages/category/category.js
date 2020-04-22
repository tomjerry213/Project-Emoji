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
        fig_type_routers: [
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
        style_routers: [
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

    search: function () {
        wx.navigateTo({
            url: '../searchscreen/searchscreen'
        })
    },

    onLoad: function() {

    },

    onGetUserInfo: function(e) {
        if (!this.data.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
        }
    },

})
