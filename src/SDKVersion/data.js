export default{
  init:function(){
    let filter = {
      versionName: ''
    };
    return{
      status: '',
      studentData:[
        {
          sdk_version_number:'201907特',
          sdk_itrative_version:'Android_3.1.0.001',
          platform:'Android',
          upload_time:'2019-10-10'
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
        sdk_version_number: '',
        sdk_itrative_version: '',
        platform: '',
        upload_time: ''
      },
      dialogupdataVisible: false,
      updata: {
        sdk_version_number: '',
        sdk_itrative_version: '',
        platform: '',
        upload_time: ''
      },
      formLabelWidth: '120px'
    }
  }
}
