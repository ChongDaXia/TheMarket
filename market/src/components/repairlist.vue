<template>
    <div class="layout">
        <div class="header">
            <!-- 搜索条件 -->
            <Select v-model="repairtime" style="width:200px" placeholder="请选择日期">
                <Option v-for="item in repairtimelist" :value="item" :key="item">{{item}}</Option>
            </Select>
        </div>
        <!-- 数据列表 -->
        <div class="content">
            <Card v-for="(item,index) in repairall" :value="item.repairId" :key="index">
                <div v-if="theAdminRole"  @click="getrepairdetail(item)">
                    <div style="float: right">
                        {{new Date(item.createTime).getFullYear()}}/
                        {{new Date(item.createTime).getMonth()+1}}/
                        {{new Date(item.createTime).getDate()}}
                      </div>
                    <Divider orientation="left">{{item.title}}</Divider>
                    <p>内容:{{item.content}}</p>
                </div>
                <div v-if="theUserRole">
                    <Divider orientation="left">{{item.title}}</Divider>
                    <p>内容:{{item.content}}</p>
                </div>
            </Card>
        </div>
        <!-- 维修详情 -->
        <Modal v-model="repairdetail_isShowModal" :mask-closable="false" @on-cancel="cancelrepairdetail">
            <p class="modaltitle">
                <span>维修信息详情</span>
            </p>
            <p>标题：{{this.repairdetail.title}}</p>
            <p>内容：{{this.repairdetail.content}}</p>
            <p>类型：{{this.repairdetail.style}}</p>
            <p>时间：{{this.repairdetail.createTime}}</p>
            <p>发件人：{{this.repairdetail.sentUserId}}</p>
            <!-- <Form ref="repairdetailRef" :model="repairall">
                <FormItem label="旧密码" prop="oldpassword">
                    <Input v-model="passwordForm.oldpassword" disabled></Input>
                </FormItem>
                <FormItem label="新密码" prop="newpassword">
                    <Input v-model="passwordForm.newpassword"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="renewpassword">
                    <Input v-model="passwordForm.renewpassword"></Input>
                </FormItem>
            </Form> -->
        </Modal>
        <div>维修单：{{repairorder}}</div>
        <div>维修表：{{repairlist}}</div>
        <div>合并的内容：{{repairall}}</div>
        <div>详情的内容：{{repairdetail}}</div>
    </div>
</template>
<script>
import {getrepairorder,getrepair} from  '../http/moudules/repair'
export default {
  name: 'repairlist',
  data () {
    return {
      // 角色()
      theAdminRole: false,
      theUserRole: false,
      // 时间筛选
      repairtime: '',
      repairtimelist: [
        '所有日期',
        '上周',
        '上个月',
        '上季度'
      ],
      // 维修单
      repairorder: [],
      // 维修表
      repairlist: [],
      // 维修单+维修表
      repairall: [],
      // 信息详情弹框
      repairdetail_isShowModal:false,
      // 信息详情数据
      repairdetail: []
    }
  },
  mounted() {
    this.getAllrepairorder ()
  },
  methods: {
    // 获取维修单信息
    getAllrepairorder () {
      // 用户（作为发送者）管理员（作为接收者）
      let tempdata=[]
      if (this.$store.state.role == "用户") {
        tempdata={sentUserId: this.$store.state.userId}
        this.theUserRole=true
      } else {
        tempdata={userId: this.$store.state.userId}
        this.theAdminRole=true
      }
      getrepairorder(tempdata).then(data => {
        // 维修单
        this.repairorder=data.repairorder
        this.repairorder.forEach(item => {
          getrepair({
            repairId: item.repairId
          }).then(data => {
            //维修表
            this.repairlist=this.repairlist.concat(data.repair)
            this.repairlist.forEach(i => {
              if(i.repairId === item.repairId) {
                this.repairall.push({
                  ...i,
                  ...item
                })
              }
            })
          })
        })
      })
    },
    // 维修详情
    getrepairdetail (name) {
      this.repairdetail=name
      this.repairdetail_isShowModal=true
    },
    cancelrepairdetail () {
      this.repairdetail_isShowModal=false
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
    background: #fff;
}
.header{
  width: 100%;
  height: 100px;
  padding: 30px;
}
.modaltitle{
  width: 100%;
  height: 100px;
  text-align: center;
  font-size: 24px;
  padding-top: 25px;
}
.content{
  width: 100%;
  padding: 50px;
}
</style>
