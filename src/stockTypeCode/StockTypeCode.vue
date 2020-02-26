<template>
  <div style="padding: 20px;">
    <!--  //查询-->
    <el-collapse v-model='activeCollapse'>
      <el-collapse-item title='查询条件' name='search'>
        <el-form ref='searchCondition' :model='filter' label-width='100px' label-position=‘left’>
          <el-row>
            <el-col :span='6'>
              <el-form-item label='分类代码' prop='versionName'>
                <el-input v-model='filter.versionName' :clearable='true'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='6' style="marginLeft:20px;">
              <el-button @click='handleSearch' type='primary'>查询</el-button>
              <el-button @click='resetForm("searchCondition")'>重置</el-button>
            </el-col>
            <el-col :span='2' style='margin: 0px 0 10px 0;' type='flex' justify='end'>
              <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!--列表-->
    <div>

      <div style='margin-bottom: 20px'>
        <el-table :data='studentData' width='100%' border>
          <el-table-column type='index' width='65' label="序号"></el-table-column>
          <el-table-column label='分类名称' prop='versionName' width='150'></el-table-column>
          <el-table-column label='分类代码' prop='iterationVersion' width='150'></el-table-column>
          <el-table-column label='操作' prop='operate'>
            <template scope="scope">
              <el-button @click="delStu(scope)" type="primary" size="primary">删除</el-button>
              <el-button type="primary" @click="dialogupdataVisible = true">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-row type='flex' justify='end'>
        <el-pagination
          @size-change='handlePageSizeChange'
          @current-change='handleCurrentChange'
          :current-page='pagination.current'
          :page-sizes='[10, 20, 50, 100]'
          :page-size='pagination.pageSize'
          :total='pagination.total'
          layout='prev,pager,next,jumper,total,sizes'
        ></el-pagination>
      </el-row>
    </div>
    <!--    新增-->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item  v-for="(domain, index) in form.domains" :key="domain.key">
          <label>股票类型</label>
          <el-input v-model="form.value1" style="width: 140px;"></el-input>
          <label>类型名称</label>
          <el-input v-model="form.value2" style="width: 140px;"></el-input>
          <el-button @click="addDomain">添加</el-button>
          <label>包含股票</label>
          <el-input v-model="form.value3" style="width: 345px;"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改-->
    <el-dialog title="修改" :visible.sync="dialogupdataVisible">
      <el-form :model="form">
        <el-form-item  v-for="(domain, index) in form.domains" :key="domain.key">
          <label>股票类型</label>
          <el-input v-model="form.value1" style="width: 140px;"></el-input>
          <label>类型名称</label>
          <el-input v-model="form.value2" style="width: 140px;"></el-input>
          <el-button @click="addDomain">添加</el-button>
          <label>包含股票</label>
          <el-input v-model="form.value3" style="width: 345px;"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogupdataVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogupdataVisible = false">确 定</el-button>
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
        }
    }
</script>

<style type="text/css">

</style>
