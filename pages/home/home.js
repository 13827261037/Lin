

//获取应用实例
const app = getApp()

Page({

  data: {

    time: 1,

    imgUrl: "https://axure.xinice.com/static/projects/HXBN/imgs/efd2.jpg",
  },


  onReady() {

    this.data.Time = setInterval(() => {
      this.setData({
        time: --this.data.time
      })
      if (this.data.time <= 0) {
        clearInterval(this.data.Time)
        this.goHome()
      }
    }, 1000)
  },

  goHome() {

    clearInterval(this.data.Time)
    wx.reLaunch({
      url: '../index/index'
    })
  }





})
