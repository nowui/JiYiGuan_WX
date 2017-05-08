const constant = require("./util/constant.js");
const wechat = require("./util/wechat.js");

App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: function (res) {
        this.globalData.window_width = res.windowWidth;
        this.globalData.window_height = res.windowHeight;
      }.bind(this)
    });

    wechat.auth({
        success: function (data) {
            // getApp().globalData.userInfo = userInfo;
            // getApp().globalData.open_id = data.openid;
            //
            // storage.setToken(data.token);
        }
    });

  },
  globalData: {
    userInfo: {},
    window_width: 0,
    window_height: 0,
    open_id: ''
  }
})