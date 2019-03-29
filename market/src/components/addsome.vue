<template>
    <div class="layout">
        <div class="header">
            <div v-if="AddUserPage">添加新用户</div>
            <div v-if="AddStorePage">添加新门店</div>
            <div v-if="AddStaffPage">添加新员工</div>
            <div v-if="AddMemberPage">添加新会员</div>
            <div v-if="AddGoodsPage">添加新商品</div>
            <div>申请维修</div>
            <div>发送通知</div>
        </div>
        <div class="content">
            <!-- 添加新用户 -->
            <div class="formtext">
              <Form ref="newUserRef" :model="newUserForm" :rules="newUserRules" :label-width="80" v-if="AddUserPage">
                  <FormItem label="用户名" prop="userName">
                      <Input v-model="newUserForm.userName" placeholder="仅支持2-20位大小写字母或数字、中文"></Input>
                  </FormItem>
                  <FormItem label="密码" prop="password">
                      <Input type="password" v-model="newUserForm.password" placeholder="仅支持6-12位大小写字母或数字"></Input>
                  </FormItem>
                  <FormItem label="确认密码" prop="repassword">
                      <Input type="password" v-model="newUserForm.repassword" placeholder="仅支持6-12位大小写字母或数字"></Input>
                  </FormItem>
                  <FormItem label="角色权限" prop="role">
                      <RadioGroup v-model="newUserForm.role">
                          <Radio label="用户"></Radio>
                          <Radio label="管理员"></Radio>
                      </RadioGroup>
                  </FormItem>
                  <FormItem label="姓名" prop="name">
                      <Input v-model="newUserForm.name" placeholder="仅支持2-20位大小写字母或数字、中文"></Input>
                  </FormItem>
                  <FormItem label="联系电话" prop="mobileNo">
                      <Input v-model="newUserForm.mobileNo" placeholder="请输入11位数字"></Input>
                  </FormItem>
                  <FormItem label="身份证号码" prop="idcardNo">
                      <Input v-model="newUserForm.idcardNo" placeholder="请输入正确的身份证号码"></Input>
                  </FormItem>
                  <div class="form-item">
                    <Button class="login-btn" shape="circle" @click="resetAdd('newUserRef')">重置</Button>
                    <Button class="login-btn" shape="circle" @click="submitAddUser('newUserRef')">登录</Button>
                  </div>
                  <Modal v-model="addUserModal" title="确认提示" @on-ok="resubmitAddUser" @on-cancel="cancelAddUser">
                    <p>是否确认保存该用户？</p>
                  </Modal>
              </Form>
            </div>
            <!-- 添加新门店 -->
            <div class="formtext">
              <Form ref="newStoreRef" :model="newStoreForm" :rules="newStoreRules" :label-width="80" v-if="AddStorePage">
                  <FormItem label="编号" prop="storeNo">
                      <Input v-model="newStoreForm.storeNo" placeholder="仅支持2-20位大小写字母或数字" icon="ios-clock-outline"></Input>
                  </FormItem>
                  <FormItem label="租赁状态" prop="rentStatus" style="text-align:left">
                      <RadioGroup v-model="newStoreForm.rentStatus">
                          <Radio label='0'><span>未出租</span></Radio>
                          <Radio label='1'><span>已出租</span></Radio>
                      </RadioGroup>
                  </FormItem>
                  <FormItem label="面积" prop="area" style="text-align:left">
                      <Input v-model="newStoreForm.area" style="width:100px;margin-right:10px"></Input>
                      <span>平方米</span>
                  </FormItem>
                  <FormItem label="地址" prop="address">
                      <Input type="textarea" v-model="newStoreForm.address" placeholder="请输入门店详细地址" :autosize="{minRows: 2,maxRows: 5}"></Input>
                  </FormItem>
                  <div class="form-item">
                    <Button class="login-btn" shape="circle" @click="resetAdd('newStoreRef')">重置</Button>
                    <Button class="login-btn" shape="circle" @click="submitAddStore('newStoreRef')">登录</Button>
                  </div>
                  <Modal v-model="addStoreModal" title="确认提示" @on-ok="resubmitAddStore" @on-cancel="cancelAddStore">
                    <p>是否确认保存该门店？</p>
                  </Modal>
              </Form>
            </div>
            <!-- 添加新员工 -->
            <div class="formtext">
              <Form ref="newStaffRef" :model="newStaffForm" :rules="newStaffRules" :label-width="80" v-if="AddStaffPage">
                  <FormItem label="姓名" prop="name">
                      <Input v-model="newStaffForm.name" placeholder="仅支持2-20位大小写字母或数字、中文"></Input>
                  </FormItem>
                  <FormItem label="性别" prop="sex" style="text-align:left">
                      <RadioGroup v-model="newStaffForm.sex">
                          <Radio label="女"></Radio>
                          <Radio label="男"></Radio>
                      </RadioGroup>
                  </FormItem>
                  <FormItem label="联系电话" prop="mobileNo">
                      <Input v-model="newStaffForm.mobileNo" placeholder="请输入11位数字"></Input>
                  </FormItem>
                  <FormItem label="身份证号码" prop="idcardNo">
                      <Input v-model="newStaffForm.idcardNo" placeholder="请输入正确的身份证号码"></Input>
                  </FormItem>
                  <div class="form-item">
                    <Button class="login-btn" shape="circle" @click="resetAdd('newStaffRef')">重置</Button>
                    <Button class="login-btn" shape="circle" @click="submitAddStaff('newStaffRef')">登录</Button>
                  </div>
                  <Modal v-model="addStaffModal" title="确认提示" @on-ok="resubmitAddStaff" @on-cancel="cancelAddStaff">
                    <p>是否确认保存该员工？</p>
                  </Modal>
              </Form>
            </div>
            <!-- 添加新会员 -->
            <div class="formtext">
              <Form ref="newMemberRef" :model="newMemberForm" :rules="newMemberRules" :label-width="80" v-if="AddMemberPage">
                  <FormItem label="姓名" prop="name">
                      <Input v-model="newMemberForm.name" placeholder="仅支持2-20位大小写字母或数字、中文"></Input>
                  </FormItem>
                  <FormItem label="性别" prop="sex" style="text-align:left">
                      <RadioGroup v-model="newMemberForm.sex">
                          <Radio label="女"></Radio>
                          <Radio label="男"></Radio>
                      </RadioGroup>
                  </FormItem>
                  <FormItem label="联系电话" prop="mobileNo">
                      <Input v-model="newMemberForm.mobileNo" placeholder="请输入11位数字"></Input>
                  </FormItem>
                  <FormItem label="积分" prop="integration" style="text-align:left">
                      <Input v-model="newMemberForm.integration" style="width:100px;margin-right:10px"></Input>
                      <span>积分</span>
                  </FormItem>
                  <div class="form-item">
                    <Button class="login-btn" shape="circle" @click="resetAdd('newMemberRef')">重置</Button>
                    <Button class="login-btn" shape="circle" @click="submitAddMember('newMemberRef')">登录</Button>
                  </div>
                  <Modal v-model="addMemberModal" title="确认提示" @on-ok="resubmitAddMember" @on-cancel="cancelAddMember">
                    <p>是否确认保存该会员？</p>
                  </Modal>
              </Form>
            </div>
            <!-- 添加新商品 -->
            <div class="formtext">
              <Form ref="newGoodsRef" :model="newGoodsForm" :rules="newGoodsRules" :label-width="80" v-if="AddGoodsPage">
                  <FormItem label="名称" prop="name">
                      <Input v-model="newGoodsForm.name" placeholder="仅支持2-20位大小写字母或数字、中文"></Input>
                  </FormItem>
                  <FormItem label="数量" prop="amount" style="text-align:left">
                      <InputNumber v-model="newGoodsForm.amount" :min="1"></InputNumber>
                  </FormItem>
                  <div class="form-item">
                    <Button class="login-btn" shape="circle" @click="resetAdd('newGoodsRef')">重置</Button>
                    <Button class="login-btn" shape="circle" @click="submitAddGoods('newGoodsRef')">添加</Button>
                  </div>
                  <Modal v-model="addGoodsModal" title="确认提示" @on-ok="resubmitAddGoods" @on-cancel="cancelAddGoods">
                    <p>是否确认保存该商品？</p>
                  </Modal>
              </Form>
            </div>
            <div>页面内容2</div>
            <div>页面内容3</div>
            <div>页面内容4</div>
            <div>页面内容5</div>
            <div>页面内容6</div>
        </div>
    </div>
