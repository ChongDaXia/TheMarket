<template>
    <div>
        <Menu theme="light" width="auto">
            <Submenu name="1" v-if="showManager">
                <template slot="title">
                    <Icon type="ios-contacts" />
                      用户管理
                </template>
                <MenuItem name="UserManager">
                    <a @click="linktoUserManager">用户管理</a>
                </MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-home" />
                    门店管理
                </template>
                <MenuItem name="StoreManager">
                    <a @click="linktoStoreManager">门店管理</a>
                </MenuItem>
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
            </Submenu>
            <Submenu name="5" v-if="showUser">
                <template slot="title">
                    <Icon type="md-cart" />
                    商品管理
                </template>
                <MenuItem name="GoodsPage">
                    <a @click="linktoGoodsManager">商品管理</a>
                </MenuItem>
            </Submenu>
            <Submenu name="6">
                <template slot="title">
                    <Icon type="ios-construct" />
                    维修管理
                </template>
                <MenuItem name="RepairManager">
                    <a @click="linktoRepairManager">维修管理</a>
                </MenuItem>
            </Submenu>
            <Submenu name="7">
                <template slot="title">
                    <Icon type="md-chatboxes" />
                    通知管理
                </template>
                <MenuItem name="InformManager">
                    <a @click="linktoInformManager">通知管理</a>
                </MenuItem>
            </Submenu>
            <Submenu name="8">
                <template slot="title">
                    <Icon type="ios-stats" />
                    财务管理
                </template>
                <MenuItem name="EchartsPage">
                    财务统计报表
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
    linktoUserManager() {
      this.$router.push({
        path: '/usermanager'
      })
    },
    linktoStoreManager() {
      this.$router.push({
        path: '/shopmanager'
      })
    },
    linktoGoodsManager() {
      this.$router.push({
        path: '/goodsmanager'
      })
    },
    linktoRepairManager() {
      this.$router.push({
        path: '/repairmanager'
      })
    },
    linktoInformManager() {
      this.$router.push({
        path: '/informmanager'
      })
    }
  }
}
</script>
<style scoped>
</style>
