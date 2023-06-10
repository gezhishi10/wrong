<template>
    <div>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="totalCount"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
      <el-table :data="pagedUsers" border>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="age" label="Age" />
        <el-table-column prop="gender" label="Gender" />
        <el-table-column prop="email" label="Email" />
      </el-table>
    </div>
  </template>
  
  <script>
  import { reactive, ref, onMounted, computed } from 'vue'
  import axios from 'axios'
  import 'element-plus/lib/theme-chalk/index.css'
  
  export default {
    setup() {
      const currentPage = ref(1)
      const pageSize = ref(10)
      const totalCount = ref(0)
      const users = reactive([])
  
      // 发送请求获取用户数据
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/users')
          users.value = response.data
          totalCount.value = response.data.length
        } catch (error) {
          console.log(error)
        }
      }
  
      // 分页处理
      const pagedUsers = computed(() => {
        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value
        return users.slice(start, end)
      })
  
      // 处理当前页码变更事件
      const handlePageChange = (newPage) => {
        currentPage.value = newPage
      }
  
      onMounted(() => {
        fetchData()
      })
  
      return {
        currentPage,
        pageSize,
        totalCount,
        users,
        pagedUsers,
        handlePageChange,
      }
    },
  }
  </script>