import {getStudentList,removeStudentById} from '../api/student'
export default{

  getTableData(){                           //---------------------获取列表数据
    let para = {
      pageNum: this.pagination.current,
      pageSize: this.pagination.pageSize,
      ...this.filter
    };
    console.log(para);
    getStudentList(para).then((res) => {
      console.log(res);
      this.studentData = res.data.records;
      this.pagination.total = res.data.total;
    });
  }

}
