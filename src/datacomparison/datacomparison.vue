<template>
  <div>
    <el-row>
      <el-label style="text-indent: 0px; font-size: 15px;">测试计划：</el-label>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <router-link to='/testreport' style="position: relative;top: 8px; left: 600px;">生成测试报告</router-link>
    </el-row>

    <el-row>
      <el-label style="position: relative; bottom: 101px; top: 0px; left: 480px; font-size: 18px; font-weight: bold;">错误信息列表</el-label>
    </el-row>
    <el-table :data='errormessage' width='100%' border :row-style="changeCss1" :flag = false>
      <el-table-column type='index' width='65'></el-table-column>
      <el-table-column label='方法名称' prop='name' width='100'></el-table-column>
      <el-table-column label='用例编号' prop='number' width='100'></el-table-column>
      <el-table-column label='用例参数' prop='data' width='100'></el-table-column>
      <el-table-column label='错误类型' prop='errortype' width='100'></el-table-column>
      <el-table-column label='比对结果' prop='result' width='100'>
        <el-button type="text" @click="outerVisible = true">详细信息</el-button>
      </el-table-column>
      <el-table-column label='是否为BUG' prop='YN' >
        <template slot-scope="scope">
          <el-button @click="delStu1(scope)" :disabled="scope.row.isCheck"  type="primary"  size="primary">确认</el-button>
          <el-button @click="delStu(scope)" :disabled="scope.row.isIgnore" type="primary"  size="primary">忽略</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>

    <el-dialog  title="详细信息" :visible.sync="outerVisible ">
      <el-table :data='xxnews' width='100%' border :row-style="changeCss" >
        <el-table-column label='执行时间' prop='time' width='200'></el-table-column>
        <el-table-column label='参数名称' prop='name' width='200'></el-table-column>
        <el-table-column label='Android' prop='date1' width='200'></el-table-column>
        <el-table-column label='Ios' prop='date2' ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <el-dialog  title="状态码" :visible.sync="innerVisible">404</el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisible = true" >状态码</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script type="text/javascript">

    import data from './data'
    import methods from './method'

    export default{
        data(){
            return data.init();
        },
        methods:methods,
        mounted(){
            this.getTableData();
        },

    }
</script>
<style type="text/css">
</style>
