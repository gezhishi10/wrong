<template>
    <el-container style="height: 100vh">
        <el-header>电商后台管理平台
            <Header style="margin-left: 1000px"/>
        </el-header>

        <el-container>
            <el-aside width="200px">
                <Menu/>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    <Footer/>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script setup>
import Menu from "../page/adm/Menu.vue";
import Footer from "../Test/Footer.vue"
import Header from "../Test/Header.vue";
// import Menu from "../pages/admin/Menu.vue";
// import Footer from "../pages/admin/Footer.vue"
// import Header from "../pages/admin/Header.vue";
</script>

<style scoped>
.el-header {
    background-color: #1b6d85;
    font-size: 40px;
    font-family: 宋体, serif;
    font-style: oblique;
    font-weight: 400;
    color: #f8f8f8;
}

</style>