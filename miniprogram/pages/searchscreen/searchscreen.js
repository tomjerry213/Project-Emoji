Page({
    data: {
        inputVal: ""
    },

    // 取消搜索,返回主页面
    hideInput: function () {
        wx.navigateTo({
        //跳转，返回主页面路径
            url: '../index/index'
        })
    },

    search_start: function(inputVal){
        console.log(inputVal)
        console.log(JSON.stringify(inputVal))
        wx.navigateTo({
            url:'../searchres/searchres?inputVal='+JSON.stringify(inputVal),
        })
    }
});
