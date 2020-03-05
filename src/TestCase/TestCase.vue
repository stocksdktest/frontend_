<template>
  <div style="padding: 20px;">
    <!--  //查询-->
    <el-collapse v-model='activeCollapse'>
      <el-collapse-item title='查询条件' name='search'>
        <el-form ref='searchCondition' :model='filter' label-width='100px' label-position=‘left’>
          <el-row>
            <el-col :span='6'>
              <el-form-item label='用例名称' prop='versionName'>
                <el-input v-model='filter.caseName' :clearable='true'></el-input>
              </el-form-item>
            </el-col><el-col :span='6'>
            <el-form-item label='方法名称' prop='iterationVersion'>
              <el-input v-model='filter.wayName' :clearable='true'></el-input>
            </el-form-item>
          </el-col>
            <el-col :span='6' style="marginLeft:20px;">
              <el-button @click='handleSearch' type='primary'>查询</el-button>
              <el-button @click='resetForm("searchCondition")'>重置</el-button>
            </el-col>
<!--            <el-col :span='2' style='margin: 0px 0 10px 0;' type='flex' justify='end'>-->
<!--              <el-button type="primary" @click="addCase(),dialogFormVisible = true">新增用例</el-button>-->
<!--            </el-col>-->
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!--列表-->
    <div>

      <div style='margin-bottom: 20px'>
        <el-table :data='caseData' width='100%' border>
          <el-table-column type='index' width='65' label="序号"></el-table-column>

          <el-table-column label='所属接口' prop='data.interfaceName' width='120'><template slot-scope="scope">
            {{scope.row.interfaceName}}
          </template></el-table-column>
          <el-table-column label='所属方法' prop='data.className' width='120'><template slot-scope="scope">
            {{scope.row.className}}
          </template></el-table-column>
          <el-table-column label='所属平台' prop='data.platform' width='120'><template slot-scope="scope">
            {{scope.row.platform}}
          </template></el-table-column>
          <el-table-column label='用例列表' prop='data.caseList' width='120'>
            <template slot-scope="scope">
              <div v-for="item in scope.row.data.caseList" >{{item.caseName}}</div>
            </template>
          </el-table-column>

<!--          <el-table-column label='包含参数' prop='parameter' width='120'></el-table-column>-->
          <el-table-column label='操作' prop='operate'>
            <template scope="scope">
              <el-button @click="delInfo(scope)" type="primary" size="primary">删除</el-button>
              <el-button type="primary" @click="changecaselist(scope),dialogupdataVisible = true">编写用例</el-button>
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
        <el-form-item label="用例名称" :label-width="formLabelWidth">
          <el-input v-model="form.caseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类代码" :label-width="formLabelWidth">
          <el-select v-model="form.codeType" placeholder="请选择股票类型">
            <el-option v-for="item in codeList" :label="item.stock_type" :value="item.stock_type"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="股票代码" :label-width="formLabelWidth">
          <el-select v-model="form.code" placeholder="请选择股票代码">
            <el-option v-for="item in codeTypeList" :label="item.stock_id" :value="item.stock_id"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="参数" :label-width="formLabelWidth">
          <el-input v-model="form.parameter" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postInfo(form),dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改用例列表-->
    <el-dialog title="编写用例列表" :visible.sync="dialogupdataVisible">
      <el-form :model="updata">

        <el-row>
          <el-col :span='6'>
            <el-form-item label="接口名称">{{updata.interfaceName}}</el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label="方法名称">{{updata.className}}</el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label="所属平台" >{{updata.platform}}</el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item>
              <el-button type="primary" @click="addCase(updata),dialogFormVisible = true">新增用例</el-button>
            </el-form-item>
         </el-col>
        </el-row>
        <el-table :data="updata.caseList">
          <el-table-column type='index' width='40'></el-table-column>
          <el-table-column prop="data.caseName"
                           label="用例名称"
                           width="160">
            <template slot-scope="scope">
              {{scope.row.caseName}}
            </template>
          </el-table-column>
          <el-table-column prop="data.parameter"
                           label="包含参数"
                           width="180"><template slot-scope="scope">
            {{scope.row.parameter}}
          </template></el-table-column>
          <el-table-column prop="data.codeType"
                           label="股票分类"
                           width="160"><template slot-scope="scope">
            {{scope.row.codeType}}
          </template></el-table-column>
          <el-table-column prop="data.code"
                           label="股票代码"
                           width="160"><template slot-scope="scope">
            {{scope.row.code}}
          </template></el-table-column>
          <el-table-column prop="operate"
                           label="操作"
                           width="180">
            <template scope="scope">
              <el-button @click="delInfo(scope)" type="primary" size="primary">删除</el-button>
              <el-button type="primary" @click="changeInfo(scope),dialogChangeCaseVisible = true">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogupdataVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveInfo(updata), dialogupdataVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改用例-->
    <el-dialog title="修改用例" :visible.sync="dialogChangeCaseVisible">
      <el-form :model="updateform">
        <el-form-item label="用例名称" :label-width="formLabelWidth">
          <el-input v-model="updateform.caseName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类代码" :label-width="formLabelWidth">
          <el-select v-model="updateform.codeType" placeholder="请选择股票类型">
            <el-option v-for="item in codeList" :label="item.stock_type" :value="item.stock_type"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="股票代码" :label-width="formLabelWidth">
          <el-select v-model="updateform.code" placeholder="请选择股票代码">
            <el-option v-for="item in codeTypeList" :label="item.stock_id" :value="item.stock_id"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="参数" :label-width="formLabelWidth">
          <el-input v-model="updateform.parameter" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postCaseInfo(updateform),dialogFormVisible = false">确 定</el-button>
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
