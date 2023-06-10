<template>
    <div>
      <input type="file" @change="handleFileChange"/>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="formData.name" placeholder="姓名">
        <input type="text" v-model="formData.description" placeholder="描述">
        <button type="submit">上传</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from "vue";
  import axios from "axios";
  
  const file = ref(null);
  const formData = reactive({
    name: "李四",
    description: "王五",
  });
  
  function handleFileChange(event) {
    file.value = event.target.files[0];
  }
  
  async function submitForm() {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", file.value);
  
    try {
      const response = await axios.post("/api/upload", formDataToSend);
      // 根据后端返回的响应进行相应的处理
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  </script>
  