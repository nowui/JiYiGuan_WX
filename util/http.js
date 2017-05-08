const constant = require("./constant.js");
const storage = require("./storage.js");
const util = require("./util.js");

function request(config) {
    if (typeof (config.is_toast) == 'undefined') {
        config.is_toast = true;
    }

    if (typeof (config.method) == 'undefined') {
        config.method = 'POST';
    }

    if (config.is_toast) {
        wx.showToast({
            title: '加载中..',
            icon: 'loading',
            mask: true,
            duration: constant.duration * 10
        });
    }

    wx.request({
        url: 'https://api.nowui.com' + config.url,
        method: config.method,
        header: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            // 'Token': storage.getToken(),
            'Platform': constant.platform,
            'Version': constant.version,
            'Project': 'jiyiguan'
        },
        data: config.data,
        success: function (response) {
            if (config.is_toast) {
                wx.hideToast();
            }

            if (response.data.code == 200) {
                config.success(response.data.data);
            } else {
                util.showFailToast({
                    title: response.data.message
                });
            }
        },
        fail: function () {
            if (config.is_toast) {
                wx.hideToast();
            }

            util.showFailToast({
                title: '网络出现错误'
            });
        }
    });
}

module.exports = {
    request: request
};