const fs = require('fs');
 const path = require('path');
 const qiniu = require("qiniu"); // 引入七牛模块
 const multer = require('multer'); // 文件上传模块
 
 const {
   bucket,
   qiniuUrl,
   accessKey,
   secretKey
 } = require('../config/qiniu.config');
 
 const {
   Duplex
 } = require('stream'); // 双工流,即读写流

 const mac = new qiniu.auth.digest.Mac(accessKey, secretKey); // 鉴权对象

 const options = {
   scope: bucket,
   // expires: 7200 // 上传凭证的有效时间,默认为1个小时,单位为秒
 };
 const putPolicy = new qiniu.rs.PutPolicy(options);
 const uploadToken = putPolicy.uploadToken(mac); // 往七牛云空间上传图片，一定要用到这个参数

 const config = new qiniu.conf.Config(); // 构建上传 config 对象，指定空间对应的 zone 及其他参数
 config.zone = qiniu.zone.Zone_z2;; // 空间对应的机房,z2指华南机房
 //config.useHttpsDomain = true; // 是否使用 https 域名
 //config.useCdnDomain = true; // 上传是否使用 cdn 加速

 const formUploader = new qiniu.form_up.FormUploader(config); // 文件上传（表单方式）
 const putExtra = new qiniu.form_up.PutExtra();

 /* --------------------- 上传 base64 --------------------- */
 exports.base64 = (req, res) => {
   const imgData = req.body.imgBase64;
   const base64Data = imgData.replace(/^data:image\/\w+;base64,/, ""); // 过滤, base64 必须去掉头文件
   const dataBuffer = Buffer.from(base64Data, 'base64'); // 转为二进制
   const key = Date.now() + '.png'; // 上传到服务器的名称

   const readableStream = Duplex();
   readableStream.push(dataBuffer); // 转为可读流
   readableStream.push(null);

   formUploader.putStream(uploadToken, key, readableStream, putExtra, (respErr,
     respBody, respInfo) => {
     if (respErr) {
       res.json({
         status: '0',
         msg: '上传失败',
         error: respErr
       });
     }
     if (respInfo.statusCode == 200) {
       console.log('文件上传成功后返回的信息:', respBody);
       const imageUrl = path.join(qiniuUrl, '/', respBody.key);
       res.json({
         status: '200',
         msg: '上传成功',
         imageUrl
       });
     } else {
       console.log(respInfo.statusCode);
       console.log(respBody);
       res.json({
         status: '0',
         msg: '上传失败',
         error: respBody
       });
     }
   });
 }


 /* --------------------- 利用 multer 上传 --------------------- */
 let storage = multer.diskStorage({
   // 设置上传后文件路径
     destination(req, file, cb) {
       cb(null, './public/tem')
   },
   // 上传文件重命名
   filename(req, file, cb) {
     var fileFormat = (file.originalname).split(".");
     cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
   }
 });
 // 添加配置文件到 muler 对象
 const upload = multer({
   storage: storage
 }).single('fileData');
 
 // 自动创建目录
 if (fs.existsSync('./public/tem')) {
   console.log('已经创建过此更新目录了');
 } else {
   fs.mkdirSync('./public/tem');
   console.log('更新目录已创建成功\n');
 }
 
 exports.formdata = (req, res) => {
   upload(req, res, (err) => {
     if (err) {
       // 发生错误
       return console.log('上传文件到服务器出错:', err);
     }

     const localFile = path.resolve('public/tem/', req.file.filename);
     const key = Date.now() + '.png'; // 上传到服务器的名称

     formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr,
       respBody, respInfo) => {
       if (respErr) {
         res.json({
           status: '0',
           msg: '上传失败',
           error: respErr
         });
       }
       if (respInfo.statusCode == 200) {
         console.log('文件上传成功后返回的信息:', respBody);
         const imageUrl = path.join(qiniuUrl, respBody.key);

         fs.unlink('./public/tem/' + req.file.filename, (error) => { // 将临时文件夹中的图片删除
           if (error) {
             console.log('删除临时图片失败', error);
             return;
           }
           console.log('删除临时图片成功');
         });

         res.json({
           status: '200',
           msg: '上传成功',
           imageUrl
         });
       } else {
         console.log(respInfo.statusCode);
         console.log(respBody);
         res.json({
           status: '0',
           msg: '上传失败',
           error: respBody
         });
       }
     });
   });
 }

/* --------------------- 和 --------------------- */
exports.getToken = (req, res) => {
  res.json({
    uploadToken,
    qiniuUrl
  });
}
