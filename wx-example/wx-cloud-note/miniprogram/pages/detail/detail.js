// pages/detail/detail.js
Page({
  data: {
    note: null,
    isFavor: false
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
        console.log(res.result)
        that.setData({
          note: res.result.data
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })

    wx.cloud.callFunction({
      name: 'note',
      data: {
        type: 'getFavor',
        id
      },
      success: function(res) {
        console.log(res.result)
        that.setData({
          isFavor: res.result.isFavor
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  delNote: function() {
    wx.cloud.callFunction({
      name: 'note',
      data: {
        type: 'del',
        id: this.data.note._id
      },
      success: function(res) {
        console.log(res)

        wx.showToast({
          title: '删除成功',
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
  },
  toEdit: function() {
    wx.navigateTo({
      url: '/pages/edit/edit?id=' + this.data.note._id,
    })
  },
  addFavor: function() {
    const that = this

    wx.cloud.callFunction({
      name: 'note',
      data: {
        type: 'addFavor',
        id: that.data.note._id
      },
      success: function(res) {
        console.log('收藏：', res)
        that.setData({
          isFavor: true
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  cancelFavor: function() {
    const that = this

    wx.cloud.callFunction({
      name: 'note',
      data: {
        type: 'cancelFavor',
        id: that.data.note._id
      },
      success: function(res) {
        console.log('取消收藏：', res)
        that.setData({
          isFavor: false
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  onShareAppMessage: function () {

  }
})