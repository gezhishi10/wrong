
<template>
     <el-scrollbar height="auto">
  <!--          开启路由-->
            <el-menu
                :default-active="this.$route.path"
  
                :router="true"
            >
              <el-sub-menu index="/admin">
                <template #title>
                  <el-icon><User /></el-icon>用户管理
                </template>
                  <el-menu-item index="/admin/Admin-User">普通用户管理</el-menu-item>
                        <el-menu-item index="/admin/Admin-VipUser">会员用户管理</el-menu-item>
              
                </el-sub-menu>
           
              <!-- </el-sub-menu> -->

              <el-sub-menu index="/order">
                <template #title>
                  <el-icon><User /></el-icon>业务管理
                </template>
                  <el-menu-item index="/admin/Admin-Book">预定管理</el-menu-item>
                  <el-menu-item index="/admin/Admin-Payment">订单管理</el-menu-item>
                  <el-menu-item index="/admin/Admin-Comment">评论管理</el-menu-item>
              
                </el-sub-menu>

                <el-sub-menu index="/hotel">
                <template #title>
                  <el-icon><User /></el-icon>酒店管理
                </template>
                  <el-menu-item index="/admin/Admin-Type">类型管理</el-menu-item>
                        <!-- <el-menu-item index="/admin/Admin-Payment">支付管理</el-menu-item> -->
                        <el-menu-item index="/admin/Admin-Room">房间管理</el-menu-item>
              
                </el-sub-menu>

                <!-- <el-sub-menu index="/base">
                <template #title>
                  <el-icon><User /></el-icon>基础设置
                </template>
                
                     
                </el-sub-menu> -->

              

                <el-sub-menu index="/data">
                <template #title>
                  <el-icon><User /></el-icon>数据分析
                </template>
                  <el-menu-item index="/admin/Data-analysis">当前最热</el-menu-item>
                     
              
                </el-sub-menu>


            </el-menu>
          </el-scrollbar>
</template>

<script  setup>
import {ref} from 'vue';
import {Menu as IconMenu, Message, Setting,Histogram,Avatar} from '@element-plus/icons-vue'
</script>

<style scoped>

a{
    text-decoration: none;
    color: #000;
}

.router-link-active {
    text-decoration: none;
    color: black;
}

</style>