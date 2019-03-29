<template>
    <div>
        <Menu theme="light" width="auto" active-name="1-1" :open-names="['1']">
            <Submenu name="1" v-if="showManager">
                <template slot="title">
                    <Icon type="ios-contacts" />
                    用户管理
                </template>
                <MenuItem name="1-1">
                    <a @click="linkto('1-1')">添加新用户</a>
                </MenuItem>
                <MenuItem name="1-2">
                    <router-link to="/showlist">用户列表</router-link>
                </MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-home" />
                    门店管理
                </template>
                <MenuItem name="2-1">添加门店</MenuItem>
                <MenuItem name="2-2">门店列表</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-people" />
                    员工管理
                </template>
                <MenuItem name="3-1">添加员工</MenuItem>
                <MenuItem name="3-2">员工列表</MenuItem>
            </Submenu>
            <Submenu name="4" v-if="showUser">
                <template slot="title">
                    <Icon type="md-happy" />
                    会员管理
                </template>
                <MenuItem name="4-1">添加会员</MenuItem>
                <MenuItem name="4-2">会员列表</MenuItem>
                <MenuItem name="4-3">会员折扣</MenuItem>
            </Submenu>
            <Submenu name="5" v-if="showUser">
                <template slot="title">
                    <Icon type="md-cart" />
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
                    <Icon type="ios-construct" />
                    维修管理
                </template>
                <MenuItem name="6-1">申请维修</MenuItem>
                <MenuItem name="6-2">维修列表</MenuItem>
                <MenuItem name="6-3">维修反馈</MenuItem>
            </Submenu>
            <Submenu name="7">
                <template slot="title">
                    <Icon type="md-chatboxes" />
                    通知管理
                </template>
                <MenuItem name="7-1">发送通知</MenuItem>
                <MenuItem name="7-2">通知记录</MenuItem>
            </Submenu>
            <Submenu name="8">
                <template slot="title">
                    <Icon type="ios-stats" />
                    财务管理
                </template>
                <MenuItem name="8-1">财务统计报表</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>
<script>
export default {
  data () {
    return {
      showUser: true,
      showManager: true
    }
  },
  // 页面加载时完成的内容
  mounted() {
    // if(localStorage.getItem("role") === "用户"){
    //   this.showUser = true
    // } else {
    //   this.showManager = true
    // }
  },
  methods: {
    linkto (id) {
      this.$router.push({
        path: '/addsome',
        query: {
          theid: id
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
