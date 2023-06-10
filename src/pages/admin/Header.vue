<template>
    <el-dropdown size="large" >
        <el-avatar :icon="UserFilled" />

        <template #dropdown>
            <el-dropdown-menu>
                <!-- <el-dropdown-item>个人管理</el-dropdown-item>
                <el-dropdown-item>团队管理</el-dropdown-item> -->
                <el-dropdown-item @click="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import axios from 'axios'
// import {  useRouter } from "vue-router"
import router from '../../router/index';

function logout(){
    window.localStorage.removeItem("admin");
    router.push("../login")
    // alert("退出成功")

}
</script>

<style scoped>
.example-showcase .el-dropdown + .el-dropdown {
    margin-left: 15px;
    display: flex;
 
}

.el-avatar{
    display: flex;
    justify-items: center;
}
</style>