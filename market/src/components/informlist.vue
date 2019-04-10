<template>
    <div class="layout">
        <div class="header">
            <!-- 搜索条件 -->
            <DatePicker type="daterange" :value="searchTimes" :options="optionsDatetime" @on-change="updatebytotime" placement="bottom-start" placeholder="选择日期" style="width: 200px" split-panels :editable="false"></DatePicker>
        </div>
        <!-- 数据列表 -->
        <div class="content">
            <div>维修单：{{informorder}}</div>
            <div>维修表：{{informlist}}</div>
            <div>详情的内容：{{informdetail}}</div>
            <!-- 管理员权限 -->
            <Card v-for="(item,index) in informlist" :value="item.informId" :key="index" v-if="theAdminRole">
                <div @click="admingetinformdetail(item)">
                    <div style="float: right">
                        {{item.formatCreateTime}}
                      </div>
                    <Divider orientation="left">{{item.title}}</Divider>
                    <p>内容:{{item.content}}</p>
                </div>
            </Card>
            <!-- 用户权限 -->
            <Card v-for="(item,index) in informlist" :value="item.informId" :key="index" v-if="theUserRole">
                <div @click="usergetinformdetail(item)">
                    <div style="float: right">
                        {{item.formatCreateTime}}
                      </div>
                    <Divider orientation="left">{{item.title}}</Divider>
                    <p>内容:{{item.content}}</p>
                </div>
            </Card>
        </div>
        <!-- 管理员通知详情 -->
        <Modal v-model="informdetail_isShowModal" :mask-closable="false" @on-cancel="cancelinformdetail">
            <p class="modaltitle">
                <span>通知信息详情</span>
            </p>
            <p>标题：{{this.informdetail.title}}</p>
            <p>内容：{{this.informdetail.content}}</p>
            <p>时间：{{this.informdetail.formatCreateTime}}</p>
            <p>收件人：{{this.sentUserlist}}</p>
        </Modal>
        <!-- 用户通知详情 -->
        <Modal v-model="otherinformdetail_isShowModal" :mask-closable="false" @on-cancel="othercancelinformdetail">
            <p class="modaltitle">
                <span>通知信息详情</span>
            </p>
            <p>标题：{{this.informdetail.title}}</p>
            <p>内容：{{this.informdetail.content}}</p>
            <p>时间：{{this.informdetail.formatCreateTime}}</p>
            <p>发件人{{this.sentUser}}</p>
        </Modal>
        
    </div>
</template>
<script>
import moment from 'moment'
import {getallinform,getalljoborder,getjoborderadmin} from  '../http/moudules/inform'
import {getOnceUser} from '../http/moudules/user'
export default {
  name: 'informlist',
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
      // 通知单
      informorder: [],
      // 通知表
      informlist: [],
      // 信息详情弹框
      informdetail_isShowModal: false,
      otherinformdetail_isShowModal: false,
      // 信息详情数据
      informdetail: [],
      // 收信人列表
      sentUserlist: [],
      sentUser: ''
    }
  },
  mounted() {
    this.getAllJobOrder ()
  },
  methods: {
    // 时间筛选变化
    updatebytotime (val) {
      this.searchTimes=val
      let starttime=new Date(this.searchTimes[0]).getTime();
      let endtime=new Date(this.searchTimes[1]).getTime();
      // 用户（作为接收者）管理员（作为发送者）
      let tempdata=[]
      if (this.$store.state.role == "用户") {
        tempdata={userId: this.$store.state.userId}
        this.theUserRole=true
      } else {
        tempdata={sentUserId: this.$store.state.userId}
        this.theAdminRole=true
      }
      debugger
      getjoborderadmin(tempdata).then(data =>{
        if(data.code == '200'){
          this.informorder=data.joborder
          this.informlist=data.informs
          this.informlist.forEach((i,index) => {
            this.informorder.forEach(item => {
              if(item.informId == i.informId){
                i.formatCreateTime = moment(item.createTime).format('YYYY-MM-DD')
                let createTimestap = new Date(i.formatCreateTime).getTime();
                if(createTimestap < starttime || createTimestap > endtime){
                  this.informlist.splice(index,1)
                }
              }
            })
          })
          let createTimestap = new Date(this.informorder.formatCreateTime).getTime();
        }
        if(data.code == '300'){
          this.$Message.error('通知获取失败')
        }
        if(data.code == '500'){
          this.$Message.error('通知单获取失败')
        }
      })
    },
    // 获取通知单信息（管理员：同一个通知有多个发送者）
    getAllJobOrder () {
      // 用户（作为接收者）管理员（作为发送者）
      let tempdata=[]
      if (this.$store.state.role == "用户") {
        tempdata={userId: this.$store.state.userId}
        this.theUserRole=true
      } else {
        tempdata={sentUserId: this.$store.state.userId}
        this.theAdminRole=true
      }
      getjoborderadmin(tempdata).then(data =>{
        if(data.code == '200'){
          this.informorder=data.joborder
          this.informlist=data.informs
          this.informorder.forEach(item => {
            this.informlist.forEach(i => {
              if(item.informId == i.informId){
                i.formatCreateTime = moment(item.createTime).format('YYYY-MM-DD')
              }
            })
          })
        }
        if(data.code == '300'){
          this.$Message.error('通知获取失败')
        }
        if(data.code == '500'){
          this.$Message.error('通知单获取失败')
        }
      })
    },
    // 通知详情
    admingetinformdetail (name) {
      this.sentUserlist=[]
      this.informdetail=name
      // 管理员（发送者id+通知id=接收者id=>接收者姓名）
      getalljoborder({sentUserId: this.$store.state.userId, informId: name.informId}).then(data => {
        if(data.code == "200"){
          let ordersuser=data.orders.map(item => item.userId)
          ordersuser.forEach(i => {
            getOnceUser({userId: i}).then(data => {
              if(data.code == "200") {
                this.sentUserlist=this.sentUserlist.concat(data.users.name)
                this.informdetail_isShowModal=true
              }
              if(data.code == "500") {
                this.$Message.error('用户名获取失败')
              }
            })
          })
        }
        if(data.code == "500") {
          this.$Message.error('通知单获取失败')
        }
      })
    },
    usergetinformdetail (name) {
      this.informdetail=name
      // 用户（接受者id+通知id=接收者id=>接收者姓名）
      getalljoborder({userId: this.$store.state.userId, informId: name.informId}).then(data => {
        if(data.code == "200"){
          debugger
          getOnceUser({userId: data.orders.map(item => item.sentUserId)}).then(data => {
            if(data.code == "200") {
              this.sentUser=this.data.users.name
              this.informdetail_isShowModal=true
            }
            if(data.code == "500") {
              this.$Message.error('用户名获取失败')
            }
          })
        }
        if(data.code == "500") {
          this.$Message.error('通知单获取失败')
        }
      })
    },
    cancelinformdetail () {
      this.informdetail_isShowModal=false
    },
    othercancelinformdetail () {
      this.otherinformdetail_isShowModal=false
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
  overflow: auto;
}
</style>
