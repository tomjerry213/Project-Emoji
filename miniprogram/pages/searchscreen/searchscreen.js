Page({
    data: {
        inputVal: ""
    },

    // 取消搜索,返回主页面
    hideInput: function () {
        //直接改用navigateBack
        wx.navigateBack()
        /*wx.redirectTo({
        跳转，返回主页面路径
            url: '../index/index',
        })*/
    },
    //按下回车键之后开始搜索
    showBusy: function () 
    {    
      wx.showToast({
      title: '搜索中...',      
      mask: true,       
      icon: 'loading'    
    }) 
    },  
    showEmpty: function () 
    {    
      wx.showToast({
      title: '没有要搜索的内容！',      
      mask: true,       
      icon: 'none'    
    })  
    }, 

    searchStart: function(inputVal)
    {
        var that = this
        that.showBusy()
        console.log('search start')
        console.log(inputVal['detail']['value'])
        //for test
        // 直接连到了类里面，应当是先连接到searchres界面处理
        if(inputVal['detail']['value']!='')
        {
            wx.navigateTo({
                // url:'../searchres/searchres?inputVal='+JSON.stringify(inputVal),
                url:'../emg_class/emg_class?name='+inputVal['detail']['value']+'&searchFor=search',
                // item.url+
            })
        }
        else{
            that.showEmpty()
        }


    }
});
