export default{
  init:function(){
    let filter = {
      interfaceName: ''
    };
    return{
      studentData:[
        {
          interface_name:'历史K线',
          interface_describe:'查询历史K线',
          domains:'OHLCV3_1',
          domains2:'OHLCV2TestCase',
          android:'',
          ios:'',
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
        interface_name: '',
        interface_describe: '',
        compare_method:'',
        upload_version:'',
        update_version:'',
        platform: '',
        delivery: false,
        domains: [{
          value: ''
        }],
        domains2: [{
          value: ''
        }],
      },
      dialogupdataVisible: false,
      updata: {
        interface_name: '',
        interface_describe: '',
        compare_method:'',
        upload_version:'',
        update_version:'',
        platform: '',
        delivery: false,
        domains: [{
          value: ''
        }],
        domains2: [{
          value: ''
        }],
      },
      formLabelWidth: '120px',
      options: [{
        value: '选项1',
        label: '方法1'
      }, {
        value: '选项2',
        label: '方法2'
      }, {
        value: '选项3',
        label: '方法3'
      },]
    }
  }
}
