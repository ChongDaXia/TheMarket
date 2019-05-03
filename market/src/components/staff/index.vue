<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">
            <!-- 添加员工功能 -->
            <TabPane label="添加" name="name1">
                <div class="formtext">
                    <div class="formtitle">
                        员工新建表单
                    </div>
                    <Form 
                        ref="newStaffRef" 
                        :model="newStaffForm" 
                        :rules="newStaffRules" 
                        :label-width="80">
                        <FormItem label="姓名" prop="name">
                            <Input v-model="newStaffForm.name" placeholder="请输入姓名" />
                        </FormItem>
                        <FormItem label="性别" prop="sex" style="text-align:left">
                            <RadioGroup v-model="newStaffForm.sex">
                                <Radio label="女" />
                                <Radio label="男" />
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="联系电话" prop="mobileNo">
                            <Input v-model="newStaffForm.mobileNo" placeholder="请输入11位数字" />
                        </FormItem>
                        <FormItem label="身份证号码" prop="idcardNo">
                            <Input v-model="newStaffForm.idcardNo" placeholder="请输入正确的身份证号码" />
                        </FormItem>
                        <FormItem label="工资" prop="wages">
                            <Input v-model="newStaffForm.wages" style="width:100px;margin-right:10px"/>
                            <span>元</span>
                        </FormItem>
                        <FormItem label="岗位" prop="post">
                            <Input v-model="newStaffForm.post" />
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="resetAdd('newStaffRef')">重置</Button>
                            <Button class="login-btn" shape="circle" @click="submitAddStaff('newStaffRef')">添加</Button>
                        </div>
                    </Form>
                </div>
                <Modal 
                    v-model="addStaffModal" 
                    title="确认提示" 
                    @on-ok="resubmitAddStaff" 
                    @on-cancel="cancelAddStaff">
                    <p>是否确认保存该员工？</p>
                </Modal>
            </TabPane>

            <!-- 员工列表 -->
            <TabPane label="列表" name="name2">
                <div class="header">
                    <!-- 搜索条件 -->
                    <Select 
                        v-model="selectStaffId"
                        @on-change="changeSelectStaffId"
                        style="width:200px;margin-right:30px" 
                        placeholder="请选择姓名" >
                        <Option v-for="(item,index) in TheSelectStaffList" :value="item.staffId" :key="index">
                            {{item.name}}
                        </Option>
                    </Select>
                </div>
                <!-- 数据列表 -->
                <div class="content">
                    <Table 
                        height="400" 
                        stripe 
                        :loading="listloading"
                        :columns="tableTitle" 
                        :data="selectStaffList" >
                        <template slot-scope="{row,index}" slot="action">
                          <Button icon="md-open" @click="staffDetail(row,index)" ></Button>
                          <Button @click="wagesDetail(row,index)" >薪资详情</Button>
                        </template>
                    </Table>
                </div>
                <!-- 员工信息数据详情 -->
                <Modal 
                    v-model="staffDetailModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    @on-cancel="cancelUpdateStaff"
                    width="400">
                    <p class="modaltitle">
                        <span>员工信息</span>
                    </p>
                    <Form 
                        ref="staffDetailRef" 
                        :model="staffDetailForm" 
                        :rules="staffDetailRules" 
                        :label-width="80" >
                        <FormItem label="姓名" prop="name">
                            <Input v-model="staffDetailForm.name" placeholder="请输入姓名" />
                        </FormItem>
                        <FormItem label="性别" prop="sex" style="text-align:left">
                            <RadioGroup v-model="staffDetailForm.sex">
                                <Radio label="女" />
                                <Radio label="男" />
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="联系电话" prop="mobileNo">
                            <Input v-model="staffDetailForm.mobileNo" placeholder="请输入11位数字" />
                        </FormItem>
                        <FormItem label="身份证号码" prop="idcardNo">
                            <Input v-model="staffDetailForm.idcardNo" placeholder="请输入正确的身份证号码" />
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="cancelUpdateStaff">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitUpdateStaff('staffDetailRef')">修改</Button>
                        </div>
                    </Form>
                </Modal>
                <!-- 修改员工信息二次确认框 -->
                <Modal 
                    v-model="restaffDetailModal" 
                    :mask-closable="false" 
                    title="确认提示" 
                    @on-ok="resubmitUpdateStaff" 
                    @on-cancel="recancelUpdateStaff" >
                    <p>是否确认修改该员工信息？</p>
                </Modal>

                <!-- 薪资数据详情 -->
                <Modal 
                    v-model="staffWagesModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    @on-cancel="cancelUpdateStaffWages"
                    width="400" >
                    <p class="modaltitle">
                        <span>员工薪资信息</span>
                    </p>
                    <Form 
                        ref="staffWagesRef" 
                        :model="staffWagesForm" 
                        :rules="staffWagesRules" 
                        :label-width="80" >
                        <FormItem label="工资" prop="wages">
                            <Input v-model="staffWagesForm.wages" style="width:100px;margin-right:10px"/>
                            <span>元</span>
                        </FormItem>
                        <FormItem label="岗位" prop="post">
                            <Input v-model="staffWagesForm.post" />
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="cancelUpdateStaffWages">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitUpdateStaffWages('staffWagesRef')">修改</Button>
                        </div>
                    </Form>
                </Modal>
                <!-- 修改员工薪资信息二次确认框 -->
                <Modal 
                    v-model="restaffWagesModal" 
                    :mask-closable="false" 
                    title="确认提示" 
                    @on-ok="resubmitUpdateStaffWages" 
                    @on-cancel="recancelUpdateStaffWages" >
                    <p>是否确认修改该员工薪资信息？</p>
                </Modal>
            </TabPane>

            <!-- 工资表 -->
            <TabPane label="工资表" name="name3">
                <div class="header">
                    <Button @click="createSalary">创建当月工资单</Button>
                    <Modal 
                        v-model="addNewSalaryModal" 
                        :mask-closable="false"  
                        @on-ok="submitAddNewSalary"  
                        @on-cancel="cancelAddNewSalary" 
                        width="400" >
                        <p class="modaltitle">
                            <span>请选择薪资员工</span>
                        </p>
                        <Table 
                            ref="newSalaryTableRef" 
                            height="300" border 
                            :columns="newSalaryTabletitle" 
                            :data="salaryStaffList" 
                            @on-select="selectSalaryStaff"
                            @on-select-cancel="cancelSalaryStaff"
                            @on-select-all="selectSalaryStaff"
                            @on-select-all-cancel="cancelSalaryStaff">
                        </Table>
                    </Modal>
                </div>
                <div class="content">
                    <Table 
                        height="400" 
                        stripe 
                        :columns="salarytableTitle" 
                        :data="allStaffSalary" >
                        <template slot-scope="{row,index}" slot="action">
                          <Button @click="staffSalaryStates(row,index)" v-if="row.salaryStatus == '未发放'">发放工资</Button>
                        </template>
                    </Table>
                </div>
            </TabPane>
        </Tabs>

        <!-- <vue-particles 
            color="#7b7d7d" 
            :particleOpacity="0.7" 
            :particlesNumber="80" 
            shapeType="circle" 
            :particleSize="5" 
            linesColor="#203c77" 
            :linesWidth="2" 
            :lineLinked="true" 
            :lineOpacity="0.4" 
            :linesDistance="150" 
            :moveSpeed="3" 
            :hoverEffect="true" 
            hoverMode="grab" 
            :clickEffect="true" 
            clickMode="push" 
            class="lizi">
        </vue-particles>   -->
    </div>   
