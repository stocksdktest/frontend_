<template>
    <el-container>

        <el-main>
          <el-collapse v-model='activeCollapse'>
            <el-collapse-item title='查询条件' name='search'>
              <el-form ref='searchCondition' :model='filter' label-width='80px' label-position=‘left’>
                <el-row>
                  <el-col :span='6'>
                    <el-form-item label='计划名' prop='name'>
                      <el-input v-model='filter.name' :clearable='true'></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span='6' style="marginLeft:20px;">
                    <el-button @click='handleSearch' type='primary'>查询</el-button>
                    <el-button @click='resetForm("searchCondition")'>重置</el-button>
                  </el-col>
                  <el-col :span='2' style='margin: 0px 0 10px 0;' type='flex' justify='end'>
                    <el-button @click='dialogCreatePlan=true' type='primary'>新建</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>


            <el-table :data="tableDataPlan" width="100%">
                <el-table-column prop="name" label="计划名" >
                </el-table-column>
                <el-table-column prop="content" label="所含脚本">
                </el-table-column>
                <el-table-column prop="status" label="执行状态">
                </el-table-column>
                <el-table-column prop="operation" label="操作">
                    <template slot-scope="scope">
                      <el-button size="primary"  style="marginLeft:40px;">运行</el-button>
                      <el-button @click="editPlan(scope)" type="button" size="primary">修改</el-button>
                      <el-button @click="delPlan(scope)" type="button" size="primary">删除</el-button>
                      <el-button @click="copyPlan(scope)" type="button" size="primary" style="marginLeft:40px;">复制</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-row>
                <el-pagination
                        @size-change="handlePageSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pagination.current"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </el-row>

          <el-dialog
            width="30%"
            :visible.sync="dialogCreateJiaoBen"
            append-to-body>
            <div>
              <el-form>
                <el-row>
                  <el-col>
                    <el-form-item label="方法名">
                      <el-select v-model="classValue">
                        <el-option v-for="item in ClassList" :value="item.value" :label="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <div v-for="item in ClassList">
                      <div v-if="item.value == classValue">
                        <el-table :data="item.caseList" >

                          <el-table-column prop="name" label="用例名">
                          </el-table-column>
                          <el-table-column prop="startTime" label="开始时间">
                            <el-input v-model="item.caseList.startTime"></el-input>
                          </el-table-column>
                          <el-table-column prop="doNum" label="执行次数">
                            <el-input v-model="item.caseList.doNum"></el-input>
                          </el-table-column>
                          <el-table-column prop="waitTime" label="间隔">
                            <el-input v-model="item.caseList.waitTime"></el-input>
                          </el-table-column>
                          <el-table-column>
                            <el-checkbox></el-checkbox>
                          </el-table-column>

                        </el-table>
                      </div>

                    </div>

                  </el-col>
                </el-row>

              </el-form>
              <el-row type='flex' justify='end'>
                <el-button @click=''>取消</el-button>
                <el-button type='info' @click=''>保存</el-button>
              </el-row>
            </div>
          </el-dialog>

          <el-dialog title='新建计划' size='large' ref='createPlan' v-model='dialogCreatePlan' style="width:800px;padding: 50px;marginLeft:200px;">

            <div style='padding: 20px 50px'>
              <el-form label-width='100px' ref='PlanForm' :model='PlanForm'>
                <el-row type='flex' justify='space-between'>
                  <el-col :span='11'>
                    <el-form-item label="计划名" prop="name">
                      <el-input v-model="PlanForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                    <el-col :span='11'>
                    <el-form-item label="计划类型" prop="type">
                      <el-select v-model="PlanForm.type" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div id="addForm1" v-if="PlanForm.type == 1">
                  <el-row type="flex" justify="space-between">
                    <el-col :span='11'>
                      <el-form-item label="市场权限">
                        <el-checkbox v-for="item in MarketPerm" :label="item">
                        </el-checkbox>
                        <el-button @click="item" type="button" size="primary">添加</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type='flex' justify='space-between'>
                    <el-col :span='11'>
                      <el-form-item label="运行环境">
                        <el-select v-model="Envvalue" >
                          <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row type='flex' justify='space-between'>
                    <el-col :span='11'>
                      <div v-if="Envvalue == 1">
                        <el-form-item v-for="(item,index) in Url1value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url1value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Envvalue == 2">
                        <el-form-item v-for="(item,index) in Url2value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url2value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Envvalue == 3">
                        <el-form-item v-for="(item,index) in Url3value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url3value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                    </el-col>

                  </el-row>
                  <el-row>
                    <el-col :span="11">
                      <el-form-item label="安卓系统SDK版本：">
                        <el-select v-model="androidSDKversion">
                          <el-option v-for="item in androidSDKlist" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item label="IOS系统SDK版本：">
                      <el-select v-model="iosSDKversion">
                        <el-option v-for="item in iosSDKlist" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="运行脚本列表:">
                        <el-table :data="contentList">
                          <el-table-column prop="name" label="脚本名">
                          </el-table-column>
                          <el-table-column prop="operate" label="操作">
                            <template slot-scope="scope">
                              <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                              <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                      <el-button type="primary" @click="dialogCreateJiaoBen = true">新增</el-button>
                    </el-col>
                  </el-row>
                </div>

                  <div id="addForm2" v-if="PlanForm.type == 2">
                    <el-row type="flex" justify="space-between">
                      <el-col :span='11'>
                        <el-form-item label="市场权限">
                          <el-checkbox v-for="item in MarketPerm" :label="item">
                          </el-checkbox>
                          <el-button @click="item" type="button" size="primary">添加</el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row type='flex' justify='space-between'>
                      <el-col :span='11'>
                        <el-form-item label="运行环境1">
                          <el-select v-model="Env1value" >
                            <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span='11'>
                        <el-form-item label="运行环境2">
                          <el-select v-model="Env2value">
                            <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                    </el-row>

                      <el-row type='flex' justify='space-between'>
                        <el-col :span='11'>
                          <div v-if="Env1value == 1">
                            <el-form-item v-for="(item,index) in Url1value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url1value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                          <div v-if="Env1value == 2">
                            <el-form-item v-for="(item,index) in Url2value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url2value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                          <div v-if="Env1value == 3">
                            <el-form-item v-for="(item,index) in Url3value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url3value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                        </el-col>
                        <el-col :span='11'>
                          <div v-if="Env2value == 1">
                            <el-form-item v-for="(item,index) in Url1value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url1value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                          <div v-if="Env2value == 2">
                            <el-form-item v-for="(item,index) in Url2value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url2value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                          <div v-if="Env2value == 3">
                            <el-form-item v-for="(item,index) in Url3value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url3value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                        </el-col>
                      </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item label="SDK版本：">
                          <el-select v-model="SDKversion">
                            <el-option v-for="item in androidSDKlist" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item label="运行脚本列表:">
                          <el-table :data="contentList">
                            <el-table-column prop="name" label="脚本名">
                            </el-table-column>
                            <el-table-column prop="operate" label="操作">
                              <template slot-scope="scope">
                                <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                                <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-form-item>
                        <el-button @click="dialogCreateJiaoBen = true" type="button" size="primary">新增</el-button>
                      </el-col>
                    </el-row>
                  </div>
                <div id="addForm3" v-if="PlanForm.type == 3">
                  <el-row>
                    <el-col :span="11">
                      <el-label style="margin-left: 10px">上证所数据：</el-label>
                      <el-row type="flex" justify="space-between">
                        <el-col :span='11'>
                          <el-form-item label="市场权限">
                            <el-checkbox v-for="item in MarketPerm" :label="item">
                            </el-checkbox>
                            <el-button @click="item" type="button" size="primary">添加</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row type='flex' justify='space-between' style="margin-top: 10px">
                        <el-col>
                          <el-form-item label="运行环境">
                            <el-select v-model="Envvalue" >
                              <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>

                      </el-row>

                      <el-row type='flex' justify='space-between'>
                        <el-col :span='11'>
                          <div v-if="Env1value == 1">
                            <el-form-item v-for="(item,index) in Url1value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url1value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                          <div v-if="Env1value == 2">
                            <el-form-item v-for="(item,index) in Url2value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url2value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                          <div v-if="Env1value == 3">
                            <el-form-item v-for="(item,index) in Url3value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url3value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col>
                          <el-form-item label="SDK版本：">
                            <el-select v-model="androidSDKversion">
                              <el-option v-for="item in androidSDKlist" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="运行脚本列表:">
                            <el-table :data="contentList">
                              <el-table-column prop="name" label="脚本名">
                              </el-table-column>
                              <el-table-column prop="operate" label="操作">
                                <template slot-scope="scope">
                                  <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                                  <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-form-item>
                          <el-button @click="dialogCreateJiaoBen = true" type="button" size="primary">新增</el-button>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="13">
                      <el-label style="margin-left: 10px">竞品数据：</el-label>
                      <div v-for="(item, index) in jingpincase.dynamicItem" :key="index" style="margin-top: 10px">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="分类代码":prop="'dynamicItem.' + index + '.type'">
                              <el-input v-model="item.type"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="股票代码" :prop="'dynamicItem.' + index + '.name'">
                              <el-input v-model="item.code"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="开始时间" :prop="'dynamicItem.'+index+'.time'">
                              <el-input v-model="item.time"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="执行次数" :prop="'dynamicItem.'+index+'.doNum'">
                              <el-input v-model="item.doNum"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="间隔" :prop="'dynamicItem.'+index+'.waitTime'">
                              <el-input v-model="item.waitTime"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-form-item>
                            <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
                          </el-form-item>
                        </el-row>

                      </div>
                      <el-row type='flex' justify='end'>
                          <el-button @click="addItem" type="primary">增加</el-button>
                      </el-row>

                    </el-col>
                  </el-row>



                </div>

              </el-form>
              <el-row type='flex' justify='end'>
                <el-button @click='handleCloseAddDialog'>取消</el-button>
                <el-button type='info' @click='udpatePlanById'>保存</el-button>
              </el-row>
            </div>
          </el-dialog>


          <el-dialog title='修改计划' size='large' ref='editPlan' v-model='dialogEditPlan' style="width:800px;padding: 50px;marginLeft:400px;">
            <div style='padding: 20px 50px'>
              <el-form label-width='100px' ref='editPlanForm' :model='editPlanForm'>
                <el-row type='flex' justify='space-between'>
                  <el-col :span='11'>
                    <el-form-item label="计划名" prop="name">
                      <el-input v-model="editPlanForm.name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="计划类型" prop="type">
                      <el-select v-model="editPlanForm.type" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div id="editForm1" v-if="editPlanForm.type==1">
                  <el-row type='flex' justify='space-between'>
                    <el-col :span='11'>
                      <el-form-item label="运行环境">
                        <el-select v-model="Envvalue" >
                          <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row type='flex' justify='space-between'>
                    <el-col :span='11'>
                      <div v-if="Envvalue == 1">
                        <el-form-item v-for="(item,index) in Url1value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url1value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Envvalue == 2">
                        <el-form-item v-for="(item,index) in Url2value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url2value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Envvalue == 3">
                        <el-form-item v-for="(item,index) in Url3value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url3value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                    </el-col>

                  </el-row>
                  <el-row>
                    <el-col :span="11">
                      <el-form-item label="安卓系统SDK版本：">
                        <el-select v-model="androidSDKversion">
                          <el-option v-for="item in androidSDKlist" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item label="IOS系统SDK版本：">
                        <el-select v-model="iosSDKversion">
                          <el-option v-for="item in iosSDKlist" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>

                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="运行脚本列表:">
                        <el-table :data="contentList">
                          <el-table-column prop="name" label="脚本名">
                          </el-table-column>
                          <el-table-column prop="operate" label="操作">
                            <template slot-scope="scope">
                              <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                              <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                      <el-button @click="dialogCreateJiaoBen = true" type="button" size="primary">新增</el-button>
                    </el-col>
                  </el-row>
                </div>

                <div id="editForm2" v-if="editPlanForm.type == 2">
                  <el-row type='flex' justify='space-between'>
                    <el-col :span='11'>
                      <el-form-item label="运行环境1">
                        <el-select v-model="Env1value" >
                          <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span='11'>
                      <el-form-item label="运行环境2">
                        <el-select v-model="Env2value">
                          <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row type='flex' justify='space-between'>
                    <el-col :span='11'>
                      <div v-if="Env1value == 1">
                        <el-form-item v-for="(item,index) in Url1value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url1value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Env1value == 2">
                        <el-form-item v-for="(item,index) in Url2value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url2value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Env1value == 3">
                        <el-form-item v-for="(item,index) in Url3value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url3value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span='11'>
                      <div v-if="Env2value == 1">
                        <el-form-item v-for="(item,index) in Url1value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url1value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Env2value == 2">
                        <el-form-item v-for="(item,index) in Url2value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url2value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                      <div v-if="Env2value == 3">
                        <el-form-item v-for="(item,index) in Url3value" :label="item.label" :key="item.label">
                          <el-checkbox v-for="item in Url3value[index].value" :label="item">

                          </el-checkbox>
                        </el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="SDK版本：">
                        <el-select v-model="androidSDKversion">
                          <el-option v-for="item in androidSDKlist" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="运行脚本列表:">
                        <el-table :data="contentList">
                          <el-table-column prop="name" label="脚本名">
                          </el-table-column>
                          <el-table-column prop="operate" label="操作">
                            <template slot-scope="scope">
                              <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                              <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-form-item>
                      <el-button @click="dialogCreateJiaoBen = true" type="button" size="primary">新增</el-button>
                    </el-col>
                  </el-row>
                </div>
                <div id="editForm3" v-if="editPlanForm.type == 3">
                  <el-row>
                    <el-col :span="11">
                      <el-label style="margin-left: 10px">上证所数据：</el-label>
                      <el-row type='flex' justify='space-between' style="margin-top: 10px">
                        <el-col>
                          <el-form-item label="运行环境">
                            <el-select v-model="Envvalue" >
                              <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>

                      </el-row>

                      <el-row type='flex' justify='space-between'>
                        <el-col :span='11'>
                          <div v-if="Env1value == 1">
                            <el-form-item v-for="(item,index) in Url1value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url1value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                          <div v-if="Env1value == 2">
                            <el-form-item v-for="(item,index) in Url2value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url2value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                          <div v-if="Env1value == 3">
                            <el-form-item v-for="(item,index) in Url3value" :label="item.label" :key="item.label">
                              <el-checkbox v-for="item in Url3value[index].value" :label="item">

                              </el-checkbox>
                            </el-form-item>
                          </div>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col>
                          <el-form-item label="SDK版本：">
                            <el-select v-model="androidSDKversion">
                              <el-option v-for="item in androidSDKlist" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="运行脚本列表:">
                            <el-table :data="contentList">
                              <el-table-column prop="name" label="脚本名">
                              </el-table-column>
                              <el-table-column prop="operate" label="操作">
                                <template slot-scope="scope">
                                  <el-button @click="editJiaoBen(scope)" type="button" size="primary">修改</el-button>
                                  <el-button @click="delJiaoBen(scope)" type="danger" size="primary">删除</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-form-item>
                          <el-button @click="dialogCreateJiaoBen = true" type="button" size="primary">新增</el-button>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="13">
                      <el-label style="margin-left: 10px">竞品数据：</el-label>
                      <div v-for="(item, index) in jingpincase.dynamicItem" :key="index" style="margin-top: 10px">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="分类代码":prop="'dynamicItem.' + index + '.type'">
                              <el-input v-model="item.type"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="股票代码" :prop="'dynamicItem.' + index + '.name'">
                              <el-input v-model="item.code"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="开始时间" :prop="'dynamicItem.'+index+'.time'">
                              <el-input v-model="item.time"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="执行次数" :prop="'dynamicItem.'+index+'.doNum'">
                              <el-input v-model="item.doNum"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="间隔" :prop="'dynamicItem.'+index+'.waitTime'">
                              <el-input v-model="item.waitTime"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-form-item>
                            <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
                          </el-form-item>
                        </el-row>
                      </div>
                      <el-row type='flex' justify='end'>
                        <el-button @click="addItem" type="primary">增加</el-button>
                      </el-row>
                    </el-col>
                  </el-row>
                </div>

                </el-form>
              <el-row type='flex' justify='end'>
                <el-button @click='handleCloseEditDialog'>取消</el-button>
                <el-button type='info' @click='updatePlanById'>保存</el-button>
              </el-row>
            </div>

          </el-dialog>

        </el-main>

    </el-container>
</template>

<script type="text/javascript">

  import methods from './method'
  import data from './data'

  export default{
    data(){
      return data.init();
    },
    methods: methods,
    mounted(){
      this.getTableData();
    }
  }
</script>
<style type="text/css">
</style>
