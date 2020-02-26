export default{
	init:function(){
		let filter = {
			environment: ''
		};
		return{
      Csform:[
         {
           site_name: '123',
           site_ip: '123'
         },
			],
      addform: {
          site_name:'',
          site_ip:''
        }    ,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },

      updateform:{},
      dialogAddVisible:false,
      dialogUpdateVisible:false,
      Csfilter:{
        environment:'ceshi',
      },
      Qzfilter:{
        environment:'quanzhen',
      },
      Scfilter:{
        environment:'shengchan',
      },

      Qzform:[
        {
        },

      ],
      Scform:[
        {


        },

      ],
		}
	}
}
