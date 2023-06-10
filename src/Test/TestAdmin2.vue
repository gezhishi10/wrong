

<template>
    <div class="topTool">
      <el-input v-model="sname" placeholder="请输入姓名搜索" @input="handleSearchName" :prefix-icon="Search">
      </el-input>
      <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-left: 20px;">添加数据</el-button>
  
      <!-- <el-button type="danger" :icon="Delete" @click="handleDelList" v-if="multipleSelection.length > 0">删除选中数据</el-button> -->
  
  
    </div>
  
  
  
    <div style="padding: 20px;">
      <!--el-table数据表格组件-->
      <el-table :data="displayedItems" :header-cell-style="{ background: '#f6f9fa' }">
        <!--el-table-column列-->
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="birthday" label="出生日期"></el-table-column>
        <el-table-column label="操作" min-width="180">
          <template #default="{ row }">
            <!-- <el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row)">编辑</el-button> -->
            <el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  
    <!-- 这里是修改这边的内容 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="tableform">
        <el-form-item label="姓名" :label-width="100">
          <el-input v-model="tableform.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="关系" :label-width="100">
          <el-input v-model="tableform.relationship" autocomplete="off"/>
          <el-select v-model="tableform.relationship" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="性别" :label-width="100">
          <el-radio-group v-model="tableform.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生年月" :label-width="100">
          <el-date-picker v-model="tableform.birth" type="date" placeholder="选择日期" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="手机号码" :label-width="100">
          <el-input v-model="tableform.phone" autocomplete="off" />
        </el-form-item>
      </el-form>
  
  
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogOk">
            确定
          </el-button>
        </span>
      </template>
  
    </el-dialog>
  
  
  
    <div class="demo-pagination-block page">
      <el-pagination :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10]" :small="small"
        :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  
  
  
  
  
  
  
  
  
    <!-- <el-dialog v-model="dialogFormVisible" title="编辑">
      <el-form :model="tableform">
        <el-form-item label="姓名" :label-width="100" style="width: 20;">
          <el-input v-model="tableform.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="100">
          <el-input v-model="tableform.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="性别" :label-width="100">
          <el-radio-group v-model="tableform.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
  
        <el-form-item label="出生年月" :label-width="100">
          <el-date-picker v-model="tableform.birthday" type="date" placeholder="选择日期" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" />
        </el-form-item>
      </el-form>
  
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog> -->
  
  </template>
    
  <script setup>
  
  import { ref, reactive, computed, onMounted } from "vue";
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios'
  //使用:icon绑定图标，需单独导入图标组件
  import { Plus, Delete, Edit, Search } from '@element-plus/icons-vue'
  
  
  const userData = ref([]); // 定义用户信息数据
  const pageSize = ref(5);//m每页多少条
  const total = ref(0);//一共多少条
  const displayedItems = ref([]);//当前展示多少条
  const dialogFormVisible = ref(false)//是否开启修改窗口
  let currentPage=1;//当前页数
  let itemsCopy
  let tableform = ref({})//初始化弹窗表单数据
  
  
  
  
  // 组件挂载到DOM后执行后端数据加载，第一次
  onMounted(() => {
    axios.get('/user/getuser')
      .then(response => {
  
        userData.value = response.data.data; // 更新userData的值
        total.value = response.data.total; // 更新数据总条数
  
        // 初始化shownData的值
        displayedItems.value = userData.value.slice(0, pageSize.value);//初始化当前页显示数据
  
  
        
        console.log(displayedItems.value)
        itemsCopy = displayedItems.value
        console.log("itemCopy:", itemsCopy)
  
      })
      .catch(error => {
        console.log(error);
      });
  });
  
  function handleSizeChange(val) {
    console.log(val)
    pageSize.value = val;
    change()
  }
  
  
  function handleCurrentChange(newPage) {
    currentPage= newPage
    const startIndex = (newPage - 1) * pageSize.value
    displayedItems.value = userData.value.slice(startIndex, startIndex + pageSize.value)
    itemsCopy.value = displayedItems.value
  }
  
  function change() {
    // alert(pageSize.value)
    // let displayedItems = ref(userData.slice(0, pageSize.value));//初始化当前页显示数据
    handleCurrentChange(1)
  }
  
  function handleEdit(row) { // row 为当前行的数据
    dialogFormVisible.value = true // 设置对话框显示状态为 true
    tableform.value = { ...row } //表单数据设置为传入行数据
    dialogType.value = 'edit' // 设置对话框类型为 "edit"，方便修改弹窗标题
  
  }
  
  const handleDelete = (row) => {
    ElMessageBox.confirm(
      '您确定要删除姓名为【' + row.name + '】的数据吗?', '危险操作',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }
    )
      .then(() => {
        delrow(row)
        ElMessage({ type: 'success', message: '完成删除！', })
      })
      .catch(() => {
        ElMessage({ type: 'info', message: '取消删除!', })
      })
  }
  
  
  const handleSearchName = (val) => {
    if (val.length > 0) { // 搜索框有输入
      // 根据姓名进行过滤操作
      displayedItems.value = userData.value.filter(item => item.name.match(val))
    } else { // 搜索框无输入
      displayedItems.value = itemsCopy //还原数据表格
    }
  }
  
  
  // 定义 handleSortChange 方法，接收 sortData 参数
  const handleSortChange = (sortData) => {
    // 解构 sortData 参数，得到 prop 和 order 两个属性
    const { prop, order } = sortData;
    // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
    displayedItems.value = displayedItems.value.sort((a, b) => {
      if (order === 'ascending') { // 升序排序
        return a[prop] > b[prop] ? 1 : -1;
      } else { // 降序排序
        return a[prop] < b[prop] ? 1 : -1;
      }
    });
  }
  
  
  let dialogType = ref('add')//初始化弹窗类型为增加弹窗
  const dialogTitle = computed(() => {//设置弹窗的标题
    return dialogType.value === 'add' ? '新增数据' : '编辑数据'
  })
  
  
  const handleAdd = () => { //箭头函数
    dialogFormVisible.value = true // 设置对话框的显示状态为 true
    dialogType.value = 'add' // 设置对话框的类型为 "add"
    tableform.value = {} // 清空表单数据
  }
  
  const dialogOk = () => { // 定义一个名为 dialogOk 的箭头函数
    dialogFormVisible.value = false // 设置对话框的显示状态为 false，将其关闭
    if (dialogType.value === 'add') { // 如果对话框的类型为 "add"
      userData.unshift({ // 在数据数组的开头添加一个新的数据项
        id: userData.length + 1, // 分配新的 ID 值
        ...tableform.value // 将表单数据添加到数据项中
      }
      )
  
      total.value = userData.length // 更新数据总数
      displayedItems.value = userData.slice(0, pageSize.value) // 更新显示的数据项
    }
  
    else { // 如果对话框的类型不是 "add"，即用户要修改数据
      // 在当前显示的数据项中查找要修改的数据的索引
      let index = displayedItems.value.findIndex(item =>
        item.id === tableform.value.id)
      displayedItems.value[index] = tableform.value // 用表单数据更新对应的数据项
    }
  
  }
  
  
  
  const delrow = (row) => { // 定义一个函数，用于删除某行数据
    let index = displayedItems.value.findIndex(item => item.id === row.id) // 找到当前行在 displayedItems 数组中的索引
    userData.splice(index, 1) // 从 users 数组中删除当前行的数据
    total.value = total.value - 1 // 更新数据总条数
    handleCurrentChange(currentPage) //重新渲染表格数据
  }
  
  
  
  
  
  
  // const handleSearchName = (val) => {
  //   if (val.length > 0) { // 搜索框有输入
  //     // 根据姓名进行过滤操作
  //     displayedItems.value = userData.value.filter(item => item.name.match(val))
  //   } else { // 搜索框无输入
  
  //     displayedItems.value = itemsCopy //还原数据表格
  //   }
  // }
  
  
  
  
  // const userData = ref([]); // 定义用户信息数据
  // const pageSize = ref(5);//m每页多少条
  // const total = ref(0);//一共多少条
  // const displayedItems = ref([]);//当前展示多少条
  // const dialogFormVisible = ref(false)//是否开启修改窗口
  // let itemsCopy
  
  // let tableform = ref({})//初始化弹窗表单数据
  
  
  
  // // 组件挂载到DOM后执行后端数据加载，第一次
  // onMounted(() => {
  //   axios.get('/user/getuser')
  //     .then(response => {
  
  //       userData.value = response.data.data; // 更新userData的值
  //       total.value = response.data.total; // 更新数据总条数
  
  //       // 初始化shownData的值
  //       displayedItems.value = userData.value.slice(0, pageSize.value);
  //       console.log(displayedItems.value)
  //       itemsCopy = displayedItems.value
  //       console.log("itemCopy:", itemsCopy)
  
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // });
  
  
  
  
  // //保存修改，肯定是写对的
  // function saveEdit() {
  //   dialogFormVisible.value = false
  //   let user = JSON.stringify(tableform.value)
  //   console.log("user:" + user)
  
  //   axios.post('user/changeUser', user, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       // 假设 displayedItems.value 是一个数组对象，包含多个元素
  //       console.log(tableform.value.id)
  //       let targetItem = displayedItems.value.find((item) => item.id == tableform.value.id); // 在数组中查找 id 属性等于 targetId 的对象
  //       console.log(targetItem.id)
  //       if (targetItem) {
  
  //         targetItem.name = tableform.value.name; // 如果找到了目标对象，则修改该对象的 name 属性
  //         targetItem.email = tableform.value.email; // 修改 email 属性
  //         targetItem.gender = tableform.value.gender;
  //         targetItem.birthday = tableform.value.birthday
  //         // 其他修改逻辑
  //       } else {
  //         console.log("未找到目标对象"); // 如果未找到目标对象，则输出提示信息
  //       }
  
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }
  
  
  
  
  
  
  
  // function handleEdit(row) {// 处理编辑按钮点击事件
  //   console.log(row)
  //   tableform.value = { ...row } //表单数据设置为传入行数据
  //   console.log(tableform.name)
  //   dialogFormVisible.value = true
  
  // }
  
  
  
  
  
  
  // function handleDelete(row) {// 处理删除按钮点击事件
  //   ElMessageBox.confirm(`是否删除 ID 为 ${row.id} 的用户？`, "删除用户", {
  //     confirmButtonText: "确定",
  //     type: "warning",
  //   }).then(() => {
  
  //     console.log(`${row.id}`)
  //     axios.get('/user/deleteuser' + '?id=' + row.id)
  //       .then(response => {
  
  
  //         let index = displayedItems.value.findIndex(item => item.id === row.id) // 找到当前行在 displayedItems 数组中的索引
  
  
  //         ElMessage({
  //           message: '用户删除成功',
  //           type: 'success',
  //         })
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  
  //     console.log("点击了确定按钮");
  //   })
  //     .catch((e) => {
  //       // 用户点击了取消按钮或者关闭了弹窗对话框
  //       if (e !== "cancel") {
  //         console.error("发生了未知错误：", e);
  //       }
  //     });
  
  
  // }
  
  
  // const handleSearchName = (val) => {
  //   if (val.length > 0) { // 搜索框有输入
  //     // 根据姓名进行过滤操作
  //     displayedItems.value = userData.value.filter(item => item.name.match(val))
  //   } else { // 搜索框无输入
  
  //     displayedItems.value = itemsCopy //还原数据表格
  //   }
  // }
  
  
  
  
  
  
  
  </script>
    
  <style scoped>
  /*在ElementPlus中，可使用组件名称的类选择器选择对应组件，从而修改默认组件样式*/
  .el-pagination {
    /*选择分页组件，默认采取Flex布局*/
    justify-content: center;
    /*水平方向居中对齐*/
    margin-top: 8px;
  }
  
  
  .topTool {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    margin-top: 8px;
  }
  
  .page {
    /* display: flex;
      justify-items: center;
      align-items: center;
      bottom: 0px; */
  
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 100%;
    height: 30px;
  
  
  }
  </style>
    