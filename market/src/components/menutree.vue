<template>
    <div>
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
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
</style>
