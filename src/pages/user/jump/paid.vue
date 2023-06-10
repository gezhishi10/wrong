<template>
  <div class="card-container">
  <el-card class="box-card" shadow="hover" v-for="payment in payments">
    <template #header>
      <div class="card-header">
        <span>
          <el-icon><HomeFilled /></el-icon>
          Drual Hotel
        </span>
        <el-tag class="ml-2" type="success">已完成</el-tag>
<!--        <el-button class="button" text>已完成</el-button>-->
      </div>
    </template>
    <div class="card-content">
      <img

          src="src/assets/hotel5.jpg"
          class="image"
      />
      <div class="info">
        <div class="info1">
        <p>入住信息：</p>
        <div>
          <span>入住时间：</span>
          <span>{{payment.start}}至{{payment.end}}</span>
        </div>
        <div>
          <span>入住房号：</span>
          <span>{{payment.roomid}}</span>
        </div>
        <div>
          <span>入住人：</span>
          <span>{{name}}</span>
        </div>
        <div>
          <span>联系电话：</span>
          <span>{{payment.tel}}</span>
        </div>
      </div>
        <div class="info1">

          <p>订单信息：</p>
          <div>
            <span>订单编号：</span>
            <span>{{payment.id}}</span>
          </div>
          <div>
            <span>订单生成时间：</span>
            <span>{{payment.ordertime}}</span>
          </div>
        </div>
        <div class="type-price"  style="text-align: right;margin-right: 110px">
          <p style="font-size: 20px;color: #000000;font-family: serif">总消费：¥{{ payment.fee }}</p>

        </div>
        <el-button color="#ab9b81" :dark="isDark" @click="submitForm(payment.roomid)" style="width: 115px;height: 35px;color: white;text-align: right;margin-left: 380px;margin-top: 20px" :icon="Edit" round>在线评价</el-button>

      </div>

    </div>




  </el-card>
  </div>
  <el-dialog v-model="dialogFormVisible" title="在线评价">
    <el-form>
      <el-form-item label="评价" :label-width="100">
<!--        <el-input v-model="tableform.name" autocomplete="off"/>-->
        <el-input
            v-model="textarea"
            :rows="2"
            type="textarea"
            placeholder="展开说说对房间的想法吧..."
        />
      </el-form-item>

    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogOk">
        发布
      </el-button>
    </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import { Edit} from '@element-plus/icons-vue'
import axios from "axios";
import {ElMessage} from "element-plus";

const start=ref('2022-12-11')
const end=ref('2022-12-13')
const type=ref('豪华套间')


//动态card
const payments=ref([]);
onMounted(()=>{
  var naid=localStorage.getItem("userData");
  var jsonData = JSON.parse(naid);
  axios.post('/order/getpaidPayments?email='+jsonData.email)
      .then(response=>{


console.log(response.data)
        payments.value=response.data.data.map(payment=>({
          start:payment.start,
          end:payment.end,
          roomid:payment.roomid,
          id:payment.id,
          ordertime:payment.ordertime,
          fee:payment.fee,
          tel:payment.tel,

        }));
        console.log("payments="+payments.value[0]);


      }).catch(error => {
    console.error(error);
  });
})


//在线评价
const dialogFormVisible = ref(false)//初始化弹窗不显示
let tableform = ref({})//初始化弹窗表单数据
const textarea = ref('')
const hh=ref('');
function submitForm(roomid){


  dialogFormVisible.value = true // 设置对话框的显示状态为 true
  tableform.value={}

  hh.value=roomid;




}
function dialogOk(){
  console.log("submitform"+hh.value)
  var naid=localStorage.getItem("userData");
  var jsonData = JSON.parse(naid);
  axios.post('/roomComment/addRoomComment?email='+jsonData.email+"&roomid="+hh.value+"&content="+textarea.value)
      .then(response=>{
        console.log("submit")
        // 处理成功响应

        ElMessage({type: 'success', message: '发布成功!'})
        dialogFormVisible.value = false // 设置对话框的显示状态为 false，将其关闭
      }).catch(error => {
    // 处理错误

    ElMessage({type: 'error', message: 'error!'})
    console.error('发布失败');
    console.error(error);
  });


}



</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

/*卡片排列*/
.card-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}
.box-card{

  margin-top: 10px;
  width: 850px;
  border: none;


}


.card-content {
  display: flex;
}

.image {
  width: 290px;
  height: 190px;

  display: block;
}

.info {
  text-align: left;
  margin-left: 15px;
  margin-top: 5px;
  /*flex-grow: 1;*/
  /*padding: 14px;*/
}
.info .info1 p{
  font-size:12px;
  font-family: sans-serif;
  color: #828387;
}
.info .info1 span{
  font-size:16px;
  font-family: serif;
  color: #867050;
  margin-left: 10px;
}

</style>