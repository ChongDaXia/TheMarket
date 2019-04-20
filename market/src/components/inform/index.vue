<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">
            <!-- 通知发送功能 -->
            <TabPane label="添加" name="name1">
                <div class="formtext">
                  <Form 
                      ref="newInformRef" 
                      :model="newInformForm" 
                      :rules="newInformRules" 
                      :label-width="80" 
                  >
                      <FormItem label="标题" prop="title">
                          <Input v-model="newInformForm.title" placeholder="请输入标题"></Input>
                      </FormItem>
                      <FormItem label="描述" prop="content">
                          <Input type="textarea" v-model="newInformForm.content" placeholder="请输入详细内容" :autosize="{minRows: 5,maxRows: 8}"></Input>
                      </FormItem>
                      <FormItem label="收件人" prop="userId" style="text-align:left">
                          <Button class="login-btn" shape="circle" @click="selectAddressee">选择</Button>
                      </FormItem>
                      <Modal 
                          v-model="addresseeModal" 
                          :mask-closable="false"  
                          @on-ok="submitSelectAddressee"  
                          @on-cancel="cancelSelectAddressee" 
                          width="400"
                      >
                          <p class="modaltitle">
                              <span>基本信息</span>
                          </p>
                          <Table 
                              ref="informTableRef" 
                              height="300" border 
                              :columns="informTabletitle" 
                              :data="addresseeList" 
                              @on-select="selectAddresseeList"
                              @on-select-cancel="cancelSelectAddresseeList"
                              @on-select-all="selectAddresseeList"
                              @on-select-all-cancel="cancelSelectAddresseeList">
                          </Table>
                      </Modal>
                      <div>
                          <Tag 
                              v-for="(item, index) in checkedAddresseeList" 
                              v-if="item['_checked']" 
                              :key="index" 
                              :name="index" 
                              closable 
                              @on-close="addresseeClose"
                          >
                              {{item.name}}
                          </Tag>
                      </div>
                      <div class="form-item">
                          <Button class="login-btn" shape="circle" @click="resetAdd('newInformRef')">重置</Button>
                          <Button class="login-btn" shape="circle" @click="submitAddInform('newInformRef')">发送</Button>
                      </div>
                      <Modal 
                          v-model="addInformModal" 
                          title="确认提示" 
                          @on-ok="resubmitAddInform" 
                          @on-cancel="cancelAddInfrom">
                          <p>是否确认发送该通知？</p>
                      </Modal>
                  </Form>
                </div>
            </TabPane>
            
            <!-- 通知列表 -->
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
                        <!-- 管理员权限 -->
                        <Card v-for="(item,index) in informlist" 
                            :value="item.informId" 
                            :key="index" 
                            v-if="theAdminRole"
                        >
                            <div @click="adminGetInformDetail(item)">
                                <div style="float: right">
                                    {{item.createTime}}
                                </div>
                                <Divider orientation="left">
                                    {{item.title}}
                                </Divider>
                                <p>内容:{{item.content}}</p>
                            </div>
                        </Card>
                        <!-- 用户权限 -->
                        <Card v-for="(item,index) in informlist" 
                            :value="item.informId" 
                            :key="index" 
                            v-if="theUserRole"
                        >
                            <div @click="userGetInformDetail(item)">
                                <div style="float: right">
                                    {{item.createTime}}
                                </div>
                                <Divider orientation="left">
                                    {{item.title}}
                                </Divider>
                                <p>内容:{{item.content}}</p>
                            </div>
                        </Card>
                    </Scroll>
                </div>
                <!-- 管理员通知详情 -->
                <Modal v-model="informDetailModal" 
                    :mask-closable="false" 
                    :footer-hide="true"
                    @on-cancel="adminCancelInformDetail"
                >
                    <p class="modaltitle">
                        <span>通知信息详情</span>
                    </p>
                    <p>标题：{{informdetail.title}}</p>
                    <p>内容：{{informdetail.content}}</p>
                    <p>时间：{{informdetail.createTime}}</p>
                    <p>收件人：{{sentUsers}}</p>
                </Modal>
                <!-- 用户通知详情 -->
                <Modal 
                    v-model="otherInformDetailModal" 
                    :mask-closable="false" 
                    :footer-hide="true"
                    @on-cancel="userCancelInformDetail"
                >
                    <p class="modaltitle">
                        <span>通知信息详情</span>
                    </p>
                    <p>标题：{{informdetail.title}}</p>
                    <p>内容：{{informdetail.content}}</p>
                    <p>时间：{{informdetail.createTime}}</p>
                    <p>发件人: {{sentUser}}</p>
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
import {getAllUser} from '@/http/moudules/user'
import {addnewinform,getalljoborder,getjoborderadmin} from '@/http/moudules/inform'
export default {
  mounted() {
    this.getPublicRole()
  },
  data() {
    return {
      // 发送通知信息
      newInformForm: {
        title: '',
        content: '',
        userId: []
      },
      // 发送通知信息验证
      newInformRules: {
        title: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母、数字、中文'
        }],
        content: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，。,.\x22]$/,
          message: '格式错误'
        }],
        userId: [{
          required: true,
          message: '请选择接收者'
        }]
      },
      // 发送通知二次确认框
      addInformModal: false,
      // 选择收件人
      addresseeModal: false,
      // 收件人列表
      addresseeList: [],
      // 已选收件人
      checkedAddresseeList: [],
      informTabletitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '姓名',
          key: 'name'
        }
      ],
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
      // 通知单
      informorder: [],
      // 通知表
      informlist: [],
      // 固定通知表
      Theinformlist: [],
      // 角色()
      theAdminRole: false,
      theUserRole: false,
      // 信息详情弹框
      informDetailModal: false,
      otherInformDetailModal: false,
      // 信息详情数据
      informdetail: [],
      // 收信人列表
      sentUsers: [],
      sentUser: ''
    }
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name1'){
        this.getPublicRole()
      }
      if(name === 'name2'){
        this.getAllJobOrder()
      }
    },
    // 获取收件人信息
    getPublicRole() {
      getAllUser({role: "用户"}).then(data => {
        if(data.code == '200'){
          this.addresseeList = data.users;
        }
        if(data.code == "500") {
          this.$Message.error('通知收件人获取失败')
        }
      })
    },
    // 选择通知收件人
    selectAddressee () {
      // 获取标签列表中的userId，循环弹框中的列表，能找到匹配的，就赋值列表中的_checked为true,重新赋值解决深层找不到的问题
      // 每次打开弹框，都对列表里的值进行了初始化设置（依据是标签列表）
      let checkUserIdList = this.checkedAddresseeList.map(item => item.userId);
      this.addresseeList.forEach((item, index) => {
        if(checkUserIdList.indexOf(item.userId) !== -1) {
          item['_checked'] = true;
        } else {
          item['_checked'] = false;
        }
        this.$set(this.addresseeList, index, item)
      })
      this.addresseeModal = true;     
    },
    // 收件人选中
    selectAddresseeList (selection, row){
      // 全选
      if (!row && selection && selection.length > 0) {
        this.addresseeList.forEach(item => {
          item['_checked'] = true
        })
      } else {
        // 单选
        this.addresseeList.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = true
          }
        })
      }
    },
    // 收件人取消选中
    cancelSelectAddresseeList (selection, row) {
      // 全不选
      if (!row && selection && selection.length == 0) {
        this.addresseeList.forEach(item => {
          item['_checked'] = false
        })
      } else {
        // 单不选
        this.addresseeList.forEach(item => {
          if(item.userId === row.userId) {
            item['_checked'] = false
          }
        })
      }
    },
    // 弹框确认收件人
    submitSelectAddressee () {
      // 对弹框中数据的操作，改变的是列表值，只有保存时才将列表值赋给标签列表（弹框中初始化：列表值根据标签列表值）
      // 直接=号赋值，会把地址赋值过去，其中一个值改变时，另外一个值也会改变（所以要改变这种方式）
      let list = this.addresseeList.filter(item => item['_checked']);
      let tempList = [];
      list.forEach(item => {
        tempList.push({
          ...item
        })
      })
      this.checkedAddresseeList = tempList;
      this.addresseeModal=false
    },
    // 弹框取消收件人
    cancelSelectAddressee () {
      this.addresseeModal=false
    },
    // 标签删除收件人
    addresseeClose (event, index) {
      let list = this.checkedAddresseeList.filter((item, tempIndex) => tempIndex !== index)
      this.checkedAddresseeList = list;
    },
    // 保存发送通知
    submitAddInform (name) {
      this.newInformForm.userId = this.checkedAddresseeList.map(item => item.userId);
      this.$refs[name].validate(valid => {
        if(valid){
          this.addInformModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 重置维修申请
    resetAdd (name) {
      this.$refs[name].resetFields()
      this.checkedAddresseeList=[]
    },
    // 发送通知二次确认
    resubmitAddInform () {
      let data = {
        sentUserId: this.$store.state.userId,
        title: this.newInformForm.title,
        content: this.newInformForm.content,
        userId: JSON.stringify(this.newInformForm.userId)
      };
      addnewinform(data).then(data => {
        if(data.code == '200'){
          this.addInformModal=false
          this.$Message.info('通知发送成功')
          this.$refs['newInformRef'].resetFields()
          this.checkedAddresseeList=[]
        }
        if(data.code == '300') {
          this.$Message.error('通知发送失败')
        }
        if(data.code == '500') {
          this.$Message.error('通知创建失败')
        }
      })
    },
    // 取消发送通知二次确认
    cancelAddInfrom () {
      this.addInformModal=false
      this.$Message.info('取消发送通知')
    },
    // 获取通知信息
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
          this.Theinformlist=data.informs
          this.Theinformlist.forEach((i,index) => {
            this.informorder.forEach(item => {
              if(i.informId == item.informId){
                i['createTime'] = moment(item.createTime).format('YYYY-MM-DD')
              }
            })
          })
        }
        this.informlist=this.Theinformlist.map(item => {
          return {
            ...item
          }
        })
        if(data.code == '300'){
          this.informorder=data.joborder
          this.$Message.info('无通知信息')
        }
        if(data.code == '500'){
          this.$Message.info('无通知单信息')
        }
      })
    },
    // 时间筛选变化
    updateByTime (val) {
      this.searchTimes=val
      let starttime=new Date(this.searchTimes[0]).getTime();
      let endtime=new Date(this.searchTimes[1]).getTime();
      this.informlist=this.Theinformlist.map(item => {
        return {
          ...item
        }
      })
      this.informlist=this.informlist.filter(item => {
        let createTimestap=new Date(item.createTime).getTime()
        return createTimestap>=starttime && createTimestap<=endtime
      })
    },
    // 时间清除
    clearByTime(){
      this.Theinformlist.forEach((item,index) => {
        this.$set(this.informlist,index,{...item})
      })
      console.log("变化的：",this.informlist)
      console.log("固定的：",this.Theinformlist)
    },
    // 列表滚动条加载
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          const last =this.informlist[this.informlist.length-1]
          for(let i=1;i<this.informlist.length+1;i++){
            this.informlist.push(last+i)
          }
          resolve()
        },2000)
      })
    },
    // 通知详情(管理员)
    adminGetInformDetail (name) {
      this.informdetail=name
      // 管理员（发送者id+通知id=接收者id=>接收者姓名）
      getalljoborder({sentUserId: this.$store.state.userId, informId: name.informId}).then(data => {
        if(data.code == '200'){
          this.sentUsers=data.users.map(item => item.name)
          this.informDetailModal=true
        }
        if(data.code == '500') {
          this.$Message.error('无法获取通知单信息')
        }
      })
    },
    adminCancelInformDetail () {
      this.informDetailModal=false
    },
    // 通知详情（用户）
    userGetInformDetail (name) {
      this.informdetail=name
      // 用户（接受者id+通知id=接收者id=>接收者姓名）
      getalljoborder({userId: this.$store.state.userId, informId: name.informId}).then(data => {
        if(data.code == '200'){
          this.sentUser=data.users.name
          this.otherInformDetailModal=true
        }
        if(data.code == '500') {
          this.$Message.error('无法获取通知单信息')
        }
      })
    },
    userCancelInformDetail () {
      this.otherInformDetailModal=false
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
</style>
