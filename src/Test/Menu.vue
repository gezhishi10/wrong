<!-- <template>
    <el-scrollbar >
        <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                       <Histogram />
                    </el-icon>
                    商品管理后台
                </template>
                <el-menu-item-group>
                    <template #title>商品库存管理</template>
                    <el-menu-item index="1-1"><router-link to="Admin-User">食品类</router-link></el-menu-item>

                    <el-menu-item index="1-2"><router-link to="second">日用类</router-link></el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="商品进库管理">
                    <el-menu-item index="1-3">进库统计</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title>商品销售记录</template>
                    <el-menu-item index="1-4-1"></el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    员工管理后台
                </template>
                <el-menu-item-group>
                    <template #title>Group 1</template>
                    <el-menu-item index="2-1">Option 1</el-menu-item>
                    <el-menu-item index="2-2">Option 2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                    <el-menu-item index="2-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="2-4">
                    <template #title>Option 4</template>
                    <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <setting/>
                    </el-icon>
                    商家管理后台
                </template>
                <el-menu-item-group>

                </el-menu-item-group>
                <el-menu-item-group title="商家评论管理">
                    <el-menu-item index="3-3"><router-link to="ShoppingDemo3">差评统计</router-link></el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item-group>
                <el-menu-item index="3-3">
                    <el-icon>
                        <Avatar />
                    </el-icon><router-link to="ShoppingDemo4">数据统计</router-link></el-menu-item>
            </el-menu-item-group>
        </el-menu>
    </el-scrollbar>
</template> -->
<template>
     <el-scrollbar height="auto">
  <!--          开启路由-->
            <el-menu
                :default-active="this.$route.path"
  
                :router="true"
            >
              <el-sub-menu index="/admin_home">
                <template #title>
                  <el-icon><User /></el-icon>用户管理
                </template>

                <el-sub-menu index="first">
                  <template #title>普通用户</template>
                  <el-menu-item index="/admin/Admin-User">普通用户管理</el-menu-item>
               <!-- <template #title>普通用户</template> -->
              
                </el-sub-menu>
                <el-sub-menu index="second">
                  <template #title>会员用户</template>
                  <el-menu-item index="/admin/second">会员用户管理</el-menu-item>
                </el-sub-menu>
           
              </el-sub-menu>

              <el-sub-menu index="2">
                <template #title>
                  <el-icon><Setting /></el-icon>业务管理
                </template>
                <el-sub-menu index="2-1">
                  <template #title>订单</template>
                  <el-menu-item index="2-1-1">订单管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2-2">
                  <template #title>类型</template>
                  <el-menu-item index="2-2-1">类型管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2-3">
                  <template #title>评论</template>
                  <el-menu-item index="2-3-1">评论管理</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>

              <el-sub-menu index="3">
                <template #title>
                  <el-icon><Grid /></el-icon>职工管理
                </template>
                <el-sub-menu index="3-1">
                  <template #title>护工管理</template>
                  <el-menu-item index="3-1-1">护工审核</el-menu-item>
                  <el-menu-item index="3-1-2">辞职护工</el-menu-item>
                </el-sub-menu>
                
              </el-sub-menu>

              

              <el-sub-menu index="4">
                <template #title>
                  <el-icon><Grid /></el-icon>数据管理
                </template>
                <el-sub-menu index="4-1">
                  <template #title>数据分析</template>
                  <el-menu-item index="4-1-1">当期最热</el-menu-item>
                </el-sub-menu>
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