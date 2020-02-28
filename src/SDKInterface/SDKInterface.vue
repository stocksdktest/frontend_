<template>
  <div style="padding: 20px;">
    <!--  //查询-->
    <el-collapse v-model='activeCollapse'>
      <el-collapse-item title='查询条件' name='search'>
        <el-form ref='searchCondition' :model='filter' label-width='100px' label-position=‘left’>
          <el-row>
            <el-col :span='6'>
              <el-form-item label='SDK接口' prop='versionName'>
                <el-input v-model='filter.versionName' :clearable='true'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='6' style="marginLeft:20px;">
              <el-button @click='handleSearch' type='primary'>查询</el-button>
              <el-button @click='resetForm("searchCondition")'>重置</el-button>
            </el-col>
            <el-col :span='2' style='margin: 0px 0 10px 0;' type='flex' justify='end'>
              <el-button type="primary" @click="dialogFormVisible = true">新增接口</el-button>
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
          <el-table-column label='接口名称' prop='data.interface_name' width='150'></el-table-column>
          <el-table-column label='接口描述' prop='data.interface_describe' width='150'></el-table-column>
          <el-table-column label='android方法' prop='data.android' width='150'></el-table-column>
          <el-table-column label='IOS方法' prop='data.ios' width='150'></el-table-column>
          <el-table-column label='操作' prop='operate'>
            <template scope="scope">
              <el-button @click="delInfo(scope)" type="primary" size="primary">删除</el-button>
              <el-button type="primary" @click="editInfo(scope),dialogupdataVisible = true">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--    新增-->
    <el-dialog title="新增SDK接口" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-input v-model="form.interface_name" auto-complete="off"></el-input>
          <label>对比方法</label>
          <el-select v-model="form.compare_method" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item  v-for="(domain, index) in form.domains"
                       :label="'Android方法' + index"
                       :key="domain.key"
                       :label-width="formLabelWidth"  >
          <el-input v-model="domain.value" style="width: 200px;"></el-input>
          <el-button @click="addDomain">添加</el-button>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item  v-for="(domain2, index) in form.domains2"
                       :label="'IOS方法' + index"
                       :key="domain2.key"
                       :label-width="formLabelWidth"  >
          <el-input v-model="domain2.value" style="width: 200px;"></el-input>
          <el-button @click="addDomain2">添加</el-button>
          <el-button @click.prevent="removeDomain2(domain2)">删除</el-button>
        </el-form-item>
        <el-form-item label="接口描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="form.interface_describe">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-left: 10px">
          <label>此接口新增于</label>
          <el-input v-model="form.upload_version" style="width: 120px" auto-complete="off"></el-input>
          <label>SDK版本，此接口最新更新于</label>
          <el-input v-model="form.update_version" style="width: 120px" auto-complete="off"></el-input>
          <label>SDK版本</label>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postInfo(form),dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改-->
    <el-dialog title="修改" :visible.sync="dialogupdataVisible">
      <el-form :model="updata">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-input v-model="updata.interface_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  v-for="(domain, index) in updata.domains"
                       :label="'Android方法' + index"
                       :key="domain.key"
                       :label-width="formLabelWidth"  >
          <el-input v-model="domain.value" style="width: 200px;"></el-input>
          <el-button @click="addDomain_updata">添加</el-button>
          <el-button @click.prevent="removeDomain_updata(domain)">删除</el-button>
        </el-form-item>
        <el-form-item  v-for="(domain2, index) in updata.domains2"
                       :label="'IOS方法' + index"
                       :key="domain2.key"
                       :label-width="formLabelWidth"  >
          <el-input v-model="domain2.value" style="width: 200px;"></el-input>
          <el-button @click="addDomain2_updata">添加</el-button>
          <el-button @click.prevent="removeDomain2_updata(domain2)">删除</el-button>
        </el-form-item>
        <el-form-item label="接口描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="updata.interface_describe">
          </el-input>
        </el-form-item>
        <el-form-item style="margin-left: 10px">
          <label>此接口新增于</label>
          <el-input v-model="updata.upload_version" style="width: 120px" auto-complete="off"></el-input>
          <label>SDK版本，此接口最新更新于</label>
          <el-input v-model="updata.update_version" style="width: 120px" auto-complete="off"></el-input>
          <label>SDK版本</label>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogupdataVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfoById(updata),dialogupdataVisible = false">确 定</el-button>
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
