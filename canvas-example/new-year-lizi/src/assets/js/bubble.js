/*
  @params option.radius {number} 圆角
  @params option.color {string} 颜色
  @params option.x {number} 开始坐标
  @params option.y {number} 开始坐标
  @params option.lastX {number} 最后坐标，为过渡变量，表示粒子从一个坐标移动到下一个坐标
  @params option.lastY {number} 最后坐标
  @params option.randomX {number}
  @params option.randomY {number}
  @params option.speed {number}
  @params option.once {boolean}
  @params option.isNew {boolean}
  @params option.isWord {boolean}
*/
function Bubble(option) {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.originRadius = this.radius = option ? option.radius : 6;
  this.color = option ? option.color : '#fff';
  this.lastX = this.x = option ? option.x : ~~(Math.random() * this.width); // 双非按位取反运算符，相当于 Math.floor()，初始坐标都是随机值
  this.lastY = this.y = option ? option.y : ~~(Math.random() * this.height);
  this.randomX = ~~(Math.random() * this.width);
  this.randomY = ~~(Math.random() * this.height);
  this.speed = 4;
  this.once = false;
  this.isNew = false;
  this.isWord = false;
}
Bubble.prototype.changeOption = function (option) {
  this.originRadius = option.originRadius ? option.originRadius : this.radius
  this.lastRadius = this.radius;
  this.radius = option.radius ? option.radius : 6;
  this.color = option.color ? option.color : '#fff';
  this.x = option.x ? option.x : this.x;
  this.y = option.y ? option.y : this.y;
  this.lastY = option.lastY ? option.lastY : this.lastY;
  this.lastX = option.lastX ? option.lastX : this.lastX;
  this.isNew = option.isNew ? option.isNew : false;
  this.isWord = option.isWord ? option.isWord : false;
  this.isClick = option.isClick ? option.isClick : false;
}

// 由于需要通过两个状态下的坐标值算出需要移动的距离，故我们需要一个坐标副本来实时表示当前的粒子坐标位置
Bubble.prototype.draw = function (ctx, randomMove) { // 绘制粒子运动
  if (randomMove) {
    var dis = ~~Math.sqrt(Math.pow(Math.abs(this.x - this.randomX), 2) + Math.pow(Math.abs(this.y - this.randomY), 2)),
      ease = 0.05;
    if (this.isWord) {  // 如果该粒子当前是文字
      var disLastPosition = ~~Math.sqrt(Math.pow(Math.abs(this.lastX - this.randomX), 2) + Math.pow(Math.abs(this.lastY - this.randomY), 2));
      ease = 0.05;
      if (disLastPosition > 0) {
        if (this.lastX < this.randomX) {
          this.lastX += disLastPosition * ease;
        } else {
          this.lastX -= disLastPosition * ease;
        }
        if (this.lastY < this.randomY) {
          this.lastY += disLastPosition * ease;
        } else {
          this.lastY -= disLastPosition * ease;
        }
      } else {
        this.lastX = this.randomX;
        this.lastY = this.randomY;
        this.x = this.lastX; //更新x,y值
        this.y = this.lastY;
        this.isWord = false;
      }
      ctx.beginPath();
      ctx.arc(this.lastX, this.lastY, this.originRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
      return;
    }
    if (dis > 0) { // 当粒子在向目标点移动的过程中，由缓动系数与距离控制速度
      if (this.x < this.randomX) {
        this.x += dis * ease;
      } else {
        this.x -= dis * ease;
      }
      if (this.y < this.randomY) {
        this.y += dis * ease;
      } else {
        this.y -= dis * ease;
      }
    } else { //达到目标点后更新下一个目标点
      this.speed = 4;
      this.randomX += ~~(Math.random() * (Math.random() > 0.5 ? 5 : -5) * 2);
      this.randomY += ~~(Math.random() * (Math.random() > 0.5 ? 5 : -5) * 2);
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.originRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();

  } else {
    var x = this.x * 3 + 50,
      y = this.y * 3 + 50,
      color = this.color || '#fff';
      // var maxRaduis = 10;
      ease = 0.05;
      dis = ~~Math.sqrt(Math.pow(Math.abs(this.lastX - x), 2) + Math.pow(Math.abs(this.lastY - y), 2)); 
      
    if (dis > 0) {
      if (this.lastX < x) {
        this.lastX += dis * ease;
      } else {
        this.lastX -= dis * ease;
      }
      if (this.lastY < y) {
        this.lastY += dis * ease;
      } else {
        this.lastY -= dis * ease;
      }
    } else {
      this.lastX = x;
      this.lastY = y;
    }

    ctx.beginPath();
    ctx.arc(this.lastX, this.lastY, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color || '#fff';
    ctx.fill();
  }
}

export default Bubble;