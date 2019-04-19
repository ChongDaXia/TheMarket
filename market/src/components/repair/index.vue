<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">
            <!-- 维修申请功能 -->
            <TabPane label="申请" name="name1">
                <div class="formtext">
                    <Form 
                        ref="newRepairRef" 
                        :model="newRepairForm" 
                        :rules="newRepairRules" 
                        :label-width="80" 
                    >
                        <FormItem label="标题" prop="title">
                            <Input v-model="newRepairForm.title" placeholder="请输入标题" />
                        </FormItem>
                        <FormItem label="描述" prop="content">
                            <Input type="textarea" v-model="newRepairForm.content" placeholder="请输入详细内容" :autosize="{minRows: 5,maxRows: 8}" />
                        </FormItem>
                        <FormItem label="类型" prop="style" style="text-align:left">
                            <Input v-model="newRepairForm.style" style="width:120px;" />
                        </FormItem>
                        <FormItem label="收件人" prop="userId" style="text-align:left">
                            <Button class="login-btn" shape="circle" @click="selectRecipients">选择</Button>
                        </FormItem>
                        <Modal 
                            v-model="recipientsModal" 
                            :mask-closable="false"  
                            @on-ok="submitSelectRecipients"  
                            @on-cancel="cancelSelectRecipients" 
                            width="400"
                        >
                            <p class="modaltitle">
                                <span>基本信息</span>
                            </p>
                            <Table 
                                ref="repairTableRef" 
                                height="300" border 
                                :columns="repairTableTitle" 
                                :data="recipientsList" 
                                @on-select="selectRecipientsList"
                                @on-select-cancel="cancelSelectRecipientsList"
                                @on-select-all="selectRecipientsList"
                                @on-select-all-cancel="cancelSelectRecipientsList">
                            </Table>
                        </Modal>
                        <div>
                            <Tag 
                                v-for="(item, index) in checkedRecipientsList" 
                                v-if="item['_checked']" 
                                :key="index" 
                                :name="index" 
                                closable 
                                @on-close="recipientsClose"
                            >
                                {{item.name}}
                            </Tag>
                        </div>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="resetAdd('newRepairRef')">重置</Button>
                            <Button class="login-btn" shape="circle" @click="submitAddRepair('newRepairRef')">添加</Button>
                        </div>
                        <Modal 
                            v-model="addRepairModal" 
                            title="确认提示" 
                            @on-ok="resubmitAddRepair" 
                            @on-cancel="cancelAddRepair">
                            <p>是否确认发送该维修申请？</p>
                        </Modal>
                    </Form>
                </div>
            </TabPane>
            
            <!-- 维修列表 -->
            <TabPane label="列表" name="name2">
                <!-- 搜索条件 -->
                <div class="header">
                    <DatePicker 
                        type="daterange" 
                        :value="searchTimes" 
                        :options="optionsDatetime" 
                        @on-change="updateByTime" 
                        :clearable="false"
                        placement="bottom-start" 
                        placeholder="选择日期" 
                        style="width: 200px" 
                        split-panels 
                        :editable="false"
                    />
                </div>
                <!-- 数据列表 -->
                <div class="content">
                    <Scroll :on-reach-bottom="handleReachBottom">
                    <!-- 用户权限 -->
                    <Card v-for="(item,index) in repairlists" 
                        :value="item.repairId" 
                        :key="index" 
                        v-if="theUserRole"
                        class="cardstyle"
                    >
                        <div @click="userGetRepairDetail(item)">
                            <div style="float: right">
                                {{item.createTime}}
                            </div>
                            <Divider orientation="left">
                                {{item.title}}
                            </Divider>
                            <div>
                                {{item.content}}
                            </div>
                        </div>
                    </Card>
                    <!-- 管理员权限 -->
                    <Card v-for="(item,index) in repairlists" 
                        :value="item.repairId" 
                        :key="index" 
                        v-if="theAdminRole"
                        class="cardstyle"
                    >
                        <div @click="adminGetRepairDetail(item)">
                            <div style="float: right">
                                {{item.createTime}}
                            </div>
                            <Divider orientation="left">
                                {{item.title}}
                            </Divider>
                            <div>
                                {{item.content}}
                            </div>
                        </div>
                    </Card>
                    </Scroll>
                </div>               
                <!-- 用户维修详情 -->
                <Modal 
                    v-model="repairDetailModal" 
                    :mask-closable="false" 
                    :footer-hide="true"
                    @on-cancel="usercancelrepairdetail"
                >
                    <p class="modaltitle">
                        <span>维修信息详情</span>
                    </p>
                    <p>标题：{{repairdetail.title}}</p>
                    <p>内容：{{repairdetail.content}}</p>
                    <p>类型：{{repairdetail.style}}</p>
                    <p>时间：{{repairdetail.createTime}}</p>
                    <p>收件人：{{sentUsers}}</p>
                </Modal>
                <!-- 管理员维修详情 -->
                <Modal 
                    v-model="otherRepairDetailModal" 
                    :mask-closable="false" 
                    :footer-hide="true"
                    @on-cancel="admincancelrepairdetail"
                >
                    <p class="modaltitle">
                        <span>维修信息详情</span>
                    </p>
                    <p>标题：{{repairdetail.title}}</p>
                    <p>内容：{{repairdetail.content}}</p>
                    <p>类型：{{repairdetail.style}}</p>
                    <p>时间：{{repairdetail.createTime}}</p>
                    <p>发件人：{{sentUser}}</p>
                </Modal>
            </TabPane>
        </Tabs>

        <vue-particles 
            color="#7b7d7d" 
            :particleOpacity="0.7" 
            :particlesNumber="80" 
            shapeType="circle" 
            :particleSize="5" 
            linesColor="#203c77" 
            :linesWidth="2" 
            :lineLinked="true" 
            :lineOpacity="0.4" 
            :linesDistance="150" 
            :moveSpeed="3" 
            :hoverEffect="true" 
            hoverMode="grab" 
            :clickEffect="true" 
            clickMode="push" 
            class="lizi">
        </vue-particles>  
    </div>
