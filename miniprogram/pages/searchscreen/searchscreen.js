Page({
    data: {
        inputVal: ""
    },

    // 取消搜索,返回主页面
    hideInput: function () {
        //出了奇怪的bug，会出现log但是不会跳转
        console.log("backing")
        wx.navigateTo({
        //跳转，返回主页面路径
            url: '../index/index',
        })
    },
    //按下回车键之后开始搜索
    searchStart: function(inputVal){
        console.log('search start')
        console.log(inputVal['detail']['value'])
        //for test
        // 直接连到了类里面，应当是先连接到searchres界面处理
        wx.navigateTo({
            // url:'../searchres/searchres?inputVal='+JSON.stringify(inputVal),
            url:'../emg_class/emg_class?name='+inputVal['detail']['value'],
        })
    }
});
