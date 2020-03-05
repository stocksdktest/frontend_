export default{
  init:function(){
    let filter = {
      caseName: '',
      wayName:''
    };
    return{
      // caseList:[{caseName:'自定义规范',parameter:'600000.sh,dayk',codeType:'',code:''}],
      caseData:[
        {
          interfaceName:'',
          className:'',
          platform:'',
          caseList:[{caseName:'自定义规范',parameter:'600000.sh,dayk',codeType:'',code:''}],
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
        caseName:'',
        codeType:'',
        code:'',
        parameter:[],
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: ''
      },
      dialogChangeCaseVisible:false,
      codeTypeList:[{
        stock_type:'SH1001',
        stock_id:'600000.sh'
      },{
        stock_type:'SZ1001',
        stock_id:'000001.sz'
      }],
      codeList:[{
        stock_type:'SH1001',
        stock_id:'600000.sh'
      },{
        stock_type:'SZ1001',
        stock_id:'000001.sz'
      }],
      dialogupdataVisible: false,
      updata: {
        interfaceName:'',
        className:'',
        platform:'',
        caseList:[],
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: ''
      },
      updateform:{
        interfaceName:'',
        className:'',
        platform:'',
        caseList:[],
      },
      formLabelWidth: '120px'
    }
  }
}
