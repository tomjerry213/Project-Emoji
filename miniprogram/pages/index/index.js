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

        hotSearches: [
            // '我太难了',
            // '我酸了',
            // '奇怪的知识',
            // '奥利给',
            // '我想上学',
            // '黑人抬棺',
            {
                name: '我太难了',
                url: '/pages/emg_class/emg_class',
            },
            {
                name: '我酸了',
                url: '/pages/emg_class/emg_class',
            },
            {
                name: '奇怪的知识',
                url: '/pages/emg_class/emg_class',
            },
            {
                name: '奥利给',
                url: '/pages/emg_class/emg_class',
            },
            {
                name: '我想上学',
                url: '/pages/emg_class/emg_class',
            },
            {
                name: '黑人抬棺',
                url: '/pages/emg_class/emg_class',
            }
        ],

        // TODO: 未来将要从云存储（而不是本地）加载这些图片和类
        //get by likes(用户偏好分析就算了吧)

        recRouters: [
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

    },
    // for search bar
    search: function () {
        wx.navigateTo({
            url: '../searchscreen/searchscreen'
        })
    },
    // touch hot words, now we are using class show, need add name and process/search
    tapHotWords: function() {
        console.log("just tap")
    },
    //生命周期函数
    onLoad: function() {
        if (!wx.cloud) {
            wx.redirectTo({
                url: '../chooseLib/chooseLib',
            })
            return
        }
        // 获取用户信息，为调用云开发时自动创建的，留着后面用
        console.log("index load")
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            }),
                            console.log(res.userInfo)
                        },
                        fail: res=>{
                            console.log('failed get info',res)
                        }
                    })
                }
            },
            fail: res=>{
                console.log('failed ',res)
            }
        })
        console.log(this.data.userInfo)
        
    },

})
