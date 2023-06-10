<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick"

        >
          <el-tab-pane label="待付款" name="unpaid"></el-tab-pane>
          <el-tab-pane label="已付款" name="paid"></el-tab-pane>

        </el-tabs>
      </el-header>
      <el-main>

        <el-container style="height: 100vh;">
          <el-aside width="66.67%">
            <div class="left-content">
              <!-- 左侧内容 -->
              <p>我的订单</p>
              <el-divider content-position="right" class="custom-divider">

                  以下显示订单内容

              </el-divider>
              <router-view></router-view>
            </div>
          </el-aside>
          <el-main width="33.33%">
            <!-- 右侧内容 -->
            <el-card class="box-card" shadow="hover">
              <template #header>
                <div class="card-header">
                  <span style="font-size: 22px;font-family: serif">Drual Hotel</span>

                </div>
                <div class="text" style="font-size: 14px">

                    <div class="column-container" style="margin-top: 10px">
                      <div class="column">
                        <p>登记入住</p>
                        <span style="color: black">14:00之后</span>
                      </div>
                      <div class="column" style="margin-left: -150px">
                        <p>退房</p>
                        <span style="color: black">12:00之前</span>
                      </div>
                    </div>

                 <div class="text3">
                   <span>Thank you for your stay at this hotel are always welcome</span>
                 </div>
                  <div class="text4" style="margin-top: 15px;font-size: 16px">
                    <el-icon style="font-family: serif"><Coordinate /></el-icon>

                    <span class="booking-dates" style="padding-left:5px;font-size: 16px ">
                    我们酒店是当地最好的酒店，希望大家都来入住.....
                    </span>
                  </div>

                </div>
              </template>

              <div class="text5">
                <el-text style="font-size: 18px;font-family: serif"><el-icon><LocationInformation /></el-icon>地址</el-text>
                <span style="padding-left: 5px;color:#867050;font-family: serif">酒店坐落于吉首大学张家界校区</span>
              </div>
            </el-card>

            <el-card class="box-card" shadow="never" style="margin-top: 30px">
              <div class="text6">
                <p style="color: #736043;font-size: 22px">当你需要协助时，</p>
                <p>我们专业的预订团队随时竭诚为您提供服务。</p>
                <p>+86 10 8516 2888</p>
                <p>reservationpbj@peninsula.com</p>
              </div>


            </el-card>

          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { defineProps} from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  type: {
    type: String,
    required: true
  }
});

const router = useRouter();
var activeName = ref('unpaid');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab)
  console.log(tab.props.name,'tab')
  activeName = tab.props.name;
   router.push({
     path: tab.props.name
   })
 // router.push("user/order/${tab.paneName}");
}
// const onTabClick = (tab) => {
//   console.log("j");
//   console.log("jj+" + tab.name);
//   activeName.value = tab.name;
//   router.push({ name: `user/order/${tab.name}` });
// };
</script>

<style scoped>
.common-layout{
  background-color: #f8f8f8;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.left-content {
  height: calc(100vh - 16px); /* 减去滚动条的宽度 */
  overflow-y: auto;
  padding-right: 16px; /* 预留滚动条的宽度 */
}
.left-content p{
  font-size: 32px;
  font-family: serif;
}
.el-divider::after {
  background-color: #f8f8f8 !important;
}
.box-card {
  margin-top: 10px;

  border: none;
}
.text3,text4{
  font-weight: normal;
  font-size: 15px;
  font-family: sans-serif;
  color: #736043;
  margin-top: 15px;
}

.text6 p{
  font-family: serif;
  font-size: 19px;
  margin-bottom: 18px;
}
.column-container {
  display: flex;
  justify-content: space-between;
}

.column {
  flex: 1;
  font-weight: normal;
  font-size: 15px;
  font-family: sans-serif;
  color: #736043;

}
</style>