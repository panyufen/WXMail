let baseUrl = "https://api.it120.cc/panyufen";
App({

    api: {
        //api工厂获取用户token
        "getUserToken": baseUrl + "/user/wxapp/login",
        //
        "getUserAccountInfo": baseUrl + "/user/wxinfo",
        //通过微信临时code 注册账号
        "registUser": baseUrl + "/user/wxapp/register/complex",
        //获取分类列表
        "goodsCategory": baseUrl + "/shop/goods/category/all",
        //获取商品列表
        "goodsList": baseUrl + "/shop/goods/list",
        //获取商品详情
        "goodsDetail": baseUrl + "/shop/goods/detail",


        //获取收货地址
        "getAddressList": baseUrl + "/user/shipping-address/list",
        //获取默认收货地址
        "getDefaultAddress": baseUrl + "/user/shipping-address/default",
        //获取收获地址详情
        "getAddressDetail": baseUrl + "/user/shipping-address/detail",
        //添加收获地址
        "addAddress": baseUrl + "/user/shipping-address/add",
        //删除收获地址
        "delAddress": baseUrl + "/user/shipping-address/delete",
        //修改收获地址
        "editAddress": baseUrl + "/user/shipping-address/update",


		










    },
    handleRes: function(res) {
        console.log(res);
        if (res.data.code === 0) {
            return true;
        }
        return false;
    },


    onLaunch: function() {
        console.log('App Launch')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false
    }




})