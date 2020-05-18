

Page({
        data: {
                damoHeight: '150',//demo高度
                imgUrls: [//图片地址
                        {
                                url: 'https://axure.xinice.com/static/projects/HXBN/imgs/BB_01.jpg'
                        }, 
                        {
                                url: 'https://axure.xinice.com/static/projects/HXBN/imgs/BB_02.jpg'
                        },
                        {
                                url: 'https://axure.xinice.com/static/projects/HXBN/imgs/BB_03.jpg'
                        },
                        {
                                url: 'https://axure.xinice.com/static/projects/HXBN/imgs/BB_04.jpg'
                        }
                ],
                arry: [false, false, false, false],

        },
        onPageScroll: function (res) {
                var _this = this;
                var str = parseInt(res.scrollTop / _this.data.damoHeight);
                _this.data.arry[str] = true;
                _this.setData({
                        arry: _this.data.arry
                })
        },
        onLoad: function () {
                let _this = this;
                let num = Math.ceil(wx.getSystemInfoSync().windowHeight / 300);
                for (let i = 0; i < num; i++) {
                        _this.data.arry[i] = true;
                };
                this.setData({
                        arry: _this.data.arry
                })
        }
})