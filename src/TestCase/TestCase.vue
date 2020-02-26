<template>
  <div style="padding: 20px;">
    <!--  //查询-->
    <el-collapse v-model='activeCollapse'>
      <el-collapse-item title='查询条件' name='search'>
        <el-form ref='searchCondition' :model='filter' label-width='100px' label-position=‘left’>
          <el-row>
            <el-col :span='6'>
              <el-form-item label='用例名称' prop='versionName'>
                <el-input v-model='filter.versionName' :clearable='true'></el-input>
              </el-form-item>
            </el-col><el-col :span='6'>
            <el-form-item label='方法名称' prop='iterationVersion'>
              <el-input v-model='filter.iterationVersion' :clearable='true'></el-input>
            </el-form-item>
          </el-col>
            <el-col :span='6' style="marginLeft:20px;">
              <el-button @click='handleSearch' type='primary'>查询</el-button>
              <el-button @click='resetForm("searchCondition")'>重置</el-button>
            </el-col>
            <el-col :span='2' style='margin: 0px 0 10px 0;' type='flex' justify='end'>
              <el-button type="primary" @click="dialogFormVisible = true">新增用例</el-button>
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
          <el-table-column label='用例名称' prop='versionName' width='120'></el-table-column>
          <el-table-column label='所属接口' prop='iterationVersion' width='120'></el-table-column>
          <el-table-column label='所属方法' prop='platform' width='120'></el-table-column>
          <el-table-column label='所属平台' prop='updataTime' width='120'></el-table-column>
          <el-table-column label='包含参数' prop='up' width='120'></el-table-column>
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
    <el-dialog title="新增用例" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择接口">
            <el-option label="接口一" value="android"></el-option>
            <el-option label="接口二" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属平台" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择所属平台">
            <el-option label="Android" value="android"></el-option>
            <el-option label="IOS" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方法名称" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择方法">
            <el-option label="方法一" value="android"></el-option>
            <el-option label="方法二" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用例名称" :label-width="formLabelWidth">
          <el-input v-model="form.versionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类代码" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择股票类型">
            <el-option label="分类一" value="android"></el-option>
            <el-option label="分类二" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="股票代码" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择股票代码">
            <el-option label="600000.sh" value="android"></el-option>
            <el-option label="600004.sh" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数" :label-width="formLabelWidth">
          <el-input v-model="form.iterationVersion" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改-->
    <el-dialog title="修改用例信息" :visible.sync="dialogupdataVisible">
      <el-form :model="form">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择接口">
            <el-option label="接口一" value="android"></el-option>
            <el-option label="接口二" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属平台" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择所属平台">
            <el-option label="Android" value="android"></el-option>
            <el-option label="IOS" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方法名称" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择方法">
            <el-option label="方法一" value="android"></el-option>
            <el-option label="方法二" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用例名称" :label-width="formLabelWidth">
          <el-input v-model="form.versionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类代码" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择股票类型">
            <el-option label="分类一" value="android"></el-option>
            <el-option label="分类二" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="股票代码" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择股票代码">
            <el-option label="600000.sh" value="android"></el-option>
            <el-option label="600004.sh" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数" :label-width="formLabelWidth">
          <el-input v-model="form.iterationVersion" auto-complete="off"></el-input>
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
