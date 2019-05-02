<template>
    <div class="layout">
        <Layout>
            <!-- 头部 -->
             <Header>
                <Menu mode="horizontal" theme="dark">
                    <!-- logo -->
                    <div class="layout-logo">
                        <p class="logofont">商业中心管理系统</p>
                    </div>

                    <!-- 头部菜单 -->
                    <div class="layout-nav">
                        <MenuItem name="loginOut">
                            <a @click="loginOutModal=true" class="head-astyle" >
                                <Icon type="md-power" />
                                退出登录
                            </a>
                        </MenuItem>
                        <Modal 
                            v-model="loginOutModal" 
                            title="退出登录提示" 
                            @on-ok="loginout_ok" 
                            @on-cancel="loginout_cancel" >
                            <p>是否确认退出登录？</p>
                        </Modal>
                        <MenuItem name="2">
                            <Dropdown>
                                <a href="javascript:void(0)" class="head-astyle" >
                                    <Icon type="md-person" />
                                    个人信息管理
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="publicInfo">
                                        <a @click="personalinfochange" class="head-aistyle">
                                            <Icon type="md-open" />
                                            基本信息
                                        </a>
                                    </DropdownItem>
                                    <Modal 
                                        v-model="personalInfoModal" 
                                        :mask-closable="false" 
                                        @on-ok="personalinfo_ok('personalinfoRef')" 
                                        @on-cancel="personalinfo_cancel('personalinfoRef')" 
                                        ok-text="保存" >
                                        <p class="modaltitle">
                                          <span>基本信息</span>
                                        </p>
                                        <Form 
                                            ref="personalinfoRef" 
                                            :model="personalinfoForm" 
                                            :rules="personalinfoRule" 
                                            :label-width="80" >
                                            <FormItem label="用户Id" prop="userId">
                                              <Input v-model="personalinfoForm.userId" disabled></Input>
                                            </FormItem>
                                            <FormItem label="角色权限" prop="role">
                                              <Input v-model="personalinfoForm.role" disabled></Input>
                                            </FormItem>
                                            <FormItem label="用户名" prop="userName">
                                              <Input v-model="personalinfoForm.userName"></Input>
                                            </FormItem>
                                            <FormItem label="姓名" prop="name">
                                              <Input v-model="personalinfoForm.name"></Input>
                                            </FormItem>
                                            <FormItem label="联系电话" prop="mobileNo">
                                              <Input v-model="personalinfoForm.mobileNo"></Input>
                                            </FormItem>
                                            <FormItem label="身份证号码" prop="idcardNo">
                                              <Input v-model="personalinfoForm.idcardNo"></Input>
                                            </FormItem>
                                        </Form>
                                    </Modal>
                                    <DropdownItem name="passwordChange">
                                        <a @click="passwordChangeModal=true" class="head-aistyle">
                                            <Icon type="md-lock" />
                                            修改密码
                                        </a>
                                    </DropdownItem>
                                    <Modal 
                                        v-model="passwordChangeModal" 
                                        :mask-closable="false" 
                                        @on-ok="passwordchange_ok('passwordchangeRef')" 
                                        @on-cancel="passwordchange_cancel('passwordchangeRef')" 
                                        ok-text="修改" >
                                        <p class="modaltitle">
                                            <span>修改密码</span>
                                        </p>
                                        <Form 
                                            ref="passwordchangeRef" 
                                            :model="passwordchangeForm" 
                                            :rules="passwordchangeRule" 
                                            :label-width="80" >
                                            <FormItem label="旧密码" prop="oldpassword">
                                                <Input type="password" v-model="passwordchangeForm.oldpassword"></Input>
                                            </FormItem>
                                            <FormItem label="新密码" prop="newpassword">
                                                <Input type="password" v-model="passwordchangeForm.newpassword"></Input>
                                            </FormItem>
                                            <FormItem label="确认密码" prop="renewpassword">
                                                <Input type="password" v-model="passwordchangeForm.renewpassword"></Input>
                                            </FormItem>
                                        </Form>
                                    </Modal>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>

            <!-- 中间内容 -->
            <Layout>
                <!-- 左侧导航栏 -->
                <Sider hide-trigger :style="{background: '#66a9c9'}">
                    <v-menu></v-menu>
                </Sider>

                <!-- 主体内容 -->
                <Layout :style="{padding: '0 24px 24px'}">
                    <!-- 主体路由 -->
                    <Breadcrumb style="margin:24px 0">
                        <BreadcrumbItem to="/pageindex">
                            <Icon type="ios-apps" />主页
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            {{selectMumu}}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <!-- <div>{{this.TheDate}}</div> -->

                    <!-- 主体页面 -->
                    <Content class="content">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
