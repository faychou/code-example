// pages/categorylist/categorylist.js
const db = wx.cloud.database();

Page({
  data: {
    noteList: []
  },
  onLoad(options) {
    console.log('分类ID：', options.cid);

    db.collection('notes')
    .orderBy('created_at', 'desc')
    .where({
      cid: options.cid
    })
    .field({
      // 指定返回某些字段，默认返回 _id
      title: true,
      created_at: true
    })
      .get()
      .then(res => {
        console.log('数据库读取成功返回的信息：', res)

        const noteListTem = res.data.map(item => {
          let d = new Date(item.created_at);
          let y = d.getFullYear();
          let m = d.getMonth() + 1;
          let dd = d.getDate();
          item.time = y + '年' + m + '月' + dd + '日';
          return item;
        });

        this.setData({
          noteList: noteListTem
        })
      })
      .catch(err => {
        console.log('数据库读取失败：', err)
      })
  },
  onShow() {

  }
})