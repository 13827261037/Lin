import config from '../../utils/config';
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //每页显示的行数：
    pagesize: 5,

    //页码（从1开始）：
    p: 1,

    //排序方式：
    paixu: 'viewcount',

    //用于标识是否还有更多的状态
    state: 1,

    //用于渲染页面的数组
    arrayProject: [],

    //用于数组的追加和暂存
    allProject: [],

  },



  go:function(){
    wx.redirectTo({
      url: '../post/post',
    })
  },
  onBackTap: function (e) {

    var pages = getCurrentPages();                       //获取当前页面
    var prePage = pages[pages.length - 2];               //获取上一页面
    prePage.setData({
      'search.page': 1                                   //给上一页面的变量赋值
    })
    wx.navigateBack({                                    //返回上一页面
      delta: 1,
    })
  },


  






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //页显示数据
    //不知道为啥获取不到
    // let ztjrs = wx.getStorageSync("ztjrs");
    var ztjrs = app.globalData.tjrs;
    this.setData({
      ztjrsddata:  ztjrs
    })

    //上拉刷新更多
    var mythis = this;
    getproinfo(this.data.pagesize, this.data.p, mythis)

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
    var mythis = this;
    wx.showLoading({
      title: '玩命加载中...',
    });
    mythis.data.p = mythis.data.p + 1;
    getproinfo(this.data.pagesize, this.data.p, mythis);
    wx.hideLoading();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})


// 上拉刷新具体方法
function getproinfo(pagesize, p, mythis) {

  // let openid = wx.getStorageSync("openid");
  var openid = app.globalData.openid;

  wx.request({
    url: 'https://axure.xinice.com/index.php/index/index/recommend',
    method: 'GET',
    data: {
      pagesize: pagesize,
      p: p,
      openid: openid,
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {

      //如果搜出来的结果=0，就说明后面已经没数据可加载了，所以将state设为0
      if (res.data.boss.length == 0){

        mythis.setData({
          state: 0
        });
      } else {

        var state1 = 1;
        //如果有数据，但小于每次期望加载的数据量（pagesize）,将state设为0，表示后面已没有数据可加载
        if (res.data.boss.length < mythis.data.pagesize)
          var state1 = 0;
        //循环将结果集追加到数组后面
        for (var i = 0; i < res.data.boss.length; i++) {
          mythis.data.allProject.push(res.data.boss[i]);
        }
        mythis.setData({
          arrayProject: mythis.data.allProject,
          state: state1
        });

      }
    },
    fail: function (res) {
      console.log(res);
    }
  });
}