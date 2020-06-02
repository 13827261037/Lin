import config from '../../utils/config';

//获取应用实例
const app = getApp()
// pages/offlinepay/offlinepay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon_list:[],
    coupon_index:0,
    coupon_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var merch_id = app.globalData.merch_id;
    var modular_id = app.globalData.modular_id;
            // 登录
            wx.login({
              success: function (res) {
                if (res.code) {

                  //发起网络请求
                  wx.request({
                    //请求服务器路径，获取openid
                    url: config.request +'index.php/index/index/openid',
                    method: "GET",
                    data: {
                      code: res.code,
                      modular_id: modular_id,
                      merch_id: merch_id

                    },
                    success: function (data) {
                                var openid = data['data']['openid'];
                                  wx.request({
                                    url: config.request + 'index.php/index/index/pay_coupon_list',
                                    data: {
                                      // total_fee: total_fee,
                                      openid: openid,
                                      merch_id: merch_id,
                                      modular_id: modular_id,
                                      coupon_id: 2
                                    },
                                    header: {
                                      'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                    method: 'POST',
                                    success: function (res) {
                                      console.log(res.data);
                                      that.setData({
                                        coupon_list:res.data
                                      })
                                    },
                                    fail: function (res) {
                                      // console.log(res.data)
                                    }
                                  });
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
  radioChange:function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    // const items = this.data.items
    // for (let i = 0, len = items.length; i < len; ++i) {
    //   coupon_list[i].checked = coupon_list[i].value === e.detail.value
    // }

    this.setData({
      coupon_index: e.detail.value
    })
  },
  
  srrrw: function (options) {
    var that = this;
    var pay_money = that.data.pay_money;
    // console.log(pay_money)
    var merch_id = app.globalData.merch_id;
    var modular_id = app.globalData.modular_id;
    var total_fee = pay_money;  //支付金额，0.01元假数据
    // let openid = wx.getStorageSync("openid");
    var openid = app.globalData.openid;
    var coupon_id = that.data.coupon_id;
    // return false;
      wx.request({
        url: config.request + 'index.php/index/index/offlinepay',
        data: {
          total_fee: total_fee,
          openid: openid,
          merch_id: merch_id,
          modular_id: modular_id,
          coupon_id: coupon_id
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
              that.onLoad();
            },
            'fail': function (res) {
              // console.log(res.errMsg);
            },
            'complete': function (res) {
              console.log('支付流程结束');
            }
          });
        },
        fail: function (res) {
          // console.log(res.data)
        }
      });

  },
  getMoney: function (e) {
    var val = e.detail.value;
    console.log(val)
    this.setData({
      getMoney: val
    });
  },
  verification:function(e){
    var that = this;
    //金额
    var money = parseFloat(that.data.getMoney);
    //下标
    var coupon_index = parseInt(that.data.coupon_index);
    //优惠券
    var coupon_list = that.data.coupon_list;
    //当前选择
     var coupon = coupon_list[coupon_index];
      if (!money){
          wx.showToast({
            title: '金额不能为零',
            icon: 'none',
            duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
            mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
          })
          return false;
      }
    // console.log(coupon)

    if (coupon_index){
        switch (coupon.coupon_type) {
          case '1':
            //满减券
            var coupon_condition = parseFloat(coupon.coupon_condition);
            if (money < coupon_condition) {
              wx.showToast({
                title: '最低消费' + coupon_condition + '可使用此优惠券',
                icon: 'none',
                duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
                mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
              })
              return false;
            }
            console.log(money)
            console.log(coupon.coupon_money)
            var pay_money = money - coupon.coupon_money;
            var pay_money = Math.floor(pay_money * 100) / 100
            that.setData({
              pay_money : pay_money,
              coupon_id: coupon.id
            })

            break;

            default:
            that.setData({
              pay_money: money,
              coupon_id: 0
            })
             break;
          }
    }else{
      console.log('没有使用优惠券')
      that.setData({
        pay_money: money,
        coupon_id: 0
      })
    }



    that.srrrw();
  }
})