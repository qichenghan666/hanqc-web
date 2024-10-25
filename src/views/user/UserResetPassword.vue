<script setup>
import { ref } from 'vue'
const updatePwdData = ref({
    old_pwd:'',
    new_pwd:'',
    re_pwd:''
})
//校验密码的函数
const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次确认密码'))
  } else if (value !== updatePwdData.value.new_pwd) {
    callback(new Error("请确保两次输入的一样"))
  } else {
    callback()
  }
}

const rules = {
    old_pwd: [
        {required:true,message: '请输入原密码', trigger: 'blur' },
        {min:5,max:16,message: '长度为5-16位非空字符', trigger: 'blur' }
    ],
    new_pwd: [
        {required:true,message: '请输入新密码', trigger: 'blur' },
        {min:5,max:16,message: '长度为5-16位非空字符', trigger: 'blur' }
    ],
    re_pwd: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}
import { useUserInfoStore } from '@/stores/userinfo.js';
const userInfoStore = useUserInfoStore()
//修改用户信息
import {updatePwdService} from '@/api/user.js'
import { ElMessage } from 'element-plus';
const updatePwd = async ()=>{
    let result = await updatePwdService(updatePwdData.value)
    ElMessage.success(result.message? result.message:'修改成功')
    updatePwdData.value.old_pwd = '' 
    updatePwdData.value.new_pwd = '' 
    updatePwdData.value.re_pwd = '' 
    //更新pinia中的数据
    userInfoStore.info.password=updatePwdData.value.new_pwd
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>修改密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="updatePwdData" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密码" prop="oldPwd">
                        <el-input v-model="updatePwdData.old_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPwd">
                        <el-input v-model="updatePwdData.new_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="rePwd">
                        <el-input v-model="updatePwdData.re_pwd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="updatePwd">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>