// pages/activity_ coupon/activity_coupon.js
// 优惠券活动 完全乱了，先分开写比较清楚
import config from '../../utils/config';
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bmlist:[],
    url:config.request,
    phb_show:false,
    hasUserInfo:false,
    activity_info:[],
    msgList:[],
    userInfo:[],
    ycyindao: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var activity_id = options.activity_id;
    if (options.scene){
        var ze = decodeURIComponent(options.scene);
        var ss = ze.split("@");
        var activity_id = ss[1];
    }
    var that = this;
    // let is_lingqu = wx.getStorageSync("activity_" + activity_id);
    // console.log(app.globalData.openid)
    that.setData({
      activity_id: activity_id,
    });
    if (!app.globalData.openid) {
        app.userInfoReadyCallback = res => {
          // var openid = wx.getStorageSync("openid");
          var openid = app.globalData.openid;
         if(openid){
           that.ontwo(activity_id, openid, options);
         }
      }
    }else{
      that.ontwo(activity_id, app.globalData.openid, options);
    }
    that.setData({
      userInfo: app.globalData.userInfo
    });
   
  },
  ontwo: function (activity_id, openid, options){
    var that = this;
    var activity_id = activity_id;
    var openid = openid;
      //二维码
      that.ercode(openid);
      //活动详情
      that.info(activity_id, openid);
      //活动
      that.newestsss(activity_id, openid);
      // 检查登陆状态

      var userInfo = wx.getStorageSync("userInfo");
      wx.checkSession({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: userInfo
          });
        },
        fail: function (res) {
          that.setData({
            hasUserInfo: false
          });
        }
      });

      // 扫描二维码来的
      if (options.scene) {

        let scene = decodeURIComponent(options.scene);
        wx.request({
          url: config.request + 'index.php/index/index/upperLayer',
          data: {
            openid: openid,
            scene: scene,
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
          },
          fail: function (res) {
          }
        })
      } else {
        console.log('没有scene')
      }

      // 获取排行榜
      wx.request({
        url: config.request + 'index.php/index/index/ranking',
        data: {
          openid: openid
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            bmlist: res.data.phb
          })
        },
        fail: function (res) {
        }
      })
  },
  info: function (activity_id, openid){
    var that = this;
    wx.request({
      url: config.request + 'index.php/index/index/activity_info',
      data: {
        activity_id: activity_id,
        openid: openid,
        merch_id:app.globalData.merch_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
          that.setData({
            activity_info: res.data
          })
        wx.setStorageSync('merchname', res.data.shname + '·' + res.data.industry ? res.data.shname + '·' + res.data.industry : '')
        wx.setStorageSync('coupon_individual', res.data.coupon_individual ? res.data.coupon_individual : '0')
        wx.setStorageSync('coup_money', res.data.coupon_money ? res.data.coupon_money : '0')
      },
      fail: function (res) {
      }
    })
  },
  ercode: function (openid){
    var self2 = this;
    //准备好二维码
    wx.request({
      url: config.request + 'index.php/index/index/QRcode',
      data: {
        openid: openid,
        merch_id: app.globalData.merch_id,
        modular_id: app.globalData.modular_id,
        activity_id: self2.data.activity_id
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
  },
  //展示活动页
  show: function () {
    this.setData({ visible: true, showModalStatus: false, })
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

  },

  phb_show:function(e){
        var xs = e.currentTarget.dataset.phbshow;
        if (xs){
          var zs = false;
        }else{
          var zs = true;
        }
      this.setData({
        phb_show: zs
      })
  },

  share_img:function(e){
    var that = this;
    // console.log(this.data.userInfo)
    that.setData({
      userInfo: this.data.userInfo,
      visible: true,
      showModalStatus: false,
    });
  },
  close:function(){
    var that = this;
    that.setData({
      visible: false,
      showModalStatus: false,
    });
  },
  lqcoupon:function(e){
    //手机号获取后调取
    var self2 = this;
    
    // let openid = wx.getStorageSync("openid");
    var activity_id = self2.data.activity_id;
    var openid = app.globalData.openid;
      //领取优惠券
      wx.request({
        url: config.request + 'index.php/index/index/receive_coupon',
        data: {
          openid: openid,
          activity_id: self2.data.activity_id,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
            // console.log(res)
          wx.showToast({
            title: res.data.message,
            icon:'none',
            duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
            mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
            success: function () { },
            fail: function () { },
            complete: function () { }
          }) 
          //已领取
          // wx.setStorageSync('activity_' + activity_id, 'YES')
          self2.setData({
            is_lingqu : 'YES',
            ycyindao:true
          })
        },
        fail: function (res) {
        }
      })
  },
  //点击获取用户昵称头像
  getUserInfo: function (e) {

      if (e.detail.userInfo) {

        let openid = wx.getStorageSync("openid");

        //传到数据库，填充用户信息（名称+头像）
        wx.request({

          url: config.request + 'index.php/index/index/nameImg',

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
      } else {
        wx.getUserInfo({
          success: function (res) {
            var userInfo = res.userInfo
            wx.setStorageSync("userInfo2", userInfo);
            this.setData({
              userInfo: userInfo,
              hasUserInfo: true
            })
          }
        })
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
          return false;
        } else {
          //同意授权
          wx.request({
            method: "GET",
            url: config.request + 'index.php/index/index/userMobile',
            data: {
              openid: openid,
              encrypdata: ency,
              ivdata: iv,
              sessionkey: sessionk,
              modular_id: app.globalData.modular_id
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
              //领取优惠券
              that.lqcoupon();
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
  newestsss: function (activity_id, openid) {
    var self2 = this;
    wx.request({
      url: config.request + 'index.php/index/index/newest',
      data: {
        openid: openid,
        activity_id:activity_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        self2.setData({
          msgList: res.data.newestps,
          is_lingqu: res.data.is_lingqu
        });
      },
      fail: function (res) {
      }
    })
  },
  tohome:function(){
    wx.navigateTo({
      url: "../index/index"
    })
  },
  ycyindao:function(){
    var that = this;
    var ycyindao = this.data.ycyindao;
    this.setData({
      ycyindao:false,
    });
    var activity_id = that.data.activity_id;
    var options = { activity_id: activity_id};
    that.onLoad(options);
  },
  back:function(){
    wx.redirectTo({
      url: '../index/index',
      success: function (res) {
        // success 
      },
    }) 
  }
})