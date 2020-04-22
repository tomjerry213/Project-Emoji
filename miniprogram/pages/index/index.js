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
        /*actually a paser is enough, for further use*/ 

        // TODO: 未来将要从云存储（而不是本地）加载这些图片和类
        rec_routers: [
            {
                name: '软工作业',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_test/rec_0.jpg',

            },
            {
                name: '快乐',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_test/rec_1.jpg',
            },
            {
                name: '悲伤',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_test/rec_2.jpg',
            },
            {
                name: 'JOJO',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_test/rec_3.jpg',
            },
            {
                name: '酸了',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_test/rec_4.jpg',
            },
            {
                name: '真人',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_test/rec_5.jpg',
            },
        ],

        hot_routers: [
            {
                name: 'grid0',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_hot/rec_0.jpg',

            },
            {
                name: 'grid1',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_hot/rec_1.jpg',
            },
            {
                name: 'grid2',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_hot/rec_2.jpg',
            },
            {
                name: 'grid3',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_hot/rec_3.jpg',
            },
            {
                name: 'grid4',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_hot/rec_4.jpg',
            },
            {
                name: 'grid5',
                url: '/pages/emg_class/emg_class',
                icon: '/emg_hot/rec_5.jpg',
            },
        ]
    },

    search: function () {
        wx.navigateTo({
            url: '../searchscreen/searchscreen'
        })
    },

    onLoad: function() {
        if (!wx.cloud) {
            wx.redirectTo({
                url: '../chooseLib/chooseLib',
            })
            return
        }

        // 获取用户信息，为调用云开发时自动创建的，留着后面用
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })
    },
})
