<template>
    <el-container>
        <el-main>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="计划名">
                    <el-input v-model="plan.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form ref="form"  label-width="80px">
                <div id="form1" v-if="value == 1">
                    <el-form-item label="运行环境1">
                        <el-select v-model="Env1value" >
                            <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                  <el-form-item label="运行环境2">
                    <el-select v-model="Env2value">
                      <el-option v-for="item in Env" :key="item.value" :label="item.label" :value="item.value">

                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="Env1value == 1">
                    <el-form-item v-for="item in Url1value" :label="item.label">
                      <el-checkbox v-for="item in Url1value.item.value" :label="item">

                      </el-checkbox>
                    </el-form-item>
                  </el-form-item>
                </div>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>

    export default {
        name: "NewTestPlan",
        data() {
            return {
              plan:{
                name:''
              },
              options: [{
                value: '1',
                label: '两端数据对比'
              }, {
                value: '2',
                label: '不同环境数据对比'
              }, {
                  value: '3',
                  label: '竞品数据对比'
              }],
              Env1value:''
                ,
              Env2value:'',
              Url1value:'',
                value:'',
                Env:[{
                    value:'1',
                    label:'测试环境'
                },{
                  value:'2',
                  label:'全真环境'
                },{
                  value:'3',
                  label:'生产环境'
                }]
            }
        }
    }
</script>


<style scoped>

</style>
