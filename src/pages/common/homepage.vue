
<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
        <el-menu-item index="0">    <a href="#section1" @click.prevent="scrollToSection('#section1')">eva酒店管理系统</a></el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">  
          <a href="#section1" @click.prevent="scrollToSection('#section1')">首页</a>
         </el-menu-item>
        
        <el-menu-item index="2"> 
           <a href="#section2" @click.prevent="scrollToSection('#section2')">产品</a> 
          </el-menu-item>


        <el-menu-item index="3">  
          <el-link href="http://localhost:5173/#/login" >登录</el-link>
         </el-menu-item>
         <!-- <el-menu-item index="4">  
          <el-link href="https://element-plus.org">注册</el-link>
         </el-menu-item> -->
      </el-menu>
    </el-header>

    <el-main>

      <div class="pre" id="section1">
        <div style="position: relative;">
          <img src="../../assets/hoenpage_top1.jpg" alt="Image description" style="width: 100%;">
          <p
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: black; font-size: 50px; font-family: 'Monotype Corsiva', cursive;">
            <span style="display: block;color: #fff;">互联网+酒店云</span>
            <span style="display: block; font-size: 30px; font-family: Arial, sans-serif; color: #fff;">Internet Plus Hote Cloud</span>
          </p>
        </div>
      </div>
      <div class="product" id="section2">
        <div class="container_product">
          <div class="text1"> <strong>互联网+酒店管理系统</strong></div>
          <div class="text2 ">智慧酒店管理系统基于PC、400电话等移动互联网技术的接单平台搭<br>建，对订单的全程跟踪管理，
            酒店筛选、酒店增加、核定价格、结算通<br>知、服务评价等一系列管理功能</div>
        </div>
        <div>
          <div class="container">
      <div class="item1">
        <img src="../../assets/01.jpg" alt="图片1">
        <div class="item-text">在线预约</div> <!-- 添加文字描述 -->
      </div>
      <div class="item2">
        <img src="../../assets/02.jpg" alt="图片2">
        <div class="item-text">订单管理</div> <!-- 添加文字描述 -->
      </div>
      <div class="item3">
        <img src="../../assets/03.jpg" alt="图片3">
        <div class="item-text">酒店信息管理</div> <!-- 添加文字描述 -->
      </div>
      <div class="item4">
        <img src="../../assets/04.jpg" alt="图片4">
        <div class="item-text">财务管理</div> <!-- 添加文字描述 -->
      </div>
      <div class="item5">
        <img src="../../assets/05.jpg" alt="图片5">
        <div class="item-text">统计分析</div> <!-- 添加文字描述 -->
      </div>
      <div class="item6">
        <img src="../../assets/06.jpg" alt="图片6">
        <div class="item-text">人文关怀</div> <!-- 添加文字描述 -->
      </div>
   
    </div>
        </div>

        <div style="display: flex; margin-top: 150px;">
  <img src="../../assets/Duplex Suite 2.jpg" style="margin-right: 10px; width: 50%;">
  <img src="../../assets/Premier Suite.jpg" style="width: 50%;">
</div>  











<div class="card_container" style="padding-top: 130px;">

  <el-card class="box-card card">
    <template #header>
      <div class="card-header">
        <span>用户</span>
     
      </div>
    </template>
    <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
  <div class="text item">登录注册</div>
  <div class="text item">预约酒店</div>
  </el-card>



  <el-card class="box-card card">
    <template #header>
      <div class="card-header">
        <span>管理员</span>
     
      </div>
    </template>
    <div>账户管理</div>
    <div>订单管理</div>
    <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
  </el-card>
  
</div>

      </div>


    </el-main>



    <el-footer style="margin-top: 100px;">
    
     
      <div class="footer">
      <p>&copy; 2023 koshi484. All Rights Reserved.</p>
    </div>

    </el-footer>
  </el-container>
</template>
      
<script lang="ts" setup>
import { ref ,} from 'vue'

const activeIndex = ref('1')


const scrollToSection = (selector) => {
    const elem = document.querySelector(selector);
    elem.scrollIntoView({ behavior: 'smooth' });
  };

  // 将 scrollToSection 转换为响应式引用
  const scrollToSectionRef = ref(scrollToSection);



      
</script>
      
<style>


.footer {
    background-color: white;
    padding: 20px;
    text-align: center;
  }

.card_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.card {
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
}












 .container {
  margin-left: 70px;
  margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 200px);
    gap: 1rem;
    height: auto;
    justify-items: center;
    align-items: center;
    padding-left: 5%; /* 左侧空白 */
    padding-right: 5%; /* 右侧空白 */
  }
  
  .container > * {
    background-color: #eee;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    font-size: 2rem;
    position: relative; /* 新增代码，设置父元素定位 */
    width: 80%; /* 子元素宽度 */
  }
  
  .item-text {
    position: absolute; /* 设置文字定位 */
    bottom: 0; /* 将文字定位到图片底部 */
    background-color: rgba(255, 255, 255, 0.8); /* 设置文字背景透明度 */
    text-align: center;
    width: 100%; /* 让文字宽度和图片宽度一致 */
    font-size: 0.8rem; /* 调整字体大小 */
    padding: 0.3rem;
    /* margin-left: 12px; */
  }
* {
  margin: none;
  padding: none;
}

.flex-grow {
  flex-grow: 1;
}

.product {
  margin-top: 80px;

}

.container_product {
  /* margin-top: 30px; */
  text-align: center;
}

.text1 {
  color: black;
  font-weight: bold;
  font-size: 30px;
  font-weight: 700px;
}

.text2 {
  margin-top: 20px;
  color: #a6a7aa;
  font-weight: 400;
 
}



</style>
      