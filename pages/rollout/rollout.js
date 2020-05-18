

Page({



        data: {
                inp22:0,
        },
  

        //全部 时 取整
        allBut: function (e) {

                let yue = wx.getStorageSync("yue");

                this.setData({
                        inp22: parseInt(yue)//取整
                });
        },


        //只能输入0-9数字
        inputCode: function (e) {
                let pwd = e.detail.value
                return pwd.replace(/[^0-9]/g, '')
        },


        //打开提醒
        showWX: function () {
                this.setData({
                        isRuleTrue: true
                })
        },
        //关闭提醒
        hideRule: function () {
                this.setData({
                        isRuleTrue: false
                })
        },



        //跳余额页
        goldTap: function (options) {
                wx.navigateTo({
                        url: '../gold/gold',
                })
        },



        // go:function(){
        //         wx.redirectTo({
        //                 url: '../post/post',
        //         })
        // },
        // onBackTap: function (e) {

        //         var pages = getCurrentPages();                       //获取当前页面
        //         var prePage = pages[pages.length - 2];               //获取上一页面
        //         prePage.setData({
        //                 'search.page': 1                                   //给上一页面的变量赋值
        //         })
        //         wx.navigateBack({                                    //返回上一页面
        //                 delta: 1,
        //         })
        // },
  
        //提现事件
        txForm: function (data) {

                var amount    = data.detail.value.inp_amount
                var name      = data.detail.value.inp_name
                var account  = data.detail.value.inp_account

                let openid = wx.getStorageSync("openid");

                let yue2 = wx.getStorageSync("yue");
                
                if (Number(amount) > 500 || Number(amount) < 10) {
                        wx.showToast({
                                title: '无效的操作',
                                icon: 'none',
                                duration: 2000
                        });
                        return;
                }
                if (Number(amount) > Number(yue2)){
                        wx.showToast({
                                title: '余额不足',
                                icon: 'none',
                                duration: 2000
                        });
                        return;
                }
                if ( !name || !account ){
                        wx.showToast({
                                title: '无效的操作',
                                icon: 'none',
                                duration: 2000
                        });
                        return;
                }
                

                wx.request({

                        url: 'https://axure.xinice.com/index.php/index/index/cash',
                        data: {
                                openid:openid,
                                amount: amount,
                                name: name ,
                                account: account,
                        },
                        header: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        method: 'POST',
                        success: function (res) {

                                if (res.data == 2){
                                        wx.showToast({
                                                title: '申请成功',
                                                icon: 'success',
                                                duration: 2000
                                        });
                                        wx.navigateTo({
                                                url: '../gold/gold',
                                        });
                                }
                                if (res.data == 4) {
                                        wx.showToast({
                                                title: '申请失败：内部错误！请稍后再试。',
                                                icon: 'none',
                                                duration: 2000
                                        });
                                }
                        },
                        fail: function (res) {
                                wx.showToast({
                                        title: '申请失败：内部错误！请稍后再试。',
                                        icon: 'none',
                                        duration: 2000
                                });
                        },
                })
        },
  







        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {

        
        
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
