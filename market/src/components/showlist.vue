<template>
    <div class="layout">
        <div class="header">
            <!-- 搜索条件 -->
            <Select v-model="selectrole" style="width:200px;margin-right:30px" placeholder="请选择角色">
                <Option v-for="item in selectrolelist" :value="item" :key="item">
                    {{item}}
                </Option>
            </Select>
            <Select v-model="selectid" filterable style="width:200px;margin-right:30px" placeholder="请选择姓名">
                <Option v-for="item in selectnamelist" :value="item.userId" :key="item.userId">{{item.name}}</Option>
            </Select>
        </div>
        <!-- 数据列表 -->
        <div class="content">
            <Table height="330" border stripe :columns="tabletitle" :data="selectnamelist"></Table>
        </div>
        <!-- 信息详情 -->
        <Modal v-model="selectdetail" :mask-closable="false" @on-ok="submitselectdetail('selectdetailRef')" @on-cancel="cancelselectdetail" ok-text="修改">
            <p class="modaltitle">
                <span>基本信息</span>
            </p>
            <Form ref="selectdetailRef" :model="selectdetailForm" :rules="selectdetailRule" :label-width="80">
                <FormItem label="用户Id" prop="userId">
                    <Input v-model="selectdetailForm.userId" disabled></Input>
                </FormItem>
                <FormItem label="角色权限" prop="role">
                    <Input v-model="selectdetailForm.role"></Input>
                </FormItem>
                <FormItem label="用户名" prop="userName">
                    <Input v-model="selectdetailForm.userName"></Input>
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <Input v-model="selectdetailForm.name"></Input>
                </FormItem>
                <FormItem label="联系电话" prop="mobileNo">
                    <Input v-model="selectdetailForm.mobileNo"></Input>
                </FormItem>
                <FormItem label="身份证号码" prop="idcardNo">
                    <Input v-model="selectdetailForm.idcardNo"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 信息详情二次确认框 -->
        <Modal v-model="reselectdetail" :mask-closable="false" title="确认提示" @on-ok="resubmitselectdetail" @on-cancel="recancelselectdetail">
            <p>是否确认修改该用户信息？</p>
        </Modal>
        <!-- 修改密码 -->
        <Modal v-model="changepassword" :mask-closable="false" @on-ok="submitchangepassword('passwordchangeRef')" @on-cancel="cancelchangepassword" ok-text="修改">
            <p class="modaltitle">
                <span>修改密码</span>
            </p>
            <Form ref="passwordchangeRef" :model="passwordForm" :rules="passwordRule" :label-width="80">
                <FormItem label="旧密码" prop="oldpassword">
                    <Input v-model="passwordForm.oldpassword" disabled></Input>
                </FormItem>
                <FormItem label="新密码" prop="newpassword">
                    <Input v-model="passwordForm.newpassword"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="renewpassword">
                    <Input v-model="passwordForm.renewpassword"></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 修改密码二次确认框 -->
        <Modal v-model="rechangepassword" :mask-closable="false" title="确认提示" @on-ok="resubmitchangepassword" @on-cancel="recancelchangepassword">
            <p>是否确认修改该用户密码？</p>
        </Modal>
    </div>
