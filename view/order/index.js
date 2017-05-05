const constant = require("../../util/constant.js");
const http = require("../../util/http.js");

Page({
    data: {
        order_status_list: constant.order_status_list,
        window_width: getApp().globalData.window_width,
        slider_offset: 0,
        slider_left: 0,
        slider_width: 0,
        list: [],
        order_flow: '',
        order_list: []
    },
    onUnload: function () {

    },
    onLoad: function (option) {
        http.request({
            url: '/order/list',
            data: {
                page_index: 0,
                page_size: 0
            },
            success: function (data) {
                var order_list = [];

                for (var i = 0; i < data.length; i++) {
                    if (data[i].order_flow == option.order_flow || option.order_flow == 'ALL') {
                        order_list.push(data[i]);
                    }
                }

                var index = 0;
                for (var i = 0; i < this.data.order_status_list.length; i++) {
                    if (option.order_flow == this.data.order_status_list[i].order_status_value) {
                        index = i;

                        break;
                    }
                }

                var slider_width = this.data.window_width / this.data.order_status_list.length;

                this.setData({
                    slider_left: 0,
                    slider_offset: slider_width * index,
                    slider_width: slider_width,
                    list: data,
                    order_flow: option.order_flow,
                    order_list: order_list
                });
            }.bind(this)
        });
    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    },
    handleTab: function (event) {
        var order_flow = event.currentTarget.id;
        var order_list = [];

        for (var i = 0; i < this.data.list.length; i++) {
            if (this.data.list[i].order_flow == order_flow || order_flow == 'ALL') {
                order_list.push(this.data.list[i]);
            }
        }

        this.setData({
            slider_offset: event.currentTarget.offsetLeft,
            order_flow: order_flow,
            order_list: order_list
        });
    }
});
