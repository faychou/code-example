/*
  1、云数据操作
    1.1 小程序端api
      会有一套非常严格的调用权限控制，只能进行非敏感的数据操作（只能修改自己创建的数据，每次最多获取20条记录）

    1.2 云函数端api
      所有敏感操作直接在云函数中处理（拥有所有数据的读写权限）
*/

// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 获取数据库引用
const db = cloud.database();

// 数据库操作符，可以构造复杂的查询条件完成复杂的查询任务
// const _ = db.command

// 数据库聚合操作符
// const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  // event 保存了小程序传递的参数信息
  const wxContext = cloud.getWXContext();

  // 回调函数的写法
  // collection 方法获取一个集合的引用
  // get 方法会触发网络请求，往数据库获取数据
  // db.collection('notes')
  //   .get({
  //     success: function(res) {
  //       console.log(res)
  //     }
  //   })

  // promise 写法
  const result = await db.collection("notes").get();

  return {
    data: result,
  };
};
exports.main = (event, context) => {
  // event 保存了小程序传递的参数信息
  // const wxContext = cloud.getWXContext()

  switch (event.type) {
    case "list": {
      return getListNote(event);
    }
    case "get": {
      return getNote(event);
    }
    case "edit": {
      return editNote(event);
    }
    case "add": {
      return addNote(event);
    }
    case "del": {
      return delNote(event);
    }
    case "getFavor": {
      return getFavor(event);
    }
    case "addFavor": {
      return addFavor(event);
    }
    case "cancelFavor": {
      return cancelFavor(event);
    }
    case "favorList": {
      return favorList(event);
    }
  }
};

// 获取数据列表
async function getListNote(event) {
  const wxContext = cloud.getWXContext();
  const result1 = await db
    .collection("notes")
    //  // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等）
    .where({
      openid: wxContext.OPENID,
    })
    // limit 指定查询结果集数量上限，在小程序端默认及最大上限为 20，在云函数端默认及最大上限为 1000
    .limit(10)
    // 指定查询排序条件，要排序的字段只能取 asc 或 desc
    .orderBy("created_at", "desc")
    // skip 指定查询返回结果时从指定序列后的结果开始返回，常用于分页
    .skip(10)
    // field 指定返回结果中记录需返回的字段，方法接受一个必填对象用于指定需返回的字段，对象的各个 key 表示要返回或不要返回的字段，value 传入 true|false（或 1|-1）表示要返回还是不要返回
    .field({
      title: true,
      created_at: true,
    })
    .get();

  const result = await db
    .collection("notes")
    // aggregate 数据库集合的聚合操作
    .aggregate()
    // match 聚合阶段中根据条件过滤文档
    .match({
      openid: wxContext.OPENID,
    })
    // project 聚合阶段中把指定的字段传递给下一个流水线
    .project({
      id: "$_id", // 加入新字段，字段名为 id，值为 _id 的值
      _id: 0, // 不返回 _id
      title: 1,
      created_at: 1,
    })
    .limit(5)
    .skip(1)
    .end(); // 注意这里不使用 get()，end() 标志聚合操作定义完成，发起实际聚合操作

  return result;
}

// 获取数据详情
async function getNote(event) {
  const result = await db
    .collection("notes")
    // doc 方法来获取集合中一个指定 ID 的记录的引用
    .doc(event.id)
    .get();

  return result;
}

// 编辑数据
async function editNote(event) {
  const wxContext = cloud.getWXContext();

  const result = await db
    .collection("notes")
    .where({
      _id: event.id,
      openid: wxContext.OPENID,
    })
    .update({
      data: {
        title: event.title,
        body: event.body,
      },
    });

  return result;
}

// 插入数据
async function addNote(event) {
  const wxContext = cloud.getWXContext();

  const result = await db
    .collection("notes")
    // add 方法往集合中插入一条记录
    .add({
      // data 字段表示需新增的 JSON 数据
      // 如果传入的记录对象没有 _id 字段，则由后台自动生成 _id；若指定了 _id，则不能与已有记录冲突
      data: {
        body: event.body,
        openid: wxContext.OPENID,
        title: event.title,
        created_at: db.serverDate(), // 构造一个服务端时间的引用
      },
    });

  // result 是一个对象，其中有 _id 字段标记刚创建的记录的 id

  return result;
}

// 删除数据
async function delNote(event) {
  const wxContext = cloud.getWXContext();

  const result = await db
    .collection("notes")
    .where({
      _id: event.id,
      openid: wxContext.OPENID,
    })
    .remove();

  return result;
}

// 是否收藏
async function getFavor(event) {
  const wxContext = cloud.getWXContext();
  console.log("用户openId：", wxContext.OPENID);
  console.log("用户noteId：", event.id);

  const result = await db
    .collection("favors")
    .where({
      noteid: event.id,
      openid: wxContext.OPENID,
    })
    .get();

  const isFavor = result.data.length > 0 ? true : false;

  return { isFavor };
}

// 收藏
async function addFavor(event) {
  const wxContext = cloud.getWXContext();
  console.log("用户openid：", wxContext.OPENID);

  const result = await db.collection("favors").add({
    data: {
      noteid: event.id,
      openid: wxContext.OPENID,
    },
  });

  return result;
}

// 取消收藏
async function cancelFavor(event) {
  const wxContext = cloud.getWXContext();

  const result = await db
    .collection("favors")
    .where({
      noteid: event.id,
      openid: wxContext.OPENID,
    })
    .remove();

  return result;
}

// 收藏列表
async function favorList(event) {
  const wxContext = cloud.getWXContext();

  const result = await db
    .collection("favors")
    .aggregate()
    // lookup 联表查询，与同个数据库下的一个指定的集合做 left outer join(左外连接)
    .lookup({
      from: "notes", // 要连接的另外一个集合名
      localField: "noteid", // 当前流水线的输入记录的字段名，该字段将被用于与 from 指定的集合的 foreignField 进行相等匹配
      foreignField: "_id", // 被连接集合的字段名，该字段会被用于与 localField 进行相等匹配
      as: "list", // 输出的数组字段名
    })
    .end();

  return result;
}
