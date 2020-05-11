var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  console.log(req.body);
  res.json('收到回调通知');
});

module.exports = router;
