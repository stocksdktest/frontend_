export default{
  init:function(){

    return{
      errormessage:[
        {
          name:'方法1',
          number:'001',
          data:'0,21,2',
          errortype:'数据错误',
          isCheck:false,
          isIgnore:false,
        },
        {
          name:'方法2',
          number:'002',
          data:'0,21,2',
          errortype:'数据错误',
          isCheck:false,
          isIgnore:false
        },
        {
          name:'方法3',
          number:'003',
          data:'0,21,2',
          errortype:'数据错误',
          isCheck:false,
          isIgnore:false

        },
        {
          name:'方法4',
          number:'004',
          data:'0,21,2',
          errortype:'接口不通',
          isCheck:false,
          isIgnore:false
        },
        {
          name:'方法5',
          number:'005',
          data:'0,21,2',
          errortype:'接口不通',
          isCheck:false,
          isIgnore:false
        },
      ],
      options: [{
        value: '选项1',
        label: '计划1'
      }, {
        value: '选项2',
        label: '计划2'
      }, {
        value: '选项3',
        label: '计划3'
      }, {
        value: '选项4',
        label: '计划4'
      }, {
        value: '选项5',
        label: '计划5'
      }],
      xxnews:[
        {
          time:'12:00:00',
          name:'code',
          date1:'100',
          date2:'100',
        },
        {
          time:'12:00:00',
          name:'type',
          date1:'10',
          date2:'20',
        },
        {
          time:'12:00:00',
          name:'route',
          date1:'10',
          date2:'10',
        },
        {
          time:'12:20:00',
          name:'code',
          date1:'100',
          date2:'100',
        },
        {
          time:'12:3 0:00',
          name:'code',
          date1:'100',
          date2:'100',
        },

      ],
      value: '',
      flag: false,
      dialogVisible: false,
      outerVisible: false,
      innerVisible: false,

    }
  }
}
