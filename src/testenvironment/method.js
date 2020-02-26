import {getStudentList,removeStudentById} from '../api/student'
export default{
  //条件搜索
  handleSearch() {
    this.pagination.current = 1;
    this.getTableData()
  },
  //重置搜索条件
  resetForm(formName) {
    this.$refs[formName].resetFields();
  },
  //设置分页大小
  handlePageSizeChange(pageSize) {
    this.pagination.pageSize = pageSize;
    this.getTableData();
  },
  //设置页码
  handleCurrentChange (current) {
    this.pagination.current = current;
    this.getTableData();
  },
  delStu(scope){                            //---------------------删除学生
    this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.removeStudent(scope);
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: '已取消删除'
      });
    });
  },
  delStu1(scope){                            //---------------------删除学生
    this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.removeStudent(scope);
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: '已取消删除'
      });
    });
  },
  removeStudent(scope){
    const params = {
      id: scope.row.id
    };
    console.log(scope);
    removeStudentById(params).then((res) => {
      this.getTableData();
      this.$message({
        type: 'info',
        message: '删除成功'
      });
    }).catch((err) => {
      console.log(err);
    })
  },
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
  },
  changeCss(row){     // 定义changeCss函数，这样当表格中的相应行满足自己设定的条件是就可以将该行css样式改变
    if (row.date1 !== row.date2) {
      return 'background:red'
    }
  },
  add(){
    this.data.push({});
  },
  deleteRow(index){
    this.data.splice(index,1);
  },
  add1(){
    this.data1.push({});
  },
  deleteRow1(index){
    this.data1.splice(index,1);
  },
  add2(){
    this.data2.push({});
  },
  deleteRow2(index){
    this.data2.splice(index,1);
  },
}
