<template>
    <div>
     <div class="main">
         <div class="content">
             <div class="content-top" id="D3"></div>
             <div class="content-bot" id="D2"></div>
         </div>
     <div class="left" id="D1"></div>
     </div>
   </div>
 </template>
     
     <script>
 
 export default {
   mounted(){
     var myChartD1= this.$echarts.init(document.getElementById('D1'))
     var myChartD2= this.$echarts.init(document.getElementById('D2'))
     var myChartD3= this.$echarts.init(document.getElementById('D3'))
     const gaugeData = [
   {
     value: 65,
     name: '普通用户',
     title: {
       offsetCenter: ['-40%', '80%']
     },
     detail: {
       offsetCenter: ['-40%', '95%']
     }
   },
   {
     value: 60,
     name: 'vip用户',
     title: {
       offsetCenter: ['40%', '80%']
     },
     detail: {
       offsetCenter: ['40%', '95%']
     }
   }
 ];


 
     setTimeout(function () {
    var option = {
   title: {
     text: '日员工出勤状态'
   },
   tooltip: {
     trigger: 'axis'
   },
   legend: {
     data: ['正常出勤', '迟到', '请假', '休假', '无故缺勤']
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
     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
   },
   yAxis: {
     type: 'value'
   },
   series: [
     {
       name: '休假',
       type: 'line',
       stack: 'Total',
       data: [120, 132, 101, 134, 90, 230, 210]
     },
     {
       name: '请假',
       type: 'line',
       stack: 'Total',
       data: [220, 182, 191, 234, 290, 330, 310]
     },
     {
       name: '迟到',
       type: 'line',
       stack: 'Total',
       data: [150, 232, 201, 154, 190, 330, 410]
     },
     {
       name: '无故缺勤',
       type: 'line',
       stack: 'Total',
       data: [320, 332, 301, 334, 390, 330, 320]
     },
     {
       name: '正常出勤',
       type: 'line',
       stack: 'Total',
       data: [820, 932, 901, 934, 1290, 1330, 1320]
     }
   ]
 };
  var option1 = {//换图
   title: {
     text: '月员工出勤状态',
     left: 'center',
     
     textStyle: {
       
       fontSize: 18 ,
     }
   },
   tooltip: {
     trigger: 'item'
   },
   
   legend: {
     top: '7%',
     left: 'center'
   },
   series: [
     {
       name: '月员工出勤状态',
       type: 'pie',
       radius: ['40%', '70%'],
       avoidLabelOverlap: false,
       itemStyle: {
         borderRadius: 10,
         borderColor: '#fff',
         borderWidth: 2
       },
       label: {
         show: false,
         position: 'center'
       },
       emphasis: {
         label: {
           show: true,
           fontSize: 40,
           fontWeight: 'bold'
         }
       },
       labelLine: {
         show: false
       },
       data: [
         { value: 30, name: '休假' },
         { value: 35, name: '请假' },
         { value: 80, name: '迟到' },
         { value: 14, name: '无故缺勤' },
         { value: 148, name: '正常出勤' }
       ]
     }
   ]
 };

 
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
 
   myChartD1.setOption(option);
   myChartD2.setOption(option1);
   myChartD3.setOption(option2);
 });
   }
 }
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
             width: 1200px;
             height: 620px;
  
         }
         .left{
             width: 750px;
             height: 620px;
       margin-left: 3%;
         }
         .content-top,.content-bot{
             width:400px;
             height: 300px;
       margin-bottom: 5%;
   
         }
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
 