<template>
    <div class="m-4">

        <el-select v-model="v">

        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.typename"
          :value="item.typename"
        />
      </el-select>

    </div>



  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, onMounted } from "vue";
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios'
  //使用:icon绑定图标，需单独导入图标组件
  import { Plus, Delete, Edit, Search } from '@element-plus/icons-vue'
  const v=ref();
  
  v.value="单人房"
  
let options=ref([])
onMounted(() => {
    axios.post('/type/getAllTypes')
      .then(response => {
        console.log(response)
        options.value=response.data.data
        console.log(options.value)

  
      })
      .catch(error => {
        console.log(error);
      });
      
  });




//   type Option = {
//     id: number
//     label: string
//     desc: string
//   }


  
//   const value = ref<Option>()
//   const options = ref([
//     { id: 1, label: 'Option A', desc: 'Option A - 230506' },
//     { id: 2, label: 'Option B', desc: 'Option B - 230506' },
//     { id: 3, label: 'Option C', desc: 'Option C - 230506' },
//     { id: 4, label: 'Option A', desc: 'Option A - 230507' },
//   ])
  </script>