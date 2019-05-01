<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">
            <!-- 添加新用户功能 -->
            <TabPane label="添加" name="name1">
                <!-- 添加新用户 -->
                <div class="formtext">
                    <div class="formtitle">
                        用户新建表单
                    </div>
                    <Form 
                        ref="newUserRef" 
                        :model="newUserForm" 
                        :rules="newUserRules" 
                        :label-width="80">
                        <FormItem label="用户名" prop="userName">
                            <Input v-model="newUserForm.userName" placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem label="密码" prop="password">
                            <Input type="password" v-model="newUserForm.password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem label="确认密码" prop="repassword">
                            <Input type="password" v-model="newUserForm.repassword" placeholder="请输入确认密码" />
                        </FormItem>
                        <FormItem label="角色权限" prop="role" style="text-align:left">
                            <RadioGroup v-model="newUserForm.role" style="width:200px">
                                <Radio label="用户"></Radio>
                                <Radio label="管理员"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="姓名" prop="name">
                            <Input v-model="newUserForm.name" placeholder="请输入真实姓名" />
                        </FormItem>
                        <FormItem label="联系电话" prop="mobileNo">
                            <Input v-model="newUserForm.mobileNo" placeholder="请输入11位手机号码" />
                        </FormItem>
                        <FormItem label="身份证号码" prop="idcardNo">
                            <Input v-model="newUserForm.idcardNo" placeholder="请输入18位身份证号码" />
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="resetAdd('newUserRef')">重置</Button>
                            <Button class="login-btn" shape="circle" @click="submitAddUser('newUserRef')">添加</Button>
                        </div>
                    </Form>
                </div>
                <Modal 
                    v-model="newUserModal" 
                    title="确认提示" 
                    @on-ok="resubmitAddUser" 
                    @on-cancel="cancelAddUser">
                    <p>是否确认保存该用户？</p>
                </Modal>
            </TabPane>
            
            <!-- 用户列表 -->
            <TabPane label="列表" name="name2">
                <div class="header">
                    <!-- 搜索条件 -->
                    <Select 
                        v-model="selectUserId"
                        @on-change="changeSelectUserId"
                        style="width:200px;margin-right:30px" 
                        placeholder="请选择姓名" >
                        <Option v-for="(item,index) in TheselectUserList" :value="item.userId" :key="index">
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
                        :data="selectUserList" >
                        <template slot-scope="{row,index}" slot="action">
                            <Button icon="md-open" @click="showUserDetail(row,index)" ></Button>
                            <Button @click="updateUserPassword(row,index)" >密码修改</Button>
                        </template>
                    </Table>
                </div>
                <!-- 信息详情 -->
                <Modal 
                    v-model="selectUserDetailModal" 
                    :mask-closable="false" 
                    :footer-hide="true"
                    @on-cancel="cancelUserDetail" >
                    <p class="modaltitle">
                        <span>基本信息</span>
                    </p>
                    <Form 
                        ref="userDetailRef" 
                        :model="selectUserDetailForm" 
                        :rules="selectUserDetailRule" 
                        :label-width="80" >
                        <FormItem label="用户Id" prop="userId">
                            <Input v-model="selectUserDetailForm.userId" disabled></Input>
                        </FormItem>
                        <FormItem label="角色权限" prop="role">
                            <Input v-model="selectUserDetailForm.role"></Input>
                        </FormItem>
                        <FormItem label="用户名" prop="userName">
                            <Input v-model="selectUserDetailForm.userName"></Input>
                        </FormItem>
                        <FormItem label="姓名" prop="name">
                            <Input v-model="selectUserDetailForm.name"></Input>
                        </FormItem>
                        <FormItem label="联系电话" prop="mobileNo">
                            <Input v-model="selectUserDetailForm.mobileNo"></Input>
                        </FormItem>
                        <FormItem label="身份证号码" prop="idcardNo">
                            <Input v-model="selectUserDetailForm.idcardNo"></Input>
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="cancelUserDetail">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitNewUserDetail('userDetailRef')">修改</Button>
                        </div>
                    </Form>
                </Modal>
                <!-- 信息详情二次确认框 -->
                <Modal 
                    v-model="reselectUserDetailModal" 
                    @on-ok="resubmitNewUserDetail" 
                    @on-cancel="recancelUserDetail"
                    title="确认提示" 
                    :mask-closable="false" >
                    <p>是否确认修改该用户信息？</p>
                </Modal>
                <!-- 修改密码 -->
                <Modal 
                    v-model="changePasswordModal" 
                    :mask-closable="false" 
                    :footer-hide="true"
                    @on-cancel="cancelPassword" >
                    <p class="modaltitle">
                        <span>修改密码</span>
                    </p>
                    <Form 
                        ref="passwordRef" 
                        :model="passwordForm" 
                        :rules="passwordRule" 
                        :label-width="80" >
                        <FormItem label="旧密码" prop="oldpassword">
                            <Input v-model="passwordForm.oldpassword" disabled></Input>
                        </FormItem>
                        <FormItem label="新密码" prop="newpassword">
                            <Input v-model="passwordForm.newpassword"></Input>
                        </FormItem>
                        <FormItem label="确认密码" prop="renewpassword">
                            <Input v-model="passwordForm.renewpassword"></Input>
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="cancelPassword">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitPassword('passwordRef')">修改</Button>
                        </div>
                    </Form>
                </Modal>
                <!-- 修改密码二次确认框 -->
                <Modal 
                    v-model="rechangePasswordModal"
                    @on-ok="resubmitPassword" 
                    @on-cancel="recancelPassword"
                    title="确认提示" 
                    :mask-closable="false" >
                    <p>是否确认修改该用户密码？</p>
                </Modal>
            </TabPane>
            
            <!-- 删除用户 -->
            <TabPane label="删除" name="name3">
                <div class="header">
                    <!-- 搜索条件 -->
                    <Select 
                        v-model="selectUserId"
                        @on-change="changeSelectUserId"
                        style="width:200px;margin-right:30px" 
                        placeholder="请选择姓名" >
                        <Option v-for="(item,index) in TheselectUserList" :value="item.userId" :key="index">
                            {{item.name}}
                        </Option>
                    </Select>
                    <Button @click="deleteUser">
                        删除
                    </Button>
                </div>
                <!-- 删除用户二次确认框 -->
                <Modal 
                    v-model="deleteUserModal"
                    @on-ok="submitDeleteUser" 
                    @on-cancel="cancelDeleteUser"
                    title="确认提示" 
                    :mask-closable="false" >
                    <p>是否确认删除所选用户？</p>
                </Modal>
                <div class="content">
                    <Table 
                        height="400" 
                        stripe 
                        :loading="listloading"
                        :columns="deleteTableTitle" 
                        :data="selectUserList"
                        @on-select="selectDeleted"
                        @on-select-cancel="cancelselectDeleted"
                        @on-select-all="selectDeleted"
                        @on-select-all-cancel="cancelselectDeleted" />
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
import {addnewuser,getAllUser,updateUser,deleteOnceUser} from '@/http/moudules/user'
import echarts from '../../echarts'
export default {
  components: {
    echarts
  },

  data() {
    return {
      // 添加新用户
      newUserForm: {
        userName: '',
        password: '',
        repassword: '',
        role: '',
        name: '',
        mobileNo: '',
        idcardNo: ''
      },
      // 添加新用户表单验证
      newUserRules: {
        userName: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位中文、大小写字母、数字'
        }],
        password: [{
          required: true,
          trigger: 'blur, change',
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '仅支持6-12位大小写字母、数字'
        }],
        repassword: [{
          required: true,
          trigger: 'blur, change',
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '仅支持6-12位大小写字母、数字'
        }],
        role: [{
          required: true,
          message: '请选择角色权限'
        }],
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位中文、大小写字母、数字'
        }],
        mobileNo: [{
          trigger: 'blur, change',
          pattern:/^\d{11}$/,
          message: '请输入11位正确的手机号'
        }],
        idcardNo: [{
          trigger: 'blur, change',
          pattern:/^\d{18}$/,
          message: '请输入18位正确的身份证号码'
        }]
      },
      // 添加新用户二次确认框
      newUserModal: false,
      // 姓名筛选（用户Id）
      selectUserId: '',
      // 变化的所有用户
      selectUserList: [],
      // 固定的所有用户
      TheselectUserList: [],
      // 表格加载
      listloading: false,
      // 表格表头
      tableTitle: [
        {
          title: '用户ID',
          key: 'userId',
          width: 80,
          align: 'center'
        }, {
          title: '用户名',
          key: 'userName',
          align: 'center',
        }, {
          title: '姓名',
          key: 'name',
          align: 'center'
        }, {
          title: '联系电话',
          key: 'mobileNo',
          align: 'center'
        }, {
          title: '身份证号码',
          key: 'idcardNo',
          align: 'center'
        }, {
          title: '角色',
          key: 'role',
          align: 'center',
          filters: [
            {
              label: '管理员',
              value: 1
            },
            {
              label: '用户',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value,row) {
            if(value === 1){
              return row.role == '管理员'
            } else if (value === 2) {
              return row.role == '用户'
            }
          }
        }, {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      // 用户信息详情
      selectUserDetailForm: {
        userId: '',
        role: '',
        userName: '',
        name: '',
        mobileNo: '',
        idcardNo: ''
      },
      // 用户信息校验
      selectUserDetailRule: {
        userName: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位中文、大小写字母、数字'
        }],
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位中文、大小写字母、数字'
        }],
        mobileNo: [{
          trigger: 'blur, change',
          pattern:/^\d{11}$/,
          message: '请输入11位正确的手机号'
        }],
        idcardNo: [{
          trigger: 'blur, change',
          pattern:/^\d{15}|\d{18}$/,
          message: '请输入18位正确的身份证号码'
        }]
      },
      // 用户信息详情弹框
      selectUserDetailModal: false,
      // 用户信息详情修改二次确认框
      reselectUserDetailModal: false,
      // 修改密码数据
      passwordForm: {
        oldpassword: '',
        newpassword: '',
        renewpassword: '',
        userId: ''
      },
      // 修改密码数据校验
      passwordRule: {
        newpassword: [{
          required: true,
          trigger: 'blur, change',
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '仅支持6-12位大小写字母、数字'
        }],
        renewpassword: [{
          required: true,
          trigger: 'blur, change',
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '仅支持6-12位大小写字母、数字'
        }]
      },
      // 修改密码弹窗
      changePasswordModal: false,
      // 修改密码弹窗修改二次确认框
      rechangePasswordModal: false,
      // 删除表头
      deleteTableTitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userId',
          align: 'center'
        }, {
          title: '用户名',
          key: 'userName',
          align: 'center'
        }, {
          title: '姓名',
          key: 'name',
          align: 'center'
        }, {
          title: '联系电话',
          key: 'mobileNo',
          align: 'center'
        }, {
          title: '身份证号码',
          key: 'idcardNo',
          align: 'center'
        }, {
          title: '角色',
          key: 'role',
          align: 'center',
          filters: [
            {
              label: '管理员',
              value: 1
            },
            {
              label: '用户',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value,row) {
            if(value === 1){
              return row.role == '管理员'
            } else if (value === 2) {
              return row.role == '用户'
            }
          }
        }
      ],
      // 删除用户二次确认框
      deleteUserModal: false,
      // 删除用户列表
      deleteUserListId: []
    }
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name2'){
        this.selectUserId=''
        this.getAllUserInfo()
      }
      if(name === 'name3'){
        this.selectUserId=''
        this.getAllUserInfo()
      }
    },
    // 添加新用户按钮
    submitAddUser(name) {
      this.$refs[name].validate(valid => {
        if(valid){
          if(this.newUserForm.password !== this.newUserForm.repassword){
            this.$Message.error('两次密码不一致')
          } else {
            this.newUserModal=true
          }
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 重置按钮
    resetAdd(name) {
      this.$refs[name].resetFields()
    },
    // 添加新用户二次确认框确认按钮
    resubmitAddUser() {
      addnewuser(this.newUserForm).then(data => {
        if(data.code == '200'){
          this.newUserModal=false
          this.$Message.info('新用户添加成功')
          this.$refs['newUserRef'].resetFields()
        }
        if(data.code == '500') {
          this.$Message.error('新用户添加失败')
        }
      })
    },
    // 添加新用户二次确认框取消按钮
    cancelAddUser() {
      this.newUserModal=false
      this.$Message.info('取消添加新用户')
    },
    // 获取所有用户信息
    getAllUserInfo() {
      this.listloading=true
      getAllUser().then(data => {
        if(data.code == '200'){
          this.TheselectUserList = data.users;
          this.selectUserList = this.TheselectUserList.map(item => {
            return {
              ...item
            }
          })
          this.listloading=false
        }
        if(data.code == '500') {
          this.$Message.info('无用户信息')
        }
      })
    },
    // 姓名筛选
    changeSelectUserId() {
      let selectList=this.TheselectUserList.filter(item => item.userId == this.selectUserId)
      this.selectUserList=selectList
    },
    // 用户信息详情
    showUserDetail(row,index) {
      this.selectUserDetailForm=JSON.parse(JSON.stringify(row))
      this.selectUserDetailModal=true
    },
    // 用户信息详情修改
    submitNewUserDetail(name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.reselectUserDetailModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 用户信息详情取消
    cancelUserDetail() {
        this.selectUserDetailModal=false
        this.$refs['userDetailRef'].resetFields()
    },
    // 用户信息详情修改二次确认
    resubmitNewUserDetail() {
      updateUser(this.selectUserDetailForm).then(data => {
        if(data.code == '200'){
          this.reselectUserDetailModal=false
          this.$Message.info('基本信息修改成功')
          this.selectUserDetailModal=false
          this.getAllUserInfo()
        }
        if(data.code == '500') {
          this.$Message.error('基本信息修改失败')
        }
      })
    },
    // 取消用户信息详情修改二次确认
    recancelUserDetail() {
      this.reselectUserDetailModal=false
      this.$Message.info('取消修改基本信息')
    },
    // 修改密码
    updateUserPassword(row,index) {
      this.passwordForm.oldpassword=row.password
      this.passwordForm.userId=row.userId
      this.changePasswordModal=true
    },
    // 修改密码确认
    submitPassword() {
      this.$refs[name].validate(valid => {
        if(valid){
          if(this.passwordForm.newpassword !== this.passwordForm.renewpassword){
            this.$Message.error('两次密码不一致')
          } else {
            this.rechangePasswordModal=true
          }
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 取消修改密码确认
    cancelPassword() {
      this.changePasswordModal=false
      this.$refs['passwordRef'].resetFields()
    },
    // 修改密码二次确认框
    resubmitPassword() {
      updateUser({
        password: this.passwordForm.newpassword,
        userId: this.passwordForm.userId
      }).then(data => {
        if(data.code == '200'){
          this.rechangePasswordModal=false
          this.$Message.info('密码修改成功')
          this.changePasswordModal=false
          this.getAllUserInfo()
        }
        if(data.code == '500') {
          this.$Message.error('密码修改失败')
        }
      })
    },
    // 取消修改密码二次确认框
    recancelPassword() {
      this.rechangePasswordModal=false
      this.$Message.info('取消修改密码')
    },
    // 表格选择
    selectDeleted(selection, row) {
      // 全选
      if (!row && selection && selection.length > 0) {
        this.selectUserList.forEach(item => {
          item['_checked'] = true
        })
      } else {
        // 单选
        this.selectUserList.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = true
          }
        })
      }
    },
    // 表格取消选择
    cancelselectDeleted(selection, row) {
      // 全不选
      if (!row && selection && selection.length == 0) {
        this.selectUserList.forEach(item => {
          item['_checked'] = false
        })
      } else {
        // 单不选
        this.selectUserList.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = false
          }
        })
      }
    },
    // 表格删除
    deleteUser() {
      this.deleteUserModal=true
    },
    // 用户删除二次确认框
    submitDeleteUser() {
      let list=this.selectUserList.filter(item => item['_checked'])
      let tempList=[]
      list.forEach(item => {
          tempList.push({
            ...item
          })
      })
      this.deleteUserListId=tempList.map(item => item.userId)
      deleteOnceUser({userId: JSON.stringify(this.deleteUserListId)}).then(data => {
        if(data.code == '200'){
          this.deleteUserModal=false
          this.$Message.info('用户删除成功')
          this.getAllUserInfo()
        }
        if(data.code == '300') {
          this.$Message.error('部分用户删除失败')
        }
        if(data.code == '500') {
          this.$Message.info('无删除用户')
        }
      })
    },
    // 取消用户删除二次确认框
    cancelDeleteUser() {
        this.deleteUserModal=false
        this.$Message.info('取消删除用户')
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
  height: 50px;
  font-size: 20px;
  text-align: center;
}
.formtext{
  width: 50%;
  margin: 0px auto;
  padding: 30px;
  box-shadow: 0 4px 50px rgba(80, 80, 80, 0.15);
  background: #f8f8f9;
}
.form-item{
  text-align: center;
}
.login-btn{
  margin: 0 20px;
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
</style>
