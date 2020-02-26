export default{
  init:function(){
    let filter = {
      versionName: ''
    };
    return{
      studentData:[
        {
          versionName:'OHLCV3TEST_1',
          iterationVersion:'历史k线方法1',
          platform:'android',
          updataTime:'2019-10-10'
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
        desc: ''
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
      data:[]
    }
  }
}
