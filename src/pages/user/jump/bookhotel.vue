<template>
  <div class="comm-main">
  <el-container style="height: 100vh;">
    <el-aside width="66.67%">
      <div class="left-content">
        <!-- 左侧内容 -->

        <div class="common-layout">
          <el-container>
            <div class="contain">
              <el-main>
                <div class="title">
                  <span class="title-span">客人详细信息</span>
                  <el-tag class="ml-2" :type="tagType">VIP</el-tag>

                </div>
                <div class="info">
                  <p class="info-edit" style="font-size: 18px;font-family: Arial">联系信息</p>
                  <p class="info-little" style="margin-left: 780px">*必填</p>
                </div>
<!--                <div class="form">-->

<!--                  <el-form-->
<!--                      ref="formbookRef"-->
<!--                      :model="formbook"-->

<!--                      :inline="true"-->
<!--                      label-width="100px"-->
<!--                      class="demo-ruleForm"-->
<!--                      style="display: flex; flex-wrap: wrap; justify-content: flex-start;"-->
<!--                  >-->

<!--                    <div class="form-row">-->
<!--                      <el-form-item label="住户姓名" prop="bookname"-->
<!--                      :rules="[-->
<!--                          { required:true,message:'请输入姓名',trigger:'blur'},-->
<!--                          // { required:true,message:'请输入姓名',trigger:'blur'},-->

<!--                      ]"-->
<!--                      >-->
<!--                        <el-input v-model="formbook.bookname" style="height: 50px;width: 300px"/>-->
<!--                      </el-form-item>-->
<!--                      <el-form-item label="电话" prop="tel"-->
<!--                      :rules="[-->


<!--                                {-->
<!--                            required: true,-->
<!--      message: '请输入你的手机号码',-->
<!--      trigger: 'blur',-->
<!--    },-->
<!--    {-->
<!--      pattern: /^1[3456789]\d{9}$/,-->
<!--      message: '手机号码格式不正确',-->
<!--      trigger: 'blur'-->
<!--    }-->

<!--                        ]"-->
<!--                      >-->
<!--                        <el-input v-model="formbook.tel" style="height: 50px;width: 300px"/>-->
<!--                      </el-form-item>-->
<!--                    </div>-->

<!--                    <div class="form-row">-->
<!--                      <el-form-item label="邮箱" prop="createmail"-->
<!--                      :rules="[-->
<!--                          { required: true, message: '请输入你的邮箱', trigger: 'blur' },-->
<!--    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }-->
<!--                      ]"-->
<!--                      >-->
<!--                        <el-input-->
<!--                            v-model="formbook.createmail"-->
<!--                            style="height: 50px;width: 300px"-->
<!--                            :disabled="true"-->
<!--                        />-->
<!--                      </el-form-item>-->
<!--                      <el-form-item label="身份证号码" prop="idcard"-->
<!--                      :rules="[-->
<!--                           { required: true, message: '请填写证件号码', trigger: 'blur' },-->
<!--          {-->
<!--            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,-->
<!--            message: '证件号码格式有误！',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--                      ]">-->
<!--                        <el-input-->
<!--                            v-model="formbook.idcard"-->
<!--                            style="height: 50px;width: 300px"-->
<!--                        />-->
<!--                      </el-form-item>-->


<!--                    </div>-->
<!--                    <div class="form-row">-->
<!--                      <el-form-item label="入住日期" required-->
<!--                      :rules="[-->
<!--                           {-->
<!--      type: 'date',-->
<!--      required: true,-->
<!--      message: '请选择你的入住日期',-->
<!--      trigger: 'change',-->
<!--    },-->
<!--                      ]"-->
<!--                      >-->
<!--                          <el-form-item prop="bookend">-->
<!--                            <el-date-picker v-model="formbook.bookstart" type="date" label="Pick a date"-->
<!--                                            placeholder="Pick a day" style="height: 50px;width: 300px" format="YYYY-MM-DD"-->
<!--                                            value-format="YYYY-MM-DD" />-->
<!--                          </el-form-item>-->



