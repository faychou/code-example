// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  switch (event.action) {
    case 'getArticleListData': {
      return getArticleListData(event)
    }
    case 'getArticleDetail': {
      return getArticleDetail(event)
    }
    default: {
      return
    }
  }
}

async function getArticleListData(event) {

  const result = await db.collection('article').get()

  return result
}

async function getArticleDetail(event) {
  const { articleId } = event

  const result = await db.collection('article').doc(articleId).get()

  return result
}