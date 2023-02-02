// pages/add/add.js
Page({
  data: {
    title: "",
    body: ""
  },
  onLoad: function (options) { },
  submitNote: function() {
    const that = this

    wx.cloud.callFunction({
      name: 'note',
      data: {
        type: 'add',
        title: this.data.title,
        body: this.data.body
      },
      success: function(res) {
        console.log(res)
        that.setData({
          title: '',
          body: ''
        })

        wx.showToast({
          title: '添加成功',
          icon: 'success',
          success: function() {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  }
})