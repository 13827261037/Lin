
App({


        globalData: {

                userInfo: null,
        },


        onLaunch: function () {


                // 展示本地存储能力
                var logs = wx.getStorageSync('logs') || []
                logs.unshift(Date.now())
                wx.setStorageSync('logs', logs)


                // 登录
                wx.login({
                        success: function (res) {
                                if (res.code) {

                                        //发起网络请求
                                        wx.request({

                                                //请求服务器路径，获取openid
                                                url: 'https://axure.xinice.com/index.php/index/index/openid',
                                                method: "GET",
                                                data: {
                                                        code: res.code,
                                                },
                                                success: function (data) {
                                                        
                                                        wx.setStorageSync("openid", data['data']['openid']);
                                                        wx.setStorageSync("session_key", data['data']['session_key']);

                                                        // 佣金
                                                        wx.setStorageSync("zyj",        data['data']['zyj']);
                                                        // 推荐人数
                                                        wx.setStorageSync("ztjrs",      data['data']['ztjrs']);
                                                        //推荐人
                                                        wx.setStorageSync("tjr",        data['data']['tjr']);
                                                        //用户等级
                                                        wx.setStorageSync("rank",       data['data']['rank']);
                                                        //优惠卷数量
                                                        wx.setStorageSync("coupon",     data['data']['coupon']);
                                                        //活动总收益
                                                        wx.setStorageSync("yongjin",     data['data']['yongjin']);
                                                
                                                        // let openid = wx.getStorageSync("openid");
                                                        // console.log( openid); 
                                                },
                                                fail: function (data) {
                                                        console.log('code传输失败！')
                                                }
                                        })
                                } else {
                                        console.log('登录失败！')
                                }
                        }
                });
                

                // 获取用户信息
                wx.getSetting({
                        success: res => {
                                if (res.authSetting['scope.userInfo']) {
                                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                                        wx.getUserInfo({
                                                success: res => {
                                                        // 可以将 res 发送给后台解码出 unionId
                                                        this.globalData.userInfo = res.userInfo;
                                                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回,所以此处加入 callback 以防止这种情况
                                                        if (this.userInfoReadyCallback) {
                                                                this.userInfoReadyCallback(res);
                                                        }
                                                }
                                        })
                                }
                        }
                })

                
        }


})