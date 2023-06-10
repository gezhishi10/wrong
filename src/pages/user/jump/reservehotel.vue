
<template>
  <el-container style="height: 100vh;" class="main">
    <el-aside width="66.67%">
      <div class="left-content">
        <span style="font-family: Arial,sans-serif">通过官网直接预订客房即可专享「半岛时间」，包括灵活安排入住和退房时间</span>
        <div class="select">
          <div class="select-left" style="margin-top: 15px">

            <el-icon><Avatar /></el-icon>
            <span class="text">客人</span>
            <el-select
                v-model="table.number"
                class="m-2"
                placeholder="Select"
                style="display: block;margin-top: 5px;width: 220px;height: 40px"

            >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
          <div class="divider-vertical"></div>
          <!--          <el-divider direction="vertical" content-position="center"  height="100px" />-->
          <div class="select-middle">
            <el-icon><Calendar /></el-icon>
            <span class="text">入住日期</span>
            <el-date-picker
                v-model="table.checkInDate"
                type="date"
                placeholder="Pick a day"
                style="display: block;padding-top: 6px;width: 220px;height: 41px"

            />
          </div>
          <div class="divider-vertical"></div>
          <div class="select-right">
            <el-icon><Calendar /></el-icon>
            <span class="text">退房日期</span>
            <el-date-picker
                v-model="table.checkOutDate"
                type="date"
                placeholder="Pick a day"
                style="display: block;padding-top: 6px;width: 220px;height: 41px"
            />

          </div>

        </div>

        <el-divider border-style="dashed"  style="background-color: #ab9b81"/>



        <div class="select-room" style="margin-top: 20px">
          <h3 style="font-size: 32px;font-family:serif">选择客房</h3>
          <div class="common-layout" style="background-color: #f8f8f8">
            <el-container>
              <el-header >
                <el-menu

                    class="el-menu-demo"
                    mode="horizontal"
                    :ellipsis="false"
                    style="background-color: #f8f8f8"

                >
                  <el-menu-item style="align-items: center;vertical-align: center">查询操作</el-menu-item>
                  <div class="flex-grow" />

                  <el-dropdown style="align-items: center;vertical-align: center">
                  <span class="el-dropdown-link">
                        {{ selectedOption }}
                        <el-icon class="el-icon--right">
                          <arrow-down />
                        </el-icon>
                  </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="selectOption('从高到低')">从高到低</el-dropdown-item>
                        <el-dropdown-item @click="selectOption('从低到高')">从低到高</el-dropdown-item>

                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>

                </el-menu>
              </el-header>
              <el-main>
                <div class="card-container">
                  <template v-for="type in sortedTypes">
                  <el-card :body-style="{ padding: '0px' }" class="card" shadow="hover"
                           v-if="shouldDisplayCard(type)"
                           :key="type.id"

                  >
                    <div class="card-content">
                      <img

                      :src="axios.defaults.baseURL+type.img"
                          class="image"
                      />
                      <div class="info">
                        <p class="info-title">{{ type.typename }}</p>
                        <span>容纳人数:</span>
                        <span class="people-number">{{type.num}}</span>
                        <el-divider direction="vertical" border-style="dashed" />
                        <span>面积</span>
                        <span style="display: block">{{type.typename}}配备尖端的客房科技和雅致家具，高速无线宽带和免费 VOIP网络电话<br>服务。浴室配备的水疗模式可助您在辛劳的一天后放松身心。</span>
                        <span
                            class="underline-text"
                            :class="{ 'underline-bold': isUnderline }"
                            @click="handleTextClick(type.typename)"
                            style="margin-top: 15px;font-size: 15px"
                        >
      查看详情
    </span>
