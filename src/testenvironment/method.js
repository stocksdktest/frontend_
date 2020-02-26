
export default{
  getScTableData(){
    //---------------------获取列表数据
    let para = {
      pageNum: this.pagination.current,
      pageSize: this.pagination.pageSize,
      ...this.Scfilter
    };
    console.log(para);
    this.$http.get('http://192.168.135.17:8000/api/testenvironment').then((res) => {
      console.log(res);
// res.data.filter(Value =>{})
      // this.Scform = res.data.environment.match('shengchan')
      this.Scform = res.data
      // this.Scform = res.data;
    });
  },
  getCsTableData(){                           //---------------------获取列表数据
    let para = {
      pageNum: this.pagination.current,
      pageSize: this.pagination.pageSize,
      ...this.Csfilter
    };
    console.log(para);
    this.$http.get('http://192.168.135.17:8000/api/testenvironment').then((res) => {
      console.log(res);
      this.Csform = res.data;
    });
  },
  getQzTableData(){                           //---------------------获取列表数据
    let para = {
      pageNum: this.pagination.current,
      pageSize: this.pagination.pageSize,
      ...this.Qzfilter
    };
    console.log(para);
    this.$http.get('http://192.168.135.17:8000/api/testenvironment').then((res) => {
      console.log(res);
      this.Qzform = res.data;
    });
  },
  changeCss(row){     // 定义changeCss函数，这样当表格中的相应行满足自己设定的条件是就可以将该行css样式改变
    if (row.date1 !== row.date2) {
      return 'background:red'
    }
  },
  addCsEnvironment() {
    this.addform = Object.assign({}, {
      site_name: '',
      site_ip: '',
      environment:'ceshi'
    });
  },
  addQzEnvironment() {
    this.addform = Object.assign({}, {
      site_name: '',
      site_ip: '',
      environment:'quanzhen'
    });
  },
  addScEnvironment() {
    this.addform = Object.assign({}, {
      site_name: '',
      site_ip: '',
      environment:'shengchan'
    });
  },
  postCsInfo(addform){
    this.$http.post('http://192.168.135.17:8000/api/testenvironment/new', this.addform).then(function (response) {
      this.$message({
        type: 'info',
        message: '新建成功'
      });
      this.getCsTableData();
    }, function (response) {
      this.$message({
        type: 'warning',
        message: '新建失败'
      });
      console.log(err);
    })
  },
  postQzInfo(addform){
    this.$http.post('http://192.168.135.17:8000/api/testenvironment/new', this.addform).then(function (response) {
      this.$message({
        type: 'info',
        message: '新建成功'
      });
      this.getQzTableData();
    }, function (response) {
      this.$message({
        type: 'warning',
        message: '新建失败'
      });
      console.log(err);
    })
  },
  postScInfo(addform){
    this.$http.post('http://192.168.135.17:8000/api/testenvironment/new', this.addform).then(function (response) {
      this.$message({
        type: 'info',
        message: '新建成功'
      });
      this.getScTableData();
    }, function (response) {
      this.$message({
        type: 'warning',
        message: '新建失败'
      });
      console.log(err);
    })
  },
  updateEnvironment(scope) {
    this.updateform = Object.assign({}, {
      site_name: scope.row.data.site_name,
      site_ip: scope.row.data.site_ip,
      environment:scope.row.data.environment,
      id: scope.row.id
    });
  },
  saveCsInfo(updateform){
    let params = Object.assign({}, this.updateform);

    console.log(params);

    this.$http.delete('http://192.168.135.17:8000/api/testenvironment/'+params.id);
    this.$http.post('http://192.168.135.17:8000/api/testenvironment/new', this.updateform)
      .then((res) => {
        console.log(res);
        // this.dialogEditClass = false;
        this.getCsTableData();
        this.$message.info('修改成功');
      }).catch((err) => {
      console.log(err);
      this.$message.error('修改失败');
    });
  },
  saveQzInfo(updateform){
    let params = Object.assign({}, this.updateform);

    console.log(params);

    this.$http.delete('http://192.168.135.17:8000/api/testenvironment/'+params.id);
    this.$http.post('http://192.168.135.17:8000/api/testenvironment/new', this.updateform)
      .then((res) => {
        console.log(res);
        this.getQzTableData();
        this.$message.info('修改成功');
      }).catch((err) => {
      console.log(err);
      this.$message.error('修改失败');
    });
  },
  saveScInfo(updateform){
    let params = Object.assign({}, this.updateform);

    console.log(params);

    this.$http.delete('http://192.168.135.17:8000/api/testenvironment/'+params.id);
    this.$http.post('http://192.168.135.17:8000/api/testenvironment/new', this.updateform)
      .then((res) => {
        console.log(res);
        // this.dialogEditClass = false;
        this.getScTableData();
        this.$message.info('修改成功');
      }).catch((err) => {
      console.log(err);
      this.$message.error('修改失败');
    });
  },
  deleteCsEnvironment(scope){
    this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.removeCsEnvironment(scope);
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: '已取消删除'
      });
    });
  },
  deleteQzEnvironment(scope){
    this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.removeQzEnvironment(scope);
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: '已取消删除'
      });
    });
  },
  deleteScEnvironment(scope){
    this.$confirm('此操作将删除选中项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.removeScEnvironment(scope);
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: '已取消删除'
      });
    });
  },
  removeCsEnvironment(scope){
    const params = {
      id: scope.row.id
    };
    console.log(scope);
    this.$http.delete('http://192.168.135.17:8000/api/testenvironment/'+params.id).then((res) => {
      this.getCsTableData();
      this.$message({
        type: 'info',
        message: '删除成功'
      });
    }).catch((err) => {
      console.log(err);
    })
  },
  removeQzEnvironment(scope){
    const params = {
      id: scope.row.id
    };
    console.log(scope);
    this.$http.delete('http://192.168.135.17:8000/api/testenvironment/'+params.id).then((res) => {
      this.getQzTableData();
      this.$message({
        type: 'info',
        message: '删除成功'
      });
    }).catch((err) => {
      console.log(err);
    })
  },
  removeScEnvironment(scope){
    const params = {
      id: scope.row.id
    };
    console.log(scope);
    this.$http.delete('http://192.168.135.17:8000/api/testenvironment/'+params.id).then((res) => {
      this.getScTableData();
      this.$message({
        type: 'info',
        message: '删除成功'
      });
    }).catch((err) => {
      console.log(err);
    })
  },

}