// 引入导航菜单
import menu from './menutree.vue'
import {getOnceUser, updateUser} from '../http/moudules/user'
import moment from 'moment'
export default {
  components: {
    // 导航菜单
    'v-menu': menu
  },

  mounted() {
    this.getDate ()
  },

  computed: {
    listenstage() {
      return this.$store.state.selectmemu;
    }
  },

  watch:{
    listenstage: function(ov,nv){
      if(this.$store.state.selectmemu){
        this.selectMumu=this.$store.state.selectmemu
      }
    }
  },

  data () {
    return {
      // 当前页面
      selectMumu: '',
      // 时间
      TheDate: '',
      // 退出登录
      loginOutModal: false,
      // 基本信息修改框
      personalInfoModal: false,
      // 忘记密码修改框
      passwordChangeModal: false,
      // 用户基本信息
      personalinfoForm: {
        userId: '',
        role: '',
        userName: '',
        name: '',
        mobileNo: '',
        idcardNo: ''
      },
      // 用户基本信息表单验证
      personalinfoRule: {
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
      // 用户忘记密码
      passwordchangeForm: {
        oldpassword: '',
        newpassword: '',
        renewpassword: ''
      },
      // 用户忘记密码表单验证
      passwordchangeRule: {
        oldpassword: [{
          required: true,
          trigger: 'blur, change',
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '仅支持包含大小写字母或数字的密码，且长度在6-12位之间'
        }],
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
      }
    }
  },

  methods: {
    getDate () {
      let toDate=moment().format('YYYY-MM-DD')
      this.TheDate=toDate
    },
    // 退出登录提示框
    loginout_ok () {
      localStorage.removeItem("Flag")
      localStorage.removeItem("userId")
      localStorage.removeItem("role")
      localStorage.removeItem("selectmemu")
      this.$store.dispatch('setUserId', '')
      this.loginOutModal = false;
      this.$Message.info('已退出登录')
      this.$router.push({name: 'login'})
    },
    loginout_cancel () {
      this.$Message.info('取消退出')
      this.loginOutModal = false;
    },
    // 基本信息按钮
    personalinfochange () {
      getOnceUser({
        userId: this.$store.state.userId
      }).then(data => {
        if(data.code == '200'){
          this.personalinfoForm=data.users
          this.personalInfoModal = true
        }
        if(data.code == "500") {
          //获取信息失败
          this.$Message.error('请重新登录')
        }
      })
    },
    // 基本信息提示框
    personalinfo_ok (personalinfoRef) {
      this.$refs[personalinfoRef].validate(valid => {
        if(valid) {
          updateUser(this.personalinfoForm).then(data => {
            if(data.code == '200'){
              this.$Message.info('基本信息修改成功')
              this.personalInfoModal = false;
            }
            if(data.code == "500") {
              //保存信息失败
              this.$Message.error('基本信息保存失败')
            }
          })
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    personalinfo_cancel (personalinfoRef) {
      this.$refs[personalinfoRef].resetFields()
      this.$Message.info('取消基本信息修改')
      this.personalInfoModal = false;
    },
    // 忘记密码提示框
    passwordchange_ok (passwordchangeRef) {
      this.$refs[passwordchangeRef].validate(valid => {
        if(valid){
          if(this.passwordchangeForm.newpassword !== this.passwordchangeForm.renewpassword){
            this.$Message.error('两次密码不一致')
          } else {
            getOnceUser({
              userId: this.$store.state.userId
            }).then(data => {
              if(data.code == '200'){
                if(this.passwordchangeForm.oldpassword === data.users.password){
                  updateUser({
                    userId: this.$store.state.userId,
                    password: this.passwordchangeForm.newpassword
                  }).then(data => {
                    if(data.code == '200'){
                      this.$Message.info('密码修改成功')
                      this.$refs[passwordchangeRef].resetFields()
                      this.passwordChangeModal = false;
                    }
                    if(data.code == "500") {
                      //保存信息失败
                      this.$Message.error('密码修改失败')
                    }
                  })
                } else {
                  this.$Message.error('旧密码错误，请重新输入')
                }
              }
              if(data.code == "500") {
                //获取信息失败
                this.$Message.error('请重新登录')
              }
            })
          }
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    passwordchange_cancel (passwordchangeRef) {
      this.$refs[passwordchangeRef].resetFields()
      this.$Message.info('取消密码修改')
      this.passwordChangeModal = false;
    }
  }
}
</script>
<style scoped>
.layout{
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px solid #d7dde4;
    background: #f1f0ed;
    overflow: hidden;
    border-radius: 4px;
}
.layout-logo{
    width: 300px;
    height: 30px; 
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    border-radius: 3px;
    color: #66a9c9;
    font-size: 20px;
    text-align: center;
    background: #ffffff;
}
.logofont{
    position: relative;
    top: -15px;
}
.layout-nav{
    width: 270px;
    margin: 0 auto;
    margin-right: 0px;
}
.ivu-layout-header{
  background: #66a9c9;
}
.ivu-menu-dark{
  background: #66a9c9;
}
.head-astyle{
    color: #ffffff;
}
.head-astyle:hover{
    color: #ffde20;
}
.head-aistyle{
    color: #66a9c9;
    font-size: 14px;
}
.head-aistyle:hover{
    color: #ffde20;
}
.modaltitle{
  width: 100%;
  height: 100px;
  text-align: center;
  font-size: 24px;
  padding-top: 25px;
}
.content{
  height: 900px;
  background: #fff;
}
</style>
