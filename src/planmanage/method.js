// import {getPlanList,removePlanById, addPlan, updatePlan} from '../api/TestPlanList'

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
  handleCloseAddDialog() {
    this.PlanForm =  Object.assign({}, this.defaultPlanForm);
    this.$refs.addPlanForm.resetFields();
    this.$refs.dialogCreatePlan.close();
  },
  handleCloseEditDialog(){
    this.editPlanForm =  Object.assign({}, this.defaultPlanForm);
    this.$refs.editPlanForm.resetFields();
    this.$refs.editPlan.close();
  },
  handleSave() {                                //---------------------提交新建表单
    this.$refs.addPlanForm.validate((valid) => {
      if (valid) {
        const params = Object.assign({}, this.PlanForm);
        addPlan(params).then((res) => {
          this.$message({
            type: 'info',
            message: '新建成功'
          });
          this.$refs.createPlan.close();
          this.PlanForm =  Object.assign({}, this.defaultPlanForm);
          this.$refs.addPlanForm.resetFields();
          this.getTableData();
        }).catch((err) => {
          this.$message({
            type: 'warning',
            message: '新建失败'
          });
          console.log(err);
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  },
  editPlan(scope){                         //---------------------编辑操作
    this.dialogEditPlan = true;
    this.editPlanForm = Object.assign({}, {
      name: scope.row.name,
      type: scope.row.type,
      id:scope.row.id
    });
  },
  updatePlanById(){
    console.log(this.tableDataPlan);
    let params = Object.assign({}, this.editPlanForm);

    console.log(params);

    updatePlan(params).then((res) => {
      console.log(res);
      this.dialogEditPlan = false;
      this.getTableData();
      this.$message.info('修改班级信息成功');
    }).catch((err) => {
      console.log(err);
      this.$message.error('修改班级信息失败');
    });
  },
  delPlan(scope){                         //---------------------删除操作
    this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.removePlan(scope);
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: '已取消删除'
      });
    });
  },
  removePlan(scope) {
    const params = {
      id: scope.row.id
    };
    console.log(scope);
    removePlanById(params).then((res) => {
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
    getPlanList(para).then((res) => {
      console.log(res);
      this.tableDataPlan = res.data.records;
      this.pagination.total = res.data.total;
    });
  },
  addItem () {
    this.jingpincase.dynamicItem.push({
      name: '',
      time: '',
      code:'',
      doNum:'',
      waitTime:''
    })
  },
  deleteItem (item, index) {
    this.jingpincase.dynamicItem.splice(index, 1)
  }

  // handleCloseAddStuDialog(){
  //   this.stuFrom =  Object.assign({}, this.defaultstuFrom);
  //   this.$refs.addStuForm.resetFields();
  //   this.$refs.createStudent.close();
  // },
  // addStudent(scope){
  //   this.dialogCreateStu = true;
  //   this.stuFrom.classesId = scope.row.id;
  //   console.log("------------------"+this.stuFrom.classesId);
  // },
  // handleSaveStu(){
  //   this.$refs.addStuForm.validate((valid) => {
  //     if (valid) {
  //       const params = Object.assign({}, this.stuFrom);
  //       addStudent(params).then((res) => {
  //         this.$message({
  //           type: 'info',
  //           message: '新建成功'
  //         });
  //         this.$refs.createStudent.close();
  //         this.stuFrom =  Object.assign({}, this.defaultstuFrom);
  //         this.$refs.addStuForm.resetFields();
  //       }).catch((err) => {
  //         this.$message({
  //           type: 'warning',
  //           message: '新建失败'
  //         });
  //         console.log(err);
  //       });
  //     } else {
  //       console.log('error submit!!');
  //       return false;
  //     }
  //   });
  // }
}
