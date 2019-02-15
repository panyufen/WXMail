let app = getApp();
Page({
    data: {
        list: [],
        extraList: [],
        indicatorDots: false,
        autoplay: false,
        interval: 3000,
        duration: 800,
    },
	getDataList(func) {
		let self = this;
		wx.request({
			url: app.api.goodsList + "?recommendStatus=1",
			success(res) {
				if (app.handleRes(res)) {
					let list = [];
					//最多显示6条
					let max = 6,
						dataLen = res.data.data.length;
					max = max < dataLen ? max : dataLen;
					for (let i = 0; i < dataLen; i++) {
						let obj = {
							"name": res.data.data[i].name,
							"id": res.data.data[i].id,
							"img": res.data.data[i].pic
						};
						list[i] = obj;
					}
					console.log("list");
					console.log(list);
					self.setData({
						list: list
					})
					if (func != undefined) {
						func();
					}
				}
			}
		});
		wx.request({
			url: app.api.goodsList + "?orderBy=addedUp&recommendStatus=0",
			success(res) {
				if (app.handleRes(res)) {
					let extraList = [];
					let dataLen = res.data.data.length;
					for (let i = 0; i < dataLen; i++) {
						let obj = {
							"name": res.data.data[i].name,
							"id": res.data.data[i].id,
							"img": res.data.data[i].pic,
							"weight": res.data.data[i].weight,
							"price": res.data.data[i].minPrice
						};
						extraList[i] = obj;
					}
					console.log("extraList");
					console.log(extraList);
					self.setData({
						extraList: extraList
					})
					if (func != undefined) {
						func();
					}
				}
			}
		});
	},
    onReady() {
        this.getDataList();
    },
    onPullDownRefresh() {
        wx.showNavigationBarLoading();
        this.getDataList(function(){
			wx.hideNavigationBarLoading();
			wx.stopPullDownRefresh();
		});
	}
	
})