<!--                      </el-form-item>-->
<!--                      <el-form-item label="退房日期"  required-->
<!--                                    :rules="[-->
<!--                           {-->
<!--      type: 'date',-->
<!--      required: true,-->
<!--      message: '请选择你的退房日期',-->
<!--      trigger: 'change',-->
<!--    },-->
<!--                      ]"-->
<!--                      >-->
<!--                          <el-form-item prop="bookend">-->
<!--                            <el-date-picker v-model="formbook.bookend" type="date" label="Pick a date"-->
<!--                                            placeholder="Pick a day" style="height: 50px;width: 300px;" format="YYYY-MM-DD"-->
<!--                                            value-format="YYYY-MM-DD" />-->
<!--                          </el-form-item>-->
<!--                      </el-form-item>-->
<!--                    </div>-->
<!--                  </el-form>-->


<!--                </div>-->
                <div class="form">
                  <el-form
                      ref="formbookRef"
                      :model="formbook"
                      :rules="rules"
                      label-width="100px"
                      class="demo-ruleForm"
                      style="display: flex; flex-wrap: wrap; justify-content: flex-end;"
                      algin="left"
                  >
                    <el-row>
                      <el-col :span="12">
                        <div class="form-row">
                          <el-form-item
                              label="住户姓名"
                              prop="bookname"

                          >
                            <el-input v-model="formbook.bookname" style="height: 50px; width: 300px" />
                          </el-form-item>
                        </div>
                        <div class="form-row">
                          <el-form-item
                              label="邮箱"
                              prop="useremail"

                          >
                            <el-input
                                v-model="formbook.useremail"
                                style="height: 50px; width: 300px"
                                :disabled="true"
                            />
                          </el-form-item>
                        </div>
                        <div class="form-row">
                          <el-form-item
                              label="入住日期"
                              prop="bookstart"

                          >
                            <el-date-picker
                                v-model="formbook.bookstart"
                                type="date"
                                label="Pick a date"
                                placeholder="Pick a day"
                                style="height: 50px; width: 300px"
                                format="YYYY-MM-DD"
                                value-format="YYYY-MM-DD"

                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="form-row">
                          <el-form-item
                              label="电话"
                              prop="tel"

                          >
                            <el-input v-model="formbook.tel" style="height: 50px; width: 300px" />
                          </el-form-item>
                        </div>
                        <div class="form-row">
                          <el-form-item
                              label="身份证号码"
                              prop="idcard"

                          >
                            <el-input v-model="formbook.idcard" style="height: 50px; width: 300px" />
                          </el-form-item>
                        </div>
                        <div class="form-row">
                          <el-form-item
                              label="退房日期"
                              prop="bookend"
                             
                          >
                            <el-date-picker
                                v-model="formbook.bookend"
                                type="date"
                                label="Pick a date"
                                placeholder="Pick a day"
                                style="height: 50px; width: 300px"
                                format="YYYY-MM-DD"
                                value-format="YYYY-MM-DD"

                            />
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
                <el-divider />
                <div class="tip">
                <p style="font-size: 18px">政策：</p>
                <div class="column-container">
                  <div class="column">
                    <p>登记入住</p>
                    <span>14:00之后</span>
                  </div>
                  <div class="column" style="margin-left: -650px">
                    <p>退房</p>
                    <span>12:00之前</span>
                  </div>
                </div>



                <p>客房1
                  <span>{{ typeValue }}</span>
                  一张特大双人床</p>
                <p>担保政策</p>

                <span>预订时需要提供信用卡担保。</span>
                <p>取消政策</p>
                <span>如欲取消任何预订，必须在到达前1天于当地时间下午3点前通知酒店，否则需支付一晚的违约金。</span>


              </div>

                <el-divider />
                <!--          用户须知-->
                <div class="text">
                  <span style="color: #736043;font-size: 18px">知情同意</span>
                </div>
                <div class="need">
                  <el-checkbox v-model="checked1" size="large" style="margin-top: 10px">
              <span >我同意接收来自Drual Hotel有限公司及其关联公司（“Drual集团”）通过邮寄、电子邮件、电话、短<br>
                信或其他即时通信工具发送的促销、活动邀请、特惠信息和资讯。</span>
                  </el-checkbox>
                  <el-checkbox v-model="checked2" size="large" style="margin-top: 10px">
              <span >
                *我已阅读并同意资料隐私和安全政策以及Drual Hotel集团与隐私相关的实务做法，其中包括将我的<br>
                个人信息传输至Drual Hotel集团在海外的实体及供应商
              </span>
                  </el-checkbox>
                  <el-checkbox v-model="checked3" label="*我想创建帐户。 我已年满18周岁，已阅读并同意一般条款及细则。" size="large"  style="margin-top: 10px"/>

                </div>
                <div class="but" style="margin-top: 25px;margin-left: 400px">
                  <el-form-item>
                    <el-button style="width: 140px;height: 40px" @click="returnPage">返回</el-button>
                    <el-button color="#ab9b81" :dark="isDark" @click="submitForm(formbookRef)" style="width: 140px;height: 40px;color: white">Submit</el-button>
                  </el-form-item>
                </div>


              </el-main>
            </div>

          </el-container>
        </div>
      </div>
    </el-aside>
    <el-main width="33.33%">

      <!-- 右侧内容 -->
      <el-card class="box-card" shadow="hover" style="width: 450px">
        <template #header>
          <div class="card-header">
            <span style="font-size: 22px;font-family: serif">您的入住</span>

          </div>
          <div class="column-container" style="margin-top: 10px">
            <div class="column">
              <p>登记入住</p>
              <span>14:00之后</span>
            </div>
            <div class="column">
              <p>退房</p>
              <span>12:00之前</span>
            </div>
          </div>
          <div class="text" style="">


            <!--            显示预定时间-->
            <div class="text3" style="margin-top: 10px">
              <el-icon><Calendar /></el-icon>

              <span class="booking-dates" style="margin-left: 10px">
      {{ formatBookingDate }}--{{ formatCheckOutDate }}
    </span>
            </div>
            <div class="text4" style="margin-top: 10px">
              <span style="color: #736043">每晚</span>
              <span style="margin-left: 200px">￥{{money}}</span>

            </div>

          </div>
        </template>




        <div class="text5">
          <el-text style="font-size: 22px;font-family: serif">总计：</el-text>
          <el-text style="margin-left: 100px">
            ￥
            <span>{{expense}}</span>
          </el-text>
        </div>
      </el-card>

      <el-card class="box-card" shadow="never" style="margin-top: 45px;width: 450px">
        <div class="text6">
          <p style="color: #736043;font-size: 22px">当你需要协助时，</p>
          <p>我们专业的预订团队随时竭诚为您提供服务。</p>
          <p>+86 10 8516 2888</p>
          <p>reservationpbj@peninsula.com</p>
        </div>


      </el-card>
    </el-main>
  </el-container>
