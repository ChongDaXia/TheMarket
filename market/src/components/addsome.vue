<template>
    <div class="layout">
        <div class="header">
            <div v-if="HomePage">主页</div>
            <div v-if="AddUserPage">添加新用户</div>
            <div v-if="AddStorePage">添加新门店</div>
            <div v-if="AddStaffPage">添加新员工</div>
            <div v-if="AddMemberPage">添加新会员</div>
            <div v-if="AddGoodsPage">添加新商品</div>
            <div v-if="AddRepairPage">申请维修</div>
            <div v-if="AddInformPage">发送通知</div>
        </div>
        <div class="content">
            <div v-if="HomePage">主页</div>
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
                  <FormItem label="角色权限" prop="role" style="text-align:left">
                      <RadioGroup v-model="newUserForm.role" style="width:200px">
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
                    <Button class="login-btn" shape="circle" @click="submitAddUser('newUserRef')">添加</Button>
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
            <!-- 申请维修 -->
            <div class="formtext">
              <Form ref="newRepairRef" :model="newRepairForm" :rules="newRepairRules" :label-width="80" v-if="AddRepairPage">
                  <FormItem label="标题" prop="title">
                      <Input v-model="newRepairForm.title" placeholder="请输入标题"></Input>
                  </FormItem>
                  <FormItem label="描述" prop="content">
                      <Input type="textarea" v-model="newRepairForm.content" placeholder="请输入详细内容" :autosize="{minRows: 5,maxRows: 8}"></Input>
                  </FormItem>
                  <FormItem label="类型" prop="style" style="text-align:left">
                      <Input v-model="newRepairForm.style" style="width:120px;"></Input>
                  </FormItem>
                  <FormItem label="收件人" prop="userId" style="text-align:left">
                      <Button class="login-btn" shape="circle" @click="selectrecipients">选择</Button>
                  </FormItem>
                  <Modal v-model="selectrecipients_isShowModal" :mask-closable="false"  @on-ok="okselectrecipients"  @on-cancel="cancelselectrecipients" width="400">
                      <p class="modaltitle">
                          <span>基本信息</span>
                      </p>
                      <Table ref="repairTableRef" height="300" border :columns="repairTabletitle" :data="recipientslist" 
                          @on-select="selectrecipientslist"
                          @on-select-cancel="cancelselectrecipientslist"
                          @on-select-all="selectrecipientslist"
                          @on-select-all-cancel="cancelselectrecipientslist">
                      </Table>
                  </Modal>
                  <div>
                      <Tag v-for="(item, index) in allreadyCheckRecipientslist" v-if="item['_checked']" :key="index" :name="index" closable @on-close="recipientsClose">{{item.name}}</Tag>
                  </div>
                  <div class="form-item">
                      <Button class="login-btn" shape="circle" @click="resetAdd('newRepairRef')">重置</Button>
                      <Button class="login-btn" shape="circle" @click="submitAddRepair('newRepairRef')">添加</Button>
                  </div>
                  <Modal v-model="addRepairModal" title="确认提示" @on-ok="resubmitAddRepair" @on-cancel="cancelAddRepair">
                    <p>是否确认发送该维修申请？</p>
                  </Modal>
              </Form>
            </div>
            <!-- 发送通知 -->
            <div class="formtext">
              <Form ref="newInformRef" :model="newInformForm" :rules="newInformRules" :label-width="80" v-if="AddInformPage">
                  <FormItem label="标题" prop="title">
                      <Input v-model="newInformForm.title" placeholder="请输入标题"></Input>
                  </FormItem>
                  <FormItem label="描述" prop="content">
                      <Input type="textarea" v-model="newInformForm.content" placeholder="请输入详细内容" :autosize="{minRows: 5,maxRows: 8}"></Input>
                  </FormItem>
                  <FormItem label="收件人" prop="userId" style="text-align:left">
                      <Button class="login-btn" shape="circle" @click="selectaddressee">选择</Button>
                  </FormItem>
                  <Modal v-model="addressee_isShowModal" :mask-closable="false"  @on-ok="okselectaddressee"  @on-cancel="cancelselectaddressee" width="400">
                      <p class="modaltitle">
                          <span>基本信息</span>
                      </p>
                      <Table ref="informTableRef" height="300" border :columns="informTabletitle" :data="addresseelist" 
                          @on-select="selectaddresseelist"
                          @on-select-cancel="cancelselectaddresseelist"
                          @on-select-all="selectaddresseelist"
                          @on-select-all-cancel="cancelselectaddresseelist">
                      </Table>
                  </Modal>
                  <div>
                      <Tag v-for="(item, index) in allreadyCheckAddresseelist" v-if="item['_checked']" :key="index" :name="index" closable @on-close="addresseeClose">{{item.name}}</Tag>
                  </div>
                  <div class="form-item">
                      <Button class="login-btn" shape="circle" @click="resetAdd('newInformRef')">重置</Button>
                      <Button class="login-btn" shape="circle" @click="submitAddInform('newInformRef')">发送</Button>
                  </div>
                  <Modal v-model="addInformModal" title="确认提示" @on-ok="resubmitAddInform" @on-cancel="cancelAddInfrom">
                    <p>是否确认发送该通知？</p>
                  </Modal>
              </Form>
            </div>
        </div>
    </div>
