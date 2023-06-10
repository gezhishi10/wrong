

<template>
    <div class="topTool">
        <el-input v-model="roomid" placeholder="请输入房间编号搜索" @input="handleSearchName" :prefix-icon="Search">
        </el-input>
        <el-button type="primary" :icon="Plus" @click="handleAdd" style="margin-left: 20px;">添加房间</el-button>

    </div>
    
    <div style="padding: 20px;">
        <!--el-table数据表格组件-->
        <el-table :data="displayedItems" :header-cell-style="{ background: '#f6f9fa' }">
            <!--el-table-column列-->
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="roomid" label="房间编号" width="80"></el-table-column>
            <el-table-column prop="roomtype" label="类型名称"></el-table-column>
            <el-table-column prop="area" label="房间面积"></el-table-column>
            <!-- <el-table-column prop="number" label="可入住人数"></el-table-column> -->
            <!-- <el-table-column prop="picture" label="展示图片"></el-table-column> -->
            <!-- <el-table-column prop="roomprice" label="房间价格"></el-table-column> -->
            <el-table-column prop="roomcreateTime" label="创建时间"></el-table-column>
            <el-table-column prop="roomcreateName" label="创建人"></el-table-column>
            <!-- <el-table-column prop="roomstate" label="房间状态"></el-table-column> -->
            <el-table-column prop="roomstate" label="房间状态">
                <template #default="{row}">
                    <!-- <el-image :src="row.roomstate" fit="fill">

                    </el-image> -->
                    <el-tag class="ml-2" type="danger" v-show="row.roomstate=='1'">占用</el-tag>

                    <div v-show="row.roomstate=='0'">
                        <el-tag class="ml-2" type="success">空闲</el-tag>
                    </div>

                </template>
            </el-table-column>










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

            <!-- <el-form-item label="房间编号" :label-width="100" style="width: 20;">
                <el-input-number v-model="tableform.roomid" :min="50" :max="5000" />
            </el-form-item> -->

           <el-form-item label="房间类型" :label-width="100" style="width: 20;">

                <!-- <el-input v-model="tableform.roomtype" placeholder="房间类型" /> -->
                <el-select  v-model="tableform.roomtype">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.typename"
                    :value="item.typename"
                    />
                </el-select>

            </el-form-item> 
            
            <el-form-item label="房间面积" :label-width="100" style="width: 20;">
                <el-input-number v-model="tableform.area" :min="1" :max="5000" />
            </el-form-item>

            <!-- <el-form-item label="可入住人数" :label-width="100" style="width: 20;">
                <el-input-number v-model="tableform.number" :min="1" :max="10" />
            </el-form-item> -->


            <!-- <el-form-item label="房间价格" :label-width="100" style="width: 20;">
                <el-input-number v-model="tableform.roomprice" :min="50" :max="5000" />
            </el-form-item> -->

             <el-form-item label="房间状态" :label-width="100" style="width: 20;">
                <el-input-number v-model="tableform.roomstate" :min="0" :max="1" />
        </el-form-item> 
     

 <!-- <el-form-item label="房间状态" :label-width="100" style="width: 20;">
      <el-radio-group v-model="tableform.roomstate">
         <el-radio label="空闲"  :checked="tableform.roomstate=='0'"/>
        <el-radio label="正忙"  :checked="tableform.roomstate=='1'" />
      </el-radio-group>
    </el-form-item>
    -->


  <!-- <el-radio-group v-model="tableform.roomstate">
    <el-radio label="空闲" :value="0" :checked="true"/>
    <el-radio label="正忙" :value="1" />
  </el-radio-group> -->


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

            <el-form-item label="房间编号" :label-width="100" style="width: 20;">
                <el-input-number v-model="tableform.roomid" :min="1" :max="5000" />
            </el-form-item>

            <el-form-item label="房间类型" :label-width="100" style="width: 20;">
                <!-- <el-input v-model="tableform.roomtype" placeholder="房间类型" /> -->
                
                <el-select  v-model="tableform.roomtype">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.typename"
                    :value="item.typename"
                    />
                </el-select>
            </el-form-item>




            <el-form-item label="房间面积" :label-width="100" style="width: 20;">
                <el-input-number v-model="tableform.area" :min="1" :max="5000" />
            </el-form-item>

            <!-- <el-form-item label="可入住人数" :label-width="100" style="width: 20;">
                <el-input-number v-model="tableform.number" :min="1" :max="10" />
            </el-form-item> -->


            <!-- <el-form-item label="房间价格" :label-width="100" style="width: 20;">
                <el-input-number v-model="tableform.roomprice" :min="50" :max="5000" />
            </el-form-item> -->
            <!-- <el-form-item label="房间状态" :label-width="100" style="width: 20;">
                <el-switch v-model="tableform.roomstate" />
            </el-form-item> -->
<!-- 
            <el-form-item label="房间图片" :label-width="100" style="width: 20;">
                <el-upload id="test" action="#" list-type="picture-card" :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-change="handleOnchange" :auto-upload="false" :limit="1">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item> -->


            <el-form-item label="创建人" :label-width="100">
                <el-input v-model="tableform.roomcreateName" placeholder="创建人" />
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

        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15]"
            :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>
    

