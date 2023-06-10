<template>
  <div class="common-layout">
    <el-container>

      <div class="contain">
        <el-main>
          <div class="title">
            <span class="title-span">你的个人信息</span>
         
            <!-- <el-tag class="ml-2" :type="tagType"  >VIP</el-tag> -->
            <el-tag class="ml-2" type="danger" v-if="userData.isvip === '1'">VIP</el-tag>
            <el-tag class="ml-2" :type="tagType" v-else>user</el-tag>
            <el-button class="ml-2" v-if="userData.isvip === '0'" @click="open">充值为vip</el-button>

          </div>
          <div class="info">
            <p class="info-edit">编辑信息</p>
            <p class="info-little">*必填</p>
          </div>
          <div class="form">

            <el-form
                ref="formusersRef"
                :model="formusers"
                :rules="formrules"
                :inline="true"
                label-width="80px"
                class="demo-ruleForm"
            >
              <el-form-item
                  label="姓名"
                  prop="name"
              >
                <el-input
                    v-model="formusers.name"
                    style="height: 50px;width: 300px"
                />
              </el-form-item>
              <el-form-item
                  label="电话"
                  prop="tel"
              >
                <el-input
                    v-model="formusers.tel"
                    style="height: 50px;width: 300px"
                />
              </el-form-item>
              <div>
                <el-form-item
                    label="邮箱"
                    prop="email"
                >
                  <el-input
                      v-model="formusers.email"
                      style="height: 50px;width: 300px"
                      :disabled="true"
                  />


                </el-form-item>
                <el-form-item label="出生年月" required>
                  <el-col>
                    <el-form-item prop="birthday">
                      <el-date-picker v-model="formusers.birthday" type="date" label="Pick a date"
                                      placeholder="请选择出生年月" style="height: 50px;width: 300px" format="YYYY-MM-DD"
                                      value-format="YYYY-MM-DD" />
                    </el-form-item>

                  </el-col>
                </el-form-item>



              </div>


          </el-form>

          </div>
<!--          用户须知-->
          <div class="text">
            <span>知情同意</span>
          </div>
          <div class="need">
            <el-checkbox v-model="checked1" size="large" style="margin-top: 5px">
              <span >我同意接收来自Drual Hotel有限公司及其关联公司（“Drual集团”）通过邮寄、电子邮件、电话、短<br>
                信或其他即时通信工具发送的促销、活动邀请、特惠信息和资讯。</span>
            </el-checkbox>
            <el-checkbox v-model="checked2" size="large" style="margin-top: 5px">
              <span >
                *我已阅读并同意资料隐私和安全政策以及Drual Hotel集团与隐私相关的实务做法，其中包括将我的<br>
                个人信息传输至Drual Hotel集团在海外的实体及供应商
              </span>
            </el-checkbox>
            <el-checkbox v-model="checked3" label="*我想创建帐户。 我已年满18周岁，已阅读并同意一般条款及细则。" size="large"  style="margin-top: 5px"/>

          </div>

          <div class="but">
            <el-form-item>
              <el-button style="width: 100px;height: 40px" @click="returnPage">返回</el-button>
              <el-button type="primary" @click="submitForm(formusersRef)" style="width: 100px;height: 40px">Submit</el-button>
            </el-form-item>
          </div>


        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// 在 mounted 生命周期钩子中根据 users[0].vip 的值设置 tagType
import { onMounted } from 'vue';
import axios from "axios";
import router from "../../../router/index"


import type { FormInstance , FormRules} from 'element-plus'
import {ElMessage,ElMessageBox } from "element-plus";

const formusersRef = ref<FormInstance>()

const formusers = ref({})
const userData = ref({}); // 定义用户信息数据




onMounted(() => {

  var naid=localStorage.getItem("userData");
  var jsonData = JSON.parse(naid);
  console.log("jsonData:"+jsonData.email)

  axios.get('/user/getuser?email='+jsonData.email)
      .then(response => {
        console.log(response)
       userData.value=response.data.data;
       console.log("userData.value"+userData.value)

        formusers.value.name=userData.value.name;
        formusers.value.tel=userData.value.tel;
        formusers.value.email=userData.value.email;
        formusers.value.birthday=userData.value.birthday;

          if (userData.value.isvip === "1") {
    tagType.value = 'danger';
  } else {
    tagType.value = 'info';
  }


      })
      .catch(error => {
        console.log(error);
      });
});



const open = () => {
  ElMessageBox.confirm(
    '你是否愿意花100元升级为vip?',
    'Warning',
    {
      confirmButtonText: '愿意',
      cancelButtonText: '再考虑下',
      type: 'warning',
    }
  )
    .then(() => {

      axios.get( 'user/becomevip'+'?email='+userData.value.email).then(
    success=>{
      console.log(success);
      userData.value.isvip="1"
   
    },
    error=>{

    }
  
)

      
      ElMessage({
        type: 'success',
        message: '支付成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功',
      })
    })
}
















const formrules=reactive<FormRules>({
  name: [
    { required: true, message: '请输入你的姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度为2-10', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入你的邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ],

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
})




const tagType = ref('');




const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)

// 返回按钮事件
function  returnPage(){
  router.push("../user")
}

// 提交按钮事件
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      console.log(formusers.value.birthday)

      var naid=localStorage.getItem("userData");
      var jsonData = JSON.parse(naid);
      axios.get('/user/getuser?email='+jsonData.email)
          .then(response => {
            console.log("2:"+response)

            // 创建一个副本来保存更新后的用户信息
            const updatedUser =response.data.data;
            updatedUser.name= formusers.value.name;
            updatedUser.tel= formusers.value.tel;
            updatedUser.birthday=formusers.value.birthday;


            axios.post('user/updatauserinfo',updatedUser)

                .then(response=>{
                  console.log("update")
                  // 处理成功响应
                  ElMessage({type: 'success', message: '修改成功!'})
                  // 重新获取数据，更新表格显示

                })
                .catch(error => {
                  // 处理错误
                  console.error('用户更新失败');
                  console.error(error);
                });
          })



      // const user=JSON.stringify(formusers);
      // console.log(user)
      // axios.post('user/changeuserinfo', user, {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      //     .then(response => {
      //       console.log(response.data);
      //     })
      //     .catch(error => {
      //       console.error(error);
      //     });
      //
      //
      //
      //
      //


    } else {
      console.log('error submit!')
      return ;
    }
  })
}




</script>


<style scoped>

.common-layout{
  background-color: #f8f8f8;
}

.flex-grow {
  flex-grow: 1;
}
el-main{

}

/*.el-footer{*/
/*  position: fixed;*/
/*  bottom: 0px;*/
/*  width: 100%;*/
/*  height: 40px;*/
/*  font-size: 10px;*/
/*  font-family: Arial;*/
/*  background-color: #222;*/
/*  border-top: 1px solid rgba(255, 255, 255, 0.2);*/
/*  color: #fff;*/
/*  line-height: 40px;*/
/*  padding-left: 15px;*/

/*}*/
.contain {

  margin-left: auto;
  margin-right: auto;


}

.title .title-span{
  font-size: 32px;
  font-family: Serif;

}

.contain .info .info-edit{
  font-size: 18px;
  font-family: sans-serif;
  margin-top: 40px;
  color: #736043;

}
.contain .info .info-little{

  font-size: 14px;
  font-family: sans-serif;
  margin-left: 750px;
  margin-bottom: 5px;

}
.need {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 40px;
}
.text{
  margin-top: 45px;
  font-size: 18px;
  color: #736043;
}



</style>