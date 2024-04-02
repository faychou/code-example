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

  display: grid;
  grid-template-columns: repeat(4, calc(25% - 5px));
  align-items: start;
  justify-content: space-evenly;

  grid-auto-rows: 2px;
}

.itemcard {
  padding: 5px;
  background-color: #ccc;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
const list = ref([
  { txt: '01', height: '150px' },
  { txt: '02', height: '180px' },
  { txt: '03', height: '120px' },
  { txt: '04', height: '170px' },
  { txt: '05', height: '140px' },
  { txt: '06', height: '200px' },
  { txt: '07', height: '180px' },
  { txt: '08', height: '140px' }
])

onMounted(() => {
  const itemCards = document.querySelectorAll('.itemcard')
  Array.from(itemCards).forEach((element) => {
    const row = Math.ceil(element.clientHeight / 2) + 2
    element.style.gridRowEnd = `span ${row}`
  })
})
</script>
