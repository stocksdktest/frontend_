export default{
  init:function(){
    let filter = {
      versionName: '',
      iterationVersion:''
    };
    return{
      studentData:[
        {
          versionName:'自定义规范',
          iterationVersion:'历史k线',
          platform:'历史k线方法1',
          updataTime:'android',
          up:'600000.sh,dayk'
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
      formLabelWidth: '120px'
    }
  }
}
