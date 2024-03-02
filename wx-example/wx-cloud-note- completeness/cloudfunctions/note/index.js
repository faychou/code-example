/*
  1、云数据操作
    1.1 小程序端api
      会有一套非常严格的调用权限控制，只能进行非敏感的数据操作（只能修改自己创建的数据，每次最多获取20条记录）

    1.2 云函数端api
      所有敏感操作直接在云函数中处理（拥有所有数据的读写权限）
*/

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
// exports.main = async (event, context) => {
//   // event 保存了小程序传递的参数信息
//   const wxContext = cloud.getWXContext()

//   // 回调函数的写法
//   // db.collection('notes')
//   //   .get({
//   //     success: function(res) {
//   //       console.log(res)
//   //     }
//   //   })

//   // promise 写法
//   const result = await db.collection('notes')
//     .get()

//   // 这里就是返回给前端的内容
//   return {
//     data: result
//   }
// }

// 云函数改造 - 可以允许一个云函数支持多个请求
exports.main = async (event, context) => {
  
  // 通过 event.type 的字段值去确认执行什么操作
  switch(event.type) {
    case 'getListNote':
      return getListNote(event);
    case 'addNote':
      return addNote(event);
    case 'getDetail':
      return getDetail(event);
  }
}

// 获取备忘录列表
async function getListNote(event) {
  const result = await db.collection('notes')
    .get()

    return {
    data: result
  }
}

// 备忘录数据新增
async function addNote(event) {
  // 获取小程序端传递的备忘录参数
  const data = event.data;

  // 获取当前用户的 openid
  const openid = cloud.getWXContext().OPENID;

  // 添加数据
  const res = await db.collection('notes')
  .add({
    data: { // 这个就表示要新增的数据
      _openid: openid, // 区分备忘录创建者
      ...data,
      // created_at: new Date()
      created_at: db.serverDate() // 构造一个服务器端时间引用
    }
  });
  console.log('数据新增成功：', res); // 这里的 console 是打印在云函数日志中的

  return {
    msg: 'ok',
    code: '200'
  }
}

// 获取备忘录详情
async function getDetail(event) {
  const openid = cloud.getWXContext().OPENID;
  console.log('获取查询ID：', event);
  const result = await db.collection('notes')
  .aggregate() // 聚合操作实例
  .lookup({
    from: 'category',
    localField: 'cid',
    foreignField: '_id',
    as: 'category',
  })
  .match({
    _id: event.id,
    _openid: openid
  })
  .end() // 标志聚合操作定义完成

    return {
    data: result
  }
}