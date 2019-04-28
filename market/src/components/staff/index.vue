<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">
            <!-- 添加员工功能 -->
            <TabPane label="添加" name="name1">
                <div class="formtext">
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
                        border 
                        stripe 
                        :columns="tableTitle" 
                        :data="selectStaffList" >
                        <template slot-scope="{row,index}" slot="action">
                          <Button icon="md-open" @click="staffDetail(row,index)" ></Button>
                          <Button @click="wagesDetail(row,index)" >薪资详情</Button>
                        </template>
                    </Table>
                </div>
                <!-- 数据详情 -->
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
        </Tabs>

        <vue-particles 
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
        </vue-particles>  
    </div>   
</template>

<script>
import moment from 'moment'
import {addnewstaff,getAllStaff,updatestaff,updatetakeoffice} from '@/http/moudules/staff'
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
      }

    }
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name2'){
        this.getAllStaffInfo()
        this.selectStaffId=''
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
        }
        this.selectStaffList=this.TheSelectStaffList.map(item => {
          return {
            ...item
          }
        })
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
.formtext{
  width: 50%;
  margin: 60px auto;
}
.header{
  width: 100%;
  height: 50px;;
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
  padding: 30px 50px;
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
.cardstyle{
  margin-bottom: 10px;
}
</style>        