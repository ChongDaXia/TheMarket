<template>
    <div class="layout">
        <Layout>
             <Header>
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
                                        <a @click="personalinfo">
                                            基本信息
                                        </a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <a @click="passwordchange">
                                            修改密码
                                        </a>
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
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem to="/">
                            <Icon type="ios-apps" />主页
                        </BreadcrumbItem>
                        <BreadcrumbItem>菜单名</BreadcrumbItem>
                        <BreadcrumbItem>菜单项</BreadcrumbItem>
                    </Breadcrumb>
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
export default {
  data () {
    return {
      // 退出登录
      loginout_isShowModal: false
    }
  },
  components: {
    // 导航菜单
    'v-menu': menu
  },
  methods: {
    // 退出登录提示框
    loginout_ok () {
      this.$Message.info('已退出登录')
      localStorage.removeItem("Flag")
      this.$router.push({name: 'login'})
    },
    loginout_cancel () {
      this.$Message.info('取消退出')
    },
    // 基本信息提示框
    personalinfo () {
      this.$Modal.confirm ({
        content: '<p>信息</p>',
        okText: '修改',
        onOk: () => {
          this.$Message.info('基本信息修改成功')
        },
        onCancel () {
          this.$Message.info('取消基本信息修改')
        }
      })
    },
    // 忘记密码提示框
    passwordchange () {
      this.$Modal.confirm ({
        content: '<p>密码</p>',
        okText: '修改',
        onOk: () => {
          this.$Message.info('密码修改成功')
        },
        onCancel () {
          this.$Message.info('取消密码修改')
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
    border: 1px solid #d7dde4;
    background: #f5f7f9;
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
.content{
    height: 980px;
    padding: 48px;
    background: #fff;
}
</style>
