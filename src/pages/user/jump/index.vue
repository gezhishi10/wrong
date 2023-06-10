<template>

  <div class="main">
    <div class="content">
      <div class="container" style="text-align: left">
        <h1>奢华都市酒店</h1>
        <p>以下是最好的酒店预定网站，包括国际酒店的推荐 旅游和寻找便宜的酒店房间
          希望大家都来住宿...</p>
        <span><el-icon><ArrowDown /></el-icon></span>
      </div>
    </div>
    <div class="video">
      <video src="src/assets/video4.mp4" muted loop autoplay></video>
    </div>
    <div class="logo">
      <div class="center">
        <p class="ico" style="color: white"><el-icon><MoonNight /></el-icon></p>
        <p style="color: white">Drual Hotel</p>
      </div>
    </div>

  </div>
  <div class="introuduce">
    <div class="left">
      <h3>Drual Hotel</h3>
      <p>欢迎下榻Drual Hotel豪华度假胜式酒店。酒店坐拥优越的地理位置，便于宾客探索这座充满文化活力的繁华天使之城。</p>


    </div>
    <div class="right">
      <div style="margin-left: 40px">
        <p class="ico"><el-icon><MoonNight /></el-icon></p>
        <p>Drual Hotel</p>
      </div>

      <p style="padding-top: 10px">
        <span>
          <el-icon style="color: #867050;"><Message /></el-icon>
        </span>
        <span style="margin-left: 10px">
          邮箱：123@123.com
        </span>
      </p>
      <p style="padding-top: 10px"><el-icon style="color: #867050"><Iphone /></el-icon>
        <span style="margin-left: 10px">
          电话：1234
        </span>
      </p>
      <p style="padding-top: 10px"><el-icon style="color: #867050"><Location /></el-icon>

        <span style="margin-left: 10px">
          地址：吉首大学张家界校区
        </span>
      </p>
    </div>
  </div>
  
  <div class="centered">
    <img src="src/assets/roomstyle.jpg" class="centered-image">
    <div class="image-text">
      <p style="font-size: 35px;font-family: serif;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">高雅别致的住宿体验</p>
      <p style="font-size: 16px;font-family: serif;color: white">张家界吉首大学处宁静的港湾，以热烈的湘西风情打造名族豪华体验</p>
    </div>
  </div>
  <div class="title">
    <h3>体验</h3>
  </div>
  
  <div class="introuduce1">
    <div class="left1">
      <img src="src/assets/dinner.jpg" style="width: 650px;height: 320px">
    </div>
    <div class="right1">
<!--      <div style="margin-left: 40px">-->
<!--        <el-image style="width: 100px; height: 100px" :src="src/assets/dinner.jpg" :fit="fit" />-->
<!--      </div>-->

      <h3 style="font-size: 35px;color: #736043;">
        餐厅和酒吧
      </h3>
      <p class="theme">简介</p>
      <p>
        传承将欧洲风情与当地传统融为一体的凯宾斯基理念，我们开设多家风格各异的餐厅，满足您对美食的全方位需求。
      </p>
      <p class="theme">特色</p>
      <p style="color:#736043;margin-left: 10px">特色鸡尾酒</p>
      <p style="color:#736043;margin-left: 10px">莓屿</p>
      <p style="color:#736043;margin-left: 10px">伏特加、混合莓果、黑加仑利口酒和蜂蜜</p>
      <p class="theme">营业时间</p>
      <p style="color:#736043;margin-left: 10px">周一至周五下午5点到晚上12点</p>
      <p style="color:#736043;margin-left: 10px">周日下午5点到晚上12点</p>
    </div>
  </div>
  <div class="introuduce1">
  <div class="left1" style="margin-left: 150px">
    <h3 style="font-size: 35px;color: #736043;margin-top:40px">会议与活动</h3>
    <p style="font-size: 16px;padding-top: 20px">吉首大学张家界校区的理想会议与活动场所<el-icon style="margin-left: 10px;color: #867050"><DArrowRight /></el-icon></p>
  </div>
  <div class="right1" style="margin-bottom: 100px;display: flex;justify-content: center;align-items: center">
    <div class="image-wrapper">
    <img src="src/assets/session.jpg" style="width: 300px;height: 350px" class="image">
    <div class="image-text" style="color: white;font-size: 30px">会议</div>
    </div>
    <div class="image-wrapper">
    <img src="src/assets/session1.jpg" style="width: 300px;height: 350px;margin-left: 15px" class="image">
    <div class="image-text" style="color: white;font-size: 30px">活动</div>
  </div>
  </div>
