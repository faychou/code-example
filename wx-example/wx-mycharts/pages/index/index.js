// 引入 echarts.js 
import * as echarts from '../../ec-canvas/echarts'
let chart = null
let secondChart = null

Page({
  data: {
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    }
  },
  onLoad() {
   
  },
})

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)

  let option = getOption() // 这里是 echarts 的配置信息

  chart.setOption(option)

  return chart
}

function getOption() {
  return {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
}
}

// 第二张图表
function initChart2(canvas, width, height, dpr) {
  secondChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })
  canvas.setChart(secondChart)

  let option = getOption2()

  secondChart.setOption(option)

  return secondChart
}

function getOption2() {
  return {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }]
  }
}