<template>
  <div class="home">
    <header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1" class="home-ctrl">
          <template slot="title">我的工作台</template>
          <el-menu-item index="1-1">
            <router-link to="/home/about">个人中心</router-link>
          </el-menu-item>
          <el-menu-item index="1-2" @click="logoutHandler">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </header>
    <main>
      <el-row :gutter="20" class="sidebar-menu">
        <el-col :span="6">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
          </el-menu>
        </el-col>

        <el-col :span="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  name: "Home",
  methods: {
    ...mapActions([
      "logout"
    ]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logoutHandler() {
      this.logout();
    }
  }
};
</script>

<style lang="scss" scoped>
  .home-ctrl {
    float: right;
  }
</style>