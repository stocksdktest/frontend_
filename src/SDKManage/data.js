export default{
  init:function(){
    let filter = {
      versionName: ''

    };
    return{
      checkList: [ ],
      studentData:[
        {
          versionName:'2019.12',
          iterationVersion:'v3.2.001',
          platform:'Android',
          updataTime:'OHLCV2TestCase'
        }
      ],

      filter: filter,													//查询条件
      activeCollapse: 'search',										//开关查询折叠面板
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      editVisible: false,
      dialogFormVisible: false,
      form: {
        versionName: '',
        iterationVersion: '',
        platform: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        domains: [{
          value: ''
        }],
        domains2: [{
          value: ''
        }]
      },
      dialogupdataVisible: false,
      updata: {
        versionName: '',
        iterationVersion: '',
        platform: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      options1: [{
        value1: '选项1',
        label1: '201912'
      }, {
        value1: '选项2',
        label1: '202001'
      }, {
        value1: '选项3',
        label1: '07'
      },],
      options2: [{
        value2: '选项1',
        label1: '3.0.001'
      }, {
        value2: '选项2',
        label1: '3.2.007'
      }, ]
    }
  }
}
