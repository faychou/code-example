 module.exports = {
  avator(req, res) {
    console.log('头像图片信息：', req.file); // 文件信息
    console.log('头像文本域数据，如果存在的话：', req.body);

    res.json({
      msg:'头像上传成功',
      url: '/uploads/' + req.file.filename
    });
  },
  multi(req, res) {
    console.log('多图图片信息：', req.files); // 文件信息
    console.log('多图文本域数据，如果存在的话：', req.body);
    var urls = [];
    for(var i = 0; i < req.files.length; i++) {
      urls.push('/uploads/' + req.files[i].filename)
    }

    res.json({
      msg:'多图上传成功',
      urls
    });
  }
}