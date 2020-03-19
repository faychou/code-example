import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// import './utils/echarts'
import "./plugins/element"; // 按需加载
import '@/assets/iconfont/iconfont.css'

// 全局引入
// import ElementUI from 'element-ui' // 引入框架
// import 'element-ui/lib/theme-chalk/index.css' // 引入样式文件
// Vue.use(ElementUI) // 注册

// import { Notification, Message, MessageBox, Loading } from 'element-ui'

// Vue.prototype.$notify = Notification
// Vue.prototype.$message = Message
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$loading = Loading.service
// Vue.prototype.$loading = Loading.service

// 在 echarts.js 中引入 echarts 主模块
let echarts = require('echarts/lib/echarts');

// 引入柱状图组件
require('echarts/lib/chart/bar');
// 引入提示框组件
require('echarts/lib/component/tooltip');
// 引入标题组件
require('echarts/lib/component/title');

Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
