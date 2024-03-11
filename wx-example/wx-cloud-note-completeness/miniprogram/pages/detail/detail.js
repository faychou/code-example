// pages/detail/detail.js
const db = wx.cloud.database();

Page({
  data: {
    note: {}
  },
  onLoad(options) {
    console.log('options: ', options);

    // db.collection('notes').doc(options.id).get()
    // .then(res => {
    //   console.log('查询到的详情数据：', res);

    //   const note = res.data;
    //   if(res.data && res.data.created_at) {
    //     let d = new Date(res.data.created_at);
    //     let y = d.getFullYear();
    //     let m = d.getMonth() + 1;
    //     let dd = d.getDate();

    //     this.setData({
    //       note: {
    //         ...note,
    //         time: y + '年' + m + '月' + dd + '日'
    //       }
    //     })
    //   }
    // })
    // .catch(err => {
    //   console.log('查询失败：', err);
    // })

    // 聚合
    wx.cloud.callFunction({
      name: 'note',
      data: {
        type: 'getDetail',
        id: options.id
      }
    })
      .then(res => {
        console.log('聚合成功', res)

          const list = res.result.data.list;
          if(list && list.length > 0 && list[0].created_at) {
            let d = new Date(list[0].created_at);
            let y = d.getFullYear();
            let m = d.getMonth() + 1;
            let dd = d.getDate();

            this.setData({
              note: {
                ...list[0],
                time: y + '年' + m + '月' + dd + '日'
              }
            })
          }
      })
      .catch(err => {
        console.log('聚合失败', err)
      })
  },
  // 删除
  delHandler: function() {
    wx.showModal({
      title: '警告',
      content: '您确认删除该条数据吗？',
      complete: (res) => {
        if (res.confirm) {
          db.collection('notes').doc(this.data.note._id).remove()
          .then(res => {
            console.log('删除结果：', res);

            if(res.stats.removed == 1) {
              wx.showToast({
                title: '删除成功',
                success: () => {
                  wx.reLaunch({
                    url: '../index/index',
                  })
                }
              })
            }
          })
          .catch(err => {
            console.error(err);
          })
        }
      }
    })
  }
})