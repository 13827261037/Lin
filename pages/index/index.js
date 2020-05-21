

//获取应用实例
const app = getApp()


Page({


        data: {

                vo2_tf: false,

                msgList: [ ],
                allProject: [ ],

                //拼接大图
                imgUrl1: "https://axure.xinice.com/static/projects/HXBN/imgs/BB_01.jpg",
                imgUrl2: "https://axure.xinice.com/static/projects/HXBN/imgs/BB_02.jpg",
                imgUrl3: "https://axure.xinice.com/static/projects/HXBN/imgs/BB_03.jpg",
                imgUrl4: "https://axure.xinice.com/static/projects/HXBN/imgs/BB_04.jpg",
                imgUrl5: "https://axure.xinice.com/static/projects/HXBN/imgs/BB_05.png",

        },

        vvs2: function () {this.setData({vo2_tf: true })},


        //打开如何赚钱 //关闭如何赚钱
        showRule: function () {
                this.setData({
                        isRuleTrue: true
                })
        },
        hideRule: function () {
                this.setData({
                        isRuleTrue: false
                })
        },


        //“推荐好友”事件处理函数
        show: function () {
                this.setData({ 
                        visible: true 
                })
        },
        close: function () {
                this.setData({ 
                        visible: false 
                })
        },


        // 霸屏 -  弹框动画
        showModal4: function () {

                // 显示遮罩层
                var animation = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                })
                this.animation = animation
                animation.translateY(700).step()
                this.setData({
                        animationData: animation.export(),
                        showModalStatus4: true
                })
                setTimeout(function () {
                        animation.translateY(0).step()
                        this.setData({
                                animationData: animation.export()
                        })
                }.bind(this), 200)
        },
        hideModal4: function () {
                // 隐藏遮罩层
                var animation = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                })
                this.animation = animation
                animation.translateY(700).step()
                this.setData({
                        animationData: animation.export(),
                        showModalStatus4: false
                })
                setTimeout(function () {
                        animation.translateY(0).step()
                        this.setData({
                                animationData: animation.export(),
                        })
                }.bind(this), 200)
        },


        //跳累计收入
        goldBen: function (options) {
                wx.navigateTo({
                        url: '../gold/gold',
                })
        },

        //跳提现
        rolloutBen: function (options) {
                wx.navigateTo({
                        url: '../rollout/rollout',
                })
        },


        //跳排行榜
        rkBen: function (options) {
                wx.navigateTo({
                        url: '../ranking/ranking',
                })
        },


        //跳pay
        ccddBen: function (options) {
                wx.navigateTo({
                        url: '../pay/pay',
                })
        },


        //跳活动
        activityBen: function (options) {
                wx.navigateTo({
                        url: '../activity/activity',
                })
        },


        //跳分享
        shareBen: function (options) {
                wx.navigateTo({
                        url: '../share/share',
                })
        },


        //跳介绍
        recommendBen: function (options) {
                wx.navigateTo({
                        url: '../recommend/recommend',
                })
        },


        //跳优惠券
        cpBen: function (options) {
                wx.navigateTo({
                        url: '../coupons/coupons',
                })
        },


       


        onLoad: function () {

                var self2 = this;

                let openid = wx.getStorageSync("openid");

                //重新赋值
                wx.request({

                  //请求服务器路径，获取openid
                  url: 'https://axure.xinice.com/index.php/index/index/info',
                  method: "GET",
                  data: {
                    openid: openid,
                    merch_id:app.globalData.merch_id,
                    modular_id: app.globalData.modular_id
                  },
                  success: function (data) {
                    // console.log(data)
                    // wx.setStorageSync("openid", data['data']['openid']);
                    // wx.setStorageSync("session_key", data['data']['session_key']);

                    // // // 佣金
                    // wx.setStorageSync("zyj", data['data']['zyj']);
                    // // // 推荐人数
                    // wx.setStorageSync("ztjrs", data['data']['ztjrs']);
                    // // //推荐人
                    // wx.setStorageSync("tjr", data['data']['tjr']);
                    // // //用户等级
                    // wx.setStorageSync("rank", data['data']['rank']);
                    // // //优惠卷数量
                    wx.setStorageSync("coupon", data['data']['coupon']);
                    // // //活动总收益
                    // wx.setStorageSync("yongjin", data['data']['yongjin']);

                    self2.setData({
                      zyjdata: data['data']['zyj'],
                      ztjrsddata: data['data']['ztjrs'],
                      tjrdata: data['data']['tjr'],
                      rankdata: data['data']['rank'],
                      coupondata: data['data']['coupon'],
                      yongjindata: data['data']['yongjin'],
                    })
                  },
                  fail: function (data) {
                    console.log('code传输失败！')
                  }
                })
                //首页显示的数据
                // let zyj = wx.getStorageSync("zyj");
                // let ztjrs = wx.getStorageSync("ztjrs");
                // let tjr = wx.getStorageSync("tjr");
                // let rank = wx.getStorageSync("rank");
                // let coupon = wx.getStorageSync("coupon");
                // let yongjin = wx.getStorageSync("yongjin");

                // this.setData({
                //         zyjdata: zyj,
                //         ztjrsddata: ztjrs,
                //         tjrdata: tjr,
                //         rankdata: rank,
                //         coupondata: coupon,
                //         yongjindata: yongjin,
                // })


                // 不重复获取手机号码
                let ph = wx.getStorageSync("ph");
                if (ph != '3') {
                        console.log("未授权获取手机号码");
                        self2.setData({
                                modalstatus: false
                        });
                } else {
                        console.log("已授权获取手机号码");
                        self2.setData({
                                modalstatus: true
                        });
                }


                //顶部弹幕滚动
                wx.request({
                        url: 'https://axure.xinice.com/index.php/index/index/dmsjhq',
                        data: {
                        },
                        method: 'GET',
                        header: {
                                'content-type': 'application/json'
                        },
                        success: function (res) {

                                for (var i = 0; i < res.data.dmsj.length; i++) {

                                        self2.data.allProject[i]        = res.data.dmsj[i];
                                }
                                self2.setData({
                                        msgList: self2.data.allProject,  
                                });
                                // console.log(self2.data.allProject)
                        },
                        fail: function (res) {
                        }
                })


                // 心跳动画 
                var circleCount = 0;
                this.animationMiddleHeaderItem = wx.createAnimation({
                        duration: 1000,    // 以毫秒为单位  
                        timingFunction: 'linear',
                        delay: 100,
                        transformOrigin: '50% 50%',
                        success: function (res) {

                        }
                });
                setInterval(function () {
                        if (circleCount % 2 == 0) {
                                this.animationMiddleHeaderItem.scale(1.1).step();
                        } else {
                                this.animationMiddleHeaderItem.scale(1.0).step();
                        }
                        this.setData({
                                animationMiddleHeaderItem: this.animationMiddleHeaderItem.export()  //输出动画
                        });
                        circleCount++;
                        if (circleCount == 1000) {
                                circleCount = 0;
                        }
                }.bind(this), 1000);


                if (app.globalData.userInfo) {
                        this.setData({
                                userInfo: app.globalData.userInfo,
                                hasUserInfo: true,
                        })
                        wx.setStorageSync("userInfo2",app.globalData.userInfo);
                        wx.setStorageSync("hUI", '2');
                } else if (this.data.canIUse) {
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回，所以此处加入 callback 以防止这种情况
                        app.userInfoReadyCallback = res => {
                                this.setData({
                                        userInfo: res.userInfo,
                                        hasUserInfo: true,
                                })
                                wx.setStorageSync("userInfo2",app.globalData.userInfo);
                                wx.setStorageSync("hUI", '2');
                        }
                } else {
                        // 在没有 open-type=getUserInfo 版本的兼容处理
                        wx.getUserInfo({
                                success: res => {
                                        app.globalData.userInfo = res.userInfo
                                        this.setData({
                                                userInfo: res.userInfo,
                                                hasUserInfo: true,
                                        })
                                        wx.setStorageSync("userInfo2",app.globalData.userInfo);
                                        wx.setStorageSync("hUI", '2');
                                }
                        })
                }
        },




        onReady: function () {

                var self2 = this;

                //霸屏弹窗
                let hUI = wx.getStorageSync("hUI");
                if (hUI != '2'){
                        this.showModal4();
                }

                let openid = wx.getStorageSync("openid");
                //显示排行榜
                wx.request({
                        url: 'https://axure.xinice.com/index.php/index/index/ranking',
                        data: {
                                openid: openid,
                        },
                        method: 'GET',
                        header: {
                                'content-type': 'application/json'
                        },
                        success: function (res) {
                                self2.setData({
                                        phbdata: res.data.phb,
                                });
                                wx.setStorageSync("phbdata", res.data.phb);//排行榜10个
                                wx.setStorageSync("wphdata", res.data.wph);//我的排名
                                wx.setStorageSync("wedata", res.data.we);//我的信息
                        },
                        fail: function (res) {
                        }
                })

                //准备好二维码
                wx.request({
                        url: 'https://axure.xinice.com/index.php/index/index/QRcode',
                        data: {
                                openid: openid,
                        },
                        method: 'GET',
                        header: {
                                'content-type': 'application/json'
                        },
                        success: function (res) {
                                // console.log('二维码已到')
                                wx.setStorageSync("imgUrls2", res.data);
                                self2.setData({
                                        imgUrls: res.data
                                })
                        },
                        fail: function (res) {
                                // console.log('二维码获取失败')
                        }
                })


        },


        //点击获取用户昵称头像
        getUserInfo: function (e) {
                
                var that = this;

                // app.globalData.userInfo = e.detail.userInfo
                if (e.detail.userInfo) {

                        let openid = wx.getStorageSync("openid");

                        //传到数据库，填充用户信息（名称+头像）
                        wx.request({

                                url: 'https://axure.xinice.com/index.php/index/index/nameImg',
                                data: {
                                        name: e.detail.userInfo.nickName,
                                        img: e.detail.userInfo.avatarUrl,
                                        openid: openid,
                                },
                                method: 'GET',
                                header: {
                                        'content-type': 'application/json'
                                },
                                success: function (res) {
                                        that.setData({
                                                userInfo: e.detail.userInfo,
                                                hasUserInfo: true
                                        })
                                        that.hideModal4();
                                        // console.log(res.data)
                                },
                                fail: function (res) {
                                        // console.log(res.data)
                                }
                        })
                        // console.log("同意获取名称头像授权");
                } else {
                        // console.log("拒绝获取名称头像授权");
                }
        },


        //获取手机号事件
        getPhoneNumber: function (e) {

                var that = this;

                //该用户session_key 是否有效
                wx.checkSession({

                        success: function () {

                                let session_key = wx.getStorageSync("session_key");
                                let openid = wx.getStorageSync("openid");

                                var ency = e.detail.encryptedData;
                                var iv = e.detail.iv;
                                var sessionk = session_key;

                                if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
                                        console.log("用户拒绝获取手机号码授权");
                                } else {
                                        //同意授权
                                        wx.request({
                                                method: "GET",
                                                url: 'https://axure.xinice.com/index.php/index/index/userMobile',
                                                data: {
                                                        openid: openid,
                                                        encrypdata: ency,
                                                        ivdata: iv,
                                                        sessionkey: sessionk,
                                                },
                                                header: {
                                                        'content-type': 'application/json'
                                                },
                                                success: (res) => {
                                                        wx.setStorageSync("ph", '3');
                                                        that.setData({
                                                                modalstatus: true
                                                        });
                                                        console.log("获取手机成功！");
                                                },
                                                fail: function (res) {
                                                        console.log("获取手机失败！");
                                                }
                                        });
                                }
                        },
                        fail: function () {
                                console.log("session_key 已经失效，需要重新执行登录流程");
                                //重新登录
                                // that.wxlogin(); 
                        }
                })   
        }

  









})

