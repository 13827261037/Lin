

//获取应用实例
const app = getApp()

Page({

  data: {
    options:'',
    time: 1,

    imgUrl: "https://axure.xinice.com/static/projects/HXBN/imgs/efd2.jpg",
  },

  onLoad(options){
    if (options){
      if (options.scene){
        this.setData({
          options: options.scene
        })
      }
    }
  },
  onReady(options) {
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
    var options = this.data.options;
    // url: '../index/index?scene=' + options
    wx.reLaunch({
      url: '../index/index'
    })
  }





})