</template>

<script>
import moment from 'moment'
import {getAllUser,getOnceUser} from '@/http/moudules/user'
import {addnewrepair,getrepairorder,getrepair,getrepairorderadmin} from '@/http/moudules/repair'
export default {
  mounted() {
    this.getAdminRole()
  },
  data() {
    return {
      // 申请维修数据
      newRepairForm: {
        title: '',
        content: '',
        style: '',
        userId: []
      },
      // 申请维修数据校验
      newRepairRules: {
        title: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
        }],
        content: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，。,.\x22]$/,
          message: '格式错误'
        }],
        style: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/,
          message: '仅支持2-10位大小写字母或数字、中文'
        }],
        userId: [{
          required: true,
          message: '请选择接收者'
        }]
      },
      // 选择收件人
      recipientsModal: false,
      // 收件人列表
      recipientsList: [],
      // 已选收件人
      checkedRecipientsList: [],
      repairTableTitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '姓名',
          key: 'name'
        }
      ],
      // 申请维修二次确认框
      addRepairModal: false,
      // 选中时间
      searchTimes: [
        moment().subtract(30,'days').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD')
      ],
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
      // 维修单
      repairorder: [],
      // 维修表
      repairlists: [],
      // 固定维修表
      Therepairlists: [],
      // 角色()
      theAdminRole: false,
      theUserRole: false,
      // 信息详情弹框
      repairDetailModal:false,
      otherRepairDetailModal:false,
      // 信息详情数据
      repairdetail: [],
      // 收信人
      sentUsers: [],
      sentUser: []
    }
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name2'){
        this.getAllRepair()
      }
    },
    // 获取收件人信息
    getAdminRole() {
      getAllUser({role: "管理员"}).then(data => {
        if(data.code == '200'){
          this.recipientsList = data.users;
        }
        if(data.code == '500') {
          this.$Message.error('维修收件人获取失败')
        }
      })
    },
    // 选择维修收件人
    selectRecipients () {
      let checkUserIdList = this.checkedRecipientsList.map(item => item.userId);
      this.recipientsList.forEach((item, index) => {
        if(checkUserIdList.indexOf(item.userId) !== -1) {
          item['_checked'] = true;
        } else {
          item['_checked'] = false;
        }
        this.$set(this.recipientsList, index, item)
      })
      this.recipientsModal = true;     
    },
    // 收件人选中   
    selectRecipientsList (selection, row){
      // 全选
      if (!row && selection && selection.length > 0) {
        this.recipientsList.forEach(item => {
          item['_checked'] = true
        })
      } else {
        // 单选
        this.recipientsList.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = true
          }
        })
      }
    },
    // 收件人取消选中
    cancelSelectRecipientsList (selection, row) {
      // 全不选
      if (!row && selection && selection.length == 0) {
        this.recipientsList.forEach(item => {
          item['_checked'] = false
        })
      } else {
        // 单不选
        this.recipientsList.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = false
          }
        })
      }
    },
    // 弹框确认收件人
    submitSelectRecipients () {
      let list = this.recipientsList.filter(item => item['_checked']);
      let tempList = [];
      list.forEach(item => {
        tempList.push({
          ...item
        })
      })
      this.checkedRecipientsList = tempList;
      this.recipientsModal=false
    },
    // 弹框取消收件人
    cancelSelectRecipients () {
      this.recipientsModal=false
    },
    // 标签删除收件人
    recipientsClose (event, index) {
      let list = this.checkedRecipientsList.filter((item, tempIndex) => tempIndex !== index)
      this.checkedRecipientsList = list;
    },
    // 保存维修申请
    submitAddRepair (name) {
      this.newRepairForm.userId = this.checkedRecipientsList.map(item => item.userId);
      this.$refs[name].validate(valid => {
        if(valid){
          this.addRepairModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 重置维修申请
    resetAdd (name) {
      this.$refs[name].resetFields()
      this.checkedRecipientsList=[]
    },
    // 维修申请二次确认
    resubmitAddRepair () {
      let data = {
        sentUserId: this.$store.state.userId,
        title: this.newRepairForm.title,
        content: this.newRepairForm.content,
        style: this.newRepairForm.style,
        userId: JSON.stringify(this.newRepairForm.userId)
      };
      addnewrepair(data).then(data => {
        if(data.code == '200'){
          this.addRepairModal=false
          this.$Message.info('维修申请发送成功')
          this.$refs['newRepairRef'].resetFields()
          this.checkedRecipientsList=[]
        }
        if(data.code == "300") {
          this.$Message.error('维修申请发送失败')
        }
        if(data.code == "500") {
          this.$Message.error('维修申请创建失败')
        }
      })
    },
    // 取消维修申请二次确认
    cancelAddRepair () {
      this.addRepairModal=false
      this.$Message.info('取消发送维修申请')
    },
    // 获取维修信息
    getAllRepair() {
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
          this.Therepairlists=data.repairs
          this.Therepairlists.forEach((i,index) => {
            this.repairorder.forEach(item => {
              if(i.repairId == item.repairId){
                i['createTime']=moment(item.createTime).format('YYYY-MM-DD')
              }
            })
          })
          this.repairlists=this.Therepairlists.map(item => {
            return {
              ...item
            }
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
    // 时间筛选变化
    updateByTime (val) {
      this.searchTimes=val
      let starttime=new Date(this.searchTimes[0]).getTime();
      let endtime=new Date(this.searchTimes[1]).getTime();
      this.repairlists=this.Therepairlists.map(item => {
        return {
          ...item
        }
      })
      this.repairlists=this.repairlists.filter(item => {
        let createTimestap=new Date(item.createTime).getTime()
        return createTimestap>=starttime && createTimestap<=endtime
      })
    },
    // 时间清除
    clearByTime(){
      this.Therepairlists.forEach((item,index) => {
        this.$set(this.repairlists,index,{...item})
      })
      console.log("变化的：",this.repairlists)
      console.log("固定的：",this.Therepairlists)
    },
    // 列表滚动条加载
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          const last =this.repairlists[this.repairlists.length-1]
          for(let i=1;i<this.repairlists.length+1;i++){
            this.repairlists.push(last+i)
          }
          resolve()
        },2000)
      })
    },
    // 维修详情（用户）
    userGetRepairDetail (name) {
      this.repairdetail=name
      // 用户（发送者id+维修id=接收者id=>接收者姓名）
      getrepairorder({sentUserId: this.$store.state.userId, repairId: name.repairId}).then(data => {
        if(data.code == '200'){
          this.sentUsers=data.users.map(item => item.name)
          this.repairDetailModal=true
        }
        if(data.code == '500') {
          this.$Message.error('无法获取维修单信息')
        }
      })
    },
    usercancelrepairdetail() {
      this.repairDetailModal=false
    },
    // 维修详情（管理员）
    adminGetRepairDetail (name) {
      this.repairdetail=name
      // 管理员（接收者id+维修id=接收者id=>接收者姓名）
      getrepairorder({userId: this.$store.state.userId, repairId: name.repairId}).then(data => {
        if(data.code == '200'){
          this.sentUser=data.user.map(item => item.name)
          this.otherRepairDetailModal=true
        }
        if(data.code == '500') {
          this.$Message.error('无法获取维修单信息')
        }
      })
    },
    admincancelrepairdetail() {
      this.otherRepairDetailModal=false
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
.formtext{
  width: 50%;
  margin: 60px auto;
}
.header{
  width: 100%;
  height: 60px;
  padding: 50px;
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
.lizi{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-image:url('/assets/images/timg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
}
.tabstyle{
  z-index: 2;
}
.cardstyle{
  margin-bottom: 10px;
}
</style>
