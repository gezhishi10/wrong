
<!-- 引入windiCSS -->

<template>
  <div>
    <el-row class="min-h-screen bg-blue-500">
      <el-col :span="16" class="flex justify-center items-center">
        <div>
          <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
          <div class="text-gray-200 text-sm ">欢迎来到eva酒店管理系统,你会在这里得到极致的体验</div>
        </div>
      </el-col>

      <el-col
        :span="8"
        class="bg-light-50 flex justify-center items-center flex-col"
      >
      <div>
        
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="管理员登录" name="first"> <Login_admin></Login_admin> </el-tab-pane>
    <el-tab-pane label="登录" name="second" disabled> <login_nurse></login_nurse> </el-tab-pane>
    <el-tab-pane label="客户登录" name="third"> <login_user></login_user> </el-tab-pane>

  </el-tabs>
      </div>
      
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from 'axios'

import Login_admin from "../../components/admin/login_admin.vue";
import login_nurse from "../../components/login_nurse.vue";
import login_user from "../../components/user/login_user.vue";


</script>

<style scoped>
.tab-container {
  display: flex;
  justify-content: be;
}
</style>