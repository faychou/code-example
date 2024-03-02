const db = wx.cloud.database();

Page({
  data: {
    id: '',
    title: '',
    body: '',
    cIndex: 0,
    cList: []
  },
  onLoad(options) {
    console.log('本次要更新的数据id', options.id);

    // 获取数据库最新的数据填入页面模板
    db.collection('notes').doc(options.id).get()
    .then(res => {
      console.log('查询到的详情数据：', res);

      this.setData({
        id: options.id,
        title: res.data.title,
        body: res.data.body
      })
    })
    .catch(err => {
      console.log('查询失败：', err);
    })

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
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cIndex: e.detail.value
    })
  },
  submitNote() {
    const data = {
      title: this.data.title,
      body: this.data.body,
      cid: this.data.cList[this.data.cIndex]['_id']
    }
    const id = this.data.id;
    console.log(data);

    // 向数据库更新内容
    db.collection('notes').doc(id).update({
      data: {
        ...data
      }
    })
      .then(res => {
        console.log('调用更新数据成功：', res);

        wx.showToast({
          title: '数据更新成功',
        });

        // 清空输入框的内容
        this.setData({
          id: '',
          title: '',
          body: ''
        })

        wx.reLaunch({
          url: '../detail/detail?id=' + id,
        })
      }) 
      .catch(err => {
        console.log('调用更新数据失败：', err);
      })
  }
})