<template>
<div style="padding: 20px;">
  <el-row>
    <el-col :span='12'>
      <el-form>
        <el-form-item :label="testValue1"></el-form-item>
        <el-form-item :label="'完成'+finishNum1+'个用例'" label-width="250"></el-form-item>
        <el-form-item :label="'报错'+errorNum1+'个用例'" label-width="250"></el-form-item>
        <el-form-item label="报错列表">
          <el-table
            :data="errorList1"
            height="250"
            style="width: 100%" width="250">
            <el-table-column
              prop="className"
              label="方法名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="caseName"
              label="用例名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="testTime"
              label="执行时间"
            >
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span='12'>
      <el-form>
        <el-form-item :label="testValue2"></el-form-item>
        <el-form-item :label="'完成'+finishNum2+'个用例'"></el-form-item>
        <el-form-item :label="'报错'+errorNum2+'个用例'"></el-form-item>
        <el-form-item label="报错列表">
          <el-table
            :data="errorList2"
            height="250"
            width="250"
            style="width: 100%">
            <el-table-column
              prop="className"
              label="方法名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="caseName"
              label="用例名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="testTime"
              label="执行时间"
            >
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-button @click="" type="button" size="primary">返回</el-button>
    </el-col>
  </el-row>
</div>

</template>

<script type="text/javascript">

  import methods from './method'
  import data from './data'

  export default{
    data(){
      return data.init();
    },
    methods: methods,

  }
</script>
<style type="text/css">
</style>
