
<!-- 引入windiCSS -->

<template>
    <div>
      <el-row class="min-h-screen bg-blue-500">
        <el-col :span="16" class="flex justify-center items-center">
          <div>
            <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
            <div class="text-gray-200 text-sm ">欢迎来到大眼票务系统,你会在这里得到极致的购买体验</div>
          </div>
        </el-col>
        <el-col
          :span="8"
          class="bg-light-50 flex justify-center items-center flex-col"
        >
          <div >
            <div class="font-bold text-3xl text-gray-800 flex justify-center items-center">欢迎回来</div>
            <div class="flex justify-center items-center my-5 text-gray-300
            space-x-2">
              <!-- h-[1px]等价于height:1px -->
              <span class="h-[1px] w-16  bg-gray-200"></span>
              <span>账号密码登录</span>
              <span class="h-[1px] w-16  bg-gray-200"></span>
            </div>
            <div>
              <el-form :model="form" class="w-[250px]">
                <el-form-item>
                   <el-input v-model="form.email" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item>
                   <el-input v-model="form.password " placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item>
                  <el-button class="w-[250px]"  round type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import axios from 'axios'
  
  // do not use same name with ref
  const form = reactive({
    email:"",
    password:""
  });
  
  const onSubmit = () => {
    console.log(form.email)
    console.log(form.password)
    const user=JSON.stringify(form)
    console.log(user)
  
  
  
  
    axios.post( 'user/login_json',user).then(
      success=>{
        console.log(success);
  
      },
      error=>{
  
      }
    
  )
  
  
  
  //   axios.post( 'user/login_user'+'?email='+form.username+'&password='+form.password).then(
  //     success=>{
  //       console.log(success);
  
  //     },
  //     error=>{
  
  //     }
    
  // )
    };
  </script>