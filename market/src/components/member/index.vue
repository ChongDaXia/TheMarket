<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">
            <!-- 添加会员功能 -->
            <TabPane label="添加" name="name1">
                <div class="formtext">
                    <Form 
                        ref="newMemberRef" 
                        :model="newMemberForm" 
                        :rules="newMemberRules" 
                        :label-width="80" >
                        <FormItem label="姓名" prop="name">
                            <Input v-model="newMemberForm.name" placeholder="仅支持2-20位大小写字母或数字、中文"></Input>
                        </FormItem>
                        <FormItem label="性别" prop="sex" style="text-align:left">
                            <RadioGroup v-model="newMemberForm.sex">
                                <Radio label="女"></Radio>
                                <Radio label="男"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="联系电话" prop="mobileNo">
                            <Input v-model="newMemberForm.mobileNo" placeholder="请输入11位数字"></Input>
                        </FormItem>
                        <FormItem label="积分" prop="integration" style="text-align:left">
                            <Input v-model="newMemberForm.integration" style="width:100px;margin-right:10px"></Input>
                            <span>积分</span>
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="resetAdd('newMemberRef')">重置</Button>
                            <Button class="login-btn" shape="circle" @click="submitAddMember('newMemberRef')">添加</Button>
                        </div>
                        <Modal 
                            v-model="addMemberModal" 
                            title="确认提示" 
                            @on-ok="resubmitAddMember" 
                            @on-cancel="cancelAddMember" >
                            <p>是否确认保存该会员？</p>
                        </Modal>
                    </Form>
                    </div>
            </TabPane>

            <!-- 会员列表 -->
            <TabPane label="列表" name="name2">
                <div class="header">
                    <!-- 搜索条件 -->
                    <Select 
                        v-model="selectMemberId"
                        @on-change="changeSelectMemberId"
                        style="width:200px;margin-right:30px" 
                        placeholder="请选择姓名" >
                        <Option v-for="(item,index) in TheSelectMemberList" :value="item.memberId" :key="index">
                            {{item.name}}
                        </Option>
                    </Select>
                </div>
                <!-- 数据列表 -->
                <div class="content">
                    <Table 
                        height="400" 
                        border 
                        stripe 
                        :columns="tableTitle" 
                        :data="selectMemberList" >
                        <template slot-scope="{row,index}" slot="action">
                          <Button icon="md-open" @click="memberDetail(row,index)" ></Button>
                        </template>
                    </Table>
                </div>
                <!-- 数据详情 -->
                <Modal 
                    v-model="memberDetailModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    @on-cancel="cancelUpdateMember"
                    width="400" >
                    <p class="modaltitle">
                        <span>会员信息</span>
                    </p>
                    <Form 
                        ref="memberDetailRef" 
                        :model="memberDetailForm" 
                        :rules="memberDetailRules" 
                        :label-width="80" >
                        <FormItem label="姓名" prop="name">
                            <Input v-model="memberDetailForm.name" placeholder="仅支持2-20位大小写字母或数字、中文"></Input>
                        </FormItem>
                        <FormItem label="性别" prop="sex" style="text-align:left">
                            <RadioGroup v-model="memberDetailForm.sex">
                                <Radio label="女"></Radio>
                                <Radio label="男"></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="联系电话" prop="mobileNo">
                            <Input v-model="memberDetailForm.mobileNo" placeholder="请输入11位数字"></Input>
                        </FormItem>
                        <FormItem label="积分" prop="integration" style="text-align:left">
                            <Input v-model="memberDetailForm.integration" style="width:100px;margin-right:10px"></Input>
                            <span>积分</span>
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="cancelUpdateMember">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitUpdateMember('memberDetailRef')">修改</Button>
                        </div>
                    </Form>
                </Modal>
                <!-- 修改会员信息二次确认框 -->
                <Modal 
                    v-model="rememberDetailModal" 
                    :mask-closable="false" 
                    title="确认提示" 
                    @on-ok="resubmitUpdateMember" 
                    @on-cancel="recancelUpdateMember" >
                    <p>是否确认修改该会员信息？</p>
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
import {addnewmember,getAllMember,updatemember} from '@/http/moudules/member'
export default {
  data() {
    return {
      // 添加新会员
      newMemberForm: {
        name: '',
        sex: '',
        mobileNo: '',
        integration: '',
        userId: this.$store.state.userId
      },
      newMemberRules: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母、数字、中文'
        }],
        sex: [{
          required: true,
          trigger: 'blur, change',
          message: '请选择性别'
        }],
        mobileNo: [{
          trigger: 'blur, change',
          pattern:/^\d{11}$/,
          message: '仅支持11位数字'
        }],
        integration: [{
          trigger: 'blur, change',
          pattern:/^[0-9]*$/,
          message: '请输入数字'
        }]
      },
      // 添加新会员二次确认框
      addMemberModal: false,
      // 筛选会员姓名
      selectMemberId: '',
      // 表格表头
      tableTitle: [
        {
          title: '会员ID',
          key: 'memberId'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex'
        },
        {
          title: '联系电话',
          key: 'mobileNo'
        },
        {
          title: '积分',
          key: 'integration'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      // 会员表格变化数据
      selectMemberList: [],
      // 表格固定数据
      TheSelectMemberList: [],
      // 信息详情弹框
      memberDetailModal: false,
      rememberDetailModal: false,
      // 详情数据
      memberDetailForm: {
        name: '',
        sex: '',
        mobileNo: '',
        integration: 0,
        userId: this.$store.state.userId
      },
      // 详情数据校验
      memberDetailRules: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母、数字、中文'
        }],
        sex: [{
          required: true,
          trigger: 'blur, change',
          message: '请选择性别'
        }],
        mobileNo: [{
          trigger: 'blur, change',
          pattern:/^\d{11}$/,
          message: '仅支持11位数字'
        }],
        integration: [{
          trigger: 'blur, change',
          pattern:/^[0-9]*$/,
          message: '请输入数字'
        }]
      }
    }
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name2'){
        this.getAllMemberInfo()
        this.selectMemberId=''
      }
    },
    // 添加新会员
    submitAddMember (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.addMemberModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 重置
    resetAdd (name) {
      this.$refs[name].resetFields()
    },
    // 添加新会员二次确认
    resubmitAddMember () {
      addnewmember(this.newMemberForm).then(data => {
        if(data.code == '200'){
          this.addMemberModal=false
          this.$Message.info('新会员添加成功')
          this.$refs['newMemberRef'].resetFields()
        }
        if(data.code == '500') {
          this.$Message.error('新员工添加失败')
        }
      })
    },
    // 取消添加新会员二次确认
    cancelAddMember () {
      this.addMemberModal=false
      this.$Message.info('取消添加新会员')
    },
    // 获取所有会员信息
    getAllMemberInfo() {
      getAllMember({userId: this.$store.state.userId}).then(data => {
        if(data.code == '200'){
          this.TheSelectMemberList=data.members
          this.selectMemberList=this.TheSelectMemberList.map(item => {
            return {
                ...item
            }
          })
        }
        if(data.code == '500') {
          this.$Message.info('无会员信息')
        }
      })
    },
    // 姓名筛选
    changeSelectMemberId() {
      let selectList=this.TheSelectMemberList.filter(item => item.memberId == this.selectMemberId)
      this.selectMemberList=selectList
    },
    // 获取会员详情
    memberDetail(row,index) {
      this.memberDetailForm=JSON.parse(JSON.stringify(row))
      this.memberDetailModal=true
    },
    // 信息详情确认
    submitUpdateMember(name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.rememberDetailModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 信息详情取消
    cancelUpdateMember() {
      this.memberDetailModal=false
      this.$refs['memberDetailRef'].resetFields()
    },
    // 信息详情二次确认
    resubmitUpdateMember() {
      updatemember(this.memberDetailForm).then(data => {
        if(data.code == '200'){
          this.rememberDetailModal=false
          this.$Message.info('该会员信息更新成功')
          this.memberDetailModal=false
          this.getAllMemberInfo()
        }
        if(data.code == '500'){
          this.$Message.error('会员信息更新失败')
        }
      })
    },
    // 取消信息详情二次确认
    recancelUpdateMember() {
      this.rememberDetailModal=false
      this.$Message.info('取消会员信息修改')
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
  height: 50px;;
  padding-left: 50px;
  padding-top: 20px;
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
  padding: 30px 50px;
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