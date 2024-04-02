<template>
  <div class="container" ref="containerRef">
    <div
      class="itemcard"
      v-for="(item, index) in state.cardList"
      :style="{
        width: `${state.cardPos[index].width}px`,
        height: `${state.cardPos[index].height}px`,
        transform: `translate(${state.cardPos[index].x}px, ${state.cardPos[index].y}px)`
      }"
      :key="index"
    >
      {{ item.txt }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

const state = reactive({
  cardWidth: 0, // // 容器内卡片宽度
  column: 4, // 4 列
  gap: 10, // 卡片之间的间隙
  currentPage: 1, // 当前页码
  cardList: [], // 卡片数据源
  cardPos: [], // 卡片摆放位置信息
  columnHeight: [0, 0, 0, 0] // 存储每列的高度，进行初始化操作
})

const getCardData = () => {
  const list = [
    { txt: '01', width: 120, height: 150 },
    { txt: '02', width: 120, height: 180 },
    { txt: '03', width: 120, height: 120 },
    { txt: '04', width: 120, height: 170 },
    { txt: '05', width: 120, height: 140 },
    { txt: '06', width: 120, height: 200 },
    { txt: '07', width: 120, height: 180 },
    { txt: '08', width: 120, height: 140 },
    { txt: '09', width: 120, height: 160 },
    { txt: '10', width: 120, height: 200 },
    { txt: '11', width: 120, height: 150 },
    { txt: '12', width: 120, height: 180 }
  ] // 模拟请求的假数据
  state.cardList = [...state.cardList, ...list]
  computedCardPos(list)
}

// 计算卡片位置
const computedCardPos = (list) => {
  list.forEach((item, index) => {
    const cardHeight = (item.height * state.cardWidth) / item.width
    if (index < state.column && state.currentPage == 1) {
      state.cardPos.push({
        width: state.cardWidth,
        height: cardHeight,
        x: index * (state.cardWidth + state.gap),
        y: 0
      })
      state.columnHeight[index] = cardHeight + state.gap // 更新当前列高度
    } else {
      const { minIndex, minHeight } = minColumn.value
      state.cardPos.push({
        width: state.cardWidth,
        height: cardHeight,
        x: minIndex * (state.cardWidth + state.gap),
        y: minHeight
      })
      state.columnHeight[minIndex] += cardHeight + state.gap
    }
  })
}

// 计算最小列高度
const minColumn = computed(() => {
  let minIndex = -1,
    minHeight = Infinity

  state.columnHeight.forEach((item, index) => {
    if (item < minHeight) {
      minHeight = item
      minIndex = index
    }
  })

  return {
    minIndex,
    minHeight
  }
})

const containerRef = ref(null)

const init = () => {
  const containerWidth = containerRef.value.clientWidth

  state.cardWidth = (containerWidth - state.gap * (state.column - 1)) / state.column // 动态计算卡片宽度
  getCardData()
}
onMounted(() => {
  init()
})
</script>

<style scoped>
.container {
  width: 100%;
  position: relative;
}

.itemcard {
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;

  background-color: #ccc;
}
</style>
