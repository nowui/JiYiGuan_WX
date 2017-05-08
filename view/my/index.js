const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
    data: {
        color: constant.color,
        member_total_amount: parseFloat(0).toFixed(2),
        WAIT_PAY: 0,
        WAIT_SEND: 0,
        WAIT_RECEIVE: 0
    },
    onUnload: function () {

    },
    onLoad: function () {
        this.setData({
            userInfo: getApp().globalData.userInfo
        });

        
    },
    onReady: function () {

    },
    onShow: function () {
        this.handleLoad();
    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    handleLoad: function () {
        http.request({
            is_toast: false,
            url: '/member/my/find',
            data: {

            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i].product_image_file = constant.host + data[i].product_image_file;
                    data[i].product_price = data[i].product_price.toFixed(2);
                }

                this.setData({
                    member_total_amount: data.member_total_amount,
                    WAIT_PAY: data.WAIT_PAY,
                    WAIT_SEND: data.WAIT_SEND,
                    WAIT_RECEIVE: data.WAIT_RECEIVE
                });
            }.bind(this)
        });
    }
});