<!--                        <el-link href="https://element-plus.org" target="_blank" :underline="false" style="margin-top: 15px;font-size: 15px">查看详情</el-link>-->
                        <div class="type-price"  style="text-align: right">
                          <p style="font-size: 21px;color: black">¥{{ type.price }}</p>
                          <p>每晚</p>
                          <p>不含税金和费用</p>
                        </div>
                        <div style="display: flex; justify-content: flex-end;margin-top: 15px">
                          <el-button style="background-color: #ab9b81;color: white;border-radius: 0;width: 110px;height: 40px" @click="gotoPage(type.typename,type.price)">立即预定</el-button>
                        </div>

                      </div>

                    </div>
                  </el-card>
</template>
                </div>

              </el-main>
            </el-container>
          </div>
        </div>

      </div>
    </el-aside>
    <el-main width="33.33%">
      <!-- 右侧内容 -->
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span style="font-size: 22px;font-family: serif">你的入住</span>

          </div>
          <div class="text" style="">
            <div class="text1">
              <p>登记入住</p>
              <p style="font-size: 15px;color: black">14:00之后</p>
            </div>

            <div class="text2">
              <p>退房</p>
              <p style="font-size: 15px;color: black">12:00之前</p>
            </div>

            <!--            显示预定时间-->
            <div class="text3">
              <el-icon><Calendar /></el-icon>

              <span class="booking-dates" style="padding-left:15px ">
      {{ formatBookingDate }}--{{ formatCheckOutDate }}
    </span>
            </div>

          </div>
        </template>




        <div class="text4">
          <el-text style="font-size: 22px;font-family: serif">总计：</el-text>
          <el-text style="margin-left: 100px">
            ￥ 0.00
          </el-text>
        </div>
      </el-card>

      <el-card class="box-card" shadow="never">
        <div class="text5">
          <p style="color: #736043;font-size: 22px">当你需要协助时，</p>
          <p>我们专业的预订团队随时竭诚为您提供服务。</p>
          <p>+86 10 8516 2888</p>
          <p>reservationpbj@peninsula.com</p>
        </div>


      </el-card>

    </el-main>
  </el-container>
</template>



<script lang="ts" setup>

import {computed, onMounted, ref} from 'vue'
import router from "../../../router/index"
import axios from "axios";
import {type} from "windicss/utils";

// 界面选择数据
const table = ref({
  number: '',
  checkInDate: '',
  checkOutDate: '',
  price:0
});



// 人数选择
const options = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
]

const formatBookingDate = computed(() => {
  const checkInDate = table.value.checkInDate;
  return formatDate(checkInDate);
});

const formatCheckOutDate = computed(() => {
  const checkOutDate = table.value.checkOutDate;
  return formatDate(checkOutDate);
});

const formatDate = (date) => {
  if (!date) return '';
  const options1 = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options1);
};


const selectedOption = ref('排序价格推荐');



//动态card
const types = ref([]);
const sortedTypes = ref([]);




// 发送 POST 请求获取后端数据
onMounted(()=>{
  axios.post('/type/getAllTypes')
      .then(response => {
        console.log(response.data)

        types.value = response.data.data.map(type => ({
          id: type.id,
          typename: type.typename,
          price: type.price,
          createtime: type.createtime,
          createname: type.createname,
          img: type.img,
          num: type.num,

        }));
        // if (types.value[6].length > 0) {
        //   // 假设第一个类型的 img 属性包含图片 URL
        //   const firstType = types.value[6];
        //   imageSrc.value = firstType.img ? firstType.img : '';
        // }
        // console.log('img',types.value);
        console.log(types.value);
        sortedTypes.value = [...types.value]; // 初始时，将排序后的数组设置为与获取的数组一致


      })
      .catch(error => {
        console.error(error);
      });
  // console.log("table"+options[0].value)
})
function shouldDisplayCard(type) {
  console.log("type:"+type.num+"table:"+table.value.number);
  return type.num !== undefined && (table.value.number === '' || Number(table.value.number) === type.num);
}


// console.log("num"+type.num);

