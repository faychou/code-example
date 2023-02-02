// pages/edit/edit.js
Page({
  data: {
    id: '',
    title: '',
    body: ''
  },
  onLoad: function (options) {
    const id = options.id
    const that =this

    wx.cloud.callFunction({
      name: 'note',
      data: {
        type: 'get',
        id
      },
      success: function(res) {
        console.log(res.result.data)
        that.setData({
          id: res.result.data._id,
          title: res.result.data.title,
          body: res.result.data.body,
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  cancelNote: function() {
    wx.navigateBack()
  },
  submitNote: function() {
    const that = this

    wx.cloud.callFunction({
      name: 'note',
      data: {
        type: 'edit',
        id: this.data.id,
        title: this.data.title,
        body: this.data.body
      },
      success: function(res) {
        console.log(res)

        wx.showToast({
          title: '修改成功',
          icon: 'success',
          success: function() {
            wx.reLaunch({
              url: '/pages/detail/detail?id=' + that.data.id,
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