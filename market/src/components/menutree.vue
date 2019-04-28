<template>
    <div>
        <Menu theme="light" width="auto" @on-select="menuLintTo">
            <MenuGroup title="基础管理">
                <MenuItem name="UserManager">
                    <Icon type="ios-contacts" class="iconstyle"/>
                    用户管理
                </MenuItem>
                <MenuItem name="StoreManager">
                    <Icon type="ios-home" class="iconstyle"/>
                    门店管理
                </MenuItem>
            </MenuGroup>
            <MenuGroup title="基础管理">
                <MenuItem name="StaffManager">
                    <Icon type="ios-people" class="iconstyle"/>
                    员工管理
                </MenuItem>
                <MenuItem name="MemberManager">
                    <Icon type="md-happy" class="iconstyle"/>
                    会员管理
                </MenuItem>
                <MenuItem name="GoodsPage">
                    <Icon type="md-cart"  class="iconstyle"/>
                    商品管理
                </MenuItem>
            </MenuGroup>
            <MenuGroup title="公共管理">
                <MenuItem name="RepairManager">
                    <Icon type="ios-construct" class="iconstyle"/>
                    维修管理
                </MenuItem>
                <MenuItem name="InformManager">
                    <Icon type="md-chatboxes" class="iconstyle"/>
                    通知管理
                </MenuItem>
                <MenuItem name="EchartsPage">
                    <Icon type="ios-stats" class="iconstyle"/>
                    财务统计报表
                </MenuItem>
            </MenuGroup>
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

  methods: {
    menuLintTo(name) {
      switch(name) {
        case 'UserManager':
          this.$router.push({
            path: '/usermanager'
          })
          break;
        case 'StoreManager':
          this.$router.push({
            path: '/shopmanager'
          })
          break;
        case 'StaffManager':
          this.$router.push({
            path: '/staffmanager'
          })
          break;
        case 'MemberManager':
          this.$router.push({
            path: '/membermanager'
          })
          break;
        case 'GoodsPage':
          this.$router.push({
            path: '/goodsmanager'
          })
          break;
        case 'RepairManager':
          this.$router.push({
            path: '/repairmanager'
          })
          break;
        case 'InformManager':
          this.$router.push({
            path: '/informmanager'
          })
          break;
        default:
          this.$router.push({
            path: '/addsome',
            query: {
              theid: HomePage
            }
          })
      }
    }
  }
}
</script>
<style scoped>
.iconstyle{
  margin: 5px 10px;
}
</style>
