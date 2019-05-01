<template>
    <div>
        <Menu theme="light" width="auto" @on-select="menuLintTo">
            <MenuGroup title="基础管理" v-if="theAdminRole">
                <MenuItem name="UserManager">
                    <Icon type="ios-contacts" class="iconstyle"/>
                    用户管理
                </MenuItem>
                <MenuItem name="StoreManager">
                    <Icon type="ios-home" class="iconstyle"/>
                    门店管理
                </MenuItem>
            </MenuGroup>
            <MenuGroup title="基础管理" v-if="theUserRole">
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
      // 角色
      role: '',
      theAdminRole: false,
      theUserRole: false,
    }
  },

  mounted() {
    this.getMumu ()
  },

  methods: {
    getMumu() {
      this.role=this.$store.state.role
      if(this.role === '管理员'){
        this.theAdminRole=true
        this.theUserRole=false
      }else if(this.role === '用户'){
        this.theAdminRole=false
        this.theUserRole=true
      }
    },
    menuLintTo(name) {
      switch(name) {
        case 'UserManager':
          this.$router.push({
            path: '/usermanager'
          })
          localStorage.setItem('selectmemu','用户管理')
          this.$store.dispatch('setSelectMemu','用户管理')
          break;
        case 'StoreManager':
          this.$router.push({
            path: '/shopmanager'
          })
          localStorage.setItem('selectmemu','门店管理')
          this.$store.dispatch('setSelectMemu','门店管理')
          break;
        case 'StaffManager':
          this.$router.push({
            path: '/staffmanager'
          })
          localStorage.setItem('selectmemu','员工管理')
          this.$store.dispatch('setSelectMemu','员工管理')
          break;
        case 'MemberManager':
          this.$router.push({
            path: '/membermanager'
          })
          localStorage.setItem('selectmemu','会员管理')
          this.$store.dispatch('setSelectMemu','会员管理')
          break;
        case 'GoodsPage':
          this.$router.push({
            path: '/goodsmanager'
          })
          localStorage.setItem('selectmemu','商品管理')
          this.$store.dispatch('setSelectMemu','商品管理')
          break;
        case 'RepairManager':
          this.$router.push({
            path: '/repairmanager'
          })
          localStorage.setItem('selectmemu','维修管理')
          this.$store.dispatch('setSelectMemu','维修管理')
          break;
        case 'InformManager':
          this.$router.push({
            path: '/informmanager'
          })
          localStorage.setItem('selectmemu','通知管理')
          this.$store.dispatch('setSelectMemu','通知管理')
          break;
        default:
          this.$router.push({
            path: '/addsome',
            query: {
              theid: HomePage
            }
          })
          localStorage.setItem('selectmemu','主页')
          this.$store.dispatch('setSelectMemu','主页')
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