</div>
<div class="title">
    <h3>我们的位置</h3>
  </div>

  <div class="mapp-container">
    <div id="mymap" style="width: 800px;height: 500px" class="mapp-centered">
    </div>
  </div>



</template>

<script lang="ts" setup>
import {reactive,onMounted} from "vue";
onMounted(()=>{
  const BMapGL=window.BMapGL;
  var map = new BMapGL.Map("mymap");    // 创建Map实例
  map.centerAndZoom(new BMapGL.Point(110.463172, 29.138475), 18);  // 初始化地图,设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  /*设计标记点*/
  var marker1 = new BMapGL.Marker(new BMapGL.Point(110.463172, 29.138475));
// 在地图上添加点标记
  map.addOverlay(marker1);
})

</script>


<style scoped>

*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}

 *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content{
  /*background-color: inherit;*/
  width: 100vw;
  height: 800px;
  display: flex;
  /*align-items: center;*/



}
.container{
  width: 88%;
 /*margin-left: -350px;*/
 /* margin-top: -100px;*/
  line-height: 1.8;
  z-index: 5;

}
.container h1{
  width: 90%;
  font-size: 45px;
  font-weight: 300;
  border-bottom: 2px solid #736043;
  /*position: absolute;*/
  font-family: serif;
  /* margin-left: -300px; */
  margin-top: 250px;
  color: white;

}
/*.container h3{
/*  width: 60%;
/*  font-size: 38px;
/*  font-weight: 400;

/*}*/
.container p{
  width: 100%;
  padding-top: 40px;
  font-size: 16px;
  margin-left: -800px;
  /* margin-left: -1600px; */
  margin-top: 400px;
  font-family: serif;

}


.video{
  position: absolute;
  left: 0;
  top: 0;
  top:60px;
  z-index: -1;
}
.container span{
  /*position: absolute;*/
  font-size: 40px;
  color:blueviolet;
  font-weight: 400;
  display: block;
  margin-top: 600px;
  margin-left: -1600px;
  position: relative;
  /*top:0;*/
  animation: move 1s infinite;
  color: white;

}
@keyframes move {
  0%{
    top:0;
  }
  50%{
    top:20px;
  }
  100%{
    top:0;
  }

}
.logo{
  position: absolute;
  top:80px;
  left: 50px;
  z-index: 6;
  margin-left: 650px;



}
.logo p{
  font-size: 21px;
  color: white;
  font-family: serif;
  color: #736043;

}
.ico {
   margin-left: 45px;
   color: #736043;
 }
.container > *{
    background-color:inherit;
  }

.introuduce {
  margin-top: 80px;
  display: grid;
  grid-template-columns: 2fr 1fr; /* 两列等分 */
  grid-gap: 10px; /* 列间距 */
  font-family: serif;
}
.left{
  margin-left: 100px;
}
.left h3{
  font-size: 32px;
  color: #736043;

}
.left p{
  padding-top: 20px;
  width: 60%;

}
.right {
  border-left: 2px solid #867050; /* 添加蓝色的左侧边框作为分割线 */
  padding-left: 50px; /* 可选：为右侧内容添加左侧内边距，使内容与分割线有间隔 */
}

.centered {
  position: relative;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 设置容器高度，确保图片垂直居中 */
  margin-top: 80px;

}
.centered-image {
  max-width: 100%; /* 可选：限制图片最大宽度 */
  max-height: 100%; /* 可选：限制图片最大高度 */
  transition: transform 0.3s; /* 添加过渡效果 */

}
.centered-image:hover {
  transform: scale(1.1); /* 鼠标悬浮时放大图片 */
}
.image-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: black;
  font-size: 24px;
  font-weight: bold;


}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.title h3 {
  position: relative;
  font-size: 35px;
  font-family: serif;
  padding: 5px 0;
  margin-bottom: 10px;
}

.title h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5px;
  background-color: #867050;
}

.introuduce1{

  margin-top: 80px;
  display: grid;
  grid-template-columns: 2fr 1fr; /* 两列等分 */
  grid-gap: 10px; /* 列间距 */
  font-family: serif;

}
.left1{
  margin-left: 120px;

}
.right1{
  margin-left: -40px;

}
.right1 .theme{
  color: #828387;
  font-size: 12px;
  font-family: sans-serif;
}
.right1 .image-wrapper{
  position: relative;
}
.image {
  width: 300px;
  height: 350px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.image:hover {
  transform: scale(1.1);
}
.mapp-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin-top: -50px;
}

.mapp-centered {
  width: 1000px;
  height: 500px;
}



</style>