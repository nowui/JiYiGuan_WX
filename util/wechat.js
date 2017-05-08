const constant = require("./constant.js");
const http = require("./http.js");
const storage = require("./storage.js");

function auth(config) {
    var token = storage.getToken();
    if (token == '') {
        wx.login({
            success: function (res) {
                var code = res.code;
                if (code) {
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res.userInfo.nickName);

                            http.request({
                                url: '/wechat/api/openid?js_code=' + code + '&encrypted_data=' + res.encryptedData + '&iv=' + res.iv + '&avatar_url=' + res.userInfo.avatarUrl + '&nick_name=' + res.userInfo.nickName + '&platform=' + constant.platform + '&version=' + constant.version,
                                method: 'GET',
                                data: {

                                },
                                success: function (data) {
                                    config.success(data);
                                }.bind(this)
                            });
                        }.bind(this)
                    });

                }
            }.bind(this)
        });
    } else {
        //config.success();
    }


}

module.exports = {
    auth: auth
};