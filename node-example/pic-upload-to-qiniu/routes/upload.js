const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const uploadController = require('../controllers/upload');

// 自动创建目录
if (fs.existsSync('./public/uploads')) {
  console.log('已经创建过此更新目录了');
} else {
  fs.mkdirSync('./public/uploads');
  console.log('更新目录已创建成功\n');
}

// let upload = multer({dest: 'public/uploads'}); // 简单的配置，直接指定文件存储位置
// 也可以像下面这样详细配置
let storage = multer.diskStorage({ 
  // 设置上传后文件路径，uploads 文件夹不会自动创建,所以才有了上面 fs 创建文件夹的一步 
  destination(req, file, cb) { 
    cb(null, './public/uploads') 
  }, 
  // 给上传文件重命名，获取添加后缀名 
  filename(req, file, cb) { 
    var fileFormat = (file.originalname).split("."); 
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]); 
  } 
});   
// 添加配置文件到 multer 对象。 
let upload = multer({ 
  storage: storage 
});

// 上传单个文件
// 注意  single() 函数中的 参数 必须和前端 input 的 name 相同
router.post('/avator', upload.single('avator'), uploadController.avator);

// 上传多个文件
// 注意 array() 函数中的 参数 必须和前端 input 的 name 相同
router.post('/multi', upload.array('multi', 5), uploadController.multi);

module.exports = router;
