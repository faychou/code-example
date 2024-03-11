/*
  1、云函数
    一段运行在云端的代码，不需要服务器，只需要在开发工具里编写好了之后直接上传到云端进行运行。

    小程序端（客户端）
    云函数（后端服务器）：技术 -- js，基于 nodejs 的环境；
    云数据库（数据库）
*/

//index.js
const app = getApp()

// 获取数据库引用
const db = wx.cloud.database();

Page({
  data: {
    noteList: [],
    currentPage: 1, // 当前页码
    pageSize: 5, // 每页展示数据数量
    hasMoreData: false // 判断是否还有数据
  },
  onLoad: function() {
    this.getData(1);
    // let that = this
    // 调用云函数：类似请求
    // wx.cloud.callFunction({
    //   name: 'note', // 云函数名字
    //   data: { // 给云函数传递的参数
    //     type: 'getListNote'
    //   },
    //   success: function(res) {
    //     console.log('调用云函数成功：', res.result.data.data)

        // const noteList = res.result.data.data.map(item => {
        //   let d = new Date(item.created_at);
        //   let y = d.getFullYear();
        //   let m = d.getMonth() + 1;
        //   let dd = d.getDate();
        //   item.time = y + '年' + m + '月' + dd + '日';
        //   return item;
        // })

        // that.setData({
        //   noteList
        // })
    //   },
    //   fail: function(err) {
    //     console.log('获取列表失败：', err)
    //   }
    // })

    // 调用云函数也支持 promise 的写法
    // wx.cloud.callFunction({
    //   name: 'note',
    //   data: {}
    // })
    // .then()

    // 小程序直接读取数据库
    // const _ = db.command
    // const t = new Date('2023-12-18');
    // db.collection('notes')
    // .where({
      // tab: _.in(['money']),
      // created_at: _.gt(t)
    // })
    // .orderBy('created_at', 'desc')
    // .skip(1)
    // .limit(2)
    //   .get()
    //   .then(res => {
    //     console.log('数据库读取成功返回的信息：', res)

    //     const noteList = res.data.map(item => {
    //       let d = new Date(item.created_at);
    //       let y = d.getFullYear();
    //       let m = d.getMonth() + 1;
    //       let dd = d.getDate();
    //       item.time = y + '年' + m + '月' + dd + '日';
    //       return item;
    //     })

    //     this.setData({
    //       noteList
    //     })
    //   })
    //   .catch(err => {
    //     console.log('数据库读取失败：', err)
    //   })
  },
  // onShow: function() {
  //   let that = this
  //   // 调用云函数：类似请求
  //   wx.cloud.callFunction({
  //     name: 'note', // 云函数名字
  //     data: { // 给云函数传递的参数
  //       type: 'getListNote'
  //     },
  //     success: function(res) {
  //       console.log('调用云函数成功：', res.result.data.data)

  //       const noteList = res.result.data.data.map(item => {
  //         let d = new Date(item.created_at);
  //         let y = d.getFullYear();
  //         let m = d.getMonth() + 1;
  //         let dd = d.getDate();
  //         item.time = y + '年' + m + '月' + dd + '日';
  //         return item;
  //       })

  //       that.setData({
  //         noteList
  //       })
  //     },
  //     fail: function(err) {
  //       console.log('获取列表失败：', err)
  //     }
  //   })
  // },
  // 获取数据的方法
  getData: function(currentPage) {
    const start = (currentPage - 1) * this.data.pageSize;

    // 缓存当前列表数据
    let noteList = this.data.noteList;

    // 判断是否为首页
    if (currentPage == 1) {
      noteList = []
    }

    db.collection('notes')
    .orderBy('created_at', 'desc')
    .skip(start)
    .limit(this.data.pageSize)
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

        if (noteListTem.length < this.data.pageSize) {
          this.setData({
            noteList: noteList.concat(noteListTem),
            currentPage,
            hasMoreData: false
          })
        } else {
          this.setData({
            noteList: noteList.concat(noteListTem),
            currentPage,
            hasMoreData: true
          })
        }
      })
      .catch(err => {
        console.log('数据库读取失败：', err)
      })
  },
  onPullDownRefresh: function() {
    this.getData(1);
  },
  onReachBottom: function() {
    if (this.data.hasMoreData) {
      const currentPage = this.data.currentPage + 1;
      wx.showToast({
        title: '数据加载中',
      })
      this.getData(currentPage);
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  }
})
