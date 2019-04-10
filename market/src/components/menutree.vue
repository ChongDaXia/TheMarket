<template>
    <div>
        <Menu theme="light" width="auto" active-name="1-1" :open-names="['1']">
            <Submenu name="1" v-if="showManager">
                <template slot="title">
                    <Icon type="ios-contacts" />
                    用户管理
                </template>
                <MenuItem name="AddUserPage">
                    <a @click="linkto('AddUserPage')">添加新用户</a>
                </MenuItem>
                <MenuItem name="1-2">
                    <a @click="listto('UserList')">用户列表</a>
                </MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-home" />
                    门店管理
                </template>
                <MenuItem name="AddStorePage">
                    <a @click="linkto('AddStorePage')">添加门店</a>
                </MenuItem>
                <MenuItem name="2-2">门店列表</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-people" />
                    员工管理
                </template>
                <MenuItem name="AddStaffPage">
                    <a @click="linkto('AddStaffPage')">添加员工</a>
                </MenuItem>
                <MenuItem name="3-2">员工列表</MenuItem>
            </Submenu>
            <Submenu name="4" v-if="showUser">
                <template slot="title">
                    <Icon type="md-happy" />
                    会员管理
                </template>
                <MenuItem name="AddMemberPage">
                    <a @click="linkto('AddMemberPage')">添加会员</a>
                </MenuItem>
                <MenuItem name="4-2">会员列表</MenuItem>
                <MenuItem name="4-3">会员折扣</MenuItem>
            </Submenu>
            <Submenu name="5" v-if="showUser">
                <template slot="title">
                    <Icon type="md-cart" />
                    商品管理
                </template>
                <MenuItem name="AddGoodsPage">
                    <a @click="linktoAddGoods">采购商品</a>
                </MenuItem>
                <MenuItem name="AddGoodsPage">
                    <a @click="linktoSupplier">供货商管理</a>
                </MenuItem>
                <MenuItem name="GoodsListPage">
                    <a @click="linktoGoods">商品列表</a>
                </MenuItem>
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
                <MenuItem name="AddRepairPage">
                    <a @click="linkto('AddRepairPage')">申请维修</a>
                </MenuItem>
                <MenuItem name="RepairListPage">
                    <a @click="linktoRepairList">维修列表</a>
                </MenuItem>
                <MenuItem name="6-3">维修反馈</MenuItem>
            </Submenu>
            <Submenu name="7">
                <template slot="title">
                    <Icon type="md-chatboxes" />
                    通知管理
                </template>
                <MenuItem name="AddInformPage">
                    <a @click="linkto('AddInformPage')">发送通知</a>
                </MenuItem>
                <MenuItem name="InformListPage">
                    <a @click="linktoInformList">通知记录</a>
                </MenuItem>
            </Submenu>
            <Submenu name="8">
                <template slot="title">
                    <Icon type="ios-stats" />
                    财务管理
                </template>
                <MenuItem name="EchartsPage">
                    <a @click="linktoecharts">财务统计报表</a>
                </MenuItem>
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
  },
  methods: {
    linkto (name) {
      this.$router.push({
        path: '/addsome',
        query: {
          theid: name
        }
      })
    },
    listto (name) {
      this.$router.push({
      path: '/showlist',
      query: {
        theid: name
      }
      })
    },
    linktoRepairList () {
      this.$router.push({
        path: '/repairlist'
      })
    },
    linktoecharts () {
      this.$router.push({
        path: '/echarts'
      })
    },
    linktoSupplier () {
      this.$router.push({
        path: '/supplierlist'
      })
    },
    linktoGoods () {
      this.$router.push({
        path: '/goodslist'
      })
    },
    linktoAddGoods () {
      this.$router.push({
        path: '/addgoods'
      })
    },
    linktoInformList () {
      this.$router.push({
        path: '/informlist'
      })
    }
  }
}
</script>
<style scoped>
</style>