// onMounted(() => {
//   console.log('Types:', types.value);
//   console.log('img',types.value[6]);
//
// });
// 预定按钮事件
// function  gotoPage(){
//   // window.open("../user/bookhotel?type=豪华套房")
//   router.push("../user/bookhotel?type="+types.value)
// }
function gotoPage(typename,price) {
  console.log(encodeURIComponent(price))
  router.push('../user/bookhotel?type=' + encodeURIComponent(typename)+'&price='+encodeURIComponent(price));
}
function sortByPrice(order) {
  if (order === '从高到低') {
    sortedTypes.value.sort((a, b) => {
      return b.price - a.price; // 从高到低排序
    });
  } else if (order === '从低到高') {
    sortedTypes.value.sort((a, b) => {
      return a.price - b.price; // 从低到高排序
    });
  }
}

const isUnderline = ref(false);
function handleTextClick(typename) {
  // 执行点击事件逻辑
  // ...

  // 切换下划线加粗状态
  isUnderline.value = !isUnderline.value;
  router.push('../user/everytype?type=' + encodeURIComponent(typename));


}

function selectOption(option) {
  selectedOption.value = option;
  sortByPrice(option); // 调用排序函数
}

</script>

<style scoped>
.main{
  font-family: sans-serif;
  background-color: #f8f8f8;
}


.left-content {
  height: calc(100vh - 16px); /* 减去滚动条的宽度 */
  overflow-y: auto;
  padding-right: 16px; /* 预留滚动条的宽度 */
  margin-top: 15px;
  margin-left: 80px;
}

.select {
  margin-top: 15px;
  display: flex;
  align-items: center;
  background-color: white;
}

.select span,el-icon{
  color: #736043;
  font-size: 15px;
  padding-left: 5px;

}



.select-left {
  /*margin-top: 10px;*/
  flex: 1;
  align-items: center;

  justify-content: center;
  margin-left: 10px;
}
.select-middle{
  /*margin-top: 8px;*/
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
.select-right{
  /*margin-top: 6px;*/
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
.divider-vertical {
  width: 1px; /* 设置分割线宽度 */
  height: 65px; /* 设置分割线高度 */
  background-color: #ab9b81; /* 设置分割线颜色 */
  /*margin: 0 10px; !* 设置分割线的间距 *!*/
  margin-right: 60px;
  margin-top: 10px;


}





.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.type-price p{
  font-size: 14px;
  color: #6D6D6D;
  font-family: sans-serif;
}


.text {
  font-size: 14px;
}



.box-card {
  margin-top: 40px;
  width: 480px;
  border: none;
}

.text1,text2{

  font-weight: normal;
  font-size: 15px;
  font-family: sans-serif;
  color: #736043;
}
.text2{
  font-weight: normal;
  font-size: 15px;
  font-family: sans-serif;
  color: #736043;

}
.text3{
  padding-top: 15px;
  color: black;
  font-size: 15px;
  font-family: sans-serif;
}
.text5 p{
  font-family: serif;
  font-size: 19px;
  margin-bottom: 18px;
}

/*客房选择*/
.el-dropdown-link{
  border: none;
  outline: none;
}
.el-dropdown-link:hover {
  outline: none;
}


/*卡片排列*/
.card-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}
.card{
  margin-top: 10px;
  background-color: #f8f8f8;
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
  /*flex-grow: 1;*/
  /*padding: 14px;*/
}
.info .info-title{

  font-size: 22px;
  font-family: serif;
  color: #736043
}
.info span{

  margin-top: 20px;
  font-size: 13px;
  font-family: sans-serif;
}

/*链接样式*/
.el-link {
  color: #736043;
  text-decoration: underline;
  text-decoration-color: #736043;
}

.el-link:hover {
  color: #736043;
  font-weight: bold;
  /*text-decoration-style: double;*/
}


.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

/*//查看详情*/
.underline-text {
  text-decoration: underline;
  cursor: pointer;
  color: #736043;
}

.underline-bold {
  font-weight: bold;
  text-decoration-color: #736043;
}
.underline-text:hover{
  font-weight: bold;

}
</style>
