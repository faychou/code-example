const express = require('express');
const { base64, formdata, getToken } = require('../controllers/qiniuController');
const router = express.Router();

/*  上传 base64 */
router.post('/upload-base64', base64);

/* 利用 multer 上传 */
router.post('/upload-formdata', formdata);

/* 返回 uploadToken */
router.get('/getUploadToken', getToken);

module.exports = router;
