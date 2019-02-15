const app = getApp();
Page({
    data: {
        isShowReqUserInfo: true,
        thumb: '',
        nickname: '',
        orders: [],
        hasAddress: false,
        address: {}
    },
    login() {
        const self = this;
        wx.login({
            success(res) {
                console.log(res);
                if (res.code) {
                    // 发起网络请求
                    wx.request({
                        url: app.api.getUserToken,
                        method: "POST",
                        data: {
                            code: res.code,
                            type: 2
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function(resp) {
							console.log(resp);

							console.log(resp.data.code);
							console.log(resp.data.code == 10000);


                            if (resp.data.code == 10000) {
                                // 去注册
                                self.registerUser();
                                return;
                            }
                            if (resp.data.code != 0) {
                                // 登录错误
                                wx.hideLoading();
                                wx.showModal({
                                    title: '提示',
                                    content: '无法登录，请重试',
                                    showCancel: false
                                })
                                return;
                            }
							console.log("获取token成功" + resp.data.data.token);
							wx.setStorageSync('token', resp.data.data.token)
							wx.setStorageSync('uid', resp.data.data.uid)
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },
    registerUser: function() {
		let self = this;
		console.log("go to register");
		wx.login({
			success(loginRes) {
				console.log(loginRes);
				if (loginRes.code) {
					wx.getUserInfo({
						success: function (res) {
							console.log(res);
							let iv = res.iv;
							let encryptedData = res.encryptedData;
							// 发起网络请求
							wx.request({
								url: app.api.registUser,
								method: "POST",
								data: {
									code: loginRes.code,
									encryptedData: encryptedData,
									iv: iv,
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success: function (resp) {
									console.log(resp);
								}
							});
						}
					})
				}
			}
		});

        
        
    },
    onLoad() {
        this.login();
        var self = this;
        /**
         * 获取用户信息
         */
        wx.getUserInfo({
            success: function(res) {
                self.setData({
                    isShowReqUserInfo: false,
                    thumb: res.userInfo.avatarUrl,
                    nickname: res.userInfo.nickName
                })
            }
        });

        /**
         * 发起请求获取订单列表信息
         */
        // wx.request({
        //     url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
        //     success(res) {
        //         self.setData({
        //             orders: res.data
        //         })
        //     }
        // })
    },
    onShow() {
        var self = this;
        /**
         * 获取本地缓存 地址信息
         */
        wx.getStorage({
            key: 'address',
            success: function(res) {
                self.setData({
                    hasAddress: true,
                    address: res.data
                })
            }
        })
    },
    onGotUserInfo(info) {
        console.log(info);
        let userInfo = info.detail.userInfo;
        this.setData({
            isShowReqUserInfo: false,
            thumb: userInfo.avatarUrl,
            nickname: userInfo.nickName
        })
    },
    /**
     * 发起支付请求
     */
    payOrders() {
        wx.requestPayment({
            timeStamp: 'String1',
            nonceStr: 'String2',
            package: 'String3',
            signType: 'MD5',
            paySign: 'String4',
            success: function(res) {
                console.log(res)
            },
            fail: function(res) {
                wx.showModal({
                    title: '支付提示',
                    content: '<text>',
                    showCancel: false
                })
            }
        })
    }
})