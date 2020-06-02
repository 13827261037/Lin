


//遮蔽层禁止滑动
function noneEnoughPeople() {
        console.log('遮蔽层禁止滑动');
}

//url->图片
function getImageInfo(url) {
        return new Promise((resolve, reject) => {
                wx.getImageInfo({
                        src: url,
                        success: resolve,
                        fail: reject,
                })
        })
}




function createRpx2px() {
  const { windowWidth } = wx.getSystemInfoSync()

  return function(rpx) {
    return windowWidth / 750 * rpx
  }
}
const rpx2px = createRpx2px()
function canvasToTempFilePath(option, context) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      ...option,
      success: resolve,
      fail: reject,
    }, context)
  })
}
function saveImageToPhotosAlbum(option) {
  return new Promise((resolve, reject) => {
    wx.saveImageToPhotosAlbum({
      ...option,
      success: resolve,
      fail: reject,
    })
  })
}




Component({
        

        //不知道这是干嘛的
        properties: {
                visible: {
                        type: Boolean,
                        value: false,
                        observer(visible) {
                                if (visible && !this.beginDraw) {
                                        this.draw()
                                        this.beginDraw = true
                                }
                        }
                },
                userInfo: {
                        type: Object,
                        value: false
                }
        },

        data: {

                beginDraw: false,
                isDraw: false,

                canvasWidth: 720,
                canvasHeight: 720,

                imageFile: '',

                responsiveScale: 1,

                vo22_tf: false,
        },

        // lifetimes: {
        //         ready() {
        //                 const designWidth = 375
        //                 const designHeight = 603 
        //                 const { windowWidth, windowHeight } = wx.getSystemInfoSync()
        //                 const responsiveScale = windowHeight / ((windowWidth / designWidth) * designHeight)
        //                 if (responsiveScale < 1) {
        //                         this.setData({
        //                                 responsiveScale,
        //                         })
        //                 }
        //         },
        // },

        methods: {

        
                handleClose() {
                        this.triggerEvent('close')
                        this.setData({vo22_tf : false })
                },

                inbtn:function(e){   
                        // 点击父系关闭，子系正常
                        console.log("in")
                },

                vvs2() {this.setData({vo22_tf : true })},
                
                //分享朋友圈事件
                handleSave() {

                        

                        const { imageFile } = this.data

                        if ( imageFile ) {

                                //图片保存到本地
                                wx.saveImageToPhotosAlbum({
                                        filePath: imageFile,
                                        success: function (data) {
                                                wx.hideLoading()
                                                wx.showModal({
                                                        title: '提示',
                                                        content: '图片已保存至相册,记得分享朋友圈哦~',
                                                        showCancel: false,
                                                })
                                        },
                                        fail: function (err) {
                                                if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                                                        // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                                                        wx.showModal({
                                                                title: '提示',
                                                                content: '需要您授权保存图片到相册',
                                                                showCancel: false,
                                                                success: modalSuccess => {
                                                                        wx.openSetting({
                                                                                success(settingdata) {
                                                                                        console.log("settingdata", settingdata)
                                                                                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                                                                                wx.showModal({
                                                                                                        title: '提示',
                                                                                                        content: '获取权限成功',
                                                                                                        showCancel: false,
                                                                                                })
                                                                                        } else {
                                                                                                wx.showModal({
                                                                                                        title: '提示',
                                                                                                        content: '获取权限失败',
                                                                                                        showCancel: false,
                                                                                                })
                                                                                        }
                                                                                },
                                                                                fail(failData) {
                                                                                        console.log("failData", failData)
                                                                                },
                                                                                complete(finishData) {
                                                                                        console.log("finishData", finishData)
                                                                                }
                                                                        })
                                                                }
                                                        })
                                                }
                                        },
                                        complete(res) {
                                                wx.hideLoading()
                                        }
                                })
                        }
                },
                
                // 制作图片
                draw() {

                        //二维码地址
                        let imgUrls2 = wx.getStorageSync("imgUrls2");
                        //用户名称头像
                        let userInfo2 = wx.getStorageSync("userInfo2");
                        //输入的内容
                        let a2 = wx.getStorageSync("a2");
                        // var yy = "“" + a2 + "”";
                        //新增
                        var coup_money = wx.getStorageSync("coup_money");
                        var merchname = wx.getStorageSync("merchname");
                        var coupon_individual = wx.getStorageSync("coupon_individual");
                  
                        // 等待框
                        wx.showLoading()


                        const { canvasWidth, canvasHeight } = this.data
                        const { avatarUrl, nickName } = userInfo2
                        const avatarUrlPromise = getImageInfo(avatarUrl)
                        const avatarPromise = getImageInfo(imgUrls2)
                        // const backgroundPromise = getImageInfo('https://axure.xinice.com/static/projects/HXBN/imgs/fxd720.png')
                         const backgroundPromise = getImageInfo('https://axure.xinice.com/static/projects/HXBN/imgs/pg37.jpg')

                        Promise.all([avatarPromise, backgroundPromise, avatarUrlPromise])
                                .then(([avatar, background, avatarUrl]) => {

                                const ctx = wx.createCanvasContext('share', this)

                                const canvasW = rpx2px(canvasWidth * 2)
                                const canvasH = rpx2px(canvasHeight * 2)

                                // 绘制背景
                                ctx.drawImage(
                                        background.path,
                                        0,
                                        0,
                                        canvasW,
                                        canvasH,
                                )
                                const radius = rpx2px(100)
 // 2020 05 28 添加
                                  // 绘制二维码
                                  ctx.drawImage(
                                    avatar.path,
                                    radius * 4.1,
                                    radius * 8.8,
                                    radius * 2.4,
                                    radius * 2.4,
                                  )

                                  //金额
                                  ctx.setFontSize(120)
                                  ctx.textAlign = "center";
                                  ctx.setFillStyle('#F22D4D')
                                  ctx.fillText(
                                          coup_money,
                                          radius * 7.3,
                                          radius * 5.2,
                                  )
                                  

                                  //商户名称
                                  ctx.setFontSize(45)
                                  ctx.textAlign = "center";
                                  ctx.setFillStyle('#FFFFFF')
                                  ctx.fillText(
                                    merchname,
                                    radius * 7.3,
                                    radius * 1.6,
                                  )

                                  //
                                  //限制多少张
                                  ctx.setFontSize(45)
                                  ctx.textAlign = "center";
                                  ctx.setFillStyle('#FFFFFF')
                                  ctx.fillText(
                                    '仅'+coupon_individual+'张',
                                    radius * 9,
                                    radius * 9.6,
                                  )
    // 2020 05 28 注释
                                // // 绘制二维码
                                // ctx.drawImage(
                                //         avatar.path,
                                //         radius * 11.6,
                                //         radius * 11.8,
                                //         radius * 2.4,
                                //         radius * 2.4,
                                // )
                                // 广告
                                // ctx.setFontSize(40)
                                // ctx.setFillStyle('#ffffff')
                                // ctx.fillText(
                                //         '我为',
                                //         radius * 0.8,
                                //         radius * 13.6,
                                // )
                                // ctx.setFontSize(40)
                                // ctx.setFillStyle('#FFE2BA')
                                // ctx.fillText(
                                //         '浩信百年',
                                //         radius * 2.4,
                                //         radius * 13.6,
                                // )
                                // ctx.setFontSize(40)
                                // ctx.setFillStyle('#ffffff')
                                // ctx.fillText(
                                //         '代言~',
                                //         radius * 5.4,
                                //         radius * 13.6,
                                // )

                                // // 绘制头像
                                // ctx.drawImage(
                                //         avatarUrl.path,
                                //         radius * 0.7,
                                //         radius * 9,
                                //         radius * 1.8,
                                //         radius * 1.8,
                                // )
                              
                                // 输入的内容
                                // ctx.setFontSize(24)
                                // ctx.setFillStyle('#FFE2BA')
                                // ctx.fillText(
                                //         yy,
                                //         radius * 0.4,
                                //         radius * 11.5,
                                // )

                                // //名称前横杠
                                // ctx.setFontSize(26)
                                // ctx.setFillStyle('#ffffff')
                                // ctx.fillText(
                                //         "——",
                                //         radius * 0.8,
                                //         radius * 12.2,
                                // )

                                // //名字
                                // ctx.setFontSize(22)
                                // ctx.setFillStyle('#ffffff')
                                // ctx.fillText(
                                //         nickName,
                                //         radius * 2,
                                //         radius * 12.2,
                                // )
                                

                                // // 绘制头像
                                // const radius = rpx2px(90 * 2)
                                // const y = rpx2px(120 * 2)
                                // ctx.drawImage(
                                //         avatarUrl.path,
                                //         canvasW / 2 - radius,
                                //         y - radius,
                                //         radius * 2,
                                //         radius * 2,
                                // )

                                // // 绘制用户名
                                // ctx.setFontSize(60)
                                // ctx.setTextAlign('center')
                                // ctx.setFillStyle('#ffffff')
                                // ctx.fillText(
                                //   nickName,
                                //   canvasW / 2,
                                //   y + rpx2px(150 * 2),
                                // )

                                ctx.stroke()

                                ctx.draw(false, () => {
                                        canvasToTempFilePath({
                                        canvasId: 'share',
                                        }, this).then(({ tempFilePath }) => this.setData({ imageFile: tempFilePath }))
                                })

                                wx.hideLoading()
                                this.setData({ isDraw: true })
                        })
                        .catch(() => {
                                this.setData({ beginDraw: false })
                                wx.hideLoading()
                        })
                }
        }


})