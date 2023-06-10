<template>
  <div class="box">
    <div class="image">
      <img :src="axios.defaults.baseURL+typeimg" alt="Image" />
    </div>
    <div class="description">
      <p class="title">{{typeValue}}</p>
      <div class="info1" style="">
        <span style="color: #736043;font-size: 30px">199.00¥</span>
        <span>/每晚</span>
      </div>
      <div class="info">
        <span>面积：</span>
        <span class="">20平方米</span>
      </div>
      <div class="info">
        <span>入住人数：</span>
        <span>2</span>
      </div>
      <div class="info">
        <span>服务：</span>
        <span>无线网络、电视机、卫生间</span>
      </div>

    </div>
  </div>

    <div class="allcomment" style="margin-top: 50px">
      <el-divider content-position="left">用户点评</el-divider>
      <template v-for="typecomment in typecomments">
      <div class="-commentype" style="border-radius: 20px;background-color: rgba(238, 241, 244, 1);margin-left: 10px;margin-top: 5px;margin-bottom: 20px">
        <div class="typecom" style="padding-left: 5px; display: flex; align-items: flex-start;margin-left: 10px;padding-top: 10px">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <div style="margin-left: 10px;">
            <span style="color: #4A4A4A">{{typecomment.createname}}</span>
            <p style="color: #5A5B5E;font-size: 12px;font-family: sans-serif">{{typecomment.commenttime}}</p>
          </div>
        </div>
        <div style="margin-left: 65px;margin-top: 5px">
          <p style="color: #736043">
            {{typecomment.content}}
          </p>
        </div>
      </div>
  </template>



  </div>


</template>

<script lang="ts" setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const typeValue = ref('');
onMounted(() => {
  const route = useRoute();
  typeValue.value = route.query.type as string;

  console.log("type:"+typeValue.value)

});

const typecomments=ref([]);
const typeimg=ref('');
onMounted(()=>{

  axios.post('/roomComment/getRoomCommentByRoomtype?roomtype='+typeValue.value.toString())
      .then(response=>{


        console.log(response.data)
        typecomments.value=response.data.data.map(typecomment=>({
          createname:typecomment.createname,
          commenttime:typecomment.commenttime,
          content:typecomment.content,


        }));
        console.log("typecomments="+typecomments.value[0]);


      })
      .catch(error => {
    console.error(error);
  });

  axios.post('/type/getOneTypeInfo?typename='+typeValue.value.toString())
      .then(response=>{



        console.log("img"+response.data.data);
        const type=ref({})
        type.value=response.data.data;

        typeimg.value=type.value.img;
        // typecomments.value=response.data.data.map(typecomment=>({
        //   createname:typecomment.createname,
        //   commenttime:typecomment.commenttime,
        //   content:typecomment.content,


        // })
        // );
        // console.log("typecomments="+typecomments.value[0]);


      })
      .catch(error => {
        console.error("2"+error);
      });


})





</script>

<style scoped>
.box {
  display: flex;
}

.image {
  flex-shrink: 0; /* Prevent image from shrinking */
  margin-left: 100px;
}

.image img {
  /*max-width: 100%;*/
  width: 730px;
  height: 450px;
}

.description {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 80px;
}
.description .title{
  color: #000000;
  font-size: 35px;
  padding-left: 5px;
  font-family: serif;
  margin-top: 10px;
  position: relative; /* Position the title relatively */
}
.title::after {
  content: ""; /* Create the pseudo-element */
  display: block; /* Make it a block element */
  position: absolute; /* Position it absolutely */
  bottom: -3px; /* Adjust the distance from the text */
  left: 10px; /* Align it with the text */
  width: 90%; /* Set the width to cover the entire text */
  height: 1px; /* Set the height of the line */
  background-color: #736043; /* Set the color of the line */

}
.info1{
  margin-top: 20px;
}
.info{
  margin-left: 5px;
  margin-top: 25px;
}
</style>