<template>
    <div style="padding: 20px;">
      <el-form>
        <el-row>
          <el-col>
            <el-form-item :label="'已执行'+endnum+'个用例'"></el-form-item>
          </el-col>
          <el-col>
            <el-form-item :label="'待执行'+waitnum+'个用例'"></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="报错列表">
              <el-table
                :data="errorList"
                height="250"

                style="width: 80%">
                <el-table-column
                  prop="className"
                  label="方法名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="caseName"
                  label="用例名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="testTime"
                  label="执行时间">
                </el-table-column>
                <el-table-column
                  prop="operate"
                  label="操作">
                  <template scope="scope">
                    <el-button @click="loadLog(scope)" type="button" size="primary">查看日志</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="日志">{{logMessage}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col>
          <el-button @click="" type="button" size="primary">中止</el-button>
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
    mounted(){
      this.getTableData();
    }
  }
</script>
<style type="text/css">
</style>
