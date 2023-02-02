// miniprogram/pages/collection/collection.js
Page({
  data: {

  },
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'note',
      data: {
        type: 'favorList'
      },
      success: function(res) {
        console.log('收藏表：', res.result)
      },
      fail: function(err) {
        console.log(err)
      }
    })
  }
})