</div>
</template>

<script lang="ts" setup>

import {computed, onMounted, reactive, ref} from "vue";
import type { FormInstance } from 'element-plus'
import {ElMessage, FormRules} from "element-plus";
import router from "../../../router/index"
import axios from "axios";

import { useRoute } from 'vue-router';


const typeValue = ref('');


const formbookRef = ref<FormInstance>()

const formbook=ref({})




const rules = reactive<FormRules>({
  bookname: [
{ required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  useremail: [

{ required: true, message: '请输入你的邮箱', trigger: 'blur' },
{ type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ],

  tel: [
{ required: true, message: '请输入你的手机号码', trigger: 'blur' },
{
  pattern: /^1[3456789]\d{9}$/,
      message: '手机号码格式不正确',
    trigger: 'blur'
},
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '手机号码格式不正确',
      trigger: 'blur'
    },

  ],
  bookstart: [
{ type: 'date', required: true, message: '请选择你的入住日期', trigger: 'change' }
  ],
  bookend: [
    { type: 'date', required: true, message: '请选择你的退房日期', trigger: 'change' }
  ],
  idcard:[

{ required: true, message: '请填写证件号码', trigger: 'blur' },
{
  pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|2))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
      message: '证件号码格式有误！',
    trigger: 'blur'
}
  ]



})

// var u = window.location;
// var strings = decodeURIComponent(u).split("=");
// console.log(strings[1]);
// console.log("1"+window.location)


// 勾选框默认值
const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(false)

// 返回按钮事件
function  returnPage(){
  router.push("../user/reserve")
}

//vip色卡
const tagType = ref('');
//用户信息
const userData=ref({})

onMounted(()=>{

  var naid=localStorage.getItem("userData");
  var jsonData = JSON.parse(naid);
  axios.get('/user/getuser?email='+jsonData.email)
  .then(response=>{
    userData.value=response.data.data;

    formbook.value.useremail=userData.value.email;
    if(userData.value.isvip=="1"){
      tagType.value='danger';
    }else {
      tagType.value='info';
    }


  })
  .catch(error=>{
    console.log("vip:"+"error vip"+error )
  });


})






