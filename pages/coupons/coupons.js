import config from '../../utils/config';
//获取应用实例
const app = getApp()

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

                // let openid = wx.getStorageSync("openid");
                let coupon = wx.getStorageSync("coupon");
                var openid = app.globalData.openid;

                self2.setData({
                        coupondata: coupon,
                })

                //优惠券显示
                wx.request({
                        url: config.request +'/index.php/index/index/couponxs',
                        data: {
                                openid: openid,
                                modular_id: app.globalData.modular_id
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
                          self2.setData({
                            coupondata: res.data.sum,
                            couponxslist: res.data.couponxs
                          })

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
