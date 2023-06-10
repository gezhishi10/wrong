<template>
    <div >
        <div class="font-bold text-3xl text-gray-800 flex justify-center items-center">护工欢迎回来</div>
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
               <el-input v-model="form.email" placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
            </el-form-item>
          
            <div class="demo-form-inline">
                <el-checkbox v-model="form.checked" class="remeberPwd">记住密码</el-checkbox>
                <el-link href="http://localhost:5173/#/admin_home" target="_self">忘记密码?</el-link>
              </div>
            <el-form-item>
              <el-button class="w-[250px]"  round type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
          </el-form>
          <el-link href="http://localhost:5173/#/register_nurse" target="_self" >没有账号？立即认证</el-link>
        </div>
      
      </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive } from "vue";
import axios from 'axios'
const form = reactive({
email:"",
password:"",
checked:false
});


const onSubmit = () => {
console.log(form.email)
console.log(form.password)
if(form.email==null||form.email==""||form.password==null||form.password=="")
  {
    ElMessage.error('账户或密码为空')
    return ;
  }
const user=JSON.stringify(form)
console.log(user)

var naid = localStorage.getItem("nurse"); //获取指定key本地存储的值
console.log("naid:"+naid)
if(naid!=null){
var jsonData = JSON.parse(naid);


form.email=jsonData.email;
form.password=jsonData.password
}


axios.post( 'nurse/login_nurse'+'?email='+form.email+'&password='+form.password).then(
  success=>{
    console.log(success);
    let data=success.data;
    console.log(data)
    if(data.code==0){
        ElMessage.error(data.msg);
        return;
    }
    if(form.checked==true)
    window.localStorage.setItem("nurse",nurse)
    else
    window.localStorage.removeItem("nurse")




  },
  error=>{

  }

)
};
</script>
<style scoped>
.demo-form-inline{
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}
</style>