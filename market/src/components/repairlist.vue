<template>
    <div class="layout">
        <div class="header">
            <!-- 搜索条件 -->
            <DatePicker 
                type="daterange" 
                :value="searchTimes" 
                :options="optionsDatetime" 
                @on-change="updatebytotime" 
                placement="bottom-start" 
                placeholder="选择日期" 
                style="width: 200px" 
                split-panels 
                :editable="false"
            />
        </div>
        <!-- 数据列表 -->
        <div class="content">
            <div>维修单：{{repairorder}}</div>
            <div>维修表：{{repairlists}}</div>
            <div>详情的内容：{{repairdetail}}</div>
            <div>用户：{{theUserRole}}</div>
            <div>管理员：{{theAdminRole}}</div>
             <!-- 用户权限 -->
            <Card v-for="(item,index) in repairlists" 
                :value="item.repairId" 
                :key="index" 
                v-if="theUserRole"
            >
                <div @click="usergetrepairdetail(item)">
                    <div style="float: right">
                        {{item.formatCreateTime}}
                    </div>
                    <Divider orientation="left">
                       {{item.title}}
                    </Divider>
                    <p>内容:{{item.content}}</p>
                </div>
            </Card>
            <!-- 管理员权限 -->
            <Card v-for="(item,index) in repairlists" 
                :value="item.repairId" 
                :key="index" 
                v-if="theAdminRole"
            >
                <div @click="admingetrepairdetail(item)">
                    <div style="float: right">
                        {{item.formatCreateTime}}
                    </div>
                    <Divider orientation="left">
                        {{item.title}}
                    </Divider>
                    <p>内容:{{item.content}}</p>
                </div>
            </Card>
        </div>

        <!-- 用户维修详情 -->
        <Modal 
            v-model="repairdetail_isShowModal" 
            :mask-closable="false" 
            @on-cancel="usercancelrepairdetail"
        >
            <p class="modaltitle">
                <span>维修信息详情</span>
            </p>
            <p>标题：{{repairdetail.title}}</p>
            <p>内容：{{repairdetail.content}}</p>
            <p>类型：{{repairdetail.style}}</p>
            <p>时间：{{repairdetail.formatCreateTime}}</p>
            <p>收件人：{{sentUser}}</p>
        </Modal>
        <!-- 管理员维修详情 -->
        <Modal 
            v-model="otherrepairdetail_isShowModal" 
            :mask-closable="false" 
            @on-cancel="admincancelrepairdetail"
        >
            <p class="modaltitle">
                <span>维修信息详情</span>
            </p>
            <p>标题：{{repairdetail.title}}</p>
            <p>内容：{{repairdetail.content}}</p>
            <p>类型：{{repairdetail.style}}</p>
            <p>时间：{{repairdetail.formatCreateTime}}</p>
            <p>发件人：{{sentUser}}</p>
        </Modal>
        
    </div>
