//index.js
const app = getApp()

Page({
  data: {
    listData: []
  },
  onLoad: function() {
    this.onGetArticleList()
  },

  onGetArticleList: function() { // 获取所有文章列表
    const that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'article',
      data: {
        action: 'getArticleListData'
      },
      success: res => {
        console.log('[云函数] [article] 调用成功: ', res.result)
        that.setData({
          listData: res.result.data
        })
      },
      fail: err => {
        console.error('[云函数] [article] 调用失败', err)
      }
    })
  },
})