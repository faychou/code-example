/*
  云数据库新增：
    * 云函数操作数据库：基本无限制，但是不会自带 _openid
    * 小程序操作数据库：有权限限制，其他人不能操作，同时会自动写入 _openid
*/

const db = wx.cloud.database();

Page({
  data: {
    title: '',
    body: '',
    cIndex: 0,
    cList: []
  },
  onLoad(options) {
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
    console.log(data);

    // 方式1: 小程序调用云函数，传递数据
    // wx.cloud.callFunction({
    //   name: 'note',
    //   data: {
    //     type: 'addNote',
    //     data // 当属性名与属性值想同时可以省略
    //   }
    // })
    // .then(res => {
    //   console.log('调用新增数据云函数成功：', res.result);
    // })
    // .catch(err => {
    //   console.log('调用新增数据云函数失败：', err);
    // })

    // 方式2:小程序直接向数据库写入内容
    db.collection('notes')
      .add({
        data: {
          ...data,
          created_at: new Date()
        }
      })
      .then(res => {
        console.log('调用新增数据成功：', res);

        wx.showToast({
          title: '数据新增成功',
        });

        // 清空输入框的内容
        this.setData({
          title: '',
          body: '',
          cIndex: 0
        })

        // 返回上一个界面
        // wx.navigateBack();
        // 这里能够返回上一页，说明那个页面存在在缓存中，故页面不会重新加载，而onLoad函数只会在页面第一次加载的时候运行
        // 所以这里使用重定向进行跳转
        // wx.redirectTo({
        //   url: '../index/index',
        // });
        // 但是 redirectTo 是不允许跳转到 tabbar 页面
        // 这里可以翻看小程序开发文档 API 中关于 路由 的说明，我们还可以选择使用reLaunch，用于关闭所有页面，并打开到应用内的某个页面
        wx.reLaunch({
          url: '../index/index',
        })
      }) 
      .catch(err => {
        console.log('调用新增数据失败：', err);
      })
  }
})