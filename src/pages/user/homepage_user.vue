<template>
    <el-container class="main">
      <el-header>
        <el-menu
  
  
            :router="true"
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
  
        >
          <el-menu-item >LOGO</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="/user/index">首页</el-menu-item>
          <el-menu-item index="/user/reserve">预定客房</el-menu-item>
          <el-menu-item index="/user/order/unpaid">订单</el-menu-item>
          <el-sub-menu index="/user">
            <template #title>
              <!--            axios.defaults.baseURL-->
              <div class="block" style="margin-top: -30px;margin-right: 10px">
                <el-avatar size='small' :src="axios.defaults.baseURL+user.img" />
              </div>
              账号：{{user.name}}
            </template>
            <el-menu-item index="/user/information">个人信息</el-menu-item>
            <el-menu-item  @click="updatePas">修改密码</el-menu-item>
            <el-menu-item index="4-3" @click="logout()">注销</el-menu-item>
  
          </el-sub-menu>
        </el-menu>
      </el-header>
  
      <el-main class="main">
  <router-view></router-view>
  
  
  
      </el-main>
  
      <el-footer class="bottom">&copy; 2023 koshi484. All Rights Reserved.</el-footer>
    </el-container>
  
  <!--  修改密码对话框-->
    <el-dialog
        v-model="dialogFormVisible"
        :before-close="handleClose"
        title="修改密码">
      <el-form ref="ruleFormRef" :model="formusers" :rules="rules" label-width="120px" class="demo-ruleForm"
               >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formusers.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formusers.email" />
        </el-form-item>
  
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formusers.gender">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
  
        <el-form-item label="密码" prop="password">
          <el-input v-model="formusers.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="comfirmpassword">
          <el-input v-model="formusers.comfirmpassword" type="comfirmpassword" placeholder="请确认密码"
                    show-password />
        </el-form-item>
  
  
  
  
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="formusers.tel" />
  
        </el-form-item>
  
        <el-form-item label="出生年月" required>
          <el-col>
            <el-form-item prop="birthday">
              <el-date-picker v-model="formusers.birthday" type="date" label="Pick a date"
                              placeholder="请选择出生年月" style="width: 100%" format="YYYY-MM-DD"
                              value-format="YYYY-MM-DD" />
            </el-form-item>
  
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            提交
          </el-button>
  <!--        <el-button @click="resetForm(userData[0])">重置</el-button>-->
        </el-form-item>
      </el-form>
  
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
  import {computed, onMounted, reactive, ref,} from 'vue'
  import {ElMessage, ElMessageBox, FormInstance, FormRules} from "element-plus";
  import axios from "axios";
  import router from '../../router/index.js'
  const activeIndex = ref('/user/index')
  const ruleFormRef=ref<FormInstance>()
  
  //
  // const userData = ref({});
  
  const formusers=ref({});
  
  
  
  const confirmPasswordError = ref('');
  const dialogFormVisible = ref(false)//初始化弹窗不显示
  
  
  function logout(){
    localStorage.removeItem("userData");
    localStorage.removeItem("user");
    router.push({path:"/login"})
    // router.push({ path: "/user" })
  
  }

  const user=ref({})
  onMounted(()=>{
    var naid=localStorage.getItem("userData");
    var jsonData=JSON.parse(naid);
    console.log("jsonData:"+jsonData.email)

    axios.get('/user/getuser?email='+jsonData.email)
        .then(response=>{
          console.log(response)
          user.value=response.data.data;

          console.log("userData.value"+user.value.img)


        }).catch(error => {
      // 处理错误
      console.error('用户更新失败');
      console.error(error);
    });

  })





  const submitForm = (formEl: FormInstance | undefined) => { // 定义一个名为 dialogOk 的箭头函数
  
  
    console.log("hh")
    if (!formEl) return
     formEl.validate((valid) => {
      if (valid) {
        console.log('submit-successful!')
        console.log(formusers.value.birthday)
  
        var naid=localStorage.getItem("userData");
        var jsonData = JSON.parse(naid);
        axios.get('/user/getuser?email='+jsonData.email)
            .then(response => {
              console.log("3:"+response)
  
              // 创建一个副本来保存更新后的用户信息
  
              const updatedUser={
                tel:formusers.value.tel,
                email :formusers.value.email,
                password :formusers.value.password
              }
              console.log(updatedUser.tel,updatedUser.email,updatedUser.password)
  
              // ${formusers.value.tel}${formusers.value.email}${formuser.value.password}
  
  
              axios.post('/user/forgetPassword?'+"tel="+updatedUser.tel+"&email="+updatedUser.email+"&password="+updatedUser.password)
                  .then(response=>{
                    console.log(updatedUser.tel,updatedUser.email,updatedUser.password)
                    dialogFormVisible.value = false // 设置对话框的显示状态为 false，将其关闭
                    console.log("update pas successful")
                    // 处理成功响应
                    ElMessage({type: 'success', message: '修改成功!'})
                    // 重新获取数据，更新表格显示
  
                  })
                  .catch(error => {
                    // 处理错误
                    ElMessage({type: 'error', message: '修改失败!'})
                    console.error('用户密码更新失败');
                    console.error(error);
                  });
            })
  
  
  
  
      } else {
        console.log('error submit!')
        return ;
      }
    })
  }
  
  
  
  
  
  function updatePas(row){ // row 为当前行的数据
    dialogFormVisible.value = true // 设置对话框显示状态为 true
    // tableform.value = {...row} //表单数据设置为传入行数据
    // tableform.value.comfirmpassword=row.password
    // dialogType.value = 'edit' // 设置对话框类型为 "edit"，方便修改弹窗标题
  }
  
  // const resetForm(row) {
  //
  //   tableform.value = {...row} //表单数据设置为传入行数据
  //   tableform.value.comfirmpassword=row.password
  //
  // }
  
  const rules = reactive<FormRules>({
    name: [
      { required: true, message: '请输入你的姓名', trigger: 'blur' },
      { min: 2, max: 10, message: '长度为2-10', trigger: 'blur' },
    ],
    email: [
      { required: true, message: '请输入你的邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
    ],
    // relationship: [
    //     {
    //         required: true,
    //         message: '请选择你的关系',
    //         trigger: 'change',
    //     },
    // ],
    tel: [
      {
        required: true,
        message: '请输入你的手机号码',
        trigger: 'blur',
      },
      {
        pattern: /^1[3456789]\d{9}$/,
        message: '手机号码格式不正确',
        trigger: 'blur'
      }
  
    ],
    birthday: [
      {
        type: 'date',
        required: true,
        message: '请选择你的出生年月',
        trigger: 'change',
      },
    ],
    gender: [
      {
        required: true,
        message: '请选择你的性别',
        trigger: 'change',
      },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 5, max: 20, message: '长度为5-20', trigger: 'blur' },
    ],
    comfirmpassword: [
      { required: true, message: '请确认密码', trigger: 'blur' },
      { min: 5, max: 10, message: '长度为5-20', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value === formusers.value.password) {
            callback();
            confirmPasswordError.value = '';
          } else {
            callback(new Error('确认密码与密码不一致'));
            confirmPasswordError.value = '确认密码与密码不一致';
          }
        },
        trigger: 'blur'
      }
    ],
  
  })
  
  //
  // const scrollToSection = (selector) => {
  //   const elem = document.querySelector(selector);
  //   elem.scrollIntoView({ behavior: 'smooth' });
  // };
  //
  // // 将 scrollToSection 转换为响应式引用
  // const scrollToSectionRef = ref(scrollToSection);
  
  
  
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
  }
  
  
  </script>
  
  <style scoped>
  .main{
    /*background-color: #f8f8f8;*/
  }
  
  .bottom{
  
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 40px;
    font-size: 10px;
    font-family: Arial;
    background-color: #222;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    line-height: 40px;
    padding-left: 15px;
  
  
  }
  
  
  
  
  </style>
  