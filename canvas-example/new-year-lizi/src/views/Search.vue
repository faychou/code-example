<template>
  <div class="search">
    <div class="search-group">
      <input type="text" v-model="searchName">
      <button @click="getSearch">搜索</button>
    </div>

    <div class="list">
      <div v-if="isLoading">正在加载中。。。</div>
      <div v-for="item in list" :key="item.id">
        
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {
      searchName: '',
      isLoading: false,
      list: []
    }
  },
  created() {

  },
  methods: {
    getSearch() {
      this.isLoading = true;
      this.axios({
        methods: 'get',
        url: '',
        data: {
          keywords: this.searchName
        }
      })
      .then(res=> {
        this.isLoading = false;
        this.list = res.data
      })
      .catch(err=> {
        console.log(err)
      })
    }
  }
}
</script>