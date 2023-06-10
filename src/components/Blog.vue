<template>
    <div>
      <a href="#section1" @click.prevent="scrollToSection('#section1')">跳转到第一部分</a>
      <a href="#section2" @click.prevent="scrollToSection('#section2')">跳转到第二部分</a>
    
      <el-scrollbar ref="scrollContainer">
        <div id="section1">
          <ul>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
            <li>qwq</li>
          </ul>
        </div>
        <div id="section2">
          <ul>
            <li>TwT</li>
            <li>TwT</li>
            <li>TwT</li>
            <li>TwT</li>
            <li>TwT</li>
            <li>TwT</li>
            <li>TwT</li>
            <li>TwT</li>
            <li>TwT</li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const scrollToSection = (selector) => {
    const elem = document.querySelector(selector);
    elem.scrollIntoView({ behavior: 'smooth' });
  };

  // 将 scrollToSection 转换为响应式引用
  const scrollToSectionRef = ref(scrollToSection);

</script>

  












  <!-- <template>
    <div class="container">
      <div class="item1">
        <img src="../assets/01.jpg" alt="图片1">
        <div class="item-text">这是图片1</div> 
      </div>
      <div class="item2">
        <img src="../assets/02.jpg" alt="图片2">
        <div class="item-text">这是图片2</div>
      </div>
      <div class="item3">
        <img src="../assets/03.jpg" alt="图片3">
        <div class="item-text">这是图片3</div> 
      </div>
      <div class="item4">
        <img src="../assets/04.jpg" alt="图片4">
        <div class="item-text">这是图片4</div> 
      </div>
      <div class="item5">
        <img src="../assets/05.jpg" alt="图片5">
        <div class="item-text">这是图片5</div> 
      </div>
      <div class="item6">
        <img src="../assets/06.jpg" alt="图片6">
        <div class="item-text">这是图片6</div>
      </div>
    </div>
  </template>
   -->
  <!-- <style>
  .container {
    display: grid;
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: repeat(2, 200px);
    gap: 1rem;
    height: 100vh;
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
  }
  </style> -->


  <!-- <template>
    <div class="footer">
      <p>&copy; 2023 ChatAi. All Rights Reserved.</p>
    </div>
  </template> -->
  
  <!-- <style>
  .footer {
    background-color: white;
    padding: 20px;
    text-align: center;
  }
  </style> -->