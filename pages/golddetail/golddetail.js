Page({

        
        data: {

                //每页显示的行数：
                pagesize: 5,

                //页码（从1开始）：
                p: 1,

                //排序方式：
                paixu: 'viewcount',

                //用于标识是否还有更多的状态
                state: 1,

                //用于渲染页面的数组
                arrayProject: [],

                //用于数组的追加和暂存
                allProject: [],

        },




        //返回
        ggoldTap: function (options) {
                wx.navigateTo({
                        url: '../gold/gold',
                })
        },



  
        onLoad: function (options) {

                //页显示数据
                let zyj = wx.getStorageSync("zyj");
                this.setData({
                        zyjdata: zyj
                })

                // 上拉刷新更多
                var mythis = this;
                getproinfo(this.data.pagesize, this.data.p, mythis)

        },

  

        onReady: function () {
        
        },


        onShow: function () {
        
        },

        
        onHide: function () {
        
        },

 
        onUnload: function () {
        
        },

 
        onPullDownRefresh: function () {

        
        },


        onReachBottom: function () {

                var mythis = this;
                wx.showLoading({
                        title: '加载中...',
                });
                mythis.data.p = mythis.data.p + 1;
                getproinfo(this.data.pagesize, this.data.p, mythis);
                wx.hideLoading();
        },


        onShareAppMessage: function () {
        
        }
})


// 上拉刷新具体方法
function getproinfo(pagesize, p, mythis) {

        let openid = wx.getStorageSync("openid");

        wx.request({
                url: 'https://axure.xinice.com/index.php/index/index/golddetail',
                method: 'GET',
                data: {
                        pagesize: pagesize,
                        p: p,
                        openid: openid,
                },
                header: {
                        'content-type': 'application/json'
                },
                success: function (res) {

                        console.log(pagesize);
                        console.log(p);
                        console.log(res.data.gain.length);

                        //如果搜出来的结果=0，就说明后面已经没数据可加载了，所以将state设为0
                        if (res.data.gain.length == 0){

                                mythis.setData({
                                        state: 0
                                });
                        } else {

                                var state1 = 1;
                                //如果有数据，但小于每次期望加载的数据量（pagesize）,将state设为0，表示后面已没有数据可加载
                                if (res.data.gain.length < mythis.data.pagesize){
                                        var state1 = 0;
                                }      
                                //循环将结果集追加到数组后面
                                for (var i = 0; i < res.data.gain.length; i++) {
                                        mythis.data.allProject.push(res.data.gain[i]);
                                }
                                mythis.setData({
                                        arrayProject: mythis.data.allProject,
                                        state: state1
                                });
                        }
                },
                fail: function (res) {
                        console.log(res);
                }
        });
}