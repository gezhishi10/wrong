<template>
    <div>
     <div class="main">
         <div class="content">
             <div class="content-top" id="D3"></div>
             <div class="content-bot" id="D2"></div>
         </div>
     <div class="left" id="D1">
     </div>
     </div>
   </div>
 </template>
     
     <script>
   import * as echarts from 'echarts';
  import { ref, onMounted, watch } from "vue";

  import axios from 'axios';

  export default {

    setup() {
      const genderNumber = ref([]);
      const userNumber=ref([]);
      const dateNumber=ref([])
          

      
      // 初始化用户性别数据图表
      const initChart3 = () => {
  var myChart3 = echarts.init(document.getElementById('D3'));
  var option3 = {
    title: {
      text: '客户性别统计'
    },
    tooltip: {},
    legend: {
      data: [{
        name: '男生',
        icon: 'circle',
        textStyle: {
          color: '#56c8ff'
        }
      }, {
        name: '女生',
        icon: 'circle',
        textStyle: {
          color: '#ff6e76'
        }
      }],
      selectedMode: 'single'  // 单选模式
    },
    xAxis: {
      data: ["女生", "男生"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [genderNumber.value.female, genderNumber.value.male],
      itemStyle: {
        color: function(params) {
          var colors = ['#ff6e76','#56c8ff']; // 女生：红色，男生：蓝色
          return colors[params.dataIndex];
        }
      },
      label: {
        show: true,
        position: 'top'
      },
      emphasis: {
        focus: 'series'
      }
    }]
  };
  myChart3.setOption(option3);
};
  
 // 初始化用户性别数据图表
 const initChart1 = () => {
        var myChart1 = echarts.init(document.getElementById('D1'));
        var option1 = {
   title: {
     text: '日预定状态'
   },
   tooltip: {
     trigger: 'axis'
   },
   legend: {
    //  data: [dateNumber.value.data[0].typename, dateNumber.value.data[1].typename, dateNumber.value.data[2].typename,
    //  dateNumber.value.data[3].typename, dateNumber.value.data[4].typename]
       data: [dateNumber.value.data[0].typename, dateNumber.value.data[1].typename, dateNumber.value.data[2].typename,
     dateNumber.value.data[3].typename, dateNumber.value.data[4].typename]
   },
   grid: {
     left: '3%',
     right: '4%',
     bottom: '3%',
     containLabel: true
   },
   toolbox: {
     feature: {
       saveAsImage: {}
     }
   },
   xAxis: {
     type: 'category',
     boundaryGap: false,
     data: [dateNumber.value.data[0].sevendays[0], dateNumber.value.data[0].sevendays[1], dateNumber.value.data[0].sevendays[2], 
     dateNumber.value.data[0].sevendays[3], dateNumber.value.data[0].sevendays[4], dateNumber.value.data[0].sevendays[5], 
     dateNumber.value.data[0].sevendays[6]]
   },
   yAxis: {
     type: 'value'
   },
   series: [
   
   
     {
       name: dateNumber.value.data[3].typename,
       type: 'line',
       stack: 'Total',
       data: [dateNumber.value.data[3].num[7], dateNumber.value.data[3].num[6], dateNumber.value.data[3].num[5], dateNumber.value.data[3].num[4],
       dateNumber.value.data[3].num[3], dateNumber.value.data[3].num[2], dateNumber.value.data[3].num[1]]
     },
     {
       name: dateNumber.value.data[2].typename,
       type: 'line',
       stack: 'Total',
       data: [dateNumber.value.data[2].num[7], dateNumber.value.data[2].num[6], dateNumber.value.data[2].num[5],
       dateNumber.value.data[2].num[4], dateNumber.value.data[2].num[3], dateNumber.value.data[2].num[2], dateNumber.value.data[2].num[1]]
     },
     {
       name: dateNumber.value.data[1].typename,
       type: 'line',
       stack: 'Total',
       data: [dateNumber.value.data[1].num[7], dateNumber.value.data[1].num[6], dateNumber.value.data[1].num[5], 
       dateNumber.value.data[1].num[4], dateNumber.value.data[1].num[3], dateNumber.value.data[1].num[2], dateNumber.value.data[1].num[1]]
     },
     {
       name: dateNumber.value.data[4].typename,
       type: 'line',
       stack: 'Total',
       data: [dateNumber.value.data[4].num[7], dateNumber.value.data[4].num[6], dateNumber.value.data[4].num[5], 
       dateNumber.value.data[4].num[4], dateNumber.value.data[4].num[3], dateNumber.value.data[4].num[2], dateNumber.value.data[4].num[1]]
     },
     {
       name: dateNumber.value.data[0].typename,//单人房间的数据
       type: 'line',
       stack: 'Total',
       data: [dateNumber.value.data[0].num[7], dateNumber.value.data[0].num[6], 
       dateNumber.value.data[0].num[5], dateNumber.value.data[0].num[4], dateNumber.value.data[0].num[3], 
       dateNumber.value.data[0].num[2], dateNumber.value.data[0].num[1]]
     },
   ]
 };
        myChart1.setOption(option1);
      };
  
  
      // 初始化图表
         const initChart2 = () => {
        var myChart2= echarts.init(document.getElementById('D2'));

        const gaugeData = [
   {
     value: userNumber.value.user,
     name: '普通用户',
     title: {
       offsetCenter: ['-40%', '80%']
     },
     detail: {
       offsetCenter: ['-40%', '95%']
     }
   },
   {
     value: userNumber.value.vip,
     name: 'vip用户',
     title: {
       offsetCenter: ['40%', '80%']
     },
     detail: {
       offsetCenter: ['40%', '95%']
     }
   }
 ];

 var option2= {
     title: {
     text: '会员用户人数',
     left: 'center',
     
     textStyle: {
       
       fontSize: 18 ,
     }
   },
   series: [
     {
       type: 'gauge',
       anchor: {
         show: true,
         showAbove: true,
         size: 18,
         itemStyle: {
           color: '#FAC858'
         }
       },
       pointer: {
         icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
         width: 8,
         length: '80%',
         offsetCenter: [0, '8%']
       },
       progress: {
         show: true,
         overlap: true,
         roundCap: true
       },
       axisLine: {
         roundCap: true
       },
      data:gaugeData,
       title: {
         fontSize: 14
       },
       detail: {
         width: 40,
         height: 14,
         fontSize: 14,
         color: '#fff',
         backgroundColor: 'inherit',
         borderRadius: 3,
         formatter: '{value}人'
       }
     }
   ]
 };

        myChart2.setOption(option2);
      };

      // 获取用户性别数据
      const fetchData3 = () => {
        axios.get('/user/getGenderNumber')
          .then(response => {
            console.log(response)
            genderNumber.value = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      };

   // 获取普通用户数据和vip用户数据
   const fetchData2 = () => {
        axios.get('/user/getUserTypeNumber')
          .then(response => {
            console.log(response)
            userNumber.value = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      };
//获取最火前5
    const fetchData1=()=>{
      axios.get("/book/getTop5")//获取最右边的图形数据
      .then(response=>{
        console.log(response)
      //   for(let i=0;i<5;i++)
      // {
      //   console.log("最火前5一星期的数字波动："+response.data.data[i].num);
      //   console.log("最或前5名字"+response.data.data[i].typename);
      //   console.log("最火前5一星期："+response.data.data[i].sevendays);
        
      // }

      dateNumber.value=response.data;
      console.log("dataNumber:")
      console.log(dateNumber.value)
             for(let i=0;i<5;i++)
      {
        console.log("最火前5一星期的数字波动："+dateNumber.value.data[i].num);
        console.log("最或前5名字:"+dateNumber.value.data[i].typename);
        console.log("最火前5一星期："+dateNumber.value.data[i].sevendays);
        
      }
      console.log("参数:"+dateNumber.value.data[3].num[7])

      })
      .catch(error => {
            console.log(error);
          });
    }
  
      onMounted(() => {
        fetchData3();
        fetchData2();
        fetchData1();
        
      });
      // 监听数据变化，数据更新后重新初始化图表
      watch(genderNumber, () => {
        initChart3();
      });
      watch(userNumber, () => {
        initChart2();
      });
      watch(dateNumber, () => {
        initChart1();
      });
      return {
        initChart3,
        initChart2 ,
        initChart1,
 
      };
    }
  };


 </script>
 <style scoped type="text/css">
 .content-bot,.content-top,.left{
   border: 1px solid #ffffff9f;
        /*阴影*/
        box-shadow: 0 0 25px #c7c6ca7d; 
             animation: fadeInAnimation ease 7s; 
             animation-iteration-count: 1; /*设置动画播放次数*/
             animation-fill-mode: forwards; /*设置样式以在动画不播放时应用元素。forward是设置动画结束后，使用元素的结束属性值*/
         } 
         @keyframes fadeInAnimation { 
             0% { 
                 opacity: 0; /*设置不透明度*/
             } 
             100% { 
                 opacity: 1; 
             } 
         } 
 
         .main{
             width: 1800px;
             height: 620px;
  
         }
         .left{
             width: 750px;
             height: 620px;
       margin-left: 3%;
         }
         .content-top,.content-bot{
             width:500px;
             height: 300px;
       margin-bottom: 5%;
   
         }
         /* .most_left{
          background: white;
          float: left;
         } */
         .left{
             background: white;
             float: left;
         }
         .content-top{
             background:white;
  
         }
         .content-bot{
             background:white;
  
         }
             .content{
                 float: left;
             }
 </style>
 