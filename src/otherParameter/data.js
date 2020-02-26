export default{
  init:function(){
    let filter = {
      versionName: ''
    };
    return{
      studentData:[
        {
          versionName:'CATESORTING_1',
          iterationVersion:'0，12，1，0，1',
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
          value1: '',
          value2: '',
          value3: '',
          value4: ''
        }],
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
