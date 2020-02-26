export default {
  init: function () {
    let filter = {
      name: ''
    };
    const item = {
      content: '111',
      name: '111',
      status:''
    };
    return {
      // tableData:[],
      filter: filter,													//查询条件
      activeCollapse: 'search',										//开关查询折叠面板
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },																//巡检计划列表分页数据
      editVisible: false,
      dialogCreatePlan: false,
      tableDataPlan: [item, item],
      PlanForm: {
        name: '',
        type: ''
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
      Envvalue: '',
      Env1value: '',
      Env2value: '',
      Env: [{
        value: '1',
        label: '测试环境'
      }, {
        value: '2',
        label: '全真环境'
      }, {
        value: '3',
        label: '生产环境'
      }],
      Url1value: [{
        label: 'sh',
        value: ['1', '2']
      }, {
        label: 'sz',
        value: ['1', '2']
      }],
      Url2value: [{
        label: 'sh',
        value: ['1', '2']
      }],
      Url3value: [{
        label: 'sh',
        value: ['1', '2']
      }],
      dialogEditPlan: false,
      editPlanForm: {
        name: '',
        value: '',
        id: ''
      },
      defaultPlanForm: {
        name: '',
        value: '',
      },
      jingpincase: {
        dynamicItem: []
      },
      classValue: '',
      ClassList: [{
        label: '123',
        value: '1',
        caseList: [{
          name: '123',
          startTime: '123'
        }]
      }],
      contentList: [],
      androidSDKversion: '',
      androidSDKlist: [{
        value: '',
        label: ''
      }],
      iosSDKversion: '',
      iosSDKlist: [{
        value: '',
        label: ''
      }],
      dialogCreateJiaoBen: false,
      MarketPerm: ['sh', 'sz']
    }
  }
}
