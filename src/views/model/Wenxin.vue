<template>
    <el-card class="page-container">
      <div class="input-group">
        <input type="text" v-model="question" placeholder="请输入您的需求" class="input-field">
        <el-button @click="ask" type="ptimary">获取建议</el-button>
        <el-button @click="reset" type="success">重置</el-button>
      </div>
      <div class="input-group">
        <div>建议: </div>
        <br>
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 8}"
          v-model="answer"
          v-loading="loading">
        </el-input>
      </div>
    </el-card>
</template>
   
<script setup>
import { ref } from "vue";
import {wenxinService} from '@/api/model.js'
const question = ref('');
const answer = ref('');
const loading = ref(false);
//获取建议
const ask = async () => {
    loading.value = true
    // debugger;
    console.log(question.value)
    let result = await wenxinService(question.value);
    console.log(result)
    answer.value = result.data.result;
    loading.value = false
};
//重置
const reset = async () => {
    loading.value = false
    answer.value = '';
    question.value='';

};

</script>
<style lang="scss" scoped>

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
  }
  .container {
    max-width: 600px;
    margin: 100px auto;
    padding: 20px;
    /* background-color: #fff;*/
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .input-group input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    resize: both; /* Allows resizing */
  }
  .input-group input[type="text2"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    resize: both; /* Allows resizing */
  }
  .input-group button {
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-left: 5px;
  }
 
  .suggestion {
    margin-top: 30px; /* Increase top margin */
    padding: 20px; /* Increase padding */
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 20px;
  }
</style>