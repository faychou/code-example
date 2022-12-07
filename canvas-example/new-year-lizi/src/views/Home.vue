<template>
  <div class="home">
    <canvas id="myCanvas" :width="w" :height="h" ref="myCanvas"></canvas>
  </div>
</template>

<script>
import Bubble from "../assets/js/bubble";

export default {
  data() {
    return {
      w: 0,
      h: 0,
      circleArr: [], // 随机缓动粒子
      showCircleArr: [] // 展示效果粒子
    };
  },
  mounted() {
    this.getSize();
    window.onresize = this.getSize;

    const myCanvas = this.$refs.myCanvas;
    const ctx = myCanvas.getContext("2d");
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    this.canvasCircleInit(myCanvas); // 生成随机粒子

    setTimeout(this.autoTime.bind(this, 5), 1000) //自动倒计时
  },
  methods: {
    getSize() { // 获取可用大小
      const w = window.innerWidth;
      const h = window.innerHeight;

      this.w = w;
      this.h = h;
    },
    loadCanvas(value, canvasBg) {
      var fontSize = 100;
      var fontLength = value.toString().length;
      if(fontSize * fontLength > this.w * 0.7) {
        fontSize = Math.floor(this.w * 0.7 / fontLength);
      }

      var width = this.calWordWidth(value, fontSize);
      var canvas = document.createElement("canvas");
      canvas.id = "b_canvas";
      canvas.width = width;
      canvas.height = fontSize;
      var ctx = canvas.getContext("2d");
      ctx.font = fontSize + "px Microsoft YaHei";
      ctx.fillStyle = "orange";
      // var pos = this.getPo(canvasBg.width, canvasBg.height, width, fontSize); // 获取图片居中的坐标点
      // console.log('坐标点：', pos);
      // ctx.fillText(value, pos.x,pos.y);
      ctx.fillText(value, 0, (fontSize / 5) * 4); // 轻微调整绘制字符位置
      this.getImage(canvasBg, canvas); // 导出为图片再导入到 canvas 获取图像数据
    },
    getImage(canvasBg, canvas) {
      const that = this;
      const image = new Image();
      var ctxBg = canvasBg.getContext("2d");
      image.src = canvas.toDataURL("image/jpeg"); // canvas 导出
      image.onload = function() {
        ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
        // var pos = that.getPo(canvasBg.width, canvasBg.height, canvas.width, canvas.he);
        ctxBg.drawImage(image, 0, 0, this.width * 0.8, this.height * 0.8); // 微调图片大小
        var imageData = ctxBg.getImageData(0, 0, this.width, this.height);
        // var dataLength = imageData.data.length;
        var diff = 4;
        
        ctxBg.clearRect(0, 0, canvasBg.width, canvasBg.height);
        for (var j = 0; j < this.height; j += diff) {
          for (var i = 0; i < this.width; i += diff) {
            var colorNum = 0;
            for (var k = 0; k < diff * diff; k++) {
              var row = k % diff;
              var col = ~~(k / diff);
              let r = imageData.data[((j + col) * this.width + i + row) * 4 + 0];
              let g = imageData.data[((j + col) * this.width + i + row) * 4 + 1];
              let b = imageData.data[((j + col) * this.width + i + row) * 4 + 2];
              if (r < 10 && g < 10 && b < 10) colorNum++;
            }
            if (colorNum < diff * diff / 3 * 2) {
              var option = {
                x: i,
                y: j,
                radius: 6,
                color: '#fff',
                originRadius: ~~(Math.random() * 3) + 1
              }
              var bubble = that.circleArr.pop()
              if(!bubble) { // 如果画布中的粒子数不够应继续添加，同时新的例子出现的位置应该是随机的
                option.isNew = true
                var newBubble = new Bubble(option)
                var newOption = {
                  lastX: ~~ (Math.random() * canvasBg.width), 
                  lastY: ~~ (Math.random() * canvasBg.height), 
                  isNew: true 
                }
                newBubble.changeOption(newOption)
                that.showCircleArr.push(newBubble)
              } else {
                bubble.changeOption(option)
                that.showCircleArr.push(bubble)
              }
            } 
          }
        }
      };
    },
    autoTime(value) {
      var that = this;
      var canvas = that.$refs.myCanvas;
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (value > -1) {
        for (var i = 0; i < that.showCircleArr.length; i++) {
          var item = that.showCircleArr[i];
          // var x = ~~(Math.random() * canvas.width);
          // var y = ~~(Math.random() * canvas.height);
          var option = {
            isClick: true,
            isWord: true,
            originRadius: ~~(Math.random() * 3) + 1,
            radius: ~~(Math.random() * 3) + 1,
            color: "rgba(255, 255, 255, 0.5"
          };
          item.changeOption(option);
          that.circleArr.push(item);
        }
        that.showCircleArr = [];
        that.loadCanvas(value.toString(), canvas);
        value--;
        setTimeout(that.autoTime.bind(this, value), 1500);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        that.showCircleArr = [];
        that.loadCanvas('happy new year', canvas);
      }
    },
    canvasCircleInit(canvas) { // 初始化一些随机的粒子
      var ctx = canvas.getContext("2d");
      var self = this;
      for (var i = 0; i < 100; i++) {
        var option = {
          radius: ~~(Math.random() * 3) + 1,
          x: ~~(Math.random() * window.innerWidth),
          y: ~~((Math.random() * window.innerHeight) / 2),
          color: "rgba(255, 255, 255, 0.5"
        };
        var bubble = new Bubble(option);
        self.circleArr.push(bubble);
      }
      function randomMove(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        self.circleArr.forEach(function(item) {
          item.draw(ctx, true);
        });
        self.showCircleArr.forEach(function(item) {
          item.draw(ctx);
        });
        setTimeout(randomMove.bind(self, ctx), 10);
      }
      setTimeout(randomMove.bind(self, ctx), 10);

      return self.circleArr;
    },
    calWordWidth(value, fontSize) {
      var arr = value.split("");
      var reg = /\w/,
        width = 0;
      arr.forEach(function(item) {
        if (reg.test(item)) {
          width += fontSize; // 字母宽度
        } else {
          width += fontSize + 10; // 汉字宽度
        }
      });
      return width;
    },
    getPo(w, h, mw, mh) {
      var x = w * 0.5 - mw / 2;
      var y = h * 0.5 - mh / 2;
      return {
        x,
        y
      };
    }
  }
};
</script>
