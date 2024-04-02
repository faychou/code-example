<template>
  <div class="container">
    <div
      class="itemcard"
      v-for="(item, index) in list"
      :style="{ height: item.height }"
      :key="index"
    >
      {{ item.txt }}
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
  column-count: 4; /* column-count 属性设置一个盒子的分栏数量，这里表示分为4栏 */
  column-gap: 5px; /* column-gap 属性设置栏与栏之间的间距，这里表示每栏之间间隔为5像素 */
}

.itemcard {
  /*
    如果不添加这个属性，偶尔会发现明明是第二列的内容，怎么有一部分跑到第三列去了，出现这个原因可能是它的计算原理是将所有容器的高度求和后除以列数，从而得到每列的平均值高度。
    那么加上这个值后，就表示每个容器完整显示、不割裂。
  */
  break-inside: avoid;
  padding: 5px;
  margin-bottom: 5px;
  background-color: #ccc;
}
</style>

<script setup>
import { ref } from 'vue'
const list = ref([
  { txt: '01', height: '150px' },
  { txt: '02', height: '180px' },
  { txt: '03', height: '120px' },
  { txt: '04', height: '170px' },
  { txt: '05', height: '140px' },
  { txt: '06', height: '200px' },
  { txt: '07', height: '180px' },
  { txt: '08', height: '140px' },
  { txt: '09', height: '140px' }
])
</script>