</template>
<script>
import {addnewuser} from '../http/moudules/user'
import {addnewstore} from '../http/moudules/store'
import {addnewstaff} from '../http/moudules/staff'
import {addnewmember} from '../http/moudules/member'
import {addnewgoods} from '../http/moudules/goods'
export default {
  name: 'addSome',
  data () {
    return {
      // 页面名称
      addname: '',
      // 页面参数
      AddUserPage: false,
      AddStorePage: false,
      AddStaffPage: false,
      AddMemberPage: false,
      AddGoodsPage: false,
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
          message: '仅支持2-20位大小写字母或数字、中文'
        }],
        password: [{
          required: true,
          trigger: 'blur, change',
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '仅支持6-12位大小写字母或数字'
        }],
        repassword: [{
          required: true,
          trigger: 'blur, change',
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '仅支持6-12位大小写字母或数字'
        }],
        role: [{
          required: true,
          message: '请选择角色权限'
        }],
        name: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
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
      // 添加新用户二次确认框
      addUserModal: false,
      // 添加新门店
      newStoreForm: {
        storeNo: '',
        rentStatus: '0',
        area: '',
        address: ''
      },
      // 添加新门店表单验证
      newStoreRules: {
        storeNo: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[A-Za-z0-9]{2,10}$/,
          message: '仅支持2-10位大小写字母或数字'
        }],
        rentStatus: [{
          required: true,
          trigger: 'blur, change',
          message: '请选择租赁状态'
        }],
        area: [{
          trigger: 'blur, change',
          pattern:/^[0-9]\d*|[0-9]\d*\.\d*$/,
          message: '格式错误'
        }],
        address: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，\x22]$/,
          message: '格式错误'
        }]
      },
      // 添加新门店二次确认框
      addStoreModal: false,
      // 添加新员工
      newStaffForm: {
        name: '',
        sex: '',
        mobileNo: '',
        idcardNo: ''
      },
      newStaffRules: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
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
      // 添加新员工二次确认框
      addStaffModal: false,
      // 添加新会员
      newMemberForm: {
        name: '',
        sex: '',
        mobileNo: '',
        integration: ''
      },
      newMemberRules: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
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
        integration: [{
          trigger: 'blur, change',
          pattern:/^[1-9]*$/,
          message: '请输入数字'
        }]
      },
      // 添加新会员二次确认框
      addMemberModal: false,
      // 添加新商品
      newGoodsForm: {
        name: '',
        amount: 1
      },
      newGoodsRules: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
        }],
        amount: [{
          trigger: 'blur, change',
          pattern:/^[0-9]*$/,
          message: '请输入数字'
        }]
      },
      // 添加新商品二次确认框
      addGoodsModal: false,
      // 申请维修
      // 发送通知
    }
  },
  // 页面加载时完成的内容
  mounted() {
      this.addname=this.$route.query.theid
  },
  methods: {
    // 添加新用户
    submitAddUser (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          if(this.newUserForm.password !== this.newUserForm.repassword){
            this.$Message.error('两次密码不一致')
          } else {
            this.addUserModal=true
          }
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    resubmitAddUser () {
      addnewuser(this.newUserForm).then(data => {
        if(data.code == '200'){
          this.addUserModal=false
          this.$Message.info('新用户添加成功')
          this.$refs['newUserRef'].resetFields()
        }
        if(data.code == "500") {
          this.$Message.error('新用户添加失败')
        }
      })
    },
    resetAdd (name) {
      this.$refs[name].resetFields()
    },
    cancelAddUser () {
      this.addUserModal=false
      this.$Message.info('取消添加新用户')
    },
    // 添加新门店
    submitAddStore (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.addStoreModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    resubmitAddStore () {
      addnewstore(this.newStoreForm).then(data => {
        if(data.code == '200'){
          this.addStoreModal=false
          this.$Message.info('新门店添加成功')
          this.$refs['newStoreRef'].resetFields()
        }
        if(data.code == "500") {
          this.$Message.error('新门店添加失败')
        }
      })
    },
    cancelAddStore () {
      this.addStoreModal=false
      this.$Message.info('取消添加新门店')
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
    resubmitAddStaff () {
      addnewstaff(this.newStaffForm).then(data => {
        if(data.code == '200'){
          this.addStaffModal=false
          this.$Message.info('新员工添加成功')
          this.$refs['newStaffRef'].resetFields()
        }
        if(data.code == "500") {
          this.$Message.error('新员工添加失败')
        }
      })
    },
    cancelAddStaff () {
      this.addStaffModal=false
      this.$Message.info('取消添加新员工')
    },
    // 添加新会员
    submitAddMember (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.addMemberModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    resubmitAddMember () {
      addnewmember(this.newMemberForm).then(data => {
        if(data.code == '200'){
          this.addMemberModal=false
          this.$Message.info('新会员添加成功')
          this.$refs['newMemberRef'].resetFields()
        }
        if(data.code == "500") {
          this.$Message.error('新员工添加失败')
        }
      })
    },
    cancelAddMember () {
      this.addMemberModal=false
      this.$Message.info('取消添加新会员')
    },
    // 保存新商品
    submitAddGoods (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.addGoodsModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    resubmitAddGoods () {
      addnewgoods(this.newGoodsForm).then(data => {
        if(data.code == '200'){
          this.addGoodsModal=false
          this.$Message.info('新商品添加成功')
          this.$refs['newGoodsRef'].resetFields()
        }
        if(data.code == "500") {
          this.$Message.error('新商品添加失败')
        }
      })
    },
    cancelAddGoods () {
      this.addGoodsModal=false
      this.$Message.info('取消添加新商品')
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
}
.header{
  width: 100%;
  height: 200px;
}
.content{
  width: 100%;
  text-align: center;
}
.formtext{
  width: 50%;
  margin: 0 auto;
}
</style>
