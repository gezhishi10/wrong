import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

import * as echarts from "echarts";

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app=createApp(App)
// axios.defaults.baseURL='http://192.168.16.117:8080/'
axios.defaults.baseURL='http://8.130.55.169:8001/'
// axios.defaults.baseURL='http://127.0.0.1:8080/'
// axios.defaults.baseURL='http://192.168.139.117:8080/'
// axios.defaults.baseURL='http://192.168.72.117:8080/'
// axios.defaults.baseURL='http://192.168.3.171:8080/'
//注意路由是需要挂载的
//同理element-Plus也是需要进行挂载的



app.config.globalProperties.$echarts = echarts;
app.use(ElementPlus)
import 'virtual:windi.css'
app.use(router)

app.mount('#app')
// createApp(App).mount('#app')
// 全局挂载 echarts

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