// 提交按钮事件
const submitForm = (formEl: FormInstance | undefined) => {


  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')

      console.log(formbook.value.bookname)

      var naid=localStorage.getItem("userData");
      var jsonData = JSON.parse(naid);
      axios.get('/user/getuser?email='+jsonData.email)
          .then(response => {
            console.log("2:"+response)


            // 创建一个副本来保存更新后的用户信息
            // const updatedUser =ref({});
            // updatedUser.value.type=typeValue.value;
            // updatedUser.value.idcard=formbook.value.idcard;
            // updatedUser.value.tel=formbook.value.tel;
            // updatedUser.value.bookstart=formbook.value.bookstart;
            // updatedUser.value.bookend=formbook.value.bookend;
            // updatedUser.value.bookname=formbook.value.bookname

            // console.log(typeValue.value+formbook.value.idcard+"tel="+formbook.value.tel+"bookstart="+formbook.value.bookstart+"bookend="+formbook.value.bookend+"useremail"+formbook.value.createmail+"bookname="+formbook.value.bookname)

            console.log(formbook.value.useremail)
            axios.post('/order/produceBook?'+"roomtype="+typeValue.value+"&idcard="+formbook.value.idcard+"&tel="+formbook.value.tel+"&bookstart="+formbook.value.bookstart+"&bookend="+formbook.value.bookend+"&useremail="+formbook.value.useremail+"&bookname="+formbook.value.bookname)
                .then(response=>{

                  console.log("submit")
                  // 处理成功响应
                  ElMessage({type: 'success', message: '申请预定!'})
                  // ElMessage({type: 'success', message: '申请预定!'})
                  // 重新获取数据，更新表格显示

                })
                .catch(error => {
                  // 处理错误
                  ElMessage({type: 'error', message: '用户申请失败!'})
                  console.error('用户申请失败');
                  console.error(error);
                });
          })


    } else {
      console.log('error submit!')
      return ;
    }
  })

}

//显示时间
const formatBookingDate = computed(() => {
  const checkInDate = formbook.value.bookstart;
  console.log("time"+checkInDate)
  return formatDate(checkInDate);
});

const formatCheckOutDate = computed(() => {
  const checkOutDate = formbook.value.bookend;
  return formatDate(checkOutDate);
});

const formatDate = (date) => {
  if (!date) return '';
  const options1 = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options1);
};
//计算总费
const money = ref('0');

onMounted(() => {
  const route = useRoute();
  typeValue.value = route.query.type as string;
  money.value =parseFloat(route.query.price as string).toFixed(2);
  console.log("3"+typeValue.value)
  console.log("3"+money.value)
});

const expense = computed(() => {
  const checkInDate = formbook.value.bookstart;
  const checkOutDate = formbook.value.bookend;
  const price = parseFloat(money.value);

  if (checkInDate && checkOutDate) {
    const start = new Date(Date.parse(checkInDate));
    const end = new Date(Date.parse(checkOutDate));
    const days = (end - start) / (1000 * 60 * 60 * 24);
    if(userData.value.isvip=="1"){

      return (days * price * 0.8).toFixed(2);
    }else {
      return (days * price).toFixed(2);
    }

  }
  return 0;
});

</script>

<style scoped>
.comm-main{
  background-color: #f8f8f8;
}
.left-content {
  height: calc(100vh - 16px); /* 减去滚动条的宽度 */
  overflow-y: auto;
  padding-right: 16px; /* 预留滚动条的宽度 */
  margin-top: 15px;
  margin-left: 80px;
  bottom: 100px;



}

.title .title-span{
  font-size: 32px;
  font-family: Serif;

}
.info .info-edit{
  font-size: 18px;
  font-family: Arial,sans-serif;
  margin-top: 40px;
  color: #736043;

}
.contain .info .info-little{

  font-size: 14px;
  font-family: sans-serif;
  margin-left: 100px;
  margin-bottom: 5px;

}
.tip p{
  color: #736043;
  margin-top: 15px;
}
.tip span{
  color: #606266;
}
.column-container {
  display: flex;
  justify-content: space-between;
}

.column {
  flex: 1;

}

.column:last-child {
  /*margin-right: 0;*/
}

.box-card p{
  color: #736043;
}
.box-card {
  margin-top: 40px;
  width: 480px;
  border: none;
}
.text6{
  font-family: serif;
  font-size: 19px;
  margin-bottom: 18px;
}
.text6 p{
  color: #1a1a1a;
  margin-top: 20px;
}
</style>
