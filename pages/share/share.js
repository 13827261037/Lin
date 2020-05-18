Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  //事件处理函数
  show: function () {
    this.setData({ visible: true })
  },
  close: function () {
    this.setData({ visible: false })
  },


  go:function(){
    wx.redirectTo({
      url: '../post/post',
    })
  },
  onBackTap: function (e) {

    var pages = getCurrentPages();                       
    //获取当前页面
    var prePage = pages[pages.length - 2];               
    //获取上一页面
    prePage.setData({
      'search.page': 1                                   
      //给上一页面的变量赋值
    })
    wx.navigateBack({                                    
      //返回上一页面
      delta: 1,
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
