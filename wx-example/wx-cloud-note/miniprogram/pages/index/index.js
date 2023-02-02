/*
  1、云函数
    一段运行在云端的代码，不需要服务器，只需要在开发工具里编写好了之后直接上传到云端进行运行。

    小程序端（客户端）
    云函数（后端服务器）：技术 -- js，基于 nodejs 的环境；
    云数据库（数据库）
*/

//index.js
const app = getApp()

const db = wx.cloud.database();

Page({
  data: {
    noteList: []
  },
  onLoad: function() {
    let that = this
    // 调用云函数：类似请求
    wx.cloud.callFunction({
      name: 'note', // 云函数名字
      data: { // 传递给云函数的参数
        type: 'list'
      },
      success: function(res) {
        // console.log('调用云函数成功：', res.result.data.data)

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

        let noteList = res.result.list; // 使用聚合后数据在 list
        // console.log('获取列表：', res.result.data) // 不使用集合，数据在 data
        console.log('获取列表：', noteList)
        noteList = noteList.map(item => {
          let d = new Date(item.created_at);
          let y = d.getFullYear();
          let m = d.getMonth() + 1;
          let dd = d.getDate();
          item.time = y + '年' + m + '月' + dd + '日';
          return item;
        })
        that.setData({
          noteList
        })
      },
      fail: function(err) {
        console.log('获取列表失败：', err)
      }
    })

    // 调用云函数也支持 promise 的写法
    // wx.cloud.callFunction({
    //   name: 'note',
    //   data: {}
    // })
    // .then()

    // 小程序直接读取数据库
    // db.collection('notes')
    //   .get()
    //   .then(res => {
    //     console.log('数据库读取成功返回的信息：', res)
    //   })
    //   .catch(err => {
    //     console.log('数据库读取失败：', err)
    //   })
  },
  getTodoValue(e) {
    this.setData({
      totoValue: e.detail.value,
    })
  },
  addTodoHandler() {
    const that = this
    wx.cloud.callFunction({
      name: 'todos',
      data: {
        type: 'add',
        content: that.data.totoValue
      },
      success: function(res) {
        wx.showToast({
          title: '添加成功'
        })
        that.setData({
          totoValue: '',
        })
      },
      fail: function(err) {
        console.log('添加失败：', err)
      }
    })
  }

})