</template>
<script>
import {getAllUser, getOnceUser, updateUser} from '../http/moudules/user'
export default {
  name: 'showList',
  data () {
    return {
      // 角色筛选
      selectrole: '',
      selectrolelist: [
        '所有人',
        '管理员',
        '用户'
      ],
      // 搜索(选择用户的id)
      selectid: '',
      // 数据列表
      selectnamelist: [],
      // 表格数据
      tabletitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h,params) => {
            return h('div',[
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.updatepwd(params.index)
                  }
                }
              }, '修改密码')
            ])           
          }
        }
      ],
      // 信息详情弹框
      selectdetail: false,
      // 信息详情数据
      selectdetailForm: {
        userId: '',
        role: '',
        userName: '',
        name: '',
        mobileNo: '',
        idcardNo: ''
      },
      // 信息详情数据校验
      selectdetailRule: {
        userName: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
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
          pattern:/^\d{15}|\d{18}$/,
          message: '请输入正确的身份证号码'
        }]
      },
      // 信息详情二次确认框
      reselectdetail: false,
      // 修改密码弹框
      changepassword: false,
      // 修改密码数据
      passwordForm: {
        oldpassword: '',
        newpassword: '',
        renewpassword: ''
      },
      // 修改密码数据校验
      passwordRule: {
        newpassword: [{
          required: true,
          trigger: 'blur, change',
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '仅支持包含大小写字母或数字的密码，且长度在6-12位之间'
        }],
        renewpassword: [{
          required: true,
          trigger: 'blur, change',
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '仅支持包含大小写字母或数字的密码，且长度在6-12位之间'
        }]
      },
      // 修改密码二次确认框
      rechangepassword: false,
      tempid: '',
    }
  },
  mounted() {
    this.userhandlesearch()
  },
  watch: {
    selectrole: 'changelistbyrole',
    selectid: 'changelistbyUserId'
  },
  methods: {
    // 获取所有用户信息
    userhandlesearch () {
      getAllUser().then(data => {
        if(data.code == '200'){
          this.selectnamelist = data.users;
        }
        if(data.code == "500") {
          this.$Message.error('获取所有用户失败')
        }
      })
    },
    // 筛选函数
    changelistbyrole () {
      if (this.selectrole === '所有人') {
        this.userhandlesearch()
      } 
      if (this.selectrole === '管理员'){
        getAllUser({role: '管理员'}).then(data => {
          if(data.code == '200'){
            this.selectnamelist = data.users;
          }
          if(data.code == "500") {
            this.$Message.error('获取管理员失败')
          }
        })
      }
      if (this.selectrole === '用户') {
        getAllUser({role: '用户'}).then(data => {
          if(data.code == '200'){
            this.selectnamelist = data.users;
          }
          if(data.code == "500") {
            this.$Message.error('获取用户失败')
          }
        })
      }
    },
    changelistbyUserId () {
      getAllUser({userId: this.selectid}).then(data => {
        if(data.code == '200'){
          this.selectnamelist = data.users;
        }
        if(data.code == "500") {
          this.$Message.error('获取改用户失败')
        }
      })
    },
    // 表格中的按钮函数(详情)
    show (index) {
      getOnceUser({userId: this.selectnamelist[index].userId}).then(data => {
        if(data.code == '200'){
          this.selectdetailForm=data.users
          this.selectdetail=true
        }
        if(data.code == "500") {
          //获取信息失败
          this.$Message.error('详情获取失败')
        }
      })
    },
    // 信息详情
    submitselectdetail (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.reselectdetail=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    cancelselectdetail () {
      this.selectdetail=false
    },
    // 信息详情二次确认框
    resubmitselectdetail () {
      updateUser(this.selectdetailForm).then(data => {
        if(data.code == '200'){
          this.reselectdetail=false
          this.$Message.info('基本信息修改成功')
          this.userhandlesearch()
        }
        if(data.code == "500") {
          this.$Message.error('基本信息保存失败')
        }
      })
    },
    recancelselectdetail () {
      this.reselectdetail=false
      this.$Message.info('取消修改基本信息')
    },
    // 表格中的按钮函数（修改密码）
    updatepwd (index) {
      getOnceUser({userId: this.selectnamelist[index].userId}).then(data => {
        if(data.code == '200'){
          this.passwordForm.oldpassword=data.users.password
          this.tempid=data.users.userId
          this.changepassword=true
        }
        if(data.code == "500") {
          //获取信息失败
          this.$Message.error('旧密码获取失败')
        }
      })
    },
    // 修改密码
    submitchangepassword (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          if(this.passwordForm.newpassword !== this.passwordForm.renewpassword){
            this.$Message.error('两次密码不一致')
          } else {
            this.rechangepassword=true
          }
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    cancelchangepassword () {
      this.changepassword=false
    },
    // 修改密码二次确认框
    resubmitchangepassword () {
      updateUser({
        password: this.passwordForm.newpassword,
        userId: this.tempid
      }).then(data => {
        if(data.code == '200'){
          this.rechangepassword=false
          this.$Message.info('密码修改成功')
        }
        if(data.code == "500") {
          this.$Message.error('密码修改失败')
        }
      })
    },
    recancelchangepassword () {
      this.rechangepassword=false
      this.$Message.info('取消修改密码')
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
.header{
  width: 100%;
  height: 100px;
  padding: 30px;
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
  text-align: center;
  padding: 50px;
}
</style>
