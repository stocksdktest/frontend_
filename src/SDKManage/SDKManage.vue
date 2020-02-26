<template>
  <div style="padding: 20px;">
    <!--  //查询-->
    <el-collapse v-model='activeCollapse'>
      <el-collapse-item title='查询条件' name='search'>
        <el-form ref='searchCondition' :model='filter' label-width='100px' label-position=‘left’>
          <el-row>
            <el-col :span='6'>
              <el-form-item label='SDK版本号' prop='versionName'>
                <el-input v-model='filter.versionName' :clearable='true'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='6' style="marginLeft:20px;">
              <el-button @click='handleSearch' type='primary'>查询</el-button>
              <el-button @click='resetForm("searchCondition")'>重置</el-button>
            </el-col>
            <el-col :span='2' style='margin: 0px 0 10px 0;' type='flex' justify='end'>
              <el-button type="primary" @click="dialogFormVisible = true">关联接口</el-button>
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
          <el-table-column label="SDK版本信息">
          <el-table-column label='迭代版本' prop='versionName' width='150'></el-table-column>
          <el-table-column label='版本号' prop='iterationVersion' width='150'></el-table-column>
            <el-table-column label='所属平台' prop='platform' width='150'></el-table-column>
          </el-table-column>
          <el-table-column label='关联接口' prop='updataTime' width='150'></el-table-column>
          <el-table-column label='操作' prop='operate'>
            <template scope="scope">
              <el-button @click="delStu(scope)" type="primary" size="primary">删除</el-button>
              <el-button type="primary" @click="dialogupdataVisible = true">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--    新增-->
    <el-dialog title="关联接口" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="迭代版本" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label1"
              :value="item.value2">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属平台" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择所属平台">
            <el-option label="Android" value="android"></el-option>
            <el-option label="IOS" value="ios"></el-option>
          </el-select>
        </el-form-item>

        <el-checkbox :indeterminate="isIndeterminate" >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="接口名称 A"></el-checkbox>
          <el-checkbox label="接口名称 B"></el-checkbox>
          <el-checkbox label="接口名称 C"></el-checkbox>
          <el-checkbox label="接口名称 D" ></el-checkbox>
          <el-checkbox label="接口名称 E" ></el-checkbox>
        </el-checkbox-group>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    修改-->
    <el-dialog title="修改" :visible.sync="dialogupdataVisible">
      <el-form :model="form">
        <el-form-item label="迭代版本" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label1"
              :value="item.value2">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属平台" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择所属平台">
            <el-option label="Android" value="android"></el-option>
            <el-option label="IOS" value="ios"></el-option>
          </el-select>
        </el-form-item>

        <el-checkbox :indeterminate="isIndeterminate" >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="接口名称 A"></el-checkbox>
          <el-checkbox label="接口名称 B"></el-checkbox>
          <el-checkbox label="接口名称 C"></el-checkbox>
          <el-checkbox label="接口名称 D" ></el-checkbox>
          <el-checkbox label="接口名称 E" ></el-checkbox>
        </el-checkbox-group>

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
