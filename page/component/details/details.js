// page/component/details/details.js
var WxParse = require('../wxParse/wxParse.js');
let app = getApp();
Page({
    data: {
        goods: {},
        num: 1,
        totalNum: 0,
        hasCarts: false,
        curIndex: 0,
        show: false,
        scaleCart: false
    },
    onLoad: function(option) {
		let self = this;
		if( option.id === undefined ){
			return;
		}
        wx.request({
			url: app.api.goodsDetail + "?id=" + option.id,
            success(res) {
                if (app.handleRes(res)) {
					let basicInfo = res.data.data.basicInfo;
					let goods = {
						id: basicInfo.id,
						image: basicInfo.pic,
						title:basicInfo.name,
						parameter:basicInfo.weight+"Kg",
						service:"消耗品 不支持退货",
						stock:basicInfo.stores,
						price:basicInfo.minPrice
					}
					self.setData({
						goods:goods
					})     
					WxParse.wxParse('detail', 'html', res.data.data.content, self, 0);
                }
            }
        });
    },
    addCount() {
        let num = this.data.num;
        num++;
        this.setData({
            num: num
        })
    },
    subCount() {
        let num = this.data.num;
        num--;
        this.setData({
            num: num
        })
    },

    addToCart() {
        const self = this;
        const num = this.data.num;
        let total = this.data.totalNum;

        self.setData({
            show: true
        })
        setTimeout(function() {
            self.setData({
                show: false,
                scaleCart: true
            })
            setTimeout(function() {
                self.setData({
                    scaleCart: false,
                    hasCarts: true,
                    totalNum: num + total
                })
            }, 200)
        }, 300)

    },

    bindTap(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        this.setData({
            curIndex: index
        })
    }

})