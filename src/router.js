
import Home from './Home'
import classes from './class/classes'
import student from './student/student'
import tree from './tree'
import datacomparison from "./datacomparison/datacomparison.vue";
import testreport from "./testreport/testreport";
import testenvironment from "./testenvironment/testenvironment";
import SDKVersion from "./SDKVersion/SDKVersion";
import SDKInterface from "./SDKInterface/SDKInterface";
import TestScript from "./TestScript/TestScript";
import TestCase from "./TestCase/TestCase";
import StockTypeCode from "./stockTypeCode/StockTypeCode";
import OtherParameter from "./otherParameter/OtherParameter";
import TestPlanList from "./planmanage/TestPlanList";
import TestMonitor from "./testmonitor/TestMonitor";
import TestResult from "./testresult/TestResult";

let router = [
   // {
   //    path: '/',
   //    name: 'DOMO',
   //    component: Home,
   //    redirect: '/student',
	 //  iconCls: 'fa fa-id-card-o',
	 //  children: [
   //  		{ path: '/classes', component: classes, name: '班级管理' },
   //  		{ path: '/student', component: student, name: '学生管理' },
   //    ]
   //  },
  {
    path:'/',
    name:'测试用例管理',
    component:Home,
    redirect:'',
    iconCls:'fa fa-id-card-o',
    children:[
      { path:'/SDKVersion',component:SDKVersion,name:'SDK版本管理'},
      { path:'/SDKInterface',component:SDKInterface,name:'SDK接口管理'},
      { path:'/TestScript',component:TestScript,name:'测试用例代码仓库'},
      { path:'/TestCase',component:TestCase,name:'测试用例配置'}
    ]
  },
  {
    path:"/",
    name:'参数配置管理',
    component:Home,
    redirect:'',
    iconCls:'fa fa-id-card-o',
    children:[
      {path:'/stockTypeCode',component:StockTypeCode,name:'股票类型和代码配置'},
      {path:'/otherParameter',component:OtherParameter,name:'其他参数配置'},
      { path: '/testenvironment', component: testenvironment, name: '测试环境' },
    ]
  },
  {
    path: '/planmanage',
    name: '测试计划管理',
    component: Home,
    redirect: '/TestPlanList',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/TestPlanList', component: TestPlanList, name: '测试计划制定' },
      // { path: '/TestMonitor', component: TestMonitor, name: '执行过程监控' }, 废弃
      { path: '/TestResult', component: TestResult, name: '执行结果' }
    ]
  },
  {
    path: '/',
    name: '测试结果',
    component: Home,
    redirect: '',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/dateComparison', component: datacomparison, name: '问题列表' },
      { path:'/testreport',component:testreport,name:'测试报告'},
    ]
  }
];

export default router;
