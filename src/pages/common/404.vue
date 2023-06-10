<template>
    <el-result
           icon="warning"
           title="404 提示"
           sub-title="你找的页码跑掉了 ~"
         >
           <template #extra>
               <!-- 注意$router.push只可以在@click中进行使用 -->
             <el-button type="primary" @click="this.$router.push('/login')">回到首页</el-button>
           </template>
         </el-result>
   </template>