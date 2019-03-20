<template>
    <div class="layout">
        <Layout>
             <Header>
                <Menu mode="horizontal" theme="dark">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="md-power" />
                            退出登录
                        </MenuItem>
                        <MenuItem name="2">
                            <Dropdown>
                                <a class="a" href="javascript:void(0)">
                                    <Icon type="md-person" />
                                    个人信息管理
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>基本信息</DropdownItem>
                                    <DropdownItem>修改密码</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <!-- <v-memu></v-memu> -->
            <Layout>
                <Sider hide-trigger :style="{backgroud: '#fff'}">
                    <Menu theme="light" width="auto" active-name="1-1" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                用户管理
                            </template>
                            <MenuItem name="1-1">添加新用户</MenuItem>
                            <MenuItem name="1-2">
                                <router-link to="/list">用户列表</router-link>
                            </MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                门店管理
                            </template>
                            <MenuItem name="2-1">添加门店</MenuItem>
                            <MenuItem name="2-2">门店列表</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                员工管理
                            </template>
                            <MenuItem name="3-1">添加员工</MenuItem>
                            <MenuItem name="3-2">员工列表</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                会员管理
                            </template>
                            <MenuItem name="4-1">添加会员</MenuItem>
                            <MenuItem name="4-2">会员列表</MenuItem>
                            <MenuItem name="4-3">会员折扣</MenuItem>
                        </Submenu>
                        <Submenu name="5">
                            <template slot="title">
                                商品管理
                            </template>
                            <MenuItem name="5-1">添加商品</MenuItem>
                            <MenuItem name="5-2">商品列表</MenuItem>
                            <MenuGroup title="库存">
                                <MenuItem name="5-3">库存统计</MenuItem>
                                <MenuItem name="5-4">零库存商品</MenuItem>
                            </MenuGroup>
                        </Submenu>
                        <Submenu name="6">
                            <template slot="title">
                                维修管理
                            </template>
                            <MenuItem name="6-1">申请维修</MenuItem>
                            <MenuItem name="6-2">维修列表</MenuItem>
                            <MenuItem name="6-3">维修反馈</MenuItem>
                        </Submenu>
                        <Submenu name="7">
                            <template slot="title">
                                通知管理
                            </template>
                            <MenuItem name="7-1">发送通知</MenuItem>
                            <MenuItem name="7-2">通知记录</MenuItem>
                        </Submenu>
                        <Submenu name="8">
                            <template slot="title">
                                财务管理
                            </template>
                            <MenuItem name="8-1">财务统计报表</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
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
// import menu from './components/menu.vue'
// export default {
//   components: {
//     'v-menu': menu
//   }
// }
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
