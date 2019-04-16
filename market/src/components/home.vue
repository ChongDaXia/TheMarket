<template>
    <div class="layout">
        <Layout>
             <Header class="">
                <Menu mode="horizontal" theme="dark">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <a class="a" @click="loginout_isShowModal=true">
                                <Icon type="md-power" />
                                退出登录
                            </a>
                            <Modal v-model="loginout_isShowModal" title="退出登录提示" @on-ok="loginout_ok" @on-cancel="loginout_cancel">
                                <p>是否确认退出登录？</p>
                            </Modal>
                        </MenuItem>
                        <MenuItem name="2">
                            <Dropdown>
                                <a class="a" href="javascript:void(0)">
                                    <Icon type="md-person" />
                                    个人信息管理
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>
                                        <a @click="personalinfochange">
                                            基本信息
                                        </a>
                                        <Modal v-model="personalinfo_isShowModal" :mask-closable="false" @on-ok="personalinfo_ok('personalinfoRef')" @on-cancel="personalinfo_cancel('personalinfoRef')" ok-text="保存">
                                            <p class="modaltitle">
                                              <span>基本信息</span>
                                            </p>
                                            <Form ref="personalinfoRef" :model="personalinfoForm" :rules="personalinfoRule" :label-width="80">
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
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a @click="passwordchange_isShowModal=true">
                                            修改密码
                                        </a>
                                        <Modal v-model="passwordchange_isShowModal" :mask-closable="false" @on-ok="passwordchange_ok('passwordchangeRef')" @on-cancel="passwordchange_cancel('passwordchangeRef')" ok-text="修改">
                                          <p class="modaltitle">
                                              <span>修改密码</span>
                                          </p>
                                          <Form ref="passwordchangeRef" :model="passwordchangeForm" :rules="passwordchangeRule" :label-width="80">
                                              <FormItem label="旧密码" prop="oldpassword">
                                                  <Input v-model="passwordchangeForm.oldpassword"></Input>
                                              </FormItem>
                                              <FormItem label="新密码" prop="newpassword">
                                                  <Input v-model="passwordchangeForm.newpassword"></Input>
                                              </FormItem>
                                              <FormItem label="确认密码" prop="renewpassword">
                                                  <Input v-model="passwordchangeForm.renewpassword"></Input>
                                              </FormItem>
                                          </Form>
                                        </Modal>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{backgroud: '#fff'}">
                    <!-- 导入导航菜单 -->
                    <v-menu></v-menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb style="margin:24px 0">
                        <BreadcrumbItem to="/">
                            <Icon type="ios-apps" />主页
                        </BreadcrumbItem>
                        <BreadcrumbItem>菜单名</BreadcrumbItem>
                        <BreadcrumbItem>
                          <!-- <a @click="testnet1">
                            菜单项
                          </a> -->
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div>{{this.TheDate}}</div>
                    <Content class="content">
                        <!-- 页面内容展示 --> 
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
  data () {
    return {
      // 时间
      TheDate: '',
      // 退出登录
      loginout_isShowModal: false,
      // 基本信息修改框
      personalinfo_isShowModal: false,
      // 忘记密码修改框
      passwordchange_isShowModal: false,
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
  components: {
    // 导航菜单
    'v-menu': menu
  },
  mounted() {
    this.getDate ()
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
      this.$store.dispatch('setUserId', '')
      this.loginout_isShowModal = false;
      this.$Message.info('已退出登录')
      this.$router.push({name: 'login'})
    },
    loginout_cancel () {
      this.$Message.info('取消退出')
      this.loginout_isShowModal = false;
    },
    // 基本信息按钮
    personalinfochange () {
      getOnceUser({
        userId: this.$store.state.userId
      }).then(data => {
        if(data.code == '200'){
          this.personalinfoForm=data.users
          this.personalinfo_isShowModal = true
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
              this.personalinfo_isShowModal = false;
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
      this.personalinfo_isShowModal = false;
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
                      this.passwordchange_isShowModal = false;
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
      this.passwordchange_isShowModal = false;
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
    background: #f5f7f9;
    overflow: scroll;
    border-radius: 4px;
}
.layout-logo{
    width: 100px;
    height: 30px; 
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    background: #5b6270;
    border-radius: 3px;
}
.layout-nav{
    width: 270px;
    margin: 0 auto;
    margin-right: 0px;
}
.a{
    color: rgba(255,255,255,.7);
}
.a:hover{
    color: #fff;
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
