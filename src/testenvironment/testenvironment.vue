<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="测试环境"></el-form-item>
      <el-table :data="data" border>
        <el-table-column type='index' width='75'></el-table-column>
        <el-table-column
          prop="name"
          label="站点名称"
          width="180">
          <template  slot-scope="scope">
            <el-input v-model="data[scope.$index].name"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="站点IP"
          width="180">
          <template  slot-scope="scope">
            <el-input v-model="data[scope.$index].ip"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作 ">
          <template  slot-scope="scope">
            <el-button @click="add">添加</el-button>
            <el-button @click="deleteRow(scope.$index)">删除</el-button>
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
    </el-form>
    <el-form label-width="100px">
      <el-form-item label="全真环境"></el-form-item>
      <el-table :data="data1" border>
        <el-table-column type='index' width='75'></el-table-column>
        <el-table-column
          prop="name"
          label="站点名称"
          width="180">
          <template  slot-scope="scope">
            <el-input v-model="data1[scope.$index].name"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="站点IP"
          width="180">
          <template  slot-scope="scope">
            <el-input v-model="data1[scope.$index].ip"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作 ">
          <template  slot-scope="scope">
            <el-button @click="add1">添加</el-button>
            <el-button @click="deleteRow1(scope.$index)">删除</el-button>
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
    </el-form>
    <el-form label-width="100px">
      <el-form-item label="生产环境"></el-form-item>
      <el-table :data="data2" border>
        <el-table-column type='index' width='75'></el-table-column>
        <el-table-column
          prop="name"
          label="站点名称"
          width="180">
          <template  slot-scope="scope">
            <el-input v-model="data2[scope.$index].name"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="站点IP"
          width="180">
          <template  slot-scope="scope">
            <el-input v-model="data2[scope.$index].ip"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作 ">
          <template  slot-scope="scope">
            <el-button @click="add2">添加</el-button>
            <el-button @click="deleteRow2(scope.$index)">删除</el-button>
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
    </el-form>
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
        }
    }

</script>
<style type="text/css">
</style>