<script lang="ts" setup>

import { ref, reactive, computed, onMounted } from "vue";
import { ElMessage, ElMessageBox ,UploadProps, UploadUserFile} from 'element-plus'
import axios from 'axios'
//使用:icon绑定图标，需单独导入图标组件
import { Plus, Delete, Edit, Search } from '@element-plus/icons-vue'



let options=ref([])





// const fileList = ref<UploadUserFile[]>([
//   {
//     name: 'food.jpeg',
//     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
//   },
//   {
//     name: 'food.jpeg',
//     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
//   },

 
// ])












let x=0

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
//   x--;
//   console.log(uploadFile, uploadFiles)
// }

// const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
//   dialogImageUrl.value = uploadFile.url!
//   dialogVisible.value = true
// }

// const handleOnchange: UploadProps['onChange'] = (uploadFile) => {
//  console.log("上传的图片:"+uploadFile.url)
 
// }

const typeData = ref([]); // 定义用户信息数据
const pageSize = ref(5);//m每页多少条
const total = ref(0);//一共多少条
const displayedItems = ref([]);//当前展示多少条
const dialogFormVisible = ref(false)//是否开启修改窗口
const 
adddialogVisible = ref(false)
let itemsCopy
let currentPage = 1;

let tableform = ref({})//初始化弹窗表单数据




// 组件挂载到DOM后执行后端数据加载，

onMounted(() => {
    axios.post('/room/getAllRooms')
        .then(response => {

            // 这个是获取表单里面的数据
            console.log(response)
            typeData.value = response.data.data; // 更新typeData的值
            console.log(response.data.data.length)
            total.value = response.data.data.length; // 更新数据总条数
            console.log("tota;.value:" + total.value)
            
            // 初始化shownData的值
            displayedItems.value = typeData.value.slice(0, pageSize.value);
            console.log(displayedItems.value)
            itemsCopy = displayedItems.value
            console.log("itemCopy:", itemsCopy)

        })
        .catch(error => {
            console.log(error);
        });

//接着我获取的是类型的数据
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




function handleAdd() {
    tableform.value = {};//清空表单数据
    tableform.value.price = 50
    
    console.log(tableform.value.price);
    console.log
    adddialogVisible.value = true
}







function saveData() {
    console.log(tableform.value)
    adddialogVisible.value = false;

    let type = JSON.stringify(tableform.value)
    console.log("type:" + type)
    // userData.value.push(tableform.value);
    //     total.value=userData.value.length;
    //     handleCurrentChange(currentPage)




    axios.post('/room/addRoom', type, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data);
            typeData.value.push(response.data.data);
            total.value = typeData.value.length;
            handleCurrentChange(currentPage)


        })
        .catch(error => {
            console.error(error);
        });



}




//保存修改，肯定是写对的
function saveEdit() {
    dialogFormVisible.value = false
    let type = JSON.stringify(tableform.value)
    console.log("type:" + type)

    axios.post('/room/updataTypeInfo', type, {
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

                targetItem.roomtype=tableform.value.roomtype;
                targetItem.roomprice = tableform.value.roomprice; // 如果找到了目标对象，则修改该对象的 name 属性
                targetItem.roomcreateName= tableform.value.roomcreateName
                targetItem.picture=tableform.value.picture;
                targetItem.roomcreateName=tableform.value.roomcreateName;
                targetItem.area=tableform.value.area;
                targetItem.number=tableform.value.number;
                targetItem.roomstate=tableform.value.roomstate
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
    // if(row.roomstate=="true")
    // row.roomstate=true
    // else
    // row.roomstate=false;

    // console.log("newrow:"+row.roomstate)
    tableform.value = { ...row } //表单数据设置为传入行数据
    console.log(tableform.name)
    dialogFormVisible.value = true

}

//换每一页显示多少数据
function handleSizeChange(val) {
    console.log(val)
    pageSize.value = val;
    change();
}
function change() {
    handleCurrentChange(1)
}

//换页
function handleCurrentChange(newPage) {
    currentPage = newPage;
    const startIndex = (newPage - 1) * pageSize.value
    displayedItems.value = typeData.value.slice(startIndex, startIndex + pageSize.value)
    // const startIndex = (newPage - 1) * pageSize.value
}


function handleDelete(row) {// 处理删除按钮点击事件

    ElMessageBox.confirm(`是否删除 ID 为 ${row.id} 的房间类型吗？`, "删除类别", {
        confirmButtonText: "确定",
        cancelButtonText: '取消',
        type: "warning",
    }).then(() => {

        console.log(`${row.id}`)
        axios.delete('/room/delRoomType' + '?id=' + row.id)
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


const handleSearchName = (val) => {
    if (val.length > 0) { // 搜索框有输入
        // 根据姓名进行过滤操作
        displayedItems.value = itemsCopy.filter(item => item.roomid && item.roomid.toString().match(val));
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


.el-image {
  display: block;
}
</style>
    