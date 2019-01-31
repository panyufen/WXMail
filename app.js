let baseUrl = "https://api.it120.cc/panyufen/";
App({

  "api": {
    "goodsCategory": baseUrl + "shop/goods/category/all",
    "goodsList": baseUrl + "shop/goods/list",
    "goodsDetail": baseUrl + "shop/goods/detail"

  
  },
  handleRes: function (res) {
    console.log(res);
    if (res.data.code===0 ){
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