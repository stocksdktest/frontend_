import {addStudent, getStudentList, removeStudentById} from '../api/student'
import {addClasses, updateClasses} from "../api/class";
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
    this.classFrom =  Object.assign({}, this.defaultClassFrom);
    this.$refs.addClassForm.resetFields();
    this.$refs.createClass.close();
  },
  handleCloseEditDialog(){
    this.editFrom =  Object.assign({}, this.defaultClassFrom);
    this.$refs.editClassForm.resetFields();
    this.$refs.editClass.close();
  },
  handleSave() {                                //---------------------提交新建表单
    this.$refs.addClassForm.validate((valid) => {
      if (valid) {
        const params = Object.assign({}, this.classFrom);
        addClasses(params).then((res) => {
          this.$message({
            type: 'info',
            message: '新建成功'
          });
          this.$refs.createClass.close();
          this.classFrom =  Object.assign({}, this.defaultClassFrom);
          this.$refs.addClassForm.resetFields();
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
  editClass(scope){                         //---------------------编辑操作
    this.dialogEditClass = true;
    this.editFrom = Object.assign({}, {
      className: scope.row.className,
      gradge: scope.row.gradge,
      masterName: scope.row.masterName,
      message: scope.row.message,
      id:scope.row.id
    });
  },
  udpateClassesById(){
    console.log(this.classData);
    let params = Object.assign({}, this.editFrom);

    console.log(params);

    updateClasses(params).then((res) => {
      console.log(res);
      this.dialogEditClass = false;
      this.getTableData();
      this.$message.info('修改班级信息成功');
    }).catch((err) => {
      console.log(err);
      this.$message.error('修改班级信息失败');
    });
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
    // console.log(para);
    this.$http.get('http://192.168.135.17:8000/api/sdkmanage').then((res) => {
      // console.log(res);
      this.versionList = res.data;
    });
  },
  handleCloseAddStuDialog(){
    this.stuFrom =  Object.assign({}, this.defaultstuFrom);
    this.$refs.addStuForm.resetFields();
    this.$refs.createStudent.close();
  },
  addStudent(scope){
    this.dialogCreateStu = true;
    this.stuFrom.classesId = scope.row.id;
    console.log("------------------"+this.stuFrom.classesId);
  },
  handleSaveStu(){
    this.$refs.addStuForm.validate((valid) => {
      if (valid) {
        const params = Object.assign({}, this.stuFrom);
        addStudent(params).then((res) => {
          this.$message({
            type: 'info',
            message: '新建成功'
          });
          this.$refs.createStudent.close();
          this.stuFrom =  Object.assign({}, this.defaultstuFrom);
          this.$refs.addStuForm.resetFields();
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
  removeDomain(item) {
    var index = this.form.domains.indexOf(item)
    if (index !== 0) {
      this.form.domains.splice(index, 1)
    }
  },
  addDomain() {
    this.form.domains.push({
      value: '',
    });
  },
  removeDomain2(item) {
    var index = this.form.domains2.indexOf(item)
    if (index !== 0) {
      this.form.domains2.splice(index, 1)
    }
  },
  addDomain2() {
    this.form.domains2.push({
      value: '',
    });
  },

  deleteIterationVersion(scope){
    this.$confirm('此操作将删除选中版本的关联信息（不会删除版本和接口）, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.removeIterationVersion(scope);
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: '已取消删除'
      });
    });
  },
  removeIterationVersion(scope){

    delete scope.row.data.interfaceList;
    this.deleteform = Object.assign({}, {
      sdk_version: scope.row.data.sdk_version,
      sdk_iteration_version: scope.row.data.sdk_iteration_version,
      platform:scope.row.data.platform,
      id: scope.row.id
    });
    let params = Object.assign({}, this.deleteform);

    // console.log(params);

    this.$http.delete('http://192.168.135.17:8000/api/sdkmanage/'+params.id);
    this.$http.post('http://192.168.135.17:8000/api/sdkmanage/new', this.deleteform)
      .then((res) => {
        // console.log(res);
        // this.dialogEditClass = false;
        this.getTableData();
        this.$message.info('删除成功');
      }).catch((err) => {
      console.log(err);
      this.$message.error('删除失败');
    });
  },
  updateIterationVersion(scope){
    this.updateform = Object.assign({}, {
      sdk_version: scope.row.data.sdk_version,
      sdk_iteration_version: scope.row.data.sdk_iteration_version,
      platform:scope.row.data.platform,
      interfaceList: scope.row.data.interfaceList,
      id: scope.row.id
    });


    if(this.updateform.interfaceList){
      this.updateform.interfaceList = scope.row.data.interfaceList

    }else{
      this.updateform.interfaceList = this.interfaceList
    };
    this.checkList = this.updateform.interfaceList
  },
  postInfo(updateform){
    // console.log('checkList',this.checkList);
    // for( var i = 0; i < this.updateform.interfaceList.length; i = i++){
    //   // if(this.updateform.interfaceList[i].checkName){
    //     this.updateform.interfaceList[i].checkName = this.checkList[i].checkName;
    //     this.updateform.interfaceList[i].checkStatus = this.checkList[i].checkStatus;
    //   // }
    //
    // };
    this.updateform.interfaceList = this.checkList;
    let params = Object.assign({}, this.updateform);

    // console.log(params);

    this.$http.delete('http://192.168.135.17:8000/api/sdkmanage/'+params.id);
    this.$http.post('http://192.168.135.17:8000/api/sdkmanage/new', this.updateform)
      .then((res) => {
        // console.log(res);
        // this.dialogEditClass = false;
        this.getTableData();
        this.$message.info('修改成功');
      }).catch((err) => {
      console.log(err);
      this.$message.error('修改失败');
    });
  },
  getTableDataFromSDKVersion(){
    let para = {
      pageNum: this.pagination.current,
      pageSize: this.pagination.pageSize,
      ...this.filter
    };
    console.log(para);
    this.$http.get('http://192.168.135.17:8000/api/sdkversion').then((res) => {
      console.log(res);
      this.versionList = res.data;
    });

  },
  getTableDataFromSDKInterface() {
    let para = {
      pageNum: this.pagination.current,
      pageSize: this.pagination.pageSize,
      ...this.filter
    };
    console.log(para);
    this.$http.get('http://192.168.135.17:8000/api/sdkinterface').then((res) => {
      console.log(res);
      this.interfaceList = res.data;
    });
  }



}
