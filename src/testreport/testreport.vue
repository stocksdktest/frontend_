<template>
  <el-form label-width="100px">
    <el-form-item label="测试报告:" label-width="500px"style="font-weight: bold;">
      测试计划一
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="计划类型:">
          <u>Android/Ios</u>
        </el-form-item>
        <el-form-item label="所属迭代:">
          <u>07</u>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="运行环境:">
          <u>Android</u>
        </el-form-item>
        <el-form-item label="SDK版本:">
          <u>3.0.1.001</u>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="测试接口通过率:" label-width="145px">
        </el-form-item>
        <pie></pie>
        <el-form-item label="测试用例通过率:" label-width="145px">
        </el-form-item>
        <pie></pie>
      </el-col>
      <el-col :span="12">
        <el-form-item label="测试方法通过率:" label-width="145px">
          <pie></pie>
        </el-form-item>
        <el-form-item label="缺陷分布情况:" label-width="145px">
        </el-form-item>
        <bar></bar>
      </el-col>
    </el-row>
    <label style="font-weight: bold; position: relative; left: 20px">缺陷列表</label>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="number" label="缺陷编号" width="180"></el-table-column>
      <el-table-column prop="name" label="接口名称" width="180"></el-table-column>
      <el-table-column prop="way" label="所属方法" width="180"></el-table-column>
      <el-table-column prop="bug" label="BUG描述"></el-table-column>
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
  </el-form>

</template>

<script type="text/javascript">

    import data from './data'
    import methods from './method'
    import pie from './pie.vue'
    import bar from './bar.vue'

    export default{
        components: {pie,bar},
        data(){
            return data.init();
        },
        methods:methods,
        mounted(){
            this.getTableData();
        }
    }
</script>
<style type="text/css">
</style>
