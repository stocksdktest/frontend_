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
<!--         废弃     <el-button type="primary" @click="dialogFormVisible = true">新增脚本方法</el-button>-->
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
          <el-table-column label='方法描述' prop='iterationVersion' width='150'></el-table-column>
          <el-table-column label='关联接口' prop='platform' width='150'></el-table-column>
          <el-table-column label='所属平台' prop='updataTime' width='150'></el-table-column>
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
    <el-dialog title="新增脚本方法" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择接口">
            <el-option label="接口1" value="android"></el-option>
            <el-option label="接口2" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属平台" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择所属平台">
            <el-option label="Android" value="android"></el-option>
            <el-option label="IOS" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方法名称" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择脚本方法">
            <el-option label="方法一" value="android"></el-option>
            <el-option label="方法二" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="脚本上传":label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="方法描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="form.iterationVersion">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-left: 10px">
          <label>此方法新增于</label>
          <el-input v-model="updata.versionName" style="width: 120px" auto-complete="off"></el-input>
          <label>SDK版本，此方法最新更新于</label>
          <el-input v-model="updata.versionName" style="width: 120px" auto-complete="off"></el-input>
          <label>SDK版本</label>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改-->
    <el-dialog title="修改脚本信息" :visible.sync="dialogupdataVisible">
      <el-form :model="form">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择接口">
            <el-option label="接口1" value="android"></el-option>
            <el-option label="接口2" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属平台" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择所属平台">
            <el-option label="Android" value="android"></el-option>
            <el-option label="IOS" value="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方法名称" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择脚本方法">
            <el-option label="方法一" value="android"></el-option>
            <el-option label="方法二" value="ios"></el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="脚本上传":label-width="formLabelWidth">-->
<!--          <el-upload-->
<!--            class="upload-demo"-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--            :on-preview="handlePreview"-->
<!--            :on-remove="handleRemove"-->
<!--            :before-remove="beforeRemove"-->
<!--            multiple-->
<!--            :limit="3"-->
<!--            :on-exceed="handleExceed"-->
<!--            :file-list="fileList">-->
<!--            <el-button size="small" type="primary">点击上传</el-button>-->
<!--            <div slot="tip" class="el-upload__tip"></div>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
        <el-form-item label="方法描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="form.iterationVersion">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-left: 10px">
          <label>此方法新增于</label>
          <el-input v-model="updata.versionName" style="width: 120px" auto-complete="off"></el-input>
          <label>SDK版本，此方法最新更新于</label>
          <el-input v-model="updata.versionName" style="width: 120px" auto-complete="off"></el-input>
          <label>SDK版本</label>
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
