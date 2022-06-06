import * as echarts from '../../ec-canvas/echarts'

Page({
  data: {
    lazyEc: {
      lazyLoad: true
    },
    type: 'income',
    chartOptionData: {
      income: [],
      ountcome: []
    }
  },
  onLoad: function (options) {
    // 获取到组件
    this.lazyComponent = this.selectComponent('#lazy-mychart-dom')

    // 模拟请求
    setTimeout(() => {
      // 模拟数据
      this.setData({
        chartOptionData: {
          income: [150, 230, 224, 218, 135, 147, 260],
          outcome: [50, 130, 324, 118, 105, 157, 360]
        }
      })

      this.init([150, 230, 224, 218, 135, 147, 260])
    }, 1000)
  },
  init(optionData) { // 手动初始化
    this.lazyComponent.init((canvas, width, height, dpr) => {
      let chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      })

      let option = getOption(optionData)

      chart.setOption(option)

      this.chart = chart // 将图表实例绑定到 this 上，方便在其他函数中访问

      return chart
    })
  },
  changeType(e) { // 切换效果
    this.setData({
      type: e.currentTarget.dataset.type
    })

    let option = getOption(this.data.chartOptionData[e.currentTarget.dataset.type])
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