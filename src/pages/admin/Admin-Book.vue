

<template>
    <div class="topTool">
      <el-input v-model="roomtype" placeholder="请输入房间类型" @input="handleSearchName" :prefix-icon="Search">
      </el-input>
      <!-- <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-left: 20px;">添加房间类型</el-button> -->
  
    </div>
    <div style="padding: 20px;">
      <!--el-table数据表格组件-->
      <el-table :data="displayedItems" :header-cell-style="{ background: '#f6f9fa' }">
        <!--el-table-column列-->
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <!-- <el-table-column prop="userid" label="客户编号"></el-table-column> -->
        <el-table-column prop="roomid" label="房间编号"></el-table-column>
        <el-table-column prop="roomtype" label="房间类别"></el-table-column>
        <el-table-column prop="roomprice" label="房间价格"></el-table-column>
        <el-table-column prop="expense" label="总消费"></el-table-column>
        <el-table-column prop="bookname" label="住户姓名"></el-table-column>
        <el-table-column prop="idcard" label="身份证"></el-table-column>
        <el-table-column prop="tel" label="电话号码"></el-table-column>
        <el-table-column prop="bookstart" label="入住日期"></el-table-column>
        <el-table-column prop="bookend" label="退房日期"></el-table-column>
        <el-table-column prop="bookname" label="住户姓名"></el-table-column>

        <el-table-column label="操作" min-width="180">
          <template #default="{ row }">
            <el-button type="success" size="small" :icon="Delete" @click="handleAgreement(row)">同意</el-button>
            <el-button type="danger" size="small" :icon="Delete" @click="handleDisagreement(row)">拒绝</el-button>
            <el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
            
            <el-button type="warning" size="small" :icon="Delete" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  
       
  <!-- 
  //这个是编辑的对话框 -->
  
    <el-dialog v-model="dialogFormVisible" title="编辑">
      <el-form :model="tableform">
        <el-form-item label="房间编号" :label-width="100" style="width: 20;">
            <el-input-number v-model="tableform.roomid" :min="1"  />
        </el-form-item>
        <el-form-item label="房间类别" :label-width="100" style="width: 20;">
          <el-input v-model="tableform.roomtype" placeholder="房间类别" />
        </el-form-item>

        <el-form-item label="房间价格" :label-width="100" style="width: 20;">
            <el-input-number v-model="tableform.roomprice" :min="1" :max="5000"  />
        </el-form-item>
        <el-form-item label="住户姓名" :label-width="100">
          <el-input v-model="tableform.bookname" placeholder="电话" />
        </el-form-item>
        <el-form-item label="身份证" :label-width="100">
          <el-input v-model="tableform.idcard" placeholder="身份证" />
        </el-form-item>
        <el-form-item label="电话" :label-width="100">
          <el-input v-model="tableform.tel" placeholder="电话" />
        </el-form-item>
        <el-form-item label="入住时间" :label-width="100">
        <el-date-picker v-model="tableform.bookstart" type="date" placeholder="选择日期" format="YYYY-MM-DD"
          value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="退房时间" :label-width="100">
        <el-date-picker v-model="tableform.bookend" type="date" placeholder="选择日期" format="YYYY-MM-DD"
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
        <el-form-item label="类型名称" :label-width="100" style="width: 20;">
          <el-input v-model="tableform.typename" placeholder="类型名称" />
        </el-form-item>

        <el-form-item label="价格" :label-width="100" style="width: 20;">
            <el-input-number v-model="tableform.price" :min="50" :max="5000"  />
        </el-form-item>
    
        <el-form-item label="创建人" :label-width="100">
          <el-input v-model="tableform.createName" placeholder="创建人" />
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
  
  
  
  const typeData = ref([]); // 定义用户信息数据
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
    axios.post('/book/getAllBookInfo')
      .then(response => {
        console.log(response)
        typeData.value = response.data.data; // 更新typeData的值
        console.log(response.data.data.length)
        total.value = response.data.data.length; // 更新数据总条数
        console.log("tota;.value:"+total.value)
  
        // 初始化shownData的值
        displayedItems.value = typeData.value.slice(0, pageSize.value);
        console.log(displayedItems.value)
        itemsCopy = displayedItems.value
        console.log("itemCopy:", itemsCopy)
  
      })
      .catch(error => {
        console.log(error);
      });
  });


