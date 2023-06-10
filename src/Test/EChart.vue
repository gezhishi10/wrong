<template>
    <div class="map">
      <div id="main" style="width: 100%; height: 400px;"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import { ref, onMounted, watch } from "vue";

  import axios from 'axios';
  
  export default {
    setup() {
      const genderNumber = ref([]);
      
      // 初始化图表
      const initChart = () => {
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ["男生", "女生"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            // data: genderNumber.value.map(item => item.value)
            data:[genderNumber.value.female,genderNumber.value.male]
          }]
        };
        myChart.setOption(option);
      };
  
      // 获取数据
      const fetchData = () => {
        axios.get('/user/getGenderNumber')
          .then(response => {
            genderNumber.value = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      };
  
      onMounted(() => {
        fetchData();
      });
  
      // 监听数据变化，数据更新后重新初始化图表
      watch(genderNumber, () => {
        initChart();
      });
  
      return {
        initChart
      };
    }
  };
  </script>
  