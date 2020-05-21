//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'emoji-sxwx4'
    })
    
  },
  globalData: {
    userInfo: null
  }
})