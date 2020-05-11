const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: '图片上传demo' });
});

module.exports = router;
