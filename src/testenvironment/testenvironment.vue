<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="测试环境"></el-form-item>
      <el-table :data='Csform' border>
        <el-table-column type='index' width='75'></el-table-column>
        <el-table-column
          prop='data.site_name'
          label='站点名称'
          width='180'>
        </el-table-column>
        <el-table-column
          prop="data.site_ip"
          label="站点IP"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作 ">
          <template  scope="scope">
            <el-button @click="updateEnvironment(scope), dialogUpdateCsVisible = true">修改</el-button>
            <el-button @click="deleteCsEnvironment(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <el-row><el-col style="margin-left: 20px"><el-button @click="addCsEnvironment(),dialogAddCsVisible = true" >添加</el-button></el-col></el-row>
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
    </el-form>
    <el-form label-width="100px">
      <el-form-item label="全真环境"></el-form-item>
      <el-table :data="Qzform" border>
        <el-table-column type='index' width='75'></el-table-column>
        <el-table-column
          prop="data.site_name"
          label="站点名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="data.site_ip"
          label="站点IP"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作 ">
          <template  scope="scope">
            <el-button @click="updateEnvironment(scope), dialogUpdateQzVisible = true">修改</el-button>
            <el-button @click="deleteQzEnvironment(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row><el-col style="margin-left: 20px"><el-button @click="addQzEnvironment(),dialogAddQzVisible = true" >添加</el-button></el-col></el-row>
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
    </el-form>
    <el-form label-width="100px">
      <el-form-item label="生产环境"></el-form-item>
      <el-table :data="Scform" border>
        <el-table-column type='index' width='75'></el-table-column>
        <el-table-column
          prop="data.site_name"
          label="站点名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="data.site_ip"
          label="站点IP"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作 ">
          <template  scope="scope">
            <el-button @click="updateEnvironment(scope), dialogUpdateScVisible = true">修改</el-button>
            <el-button @click="deleteScEnvironment(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row><el-col style="margin-left: 20px"><el-button @click="addScEnvironment(),dialogAddScVisible = true" >添加</el-button></el-col></el-row>
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
    </el-form>
    <!--    新增-->
    <el-dialog title="新增" :visible.sync="dialogAddScVisible">
      <el-form :model="addform">
        <el-form-item >
          <label>站点名称</label>
          <el-input v-model="addform.site_name" style="width: 100px;"></el-input>
          <label>站点地址</label>
          <el-input v-model="addform.site_ip" style="width: 100px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddScVisible = false">取 消</el-button>
        <el-button type="primary" @click="postScInfo(addform),dialogAddScVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialogAddCsVisible">
      <el-form :model="addform">
        <el-form-item >
          <label>站点名称</label>
          <el-input v-model="addform.site_name" style="width: 100px;"></el-input>
          <label>站点地址</label>
          <el-input v-model="addform.site_ip" style="width: 100px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCsVisible = false">取 消</el-button>
        <el-button type="primary" @click="postCsInfo(addform),dialogAddCsVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="dialogAddQzVisible">
      <el-form :model="addform">
        <el-form-item >
          <label>站点名称</label>
          <el-input v-model="addform.site_name" style="width: 100px;"></el-input>
          <label>站点地址</label>
          <el-input v-model="addform.site_ip" style="width: 100px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddQzVisible = false">取 消</el-button>
        <el-button type="primary" @click="postQzInfo(addform),dialogAddQzVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogUpdateCsVisible">
    <el-form :model="updateform">
      <el-form-item >
        <label>站点名称</label>
        <el-input v-model="updateform.site_name" style="width: 100px;"></el-input>
        <label>站点地址</label>
        <el-input v-model="updateform.site_ip" style="width: 100px;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogUpdateCsVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveCsInfo(updateform),dialogUpdateCsVisible = false">确 定</el-button>
    </div>
  </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogUpdateQzVisible">
      <el-form :model="updateform">
        <el-form-item >
          <label>站点名称</label>
          <el-input v-model="updateform.site_name" style="width: 100px;"></el-input>
          <label>站点地址</label>
          <el-input v-model="updateform.site_ip" style="width: 100px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateQzVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveQzInfo(updateform),dialogUpdateQzVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="dialogUpdateScVisible">
      <el-form :model="updateform">
        <el-form-item >
          <label>站点名称</label>
          <el-input v-model="updateform.site_name" style="width: 100px;"></el-input>
          <label>站点地址</label>
          <el-input v-model="updateform.site_ip" style="width: 100px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateScVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveScInfo(updateform),dialogUpdateScVisible = false">确 定</el-button>
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
            this.getCsTableData();
          this.getQzTableData();
          this.getScTableData();
        }
    }

</script>
<style type="text/css">
</style>
