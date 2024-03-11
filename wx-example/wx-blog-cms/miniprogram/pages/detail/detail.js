// miniprogram/pages/detail/detail.js
Page({
  data: {
    
  },
  onLoad: function (options) {
    this.getDetailData(options.articleid)
  },
  getDetailData(id) {
    const that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'article',
      data: {
        action: 'getArticleDetail',
        articleId: id
      },
      success: res => {
        console.log('[云函数] [article] 调用成功: ', res.result)
        that.setData({
          detailData: {
            ...res.result.data,
            formateTime: new Date(res.result.data._updateTime).toLocaleString()
          }
        })
        that.editorCtx.setContents({
          html: res.result.data.content
        })
      },
      fail: err => {
        console.error('[云函数] [article] 调用失败', err)
      }
    })
  },
  onEditorReady() { // 富文本初始化
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
})