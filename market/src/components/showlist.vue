<template>
    <div class="layout">
        <div class="header">
            <Dropdown>
                <a href="javascript:void(0)">
                    所有人
                    <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>
                        <a href="javascript:void(0)">管理员</a>
                    </DropdownItem>
                    <DropdownItem>
                        <a href="javascript:void(0)">用户</a>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Select v-model="selectid" filterable style="width:200px">
                <Option v-for="item in selectnamelist" :value="item.userId" :key="item.name">{{item.name}}</Option>
            </Select>
            <div>{{selectid}}</div>
        </div>
        <div class="content">
            <Table height="300" border stripe :columns="tabletitle" :data="selectnamelist"></Table>
        </div>
    </div>
</template>
<script>
import {getAdminRole} from '../http/moudules/user'
export default {
  name: 'showList',
  data () {
    return {
      selectid: '',
      selectnamelist: [],
      tabletitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h,params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              on: {
                click: () => {
                  this.show(params.index)
                }
              }
            }, 'View')
          }
        }
      ]
    }
  },
  mounted() {
    this.userhandlesearch()
  },
  methods: {
    //获取所有用户
    userhandlesearch () {
      getAdminRole().then(data => {
        if(data.code == '200'){
          this.selectnamelist = data.users;
        }
        if(data.code == "500") {
          this.$Message.error('获取所有用户失败')
        }
      })
    },
    //表格中的按钮函数
    show (index) {
      this.$Modal.info({
        title: '标题',
        content: '1111'
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
}
.header{
  width: 100%;
  height: 100px;
  padding: 30px;
}
.content{
  width: 100%;
  text-align: center;
  padding: 50px;
}
</style>
