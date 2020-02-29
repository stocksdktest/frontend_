//import {addStudent, getStudentList, removeStudentById} from '../api/student'
//import {addClasses, updateClasses} from "../api/class";

import {addInfo, removeInfoById} from "../api/sdkversion";

export default{

    postInfo(form){                                //---------------------提交新建表单
    //this.form.android=this.form.domains.join(';');
    console.log(this.form);
    this.$http.post('http://localhost:8000/api/sdkinterface/new', this.form).then(function (response) {
      this.$message({
        type: 'info',
        message: '新建成功'
      });
      this.getTableData();
    }, function (response) {
      this.$message({
        type: 'warning',
        message: '新建失败'
      });
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
    this.$http.get('http://localhost:8000/api/sdkinterface').then((res) => {
      this.studentData = res.data;
      for(var x in this.studentData){
        this.studentData[x].data.android='';
        this.studentData[x].data.ios='';
        for(var y in this.studentData[x].data.domains) {
          this.studentData[x].data.android = this.studentData[x].data.android + this.studentData[x].data.domains[y].value+';';
        }
        for(var z in this.studentData[x].data.domains2) {
          this.studentData[x].data.ios = this.studentData[x].data.ios + this.studentData[x].data.domains2[z].value+';';
        }
      }
    });
  },

  delInfo(scope){                            //---------------------删除一条列表数据
    this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.removeInfo(scope);
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: '已取消删除'
      });
    });
  },

  removeInfo(scope){
    const params = {
      id: scope.row.id
    };
    console.log(params.id);
    this.$http.delete('http://localhost:8000/api/sdkinterface/'+params.id).then((res) => {
      this.getTableData();
      this.$message({
        type: 'info',
        message: '删除成功'
      });
    }).catch((err) => {
      console.log(err);
    })
  },

  editInfo(scope){                         //---------------------编辑操作
    this.dialogEditClass = true;
    this.updata = Object.assign({}, {
      interface_name: scope.row.data.interface_name,
      interface_describe: scope.row.data.interface_describe,
      compare_method: scope.row.data.compare_method,
      upload_version: scope.row.data.upload_version,
      update_version: scope.row.data.update_version,
      domains: scope.row.data.domains,
      domains2: scope.row.data.domains2,
      id:scope.row.id
    });
  },

  updateInfoById(updata){                         //---------------------上传修改
    console.log(this.updata);
    let params = Object.assign({}, this.updata);
    this.$http.delete('http://localhost:8000/api/sdkinterface/'+params.id)
    this.$http.post('http://localhost:8000/api/sdkinterface/new', params)
      .then((res) => {
      console.log(res);
      this.dialogEditClass = false;
      this.getTableData();
      this.$message.info('修改成功');
    }).catch((err) => {
      console.log(err);
      this.$message.error('修改失败');
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

  removeDomain_updata(item) {
    var index = this.updata.domains.indexOf(item)
    if (index !== 0) {
      this.updata.domains.splice(index, 1)
    }
  },
  addDomain_updata() {
    this.updata.domains.push({
      value: '',
    });
  },
  removeDomain2_updata(item) {
    var index = this.updata.domains2.indexOf(item)
    if (index !== 0) {
      this.updata.domains2.splice(index, 1)
    }
  },
  addDomain2_updata() {
    this.updata.domains2.push({
      value: '',
    });
  },

//---------------------------------------------------------------------------------

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

}


