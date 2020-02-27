export default{
  init:function(){
    let filter = {
      versionName: ''

    };
    return{
      interfaceList: [{interface_name:'接口名称1',checkStatus:false},{interface_name:'接口名称2',checkStatus:false}],
      checkList:[],

      versionList: [
        {
        // versionName:'',
        //   iterationVersion:[{iterationVersionName:'v3.2.0.001'},{iterationVersionName:'v3.2.0.001'}],
          sdk_version:'2019.12',
          sdk_iteration_version:'v3.2.001',
          platform:'Android',
          interfaceList: [{interface_name:'接口名称1',checkStatus:true},],
        },
        {
          // versionName:'',
          //   iterationVersion:[{iterationVersionName:'v3.2.0.001'},{iterationVersionName:'v3.2.0.001'}],
          sdk_version:'2019.12',
          sdk_iteration_version:'v3.2.001',
          platform:'Android',
          interfaceList:[{interface_name:'接口名称1',checkStatus:true},],
        }
      ],
      updateform:{
        sdk_version:'',
        sdk_iteration_version:'',
        platform:'',
        interfaceList:[],
      },
      deleteform:{
        sdk_version:'',
        sdk_iteration_version:'',
        platform:'',
        interfaceList:[],
      },
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

      filter: filter,													//查询条件
      activeCollapse: 'search',										//开关查询折叠面板
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      editVisible: false,
      dialogFormVisible: false,

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
        value: '201922',
      }, {
        value: '202001',
      }, {
        value: '07',
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
