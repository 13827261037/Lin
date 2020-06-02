import config from '../../utils/config';
//获取应用实例
const app = getApp()

Page({

        /**
         * 页面的初始数据
         */
        data: {
        
        },




        //跳首页
        ssyTap: function (options) {
                wx.navigateTo({
                        url: '../index/index',
                })
        },


        //跳提现
        rolloutBen: function (options) {
                wx.navigateTo({
                        url: '../rollout/rollout',
                })
        },


        //跳提现记录
        wwsBen: function (options) {
                wx.navigateTo({
                        url: '../withdraw/withdraw',
                })
        },


        //跳佣金明细
        golddetailBen: function (options) {
                wx.navigateTo({
                        url: '../golddetail/golddetail',
                })
        },

        







        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {

                var self2 = this;

                // var openid = wx.getStorageSync("openid");
                var openid = app.globalData.openid;
                var merch_id = app.globalData.merch_id;
                var modular_id = app.globalData.modular_id;
             
                //发起网络请求
                wx.request({

                        //请求服务器路径，获取openid
                        url: 'https://axure.xinice.com/index.php/index/index/balances',
                        method: "POST",
                        data: {
                                 openid: openid,
                                 merch_id:merch_id,
                                 modular_id:modular_id
                                },
                        header: { 'Content-Type': 'application/x-www-form-urlencoded'},
                        success: function (data) {

                                // 佣金
                                wx.setStorageSync("zyj", data['data']['brokerage']);
                                // 提现
                                wx.setStorageSync("ztx",        data['data']['ztx']);
                                // 余额
                                wx.setStorageSync("yue",        data['data']['yue']);

                                self2.setData({
                                        zyjdata: data['data']['brokerage'],
                                        ztxdata: data['data']['ztx'],
                                        yuedata: data['data']['yue'],
                                })

                        },
                        fail: function (data) {
                        }
                })

                let zyj = wx.getStorageSync("zyj");
                let ztx = wx.getStorageSync("ztx");
                let yue = wx.getStorageSync("yue");
                this.setData({
                        zyjdata: zyj,
                        ztxdata: ztx,
                        yuedata: yue,
                })

        
        
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {
        
        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {
        
        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {
        
        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {
        
        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {
        
        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {
        
        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {
        
        }




})
