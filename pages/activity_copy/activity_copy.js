// pages/activity_copy/activity_copy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carouselList:[
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589630649536&di=f1028ee40d421958da0334f3596fb2f0&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589630649536&di=0ead261f42fe8ef397c8650cb67f96c0&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589630649536&di=f1028ee40d421958da0334f3596fb2f0&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg',
    ],
    label:'免费',
    title:'公益活动^免费拍婚纱照^火热报名中，经典婚纱照免费体验',
    title_address:'婚纱摄影 · 东莞',
    // money:['sj_money' => 100],
    introd_info: ['由于报名人数较多，为保证拍摄流程流畅，需支付', '标签是用来定义剧中文本，就是说<center>标签中的文本内容将会剧中显示。<center>标签在html 4.01中已经废弃，html5不再支持该', '标签是用来定义剧中文本，就是说<center>标签中的文本内容将会剧中显示。<center>标签在html 4.01中已经废弃，html5不再支持该','标签是用来定义剧中文本，就是说<center>标签中的文本内容将会剧中显示。<center>标签在html 4.01中已经废弃，html5不再支持该']
  ,
    nodes:'<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589630649536&di=f1028ee40d421958da0334f3596fb2f0&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg" >'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.requestCarouselListData();//请求轮播图
    //活动ID
    // this.baominginfo(1);//请求轮播图

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
            wx.setStorageSync("yhjzt", res.data.yhjxx);
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
    //请求轮播图
    requestCarouselListData() {
      var that = this;//注意this指向性问题
      // var urlStr = that.data.host + "/xjj/chome_carousel_list.json"; //请求连接注意替换（我用本地服务器模拟）
      console.log("请求轮播图：" + urlStr);
      wx.request({
        url: urlStr,
        data: {//这里放请求参数，如果传入参数值不是String，会被转换成String 
          // x: '',
          // y: ''
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log("轮播图返回值：");
          console.log(res.data.result);
          var resultArr = res.data.result;
          that.setData({
            carouselList: resultArr
          })
        }
      })
    },
  //活动信息
  baominginfo(e) {
    var that = this;//注意this指向性问题
    var urlStr = "https://axure.xinice.com/index.php/index/index/baominginfo"; //请求连接注意替换（我用本地服务器模拟）
    // console.log("请求轮播图：" + urlStr);
    wx.request({
      url: urlStr,
      data: {//这里放请求参数，如果传入参数值不是String，会被转换成String 
        x: e,
        // y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("轮播图返回值：");
        console.log(res.data.result);
        var resultArr = res.data.result;
        that.setData({
          carouselList: resultArr
        })
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