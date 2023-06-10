

<template>
    <div class="topTool">
      <el-input v-model="sname" placeholder="请输入Vip姓名搜索" @input="handleSearchName" :prefix-icon="Search">
      </el-input>
      <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-left: 20px;">添加数据</el-button>
  
    </div>
    <div style="padding: 20px;">
      <!--el-table数据表格组件-->
      <el-table :data="displayedItems" :header-cell-style="{ background: '#f6f9fa' }">
        <!--el-table-column列-->
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
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
  
  
  <!-- 
  //这个是编辑的对话框 -->
  
    <el-dialog v-model="dialogFormVisible" title="编辑">
      <el-form :model="tableform">
        <el-form-item label="姓名" :label-width="100" style="width: 20;">
          <el-input v-model="tableform.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="100">
          <el-input v-model="tableform.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="电话" :label-width="100">
          <el-input v-model="tableform.tel" placeholder="电话" />
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
    </el-dialog>
  
  <!-- 这是添加的对话框 -->
  <el-dialog v-model="adddialogVisible" title="添加">
      <el-form :model="tableform">
        <el-form-item label="姓名" :label-width="100" style="width: 20;">
          <el-input v-model="tableform.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="100">
          <el-input v-model="tableform.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="电话" :label-width="100">
          <el-input v-model="tableform.tel" placeholder="电话" />
        </el-form-item>
        <el-form-item label="密码" :label-width="100">
          <el-input v-model="tableform.password" placeholder="密码" />
        </el-form-item>
        <el-form-item label="vip用户" :label-width="100">
        <el-switch v-model="tableform.isvip" />
      </el-form-item>
  
        <el-form-item label="性别" :label-width="100">
          <el-radio-group v-model="tableform.gender">
            <el-radio label="男" ></el-radio>
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
          <el-button @click="adddialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveData">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  
  
    <div class="demo-pagination-block">
   
   <el-pagination
     v-model:current-page="currentPage"
     v-model:page-size="pageSize"
     :page-sizes="[5, 10, 15]"
     :small="small"
     :disabled="disabled"
     :background="background"
     layout="total, sizes, prev, pager, next, jumper"
     :total="total"
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
   />
  </div>
  
  
  
  
  
  
  
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
  const adddialogVisible=ref(false)
  let itemsCopy
  let currentPage=1;
  
  let tableform = ref({})//初始化弹窗表单数据
  
  
  
  // 组件挂载到DOM后执行后端数据加载，
  
  onMounted(() => {
    axios.post('/admin/getAllVipUser')
      .then(response => {
        console.log(response)
        userData.value = response.data.data; // 更新userData的值
        console.log(response.data.data.length)
        total.value = response.data.data.length; // 更新数据总条数
        console.log("tota;.value:"+total.value)
  
        // 初始化shownData的值
        displayedItems.value = userData.value.slice(0, pageSize.value);
        console.log(displayedItems.value)
        itemsCopy = displayedItems.value
        console.log("itemCopy:", itemsCopy)
  
      })
      .catch(error => {
        console.log(error);
      });
  });
  
  
  function handleAdd(){
    tableform.value={};//清空表单数据
    adddialogVisible.value=true
  }
  
  function saveData(){
    console.log(tableform.value)
    adddialogVisible.value=false;
    if(tableform.value.isvip==true){
      tableform.value.isvip="1";
    }
    else
    tableform.value.isvip="1";
    let user=JSON.stringify(tableform.value)
    console.log("user:"+user)
    // userData.value.push(tableform.value);
    //     total.value=userData.value.length;
    //     handleCurrentChange(currentPage)
  
    axios.post('/admin/createUser', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log("得到的数据")
        console.log(response.data);
        if(response.data.data.isvip=="1")
        userData.value.push(response.data.data);
        total.value=userData.value.length;
        handleCurrentChange(currentPage)
  
  
      })
      .catch(error => {
        console.error(error);
      });
  
  
    
  }
  
  
  
  
  //保存修改，肯定是写对的
  function saveEdit() {
    dialogFormVisible.value = false
    let user = JSON.stringify(tableform.value)
    console.log("user:" + user)
  
    axios.post('/user/updatauserinfo', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        // 假设 displayedItems.value 是一个数组对象，包含多个元素
        console.log(tableform.value.id)
        let targetItem = displayedItems.value.find((item) => item.id == tableform.value.id); // 在数组中查找 id 属性等于 targetId 的对象
        console.log(targetItem.id)
        if (targetItem) {
  
          targetItem.name = tableform.value.name; // 如果找到了目标对象，则修改该对象的 name 属性
          targetItem.email = tableform.value.email; // 修改 email 属性
          targetItem.gender = tableform.value.gender;
          targetItem.birthday = tableform.value.birthday
          targetItem.tel = tableform.value.tel
          // 其他修改逻辑
        } else {
          console.log("未找到目标对象"); // 如果未找到目标对象，则输出提示信息
        }
  
      })
      .catch(error => {
        console.error(error);
      });
  
  }
  
  
  function handleEdit(row) {// 处理编辑按钮点击事件
  
    console.log(row)
    tableform.value = { ...row } //表单数据设置为传入行数据
    console.log(tableform.name)
    dialogFormVisible.value = true
  
  }
  
  //换每一页显示多少数据
  function handleSizeChange(val){
  console.log(val)
  pageSize.value=val;
  change();
  }
  function change(){
    handleCurrentChange(1)
  }
  
  //换页
  function handleCurrentChange(newPage){
    currentPage=newPage;
    const startIndex=(newPage-1)*pageSize.value
    displayedItems.value = userData.value.slice(startIndex, startIndex + pageSize.value)
    // const startIndex = (newPage - 1) * pageSize.value
  }
  
  
  function handleDelete(row) {// 处理删除按钮点击事件
  
    ElMessageBox.confirm(`是否删除 ID 为 ${row.id} 的用户？`, "删除用户", {
      confirmButtonText: "确定",
      cancelButtonText: '取消',
      type: "warning",
    }).then(() => {
  
      console.log(`${row.id}`)
      axios.post('/admin/delUser' + '?id=' + row.id)
        .then(response => {
          let index = userData.value.findIndex(item => item.id === row.id) // 找到当前行在 displayedItems 数组中的索引
          if (index !== -1) {
    userData.value.splice(index, 1)
    handleCurrentChange(currentPage)
  }
    
  
  
  
          ElMessage({
            message: '用户删除成功',
            type: 'success',
          })
        })
        .catch(error => {
          console.log(error);
        });
  
  
      console.log("点击了确定按钮");
    })
      .catch((e) => {
        // 用户点击了取消按钮或者关闭了弹窗对话框
        if (e !== "取消") {
          ElMessage('取消删除成功')
        }
      });
  
  
  }
  
  
  const handleSearchName = (val) => {
    if (val.length > 0) { // 搜索框有输入
      // 根据姓名进行过滤操作
      displayedItems.value = userData.value.filter(item => item.name.match(val))
    } else { // 搜索框无输入
  
      displayedItems.value = itemsCopy //还原数据表格
    }
  }
  
  
  
  
  
  
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
    