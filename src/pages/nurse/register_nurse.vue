
<!-- 引入windiCSS -->

<template>
    <div>
        <el-row class="min-h-screen bg-blue-500">
            <el-col :span="16" class="flex justify-center items-center">
                <div>
                    <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
                    <div class="text-gray-200 text-sm ">请开始你的护工注册</div>
                </div>
            </el-col>
            <el-col :span="8" class="bg-light-50 flex justify-center items-center flex-col">
                <div>

                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                        :size="formSize" status-icon>
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm.name" />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="ruleForm.email" />
                        </el-form-item>
                        <el-form-item label="关系" prop="relationship">
                            <el-select v-model="ruleForm.relationship" placeholder="请选择你的关系">
                                <el-option label="父母" value="父母" />
                                <el-option label="夫妻" value="夫妻" />
                                <el-option label="子女" value="子女" />
                                <el-option label="兄弟姐妹" value="兄弟姐妹" />
                                <el-option label="其他" value="其他" />

                            </el-select>
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="ruleForm.gender">
                                <el-radio label="男" />
                                <el-radio label="女" />
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" show-password />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="comfirmpassword">
                            <el-input v-model="ruleForm.comfirmpassword" type="comfirmpassword" placeholder="请确认密码"
                                show-password />
                        </el-form-item>
                        <div v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</div>



                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="ruleForm.phone" />

                        </el-form-item>

                        <el-form-item label="出生年月" required>
                            <el-col>
                                <el-form-item prop="birthday">
                                    <el-date-picker v-model="ruleForm.birthday" type="date" label="Pick a date"
                                        placeholder="请选择出生年月" style="width: 100%" format="YYYY-MM-DD"
                                        value-format="YYYY-MM-DD" />
                                </el-form-item>

                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">
                                Create
                            </el-button>
                            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                        </el-form-item>
                    </el-form>

                </div>

            </el-col>
        </el-row>
    </div>
</template>



<script lang="ts" setup>

import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const confirmPasswordError = ref('');
const ruleForm = reactive({
    name: '',
    relationship: '',
    phone: '',
    birthday: '',
    gender: '',
    email: '',
    password: '',
    comfirmpassword: '',
})

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入你的姓名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度为2-10', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入你的邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
    ],
    relationship: [
        {
            required: true,
            message: '请选择你的关系',
            trigger: 'change',
        },
    ],
    phone: [
        {
            required: true,
            message: '请输入你的手机号码',
            trigger: 'blur',
        },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
        }

    ],
    birthday: [
        {
            type: 'date',
            required: true,
            message: '请选择你的出生年月',
            trigger: 'change',
        },
    ],
    gender: [
        {
            required: true,
            message: '请选择你的性别',
            trigger: 'change',
        },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 20, message: '长度为5-20', trigger: 'blur' },
    ],
    comfirmpassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { min: 5, max: 10, message: '长度为5-20', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value === ruleForm.password) {
                    callback();
                    confirmPasswordError.value = '';
                } else {
                    callback(new Error('确认密码与密码不一致'));
                    confirmPasswordError.value = '确认密码与密码不一致';
                }
            },
            trigger: 'blur'
        }
    ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log("valid:" + valid)
            console.log("fields:" + fields)
            const user = JSON.stringify(ruleForm)
            console.log(user)
            // console.log("ruleForm:"+ruleForm.data)

            axios.post('user/register_user', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });





            console.log('注册成功!')
        } else {
            console.log('注册失败!详情请联系管理员', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>
  