</template>

<script>
import moment from 'moment'
import {addnewstaff,getAllStaff,updatestaff,updatetakeoffice,getSalary,addNewSalary,updateSalary} from '@/http/moudules/staff'
export default {
  data() {
    return {
      // 添加新员工
      newStaffForm: {
        name: '',
        sex: '',
        mobileNo: '',
        idcardNo: '',
        wages: '',
        post: '',
        userId: this.$store.state.userId
      },
      newStaffRules: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母、数字、中文'
        }],
        sex: [{
          required: true,
          trigger: 'blur, change',
          message: '请选择性别'
        }],
        mobileNo: [{
          trigger: 'blur, change',
          pattern:/^\d{11}$/,
          message: '仅支持11位数字'
        }],
        idcardNo: [{
          trigger: 'blur, change',
          pattern:/^\d{18}$/,
          message: '请输入正确的身份证号码'
        }],
        wages: [{
          trigger: 'blur, change',
          pattern:/^[0-9]\d*|[0-9]\d*\.\d*$/,
          message: '格式错误'
        }],
        post: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母、数字、中文'
        }]
      },
      // 添加新员工二次确认框
      addStaffModal: false,
      // 筛选员工姓名
      selectStaffId: '',
      // 表格加载
      listloading: false,
      // 表格表头
      tableTitle: [
        {
          title: '员工ID',
          key: 'staffId'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '工资',
          key: 'wages'
        },
        {
          title: '岗位',
          key: 'post'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      // 任职单
      takeOfficeList: [],
      // 员工表表格变化数据
      selectStaffList: [],
      // 表格固定数据
      TheSelectStaffList: [],
      // 信息详情框
      staffDetailModal: false,
      restaffDetailModal: false,
      // 详情数据
      staffDetailForm: {
        name: '',
        sex: '',
        mobileNo: '',
        idcardNo: '',
        staffId: ''
      },
      // 详情数据校验
      staffDetailRules: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母、数字、中文'
        }],
        sex: [{
          required: true,
          trigger: 'blur, change',
          message: '请选择性别'
        }],
        mobileNo: [{
          trigger: 'blur, change',
          pattern:/^\d{11}$/,
          message: '仅支持11位数字'
        }],
        idcardNo: [{
          trigger: 'blur, change',
          pattern:/^\d{18}$/,
          message: '请输入正确的身份证号码'
        }]
      },
      // 薪资详情
      staffWagesModal: false,
      restaffWagesModal: false,
      // 薪资数据
      staffWagesForm: {
        wages: '',
        post: '',
        takeOfficeId: ''
      },
      // 薪资数据校验
      staffWagesRules: {
        wages: [{
          trigger: 'blur, change',
          pattern:/^[0-9]\d*|[0-9]\d*\.\d*$/,
          message: '格式错误'
        }],
        post: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母、数字、中文'
        }]
      },
      // 工资表格表头
      salarytableTitle: [
        {
          title: '员工ID',
          key: 'staffId'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '岗位',
          key: 'post'
        },
        {
          title: '工资',
          key: 'salary'
        },
        {
          title: '当月工资发放状态',
          key: 'salaryStatus'
        },
        {
          title: '状态时间',
          key: 'createTime'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      // 本月开始结束时间
      startDate: new Date(moment().startOf('month')).getTime(),
      endDate: new Date(moment().endOf('month').endOf('month')).getTime(),
      // 创建工资条弹框
      addNewSalaryModal: false,
      // 创建工资条表格表头
      newSalaryTabletitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '员工ID',
          key: 'staffId'
        },{
          title: '姓名',
          key: 'name'
        },{
          title: '工资',
          key: 'wages'
        },{
          title: '岗位',
          key: 'post'
        }
      ],
      // 创建工资条表格数据
      salaryStaffList: [],
      // 所有工资单
      allStaffSalary: [],
    }
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name2'){
        this.getAllStaffInfo()
        this.selectStaffId=''
      }
      if(name === 'name3'){
        this.getAllStaffInfo()
        this.getAllSalary()
      }
    },
    // 添加新员工
    submitAddStaff (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.addStaffModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 重置
    resetAdd (name) {
      this.$refs[name].resetFields()
    },
    // 添加新员工二次确认
    resubmitAddStaff () {
      addnewstaff(this.newStaffForm).then(data => {
        if(data.code == '200'){
          this.addStaffModal=false
          this.$Message.info('新员工添加成功')
          this.$refs['newStaffRef'].resetFields()
        }
        if(data.code == '500') {
          this.$Message.error('新员工添加失败')
        }
      })
    },
    // 取消添加新员工二次确认
    cancelAddStaff () {
      this.addStaffModal=false
      this.$Message.info('取消添加新员工')
    },
    // 获取所有员工信息
    getAllStaffInfo() {
      this.listloading=true
      getAllStaff({userId: this.$store.state.userId}).then( data => {
        if(data.code == '200'){
          this.takeOfficeList=data.offices
          this.TheSelectStaffList=data.staffs
          this.TheSelectStaffList.forEach((i,index) => {
            this.takeOfficeList.forEach(item => {
              if(i.staffId == item.staffId){
                i['wages']=item.wages
                i['post']=item.post
                i['createTime']=moment(item.createTime).format('YYYY-MM-DD')
                i['takeOfficeId']=item.takeOfficeId
              }
            })
          })
          this.selectStaffList=this.TheSelectStaffList.map(item => {
            return {
              ...item
            }
          })
          this.salaryStaffList=this.TheSelectStaffList.map(item => {
            return {
              ...item
            }
          })
          this.listloading=false
        }
        if(data.code == '500') {
          this.$Message.info('无员工信息')
        }
      })
    },
    // 姓名筛选
    changeSelectStaffId() {
      let selectList=this.TheSelectStaffList.filter(item => item.staffId == this.selectStaffId)
      this.selectStaffList=selectList
    },
    // 获取员工详情
    staffDetail(row,index) {
      this.staffDetailForm=JSON.parse(JSON.stringify(row))
      this.staffDetailModal=true
    },
    // 信息详情确认
    submitUpdateStaff(name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.restaffDetailModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 信息详情取消
    cancelUpdateStaff() {
      this.staffDetailModal=false
      this.$refs['staffDetailRef'].resetFields()
    },
    // 信息详情二次确认
    resubmitUpdateStaff() {
      let form={
        staffId: this.staffDetailForm.staffId,
        name: this.staffDetailForm.name,
        sex: this.staffDetailForm.sex,
        idcardNo: this.staffDetailForm.idcardNo,
        mobileNo: this.staffDetailForm.mobileNo
      }
      updatestaff(form).then(data => {
        if(data.code == '200'){
          this.restaffDetailModal=false
          this.$Message.info('该员工信息更新成功')
          this.staffDetailModal=false
          this.getAllStaffInfo()
        }
        if(data.code == '500'){
          this.$Message.error('员工信息更新失败')
        }
      })
    },
    // 取消信息详情二次确认
    recancelUpdateStaff() {
      this.restaffDetailModal=false
      this.$Message.info('取消员工信息修改')
    },
    // 获取员工薪资详情
    wagesDetail(row,indx) {
      this.staffWagesForm=JSON.parse(JSON.stringify(row))
      this.staffWagesModal=true
    },
    // 薪资详情确认
    submitUpdateStaffWages(name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.restaffWagesModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 薪资详情取消
    cancelUpdateStaffWages() {
      this.staffWagesModal=false
      this.$refs['staffWagesRef'].resetFields()
    },
    // 薪资详情二次确认
    resubmitUpdateStaffWages() {
      let form={
        wages: this.staffWagesForm.wages,
        post: this.staffWagesForm.post,
        takeOfficeId: this.staffWagesForm.takeOfficeId
      }
      updatetakeoffice(form).then(data => {
        if(data.code == '200'){
          this.restaffWagesModal=false
          this.$Message.info('该员工薪资信息更新成功')
          this.staffWagesModal=false
          this.getAllStaffInfo()
        }
        if(data.code == '500'){
          this.$Message.info('员工薪资信息更新失败')
        }
      })
    },
    // 取消薪资详情二次确认
    recancelUpdateStaffWages() {
      this.restaffWagesModal=false
      this.$Message.info('取消员工薪资信息修改')
    },
    // 获取所有工资表单
    getAllSalary() {
      getSalary({userId: this.$store.state.userId}).then(data => {
        if(data.code == '200'){
          let offices=data.offices
          let staff=data.staffs
          let salarys=data.salarys
          salarys.forEach((i,index) => {
            staff.forEach(item => {
              if(i.staffId == item.staffId){
                i['name']=item.name
              }
            })
            i['createTime']=moment(i.createTime).format('YYYY-MM-DD')
            if(i.salaryStatus === 0){
              i['salaryStatus']='未发放'
            }else if(i.salaryStatus === 1){
              i['salaryStatus']='已发放'
            }
          })
          this.allStaffSalary=salarys
        }
        if(data.code == '500') {
          this.$Message.info('暂无工资信息')
        }
      })
    },
    // 创建工资条按钮
    createSalary() {
      this.allStaffSalary.forEach(item => {
        let time=new Date(item.createTime).getTime();
        if(time >= this.startDate && time <= this.endDate){
          this.salaryStaffList.forEach((i,index) => {
            if(item.staffId == i.staffId){
              this.salaryStaffList.splice(index,1)
            }
          })
        }
      })
      this.addNewSalaryModal=true
    },
    // 工资收取人选中
    selectSalaryStaff(selection, row){
      // 全选
      if (!row && selection && selection.length > 0) {
        this.salaryStaffList.forEach(item => {
          item['_checked'] = true
        })
      } else {
        // 单选
        this.salaryStaffList.forEach(item => {
          if(item.staffId === row.staffId) {
            item['_checked'] = true
          }
        })
      }
    },
    // 工资收取人取消选中
    cancelSalaryStaff(selection, row){
      // 全不选
      if (!row && selection && selection.length == 0) {
        this.salaryStaffList.forEach(item => {
          item['_checked'] = false
        })
      } else {
        // 单不选
        this.salaryStaffList.forEach(item => {
          if(item.staffId === row.staffId) {
            item['_checked'] = false
          }
        })
      }
    },
    // 创建工资条确认按钮
    submitAddNewSalary() {
      this.salaryStaffList.forEach((item,index) => {
        if(item['_checked'] == true) {
          let temp={
            staffId: item.staffId,
            salary: item.wages,
            salaryStatus: 0
          }
          addNewSalary(temp).then(data => {
            if(data.code == '200'){
              this.salaryStaffList.splice(index,1)
            }
            if(data.code == '500') {
              this.$Message.error('工资单添加失败')
            }
          })
        }
      })
      this.addNewSalaryModal=false
      this.getAllSalary()
    },
    // 创建工资条取消按钮
    cancelAddNewSalary() {
      this.addNewSalaryModal=false
    },
    // 发放工资状态修改
    staffSalaryStates(row,index){
      let temp={
        staffId: row.staffId,
        salary: row.wages,
        Time: row.createTime
      }
      updateSalary(temp).then(data => {
        if(data.code == '200'){
          this.$Message.info('状态修改成功')
          this.getAllSalary()
        }
        if(data.code == '500') {
          this.$Message.error('状态修改失败')
        }
      })
    }
  }
}
</script>

<style scoped>
.layout{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #fff;
}
.formtitle{
  height: 60px;
  font-size: 20px;
  text-align: center;
}
.formtext{
  width: 50%;
  margin: 10px auto;
  padding: 30px;
  box-shadow: 0 4px 50px rgba(80, 80, 80, 0.15);
}
.form-item{
  text-align: center;
}
.login-btn{
  margin: 0 20px;
}
.header{
  width: 100%;
  height: 50px;
  padding-left: 50px;
  padding-top: 20px;
}
.modaltitle{
    width: 100%;
    height: 100px;
    text-align: center;
    font-size: 24px;
    padding-top: 25px;
}
.content{
  width: 100%;
  padding: 40px 50px;
}
/deep/ .ivu-table{
  border-radius: 5px;
}
/deep/ .ivu-table th{
  background-color: #66a9c9;;
  color: #ffffff;
}
/deep/ .ivu-table-border th{
  border-right: 1px solid #66a9c9;
}
/deep/ .ivu-table-wrapper{
  box-shadow: 0 4px 50px rgba(80, 80, 80, 0.15);
  border-radius: 10px;
}
/deep/ .ivu-table:after{
  background-color: #f0faff;
}
.lizi{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-image:url('/assets/images/timg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
}
.tabstyle{
  z-index: 2;
}
/deep/ .ivu-tabs-nav .ivu-tabs-tab{
  margin-left: 20px;
  margin-right: 0px;
  font-size: 16px;
  line-height: 2;
}
/deep/ .ivu-tabs-ink-bar{
  margin-left: 20px;
  height: 3px;
}
.cardstyle{
  margin-bottom: 10px;
}
</style>        