</template>
<script>
import {addnewuser,getAdminRole} from '../http/moudules/user'
import {addnewstore} from '../http/moudules/store'
import {addnewstaff} from '../http/moudules/staff'
import {addnewmember} from '../http/moudules/member'
import {addnewgoods} from '../http/moudules/goods'
import {addnewrepair} from '../http/moudules/repair'
import {addnewinform} from '../http/moudules/inform'
export default {
  name: 'addSome',
  data () {
    return {
      // 页面参数
      HomePage: true,
      AddUserPage: false,
      AddStorePage: false,
      AddStaffPage: false,
      AddMemberPage: false,
      AddGoodsPage: false,
      AddRepairPage: false,
      AddInformPage: false,
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
          required: true,
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
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，。,.\x22]$/,
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
      newRepairForm: {
        title: '',
        content: '',
        style: '',
        userId: []
      },
      newRepairRules: {
        title: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
        }],
        content: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，。,.\x22]$/,
          message: '格式错误'
        }],
        style: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
          message: '仅支持2-10位大小写字母或数字、中文'
        }],
        userId: [{
          required: true,
          message: '请选择接收者'
        }]
      },
      // 申请维修二次确认框
      addRepairModal: false,
      // 选择收件人
      selectrecipients_isShowModal: false,
      // 收件人列表
      recipientslist: [],
      allreadyCheckRecipientslist: [],
      repairTabletitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '姓名',
          key: 'name'
        }
      ],
      // 发送通知
      newInformForm: {
        title: '',
        content: '',
        userId: []
      },
      newInformRules: {
        title: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
        }],
        content: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，。,.\x22]$/,
          message: '格式错误'
        }],
        userId: [{
          required: true,
          message: '请选择接收者'
        }]
      },
      // 发送通知二次确认框
      addInformModal: false,
      // 选择收件人
      addressee_isShowModal: false,
      // 收件人列表
      addresseelist: [],
      allreadyCheckAddresseelist: [],
      informTabletitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '姓名',
          key: 'name'
        }
      ]
    }
  },
  watch: {
    $route: {
      handler: function(newRouter, oldRouter){
        switch(this.$route.query.theid){
          case "AddUserPage":
            this.HomePage=false
            this.AddUserPage=true
            this.AddStorePage=false
            this.AddStaffPage=false
            this.AddMemberPage=false
            this.AddGoodsPage=false
            this.AddRepairPage=false
            this.AddInformPage=false
            break
          case "AddStorePage":
            this.HomePage=false
            this.AddUserPage=false
            this.AddStorePage=true
            this.AddStaffPage=false
            this.AddMemberPage=false
            this.AddGoodsPage=false
            this.AddRepairPage=false
            this.AddInformPage=false
            break
          case "AddStaffPage":
            this.HomePage=false
            this.AddUserPage=false
            this.AddStorePage=false
            this.AddStaffPage=true
            this.AddMemberPage=false
            this.AddGoodsPage=false
            this.AddRepairPage=false
            this.AddInformPage=false
            break
          case "AddMemberPage":
            this.HomePage=false
            this.AddUserPage=false
            this.AddStorePage=false
            this.AddStaffPage=false
            this.AddMemberPage=true
            this.AddGoodsPage=false
            this.AddRepairPage=false
            this.AddInformPage=false
            break
          case "AddGoodsPage":
            this.HomePage=false
            this.AddUserPage=false
            this.AddStorePage=false
            this.AddStaffPage=false
            this.AddMemberPage=false
            this.AddGoodsPage=true
            this.AddRepairPage=false
            this.AddInformPage=false
            break
          case "AddRepairPage":
            this.HomePage=false
            this.AddUserPage=false
            this.AddStorePage=false
            this.AddStaffPage=false
            this.AddMemberPage=false
            this.AddGoodsPage=false
            this.AddRepairPage=true
            this.AddInformPage=false
            break
          case "AddInformPage":
            this.HomePage=false
            this.AddUserPage=false
            this.AddStorePage=false
            this.AddStaffPage=false
            this.AddMemberPage=false
            this.AddGoodsPage=false
            this.AddRepairPage=false
            this.AddInformPage=true
            break
          default:
            this.HomePage=true
        }
      },
      immediate: true
    }
  },
  // 页面加载时完成的内容
  mounted() {
    this.getAdminRole()
    this.getPublicRole()
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
    },
    // 选择维修收件人
    selectrecipients () {
      let checkUserIdList = this.allreadyCheckRecipientslist.map(item => item.userId);
      this.recipientslist.forEach((item, index) => {
        if(checkUserIdList.indexOf(item.userId) !== -1) {
          item['_checked'] = true;
        } else {
          item['_checked'] = false;
        }
        this.$set(this.recipientslist, index, item)
      })
      this.selectrecipients_isShowModal = true;     
    },
    getAdminRole() {
      getAdminRole({role: "管理员"}).then(data => {
        if(data.code == '200'){
          this.recipientslist = data.users;
        }
        if(data.code == "500") {
          this.$Message.error('维修收件人获取失败')
        }
      })
    },
    selectrecipientslist (selection, row){
      // 全选
      if (!row && selection && selection.length > 0) {
        this.recipientslist.forEach(item => {
          item['_checked'] = true
        })
      } else {
        // 单选
        this.recipientslist.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = true
          }
        })
      }
    },
    cancelselectrecipientslist (selection, row) {
      // 全不选
      if (!row && selection && selection.length == 0) {
        this.recipientslist.forEach(item => {
          item['_checked'] = false
        })
      } else {
        // 单不选
        this.recipientslist.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = false
          }
        })
      }
    },
    // 弹框取消收件人
    cancelselectrecipients () {
      this.selectrecipients_isShowModal=false
    },
    // 弹框确认收件人
    okselectrecipients () {
      let list = this.recipientslist.filter(item => item['_checked']);
      let tempList = [];
      list.forEach(item => {
        tempList.push({
          ...item
        })
      })
      this.allreadyCheckRecipientslist = tempList;
      this.selectrecipients_isShowModal=false
    },
    // 标签删除收件人
    recipientsClose (event, index) {
      let list = this.allreadyCheckRecipientslist.filter((item, tempIndex) => tempIndex !== index)
      this.allreadyCheckRecipientslist = list;
    },
    // 保存维修申请
    submitAddRepair (name) {
      this.newRepairForm.userId = this.allreadyCheckRecipientslist.map(item => item.userId);
      this.$refs[name].validate(valid => {
        if(valid){
          this.addRepairModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    resubmitAddRepair () {
      let data = {
        sentUserId: this.$store.state.userId,
        title: this.newRepairForm.title,
        content: this.newRepairForm.content,
        style: this.newRepairForm.style,
        userId: JSON.stringify(this.newRepairForm.userId)
      };
      addnewrepair(data).then(data => {
        if(data.code == '200'){
          this.addRepairModal=false
          this.$Message.info('维修申请发送成功')
          this.$refs['newRepairRef'].resetFields()
        }
        if(data.code == "300") {
          this.$Message.error('维修申请发送失败')
        }
        if(data.code == "500") {
          this.$Message.error('维修申请创建失败')
        }
      })
    },
    cancelAddRepair () {
      this.addRepairModal=false
      this.$Message.info('取消发送维修申请')
    },
    // 选择通知维修人
    selectaddressee () {
      // 获取标签列表中的userId，循环弹框中的列表，能找到匹配的，就赋值列表中的_checked为true,重新赋值解决深层找不到的问题
      // 每次打开弹框，都对列表里的值进行了初始化设置（依据是标签列表）
      let checkUserIdList = this.allreadyCheckAddresseelist.map(item => item.userId);
      this.addresseelist.forEach((item, index) => {
        if(checkUserIdList.indexOf(item.userId) !== -1) {
          item['_checked'] = true;
        } else {
          item['_checked'] = false;
        }
        this.$set(this.addresseelist, index, item)
      })
      this.addressee_isShowModal = true;     
    },
    getPublicRole() {
      getAdminRole({role: "用户"}).then(data => {
        if(data.code == '200'){
          this.addresseelist = data.users;
        }
        if(data.code == "500") {
          this.$Message.error('通知收件人获取失败')
        }
      })
    },
    selectaddresseelist (selection, row){
      // 全选
      if (!row && selection && selection.length > 0) {
        this.addresseelist.forEach(item => {
          item['_checked'] = true
        })
      } else {
        // 单选
        this.addresseelist.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = true
          }
        })
      }
    },
    cancelselectaddresseelist (selection, row) {
      // 全不选
      if (!row && selection && selection.length == 0) {
        this.addresseelist.forEach(item => {
          item['_checked'] = false
        })
      } else {
        // 单不选
        this.addresseelist.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = false
          }
        })
      }
    },
    // 弹框取消收件人
    cancelselectaddressee () {
      this.addressee_isShowModal=false
    },
    // 弹框确认收件人
    okselectaddressee () {
      // 对弹框中数据的操作，改变的是列表值，只有保存时才将列表值赋给标签列表（弹框中初始化：列表值根据标签列表值）
      // 直接=号赋值，会把地址赋值过去，其中一个值改变时，另外一个值也会改变（所以要改变这种方式）
      let list = this.addresseelist.filter(item => item['_checked']);
      let tempList = [];
      list.forEach(item => {
        tempList.push({
          ...item
        })
      })
      this.allreadyCheckAddresseelist = tempList;
      this.addressee_isShowModal=false
    },
    // 标签删除收件人
    addresseeClose (event, index) {
      let list = this.allreadyCheckAddresseelist.filter((item, tempIndex) => tempIndex !== index)
      this.allreadyCheckAddresseelist = list;
    },
    // 保存发送通知
    submitAddInform (name) {
      this.newInformForm.userId = this.allreadyCheckAddresseelist.map(item => item.userId);
      this.$refs[name].validate(valid => {
        if(valid){
          this.addInformModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    resubmitAddInform () {
      let data = {
        sentUserId: this.$store.state.userId,
        title: this.newInformForm.title,
        content: this.newInformForm.content,
        userId: JSON.stringify(this.newInformForm.userId)
      };
      addnewinform(data).then(data => {
        if(data.code == '200'){
          this.addInformModal=false
          this.$Message.info('通知发送成功')
          this.$refs['newInformRef'].resetFields()
        }
        if(data.code == "300") {
          this.$Message.error('通知发送失败')
        }
        if(data.code == "500") {
          this.$Message.error('通知创建失败')
        }
      })
    },
    cancelAddInfrom () {
      this.addInformModal=false
      this.$Message.info('取消发送通知')
    },
    // 
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
  height: 100px;
}
.content{
  width: 100%;
  text-align: center;
}
.formtext{
  width: 50%;
  margin: 0 auto;
}
.modaltitle{
  width: 100%;
  height: 100px;
  text-align: center;
  font-size: 24px;
  padding-top: 25px;
}
</style>
