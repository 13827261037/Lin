

Page({


        data: {

                yhjxs2: false,
        
        },


        //跳首页
        ssyTap: function (options) {
                wx.navigateTo({
                        url: '../index/index',
                })
        },


        onLoad: function (options) {

                var self2 = this;

                let openid = wx.getStorageSync("openid");
                let coupon = wx.getStorageSync("coupon");

                self2.setData({
                        coupondata: coupon,
                })

                //优惠券显示
                wx.request({
                        url: 'https://axure.xinice.com/index.php/index/index/couponxs',
                        data: {
                                openid: openid,
                        },
                        method: 'GET',
                        header: {
                                'content-type': 'application/json'
                        },
                        success: function (res) {

                                if (res.data.yh200 == 2){
                                        self2.setData({
                                                yhjxs2: true,
                                        })
                                }
                                // console.log(res.data);

                        },
                        fail: function (res) {
                        }
                })


        
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
        
        },


        onShareAppMessage: function () {
        
        }




})
