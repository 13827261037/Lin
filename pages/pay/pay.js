Page({
  

  data: {
    inputValue: ''
  },
  
  // 输入框同步显示
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //支付事件
  paybut: function (options) {

    // var total_fee = 0.01;//支付金额
    var total_fee = this.data.inputValue;
    // console.log(total_fee);

    let openid = wx.getStorageSync("openid");

    if (total_fee>0){
      // console.log(total_fee);
      //提交后台
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
                duration: 3000
              });
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

    }else{
      // console.log('输入0元，不搭理你')
    }
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
