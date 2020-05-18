

//获取应用实例
const app = getApp()


Page({


        data: {

                viewb: 100,
                cLtf1: true,
                cLtf2: true,
                jj1: false,
                jj2: false,

                clock: '',


                //大图
                imgUrl4: "https://axure.xinice.com/static/projects/HXBN/imgs/4c4c.jpg",


                imgUrl6: "https://axure.xinice.com/static/projects/HXBN/imgs/acitvit.png",

                input20: false,

                telValue: '服务棒棒哒~照片好好看~妹纸很漂亮~！',

                xswdphss: false,

                vo2_tf: false,
 
        },


       //  套餐内容 按钮
        cL1() {
                var viewb = this.data.viewb;
                var cLtf1 = this.data.cLtf1;
                if (cLtf1){
                        viewb += 53;
                        this.setData({
                                viewb: viewb,
                                cLtf1: false,
                                jj1: true,
                        })
                }else{
                        viewb -= 53;
                        this.setData({
                                viewb: viewb,
                                cLtf1: true,
                                jj1: false,
                        })
                }
        },
        //  退款政策 按钮
        cL2() {
                var viewb = this.data.viewb;
                var cLtf2 = this.data.cLtf2;
                if (cLtf2) {
                        viewb += 8;
                        this.setData({
                                viewb: viewb,
                                cLtf2: false,
                                jj2: true,
                        })
                } else {
                        viewb -= 8;
                        this.setData({
                                viewb: viewb,
                                cLtf2: true,
                                jj2: false,
                        })
                }
        },

        vvs2: function () {this.setData({vo2_tf: true })},


        //打开如何赚钱
        showRule: function () {this.setData({isRuleTrue: true })},
        //关闭如何赚钱
        hideRule: function () {this.setData({isRuleTrue: false}) },

        inbtn:function(e){   
                // 点击父系关闭，子系正常
                console.log("in")
        },


       // 文本框随机显示   
        inprdBen: function (options) {

                var random = Math.floor(Math.random() * 10);
                var inpv =  '服务棒棒哒~照片好好看~妹纸很漂亮~';

                if (random == 0){
                        inpv = '0';
                }
                if (random == 1) {
                        inpv = '1';
                }
                if (random == 2) {
                        inpv = '2';
                }
                if (random == 3) {
                        inpv = '3';
                }
                if (random == 4) {
                        inpv = '4';
                }
                if (random == 5) {
                        inpv = '5';
                }
                if (random == 6) {
                        inpv = '6';
                }
                if (random == 7) {
                        inpv = '7';
                }
                if (random == 8) {
                        inpv = '8';
                }
                if (random == 9) {
                        inpv = '9';
                }

                this.setData({
                        telValue: inpv,
                })
        },


        //跳首页
        onBackTap: function (options) {
                wx.navigateTo({
                        url: '../index/index',
                })
        },


        //展示活动页
        show: function () {this.setData({  visible: true,showModalStatus: false,}) },
        close: function () {this.setData({ visible: false })},


        // 保存输入内容
        txForm: function (data2) {
                var a2 = data2.detail.value.inp_haha
                // console.log(a2);
                wx.setStorageSync("a2", a2);
        },


        //输入框限制长度
        bindKeyInput: function (e) {
                if (e.detail.value.length >= 18){
                        this.setData({
                                input20: true,
                        })
                }else{
                        this.setData({
                                input20: false,
                        })
                }  
        },


        // 成为浩信百年代言人 -  弹框动画
        showModal: function () {
                // 显示遮罩层
                var animation = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                })
                this.animation = animation
                animation.translateY(800).step()
                this.setData({
                        animationData: animation.export(),
                        showModalStatus: true
                })
                setTimeout(function () {
                        animation.translateY(0).step()
                        this.setData({
                                animationData: animation.export()
                        })
                }.bind(this), 200)
        },
        hideModal: function () {
                // 隐藏遮罩层
                var animation = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                })
                this.animation = animation
                animation.translateY(800).step()
                this.setData({
                        animationData: animation.export(),
                })
                setTimeout(function () {
                        animation.translateY(0).step()
                        this.setData({
                                animationData: animation.export(),
                                showModalStatus: false
                        })
                }.bind(this), 200)
        },


        // 报 名 -  弹框动画
        showModal2: function () {

                total_micro_second = 900 * 1000,
                count_down(this);

                // 显示遮罩层
                var animation = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                })
                this.animation = animation
                animation.translateY(700).step()
                this.setData({
                        animationData: animation.export(),
                        showModalStatus2: true
                })
                setTimeout(function () {
                        animation.translateY(0).step()
                        this.setData({
                                animationData: animation.export()
                        })
                }.bind(this), 200)
        },
        hideModal2: function () {
                // 隐藏遮罩层
                var animation = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                })
                this.animation = animation
                animation.translateY(700).step()
                this.setData({
                        animationData: animation.export(),
                })
                setTimeout(function () {
                        animation.translateY(0).step()
                        this.setData({
                                animationData: animation.export(),
                                showModalStatus2: false
                        })
                }.bind(this), 200)
        },


        // 报名成功后 -  弹框动画
        showModal3: function () {
                // 显示遮罩层
                var animation = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                })
                this.animation = animation
                animation.translateY(700).step()
                this.setData({
                        animationData: animation.export(),
                        showModalStatus3: true
                })
                setTimeout(function () {
                        animation.translateY(0).step()
                        this.setData({
                                animationData: animation.export()
                        })
                }.bind(this), 200)
        },
        hideModal3: function () {
                // 隐藏遮罩层
                var animation = wx.createAnimation({
                        duration: 200,
                        timingFunction: "linear",
                })
                this.animation = animation
                animation.translateY(700).step()
                this.setData({
                        animationData: animation.export(),
                })
                setTimeout(function () {
                        animation.translateY(0).step()
                        this.setData({
                                animationData: animation.export(),
                                showModalStatus3: false
                        })
                }.bind(this), 200)
        },


        mm32: function (){
                this.hideModal3();
                this.showModal();
        },


        //支付事件
        srrrw: function (options) {
                var that = this;
                var total_fee = 0.01;  //支付金额，0.01元假数据
                let openid = wx.getStorageSync("openid");
                let yhjzt = wx.getStorageSync("yhjzt");
                console.log(yhjzt);
                if(yhjzt=='2'){
                        wx.showToast({
                                title: '您已报名，请到对应页面查看',
                                icon: 'none',
                                duration: 4000
                        });
                }else{
                        wx.request({
                                url: 'https://axure.xinice.com/index.php/index/index/WXpay',
                                data: {
                                        total_fee: total_fee,
                                openid: openid
                                },
                                header: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                method: 'POST',
                                success: function (res) {
                                        console.log('调起支付');
                                        wx.requestPayment({
                                                'timeStamp': res.data.timeStamp,
                                                'nonceStr': res.data.nonceStr,
                                                'package': res.data.package,
                                                'signType': 'MD5',
                                                'paySign': res.data.paySign,
                                                'success': function (res) {
                                                        console.log('支付成功');
                                                        
                                                        wx.showToast({
                                                                title: '支付成功',
                                                                icon: 'success',
                                                                duration: 2000
                                                        });

                                                        wx.setStorageSync("yhjzt","2");
        
                                                        //获取最新的12报名
                                                        that.newestsss();
        
                                                        // 报名成功后 -  弹框动画
                                                        that.hideModal2();
                                                        that.showModal3();
                                                },
                                                'fail': function (res) {
                                                        console.log(res.errMsg);
                                                },
                                                'complete': function (res) {
                                                        console.log('支付流程结束');
                                                }
                                        });
                                },
                                fail: function (res) {
                                        console.log(res.data)
                                }
                        });

                }
                

                // wx.request({
                //         url: 'https://axure.xinice.com/index.php/index/index/WXpay',
                //         data: {
                //                 total_fee: total_fee,
                //         openid: openid
                //         },
                //         header: {
                //                 'Content-Type': 'application/x-www-form-urlencoded'
                //         },
                //         method: 'POST',
                //         success: function (res) {
                //                 console.log('调起支付');
                //                 wx.requestPayment({
                //                         'timeStamp': res.data.timeStamp,
                //                         'nonceStr': res.data.nonceStr,
                //                         'package': res.data.package,
                //                         'signType': 'MD5',
                //                         'paySign': res.data.paySign,
                //                         'success': function (res) {
                //                                 console.log('支付成功');
                //                                 wx.showToast({
                //                                         title: '支付成功',
                //                                         icon: 'success',
                //                                         duration: 2000
                //                                 });

                //                                 //获取最新的12报名
                //                                 that.newestsss();

                //                                 // 报名成功后 -  弹框动画
                //                                 that.hideModal2();
                //                                 that.showModal3();
                //                         },
                //                         'fail': function (res) {
                //                                 console.log(res.errMsg);
                //                         },
                //                         'complete': function (res) {
                //                                 console.log('支付流程结束');
                //                         }
                //                 });
                //         },
                //         fail: function (res) {
                //                 console.log(res.data)
                //         }
                // });
        },


        //点击获取用户昵称头像
        getUserInfo: function (e) {

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
                                        // console.log(res.data)
                                },
                                fail: function (res) {
                                        // console.log(res.data)
                                }
                        })

                        this.setData({
                                userInfo: e.detail.userInfo,
                                hasUserInfo: true
                        })
                        wx.setStorageSync("userInfo2", e.detail.userInfo);
                        // wx.setStorageSync("userurl", e.detail.userInfo.avatarUrl);
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
        },


        //获取最新的12报名（页面加载时，报名成功时需要）
        newestsss: function () {
                var self2 = this;
                wx.request({
                        url: 'https://axure.xinice.com/index.php/index/index/newest',
                        data: {
                        },
                        method: 'GET',
                        header: {
                                'content-type': 'application/json'
                        },
                        success: function (res) {
                                self2.setData({
                                        msgList: res.data.newestps,
                                        sunb: res.data.sunb,
                                        llnb: res.data.llnb,
                                });
                        },
                        fail: function (res) {
                        }
                })
        },
      //滚动显示
        onPageScroll: function (res) {
        // var that =this;
          // console.log(res)
          // console.log(this.data.screenHeight)
          var jiaz = this.data.screenHeight * 0.1;
          // console.log(jiaz)
          if (res.scrollTop < jiaz) {
            if (this.data.reachbottom  = false){
              this.setData({ reachbottom: false })
            }
          
          } else {
            this.setData({ reachbottom: true })
          }
        },
        onLoad: function (options) {

                var self2 = this;
         
                //获取手机高度
                wx.getSystemInfo({
                    success: res => {
                      // console.log(res)
                      this.setData({ screenHeight: res.screenHeight })
                    }
                  })
                //延时执行
                setTimeout(function () {

                        let openid = wx.getStorageSync("openid");
                        let zyj = wx.getStorageSync("zyj");
                        let ztjrs = wx.getStorageSync("ztjrs");

                        self2.setData({
                                zyjdata: zyj,
                                ztjrsddata: ztjrs,
                        })

                        // 扫描二维码来的
                        if (options.scene) {

                                let scene = decodeURIComponent(options.scene);

                                wx.request({
                                        url: 'https://axure.xinice.com/index.php/index/index/upperLayer',
                                        data: {
                                                openid: openid,
                                                scene: scene,
                                        },
                                        method: 'GET',
                                        header: {
                                                'content-type': 'application/json'
                                        },
                                        success: function (res) {
                                                // console.log(res.data)
                                        },
                                        fail: function (res) {
                                                // console.log(res.data)
                                        }
                                })
                        } else {
                                console.log('没有scene')
                        }

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
                                        if (res.data.we.xswdph == 3) {
                                                xswdphss: true;
                                        }
                                        self2.setData({
                                                phbdata: res.data.phb,
                                                wphdata: res.data.wph,
                                                wedata: res.data.we,
                                        });
                                        wx.setStorageSync("yhjzt",res.data.yhjxx);
                                        // console.log(res.data.yhjxx)
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
                                        wx.setStorageSync("imgUrls2", res.data);
                                        self2.setData({
                                                imgUrls: res.data
                                        })
                                },
                                fail: function (res) {
                                }
                        })

                }, 1000)


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

                                // for (var i = 0; i < res.data.dmsj.length; i++) {

                                //         self2.data.allProject[i]        = res.data.dmsj[i];
                                // }
                                self2.setData({
                                        msgList22: res.data.dmsj,  
                                });
                                // console.log(self2.data.allProject)
                        },
                        fail: function (res) {
                        }
                })


                // 检查登录状态
                if (app.globalData.userInfo) {
                        this.setData({
                                userInfo: app.globalData.userInfo,
                                hasUserInfo: true
                        })
                } else if (this.data.canIUse) {
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回，所以此处加入 callback 以防止这种情况
                        app.userInfoReadyCallback = res => {
                                this.setData({
                                        userInfo: res.userInfo,
                                        hasUserInfo: true
                                })
                        }
                } else {
                        // 在没有 open-type=getUserInfo 版本的兼容处理
                        wx.getUserInfo({
                                success: res => {
                                        app.globalData.userInfo = res.userInfo
                                        this.setData({
                                                userInfo: res.userInfo,
                                                hasUserInfo: true
                                        })
                                }
                        })
                }

                //获取最新的12报名
                self2.newestsss();

                // 扫描二维码来的
                // if (options.scene) {

                //         wx.request({
                //                 url: 'https://axure.xinice.com/index.php/index/index/upperLayer',
                //                 data: {
                //                         openid: openid,
                //                         scene: scene,
                //                 },
                //                 method: 'GET',
                //                 header: {
                //                         'content-type': 'application/json'
                //                 },
                //                 success: function (res) {
                //                         // console.log(res.data)
                //                 },
                //                 fail: function (res) {
                //                         // console.log(res.data)
                //                 }
                //         })
                // } else {
                //         console.log('没有scene')
                // }

                //显示排行榜
                // wx.request({
                //         url: 'https://axure.xinice.com/index.php/index/index/ranking',
                //         data: {
                //                 openid: openid,
                //         },
                //         method: 'GET',
                //         header: {
                //                 'content-type': 'application/json'
                //         },
                //         success: function (res) {
                //                 if (res.data.we.xswdph == 3) {
                //                         xswdphss: true;
                //                 }
                //                 self2.setData({
                //                         phbdata: res.data.phb,
                //                         wphdata: res.data.wph,
                //                         wedata: res.data.we,
                //                 });
                //         },
                //         fail: function (res) {
                //         }
                // })

                //准备好二维码
                // wx.request({
                //         url: 'https://axure.xinice.com/index.php/index/index/QRcode',
                //         data: {
                //                 openid: openid,
                //         },
                //         method: 'GET',
                //         header: {
                //                 'content-type': 'application/json'
                //         },
                //         success: function (res) {
                //                 wx.setStorageSync("imgUrls2", res.data);
                //                 self2.setData({
                //                         imgUrls: res.data
                //                 })
                //         },
                //         fail: function (res) {
                //         }
                // })

                // 获取当前日期
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var currentdate = year + '年' + month + '月' + strDate + '日';
                this.setData({
                        currentdate: currentdate,
                })

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


               
        },


        //页面渲染完成后执行
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
               
        },


})




// 倒计时
var total_micro_second;
function count_down(that) {
        // 渲染倒计时时钟
        that.setData({
                clock: date_format(total_micro_second)
        });
        if (total_micro_second <= 0) {
                that.setData({
                        clock: "已经截止"
                });
                return;
        }
        setTimeout(function () {
                // 放在最后--
                total_micro_second -= 1000;
                count_down(that);
        }, 1000)
}
function date_format(micro_second) {
        // 秒数
        var second = Math.floor(micro_second / 1000);
        // 小时位
        // var hr = Math.floor(second / 3600);
        var hr = fill_zero_prefix(Math.floor(second / 3600));
        // 分钟位
        var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
        // 秒位
        var sec = fill_zero_prefix((second - hr * 3600 - min * 60));
        // equal to => var sec = second % 60;
        // 毫秒位，保留2位
        // var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
        return hr + " : " + min + " : " + sec;
}
function fill_zero_prefix(num) {
        // 位数不足补零
        return num < 10 ? "0" + num : num
}