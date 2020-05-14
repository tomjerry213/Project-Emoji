//app.js
App({
    onLaunch: async function () {
        var that = this;
        
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                // env 参数说明：
                // env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
                // 如不填则使用默认环境（第一个创建的环境）
                env: 'local-rh75e',
                traceUser: true,
            })
        }
        this.globalData = {}
        
        // 从云端获取用户的权限信息，存储在App.globalData.userInfo中
        wx.cloud.callFunction({
            name: 'getUserInfo', data: {},
            success(res){
                that.globalData.userInfo = res.result.result;
                console.log("get userinfo cloudfunction: ", res.result.result);
            },
            fail(res){
                console.log("failed to get userinfo from cloud.");
            }
        });
    }
})
