<template>
  <div style="padding: 20px;">
    <!--  //查询-->
    <el-collapse v-model='activeCollapse'>
      <el-collapse-item title='查询条件' name='search'>
        <el-form ref='searchCondition' :model='filter' label-width='100px' label-position=‘left’>
          <el-row>
            <el-col :span='6'>
              <el-form-item label='方法名称' prop='versionName'>
                <el-input v-model='filter.versionName' :clearable='true'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='6' style="marginLeft:20px;">
              <el-button @click='handleSearch' type='primary'>查询</el-button>
              <el-button @click='resetForm("searchCondition")'>重置</el-button>
            </el-col>
            <el-col :span='2' style='margin: 0px 0 10px 0;' type='flex' justify='end'>
              <el-button type="primary" @click="dialogFormVisible = true">新增参数配置</el-button>
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
          <el-table-column label='方法名称' prop='versionName' width='150'></el-table-column>
          <el-table-column label='参数栏位' prop='iterationVersion' width='150'></el-table-column>
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
    <el-dialog title="新增参数配置" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="方法名称" :label-width="formLabelWidth">
        <el-select v-model="form.platform" placeholder="请选择方法">
          <el-option label="方法一" value="android"></el-option>
          <el-option label="方法二" value="ios"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="是否有股票类别" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择">
            <el-option label="是" value="android"></el-option>
            <el-option label="否" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有股票代码" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择">
            <el-option label="是" value="android"></el-option>
            <el-option label="否" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  v-for="(domain, index) in form.domains"
                       :label="''"
                       :key="domain.key"
                       style="margin-left: 60px">
          <label>参数名称</label>
          <el-input v-model="form.value1" style="width: 170px;"></el-input>
          <label>参数类别</label>
          <el-select v-model="form.platform" placeholder="请选择参数类别" style="width: 170px">
            <el-option label="类别一" value="android"></el-option>
            <el-option label="类别二" value="ios"></el-option>
          </el-select>
          <el-button @click="addDomain">添加</el-button>
          <div style="width: max-content; height: 5px"></div>
          <label>是否必选</label>
          <el-select v-model="form.platform" placeholder="请选择" style="width: 170px">
            <el-option label="是" value="android"></el-option>
            <el-option label="否" value="ios"></el-option>
          </el-select>
          <label>参数默认值</label>
          <el-input v-model="form.value4" style="width: 155px;"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改-->
    <el-dialog title="修改版本信息" :visible.sync="dialogupdataVisible">
      <el-form :model="form">
        <el-form-item label="方法名称" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择方法">
            <el-option label="方法一" value="android"></el-option>
            <el-option label="方法二" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有股票类别" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择">
            <el-option label="是" value="android"></el-option>
            <el-option label="否" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有股票代码" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择">
            <el-option label="是" value="android"></el-option>
            <el-option label="否" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  v-for="(domain, index) in form.domains"
                       :label="''"
                       :key="domain.key"
                       style="margin-left: 60px">
          <label>参数名称</label>
          <el-input v-model="form.value1" style="width: 170px;"></el-input>
          <label>参数类别</label>
          <el-select v-model="form.platform" placeholder="请选择参数类别" style="width: 170px">
            <el-option label="类别一" value="android"></el-option>
            <el-option label="类别二" value="ios"></el-option>
          </el-select>
          <el-button @click="addDomain">添加</el-button>
          <div style="width: max-content; height: 5px"></div>
          <label>是否必选</label>
          <el-select v-model="form.platform" placeholder="请选择" style="width: 170px">
            <el-option label="是" value="android"></el-option>
            <el-option label="否" value="ios"></el-option>
          </el-select>
          <label>参数默认值</label>
          <el-input v-model="form.value4" style="width: 155px;"></el-input>
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
