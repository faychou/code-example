
Page({
  data: {
    cList: []
  },
  onLoad() {
    // 思考这里为什么不直接在小程序操作数据库？
    wx.cloud.callFunction({
      name: 'category',
      data: {
        type: 'getCList'
      },
    })
    .then(res => {
      console.log('获取的数据：', res);
      this.setData({
        cList: res.result.data.data
      })
    })
    .catch(err => {
      console.log('操作失败：', err);
    })
  }
})