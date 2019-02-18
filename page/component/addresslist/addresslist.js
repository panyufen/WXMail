const app = getApp()
Page({
	data: {
		addressList: []
	},

	selectTap: function (e) {
		var id = e.currentTarget.dataset.id;
		wx.request({
			url: app.api.editAddress,
			method: "post",
			data: {
				token: wx.getStorageSync('token'),
				id:id,
				isDefault:"true"

			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function (resp) {
				wx.navigateBack({});
			}
		});
	},

	addAddess: function () {
		wx.navigateTo({
			url: "/page/component/address/address"
		})
	},

	editAddess: function (e) {
		wx.navigateTo({
			url: "/page/component/address/address?id=" + e.currentTarget.dataset.id
		})
	},

	onLoad: function () {
		console.log('onLoad')


	},
	onShow: function () {
		this.initShippingAddress();
	},
	initShippingAddress: function () {
		var self = this;
		// 发起网络请求
		wx.request({
			url: app.api.getAddressList,
			method: "get",
			data: {
				token: wx.getStorageSync('token')
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function (res) {
				console.log("addressList reuslt");
				console.log(res);
				if (res.data.code == 0) {
					self.setData({
						addressList: res.data.data
					});
				} else if (res.data.code == 700) {
					self.setData({
						addressList: null
					});
				}
			}
		});
	}

})