import * as echarts from '../../ec-canvas/echarts'

Page({
  data: {
    lazyEc: {
      lazyLoad: true
    },
    type: 'income',
    ecData: {
      income: [150, 230, 224, 218, 135, 147, 260],
      outcome: [50, 100, 114, 300, 235, 50, 150]
    }
  },
  onLoad: function (options) {
    // 获取到组件
    this.lazyComponent = this.selectComponent('#lazy-mychart-dom')

    // 模拟请求
    setTimeout(() => this.init(), 1000)
  },
  init() { // 手动初始化
    this.lazyComponent.init((canvas, width, height, dpr) => {
      let chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      })

      let option = getOption()

      chart.setOption(option)

      this.chart = chart // 将图表实例绑定到 this 上，方便在其他函数中访问

      return chart
    })
  },
  changeType(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    let option = getOption(this.data.ecData[e.currentTarget.dataset.type])
    this.chart.setOption(option)
  }
})

function getOption(data) {
  return {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: data,
        type: 'line'
    }]
  }
}
