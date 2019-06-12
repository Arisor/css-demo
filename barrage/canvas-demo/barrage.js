(function () {

  class Barrage {
    constructor(canvas) {
      this.canvas = document.getElementById(canvas);
      let rect = this.canvas.getBoundingClientRect();
      this.w = rect.right - rect.left; // 获取画板的宽度
      this.h = rect.bottom - rect.top; // 获取画板的高度
      this.ctx = this.canvas.getContext('2d');
      this.ctx.font = '20px Microsoft YaHei';
      this.barrageList = [];
    }

    //添加弹幕列表
    shoot (value) {
      let top = this.getTop();
      let color = this.getColor();
      let offset = this.getOffset();
      let width = Math.ceil(this.ctx.measureText(value).width);

      let barrage = {
        value: value,
        top: top,
        left: this.w,
        color: color,
        offset: offset,
        width: width
      }
      this.barrageList.push(barrage);
    }

    //开始绘制
    draw () {
      if (this.barrageList.length) {
        this.ctx.clearRect(0, 0, this.w, this.h); // 清空画板
        for (let i = 0; i < this.barrageList.length; i++) {
          let b = this.barrageList[i];
          if (b.left + b.width <= 0) { // 超出屏幕左边,移除数组
            this.barrageList.splice(i, 1);
            i--;
            continue;
          }
          b.left -= b.offset;
          this.drawText(b);
        }
      }
      requestAnimationFrame(this.draw.bind(this));
    }

    //绘制文字
    drawText (barrage) {
      this.ctx.fillStyle = barrage.color;
      this.ctx.fillText(barrage.value, barrage.left, barrage.top);
    }

    //获取随机颜色
    getColor () {
      return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    }

    //获取随机top
    getTop () {
      //canvas绘制文字x,y坐标是按文字左下角计算，预留30px
      return Math.floor(Math.random() * (this.h - 30)) + 30;
    }

    //获取偏移量
    getOffset () {
      return +(Math.random() * 4).toFixed(1) + 1;
    }

  }
  let barrage;
  document.getElementById('video').addEventListener('loadedmetadata', () => {
    if (!barrage) {
      barrage = new Barrage('canvas');
      barrage.draw();
      const textList = ['弹幕', '666', '233333333',
        'javascript', 'html', 'css', '前端框架', 'Vue', 'React',
        'Angular', '测试弹幕效果'
      ];
      textList.forEach((t) => {
        barrage.shoot(t);
      })
    }
  })

})();