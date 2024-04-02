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
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 500px;

  width: 90%;
  margin: 0 auto;
}

.itemcard {
  width: 25%;
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