</template>
<script>
import moment from 'moment'
import {getrepairorder,getrepair,getrepairorderadmin} from  '../http/moudules/repair'
import {getOnceUser} from '../http/moudules/user'
export default {
  name: 'repairlist',
  data () {
    return {
      // 选中时间
      searchTimes: [],
      // 时间快捷选项
      optionsDatetime: {
        shortcuts: [
          {
            text: '最近一周',
            value () {
              const end=new Date();
              const start=new Date();
              start.setTime(start.getTime()-3600*1000*24*7);
              return [start, end]
            }
          },
          {
            text: '最近一个月',
            value () {
              const end=new Date();
              const start=new Date();
              start.setTime(start.getTime()-3600*1000*24*30);
              return [start, end]
            }
          },
          {
            text: '最近一季度',
            value () {
              const end=new Date();
              const start=new Date();
              start.setTime(start.getTime()-3600*1000*24*90);
              return [start, end]
            }
          }
        ],
        disabledDate (data) {
          return data&&data.valueOf()>Date.now()
        }
      },
      // 角色()
      theAdminRole: false,
      theUserRole: false,
      // 维修单
      repairorder: [],
      // 维修表
      repairlists: [],
      // 信息详情弹框
      repairdetail_isShowModal:false,
      otherrepairdetail_isShowModal:false,
      // 信息详情数据
      repairdetail: [],
      // 收信人
      sentUser: ''
    }
  },
  mounted() {
    this.getAllrepairorder()
  },
  methods: {
    // 时间筛选变化
    updatebytotime (val) {
      this.searchTimes=val
      let starttime=new Date(this.searchTimes[0]).getTime();
      let endtime=new Date(this.searchTimes[1]).getTime();
      // 用户（作为发送者）管理员（作为接受者）
      let tempdata=[]
      if (this.$store.state.role == "用户") {
        tempdata={sentUserId: this.$store.state.userId}
        this.theUserRole=true
      } else {
        tempdata={UserId: this.$store.state.userId}
        this.theAdminRole=true
      }
      getrepairorderadmin(tempdata).then(data => {
        if(data.code == '200'){
          this.repairorder=data.repairorder
          this.repairlists=data.repairs
          this.repairorder.forEach(item => {
            this.repairlists.forEach(i => {
              if(item.repairId == i.repairId){
                i.formatCreateTime = moment(item.createTime).format('YYYY-MM-DD')
                let createTimestap = new Date(i.formatCreateTime).getTime();
                if(createTimestap < starttime || createTimestap > endtime){
                  this.repairlists.splice(index,1)
                }
              }
            })
          })
        }
        if(data.code == '300'){
          this.repairorder=data.repairorder
          this.$Message.error('通知获取失败')
        }
        if(data.code == '500'){
          this.$Message.error('通知单获取失败')
        }
      })
    },
    // 获取维修+维修单信息
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
      getrepairorderadmin(tempdata).then(data => {
        if(data.code == '200'){
          // 去重的维修单
          this.repairorder=data.repairorder
          this.repairlists=data.repairs
          this.repairorder.forEach(item => {
            this.repairlists.forEach(i => {
              if(item.repairId == i.repairId){
                i.formatCreateTime = moment(item.createTime).format('YYYY-MM-DD')
              }
            })
          })
        }
        if(data.code == '300'){
          this.repairorder=data.repairorder
          this.$Message.error('无维修信息')
        }
        if(data.code == '500'){
          this.$Message.info('无维修单信息')
        }
      })
    },
    // 维修详情
    usergetrepairdetail (name) {
      this.repairdetail=name
      // 用户（发送者id+维修id=接收者id=>接收者姓名）
      getrepairorder({sentUserId: this.$store.state.userId, repairId: name.repairId}).then(data => {
        if(data.code == '200'){
          let ordersuser=data.repairorder.map(item => item.userId)
          ordersuser.forEach(i => {
            getOnceUser({userId: i}).then(userData => {
              if(userData.code == '200') {
                this.sentUser=userData.users.name
                this.repairdetail_isShowModal=true
              }
              if(userData.code == '500') {
                this.$Message.error('用户名获取失败')
              }
            })
          })
        }
        if(data.code == '500') {
          this.$Message.error('无法获取维修单信息')
        }
      })
    },
    admingetrepairdetail (name) {
      this.repairdetail=name
      // 管理员（接收者id+维修id=接收者id=>接收者姓名）
      getrepairorder({userId: this.$store.state.userId, repairId: name.repairId}).then(data => {
        if(data.code == '200'){
          let ordersuser=data.repairorder.map(item => item.sentUserId)
          ordersuser.forEach(i => {
            getOnceUser({sentUserId: i}).then(userData => {
              if(userData.code == '200') {
                this.sentUser=userData.users.name
                this.otherrepairdetail_isShowModal=true
              }
              if(userData.code == '500') {
                this.$Message.error('用户名获取失败')
              }
            })
          })
        }
        if(data.code == '500') {
          this.$Message.error('无法获取维修单信息')
        }
      })
    },
    usercancelrepairdetail () {
      this.repairdetail_isShowModal=false
    },
    admincancelrepairdetail () {
      this.otherrepairdetail_isShowModal=false
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