function handleAgreement(row){

  ElMessageBox.confirm(`是否同意ID 为 ${row.id} 的预定请求吗？`, "接受预定请求", {
    confirmButtonText: "确定",
    cancelButtonText: '取消',
    type: "warning",
  }).then(() => {

    console.log(`${row.id}`)
    axios.get('/book/agree' + '?id=' + row.id)
      .then(response => {
        let index = typeData.value.findIndex(item => item.id === row.id) // 找到当前行在 displayedItems 数组中的索引
        if (index !== -1) {
  typeData.value.splice(index, 1)
  
  handleCurrentChange(currentPage)
}
  
        ElMessage({
          message: '同意预定请求成功',
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
        ElMessage('取消同意请求成功')
      }
    });

}

  
  
  function handleAdd(){//开启增加对话框
    tableform.value={};//清空表单数据
    tableform.value.price=50
    console.log(tableform.value.price);
    console.log
    adddialogVisible.value=true
  }
  
  function saveData(){//保存/增加数据
    console.log(tableform.value)
    adddialogVisible.value=false;
   
    let type=JSON.stringify(tableform.value)
    console.log("type:"+type)
    axios.post('admin/addType', type, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        if(response.data.data.isvip=="0")
        typeData.value.push(response.data.data);
        total.value=typeData.value.length;
        handleCurrentChange(currentPage)
  
  
      })
      .catch(error => {
        console.error(error);
      });
  
  
    
  }
  
  
  function handleDisagreement(row){

 ElMessageBox.confirm(`是否拒绝 ID 为 ${row.id} 的预定吗？`, "拒绝预定请求", {
    confirmButtonText: "确定",
    cancelButtonText: '取消',
    type: "warning",
  }).then(() => {

    console.log(`${row.id}`)
    axios.get('/book/refuse' + '?id=' + row.id)
      .then(response => {
        let index = typeData.value.findIndex(item => item.id === row.id) // 找到当前行在 displayedItems 数组中的索引
        if (index !== -1) {
  typeData.value.splice(index, 1)
  handleCurrentChange(currentPage)
}
  
        ElMessage({
          message: '预定请求拒绝成功',
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
        ElMessage('取消拒绝请求成功')
      }
    });
  }
  



  function handleDelete(row) {// 处理删除按钮点击事件
  
  ElMessageBox.confirm(`是否删除 ID 为 ${row.id} 的房间类型吗？`, "删除类别", {
    confirmButtonText: "确定",
    cancelButtonText: '取消',
    type: "warning",
  }).then(() => {

    console.log(`${row.id}`)
    axios.delete('/book/delBookInfo' + '?id=' + row.id)
      .then(response => {
        let index = typeData.value.findIndex(item => item.id === row.id) // 找到当前行在 displayedItems 数组中的索引
        if (index !== -1) {
  typeData.value.splice(index, 1)
  handleCurrentChange(currentPage)
}
  
        ElMessage({
          message: '房间类型删除成功',
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

  //保存修改，肯定是写对的
  function saveEdit() {
    dialogFormVisible.value = false
    let type = JSON.stringify(tableform.value)
    console.log("type:" + type)
  
    axios.post('/book/updataBookInfo', type, {
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
  
          targetItem.price = tableform.value.price; // 如果找到了目标对象，则修改该对象的 name 属性
          targetItem.typename = tableform.value.typename; // 修改 email 属性
          targetItem.bookend = tableform.value.bookend;
          targetItem.bookstart = tableform.value.bookstart
          targetItem.roomprice=tableform.value.roomprice
          targetItem.roomid=tableform.value.roomid;
          targetItem.createname=tableform.value.createname
          targetItem.roomid=tableform.value.roomid
          targetItem.roomtype=tableform.value.roomtype;
          targetItem.roomtype=tableform.value.roomtype
          targetItem.bookname=tableform.value.bookname;
          targetItem.idcard=tableform.value.idcard;
          targetItem.tel=tableform.value.tel
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
    const bookstartIndex=(newPage-1)*pageSize.value
    displayedItems.value = typeData.value.slice(bookstartIndex, bookstartIndex + pageSize.value)
    // const bookstartIndex = (newPage - 1) * pageSize.value
  }
  
  
 
  
  const handleSearchName = (val) => {
    if (val.length > 0) { // 搜索框有输入
      // 根据姓名进行过滤操作
      displayedItems.value = typeData.value.filter(item => item.roomtype.match(val))
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
    