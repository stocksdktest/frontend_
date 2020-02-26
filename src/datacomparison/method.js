import {getStudentList,removeStudentById} from '../api/student'
import row from "element-ui/packages/row/src/row";
export default{

  delStu(scope){                            //---------------------忽略
    this.$confirm('是否忽略此条数据', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(({ value }) => {
      scope.row.isCheck=true,
        scope.row.isIgnore=true
      this.$message({
        type: 'success',
        message: '忽略'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '取消'
      });
    });
  },
  delStu1(scope){                            //---------------------确认
    this.$prompt('BUG描述',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({ value }) => {
      scope.row.isCheck=true,
        scope.row.isIgnore=true,
        scope.row.flag = true,
        this.$message({
          type: 'success',
          message: '保存成功'
        });

    }).catch(() => {
      this.$message({
        type: 'info',
        message: '取消输入'
      });
    });
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

  handleClose(done) {
    this.$confirm('确认关闭？')
      .then(_ => {
        done();
      })
      .catch(_ => {});
  },
  changeCss(row){     // 定义changeCss函数，这样当表格中的相应行满足自己设定的条件是就可以将该行css样式改变
    if (row.date1 !== row.date2) {
      return 'background:red'
    }
  },
  changeCss1(row){     // 定义changeCss函数，这样当表格中的相应行满足自己设定的条件是就可以将该行css样式改变
    if (row.flag == true) {
      return 'background:red'
    }
  },

}
