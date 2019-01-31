let app = getApp();

Page({
    data: {
        category: [],
        goodsList: [],
        curIndex: 0,
        isScroll: false,
        toViewId: 'guowei'
    },

    onReady() {
        let self = this;
        wx.request({
            url: app.api.goodsCategory,
            success(res) {
                // self.setData({
                //     detail : res.data
                // })
                if (app.handleRes(res)) {
                    let category = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        let cateObj = {
                            "name": res.data.data[i].name,
                            "id": res.data.data[i].id
                        };
                        category[i] = cateObj;
                    }
                    self.setData({
                        category: category
                    })
                    //请求默认category的商品列表数据
                    self.getGoodsList(category[0].id);
                }
            }
        });
    },
    switchTab(e) {
        const self = this;
        this.setData({
            isScroll: true
        })
        setTimeout(function() {
            self.setData({
                toViewId: e.target.dataset.id,
                curIndex: e.target.dataset.index
            })
        }, 0)
        setTimeout(function() {
            self.setData({
                isScroll: false
            })
        }, 1)
        console.log(e.target.dataset.id);

        self.getGoodsList(e.target.dataset.id.substr(1));

    },
    getGoodsList(cateid) {
        const self = this;
        wx.request({
            url: app.api.goodsList + "?categoryId=" + cateid,
            success(res) {
                if (app.handleRes(res)) {
                    let goodsList = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        let detail = res.data.data[i];
                        console.log(detail);
                        goodsList[i] = {
                            "id": detail.id,
                            "pic": detail.pic,
                            "name": detail.name,
                            "weight": detail.weight,
                            "price": detail.minPrice
                        }
                    }
                    self.setData({
                        goodsList: goodsList
                    })
                    console.log(self.data.goodsList);
                } else {
                    self.setData({
                        goodsList: []
                    })
                }
            }
        });
    }
})