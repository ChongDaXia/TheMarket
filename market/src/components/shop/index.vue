<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">
            <!-- 添加新店铺功能 -->
            <TabPane label="添加" name="name1">
                <!-- 添加新店铺 -->
                <div class="formtext">
                    <div class="formtitle">
                        门店新建表单
                    </div>
                    <Form 
                        ref="newStoreRef" 
                        :model="newStoreForm" 
                        :rules="newStoreRules" 
                        :label-width="80">
                        <FormItem label="编号" prop="storeNo">
                            <Input v-model="newStoreForm.storeNo" placeholder="请输入门店编号" />
                        </FormItem>
                        <FormItem label="租赁状态" prop="rentStatus" style="text-align:left">
                            <RadioGroup v-model="newStoreForm.rentStatus">
                                <Radio label='0'><span>未出租</span></Radio>
                                <Radio label='1' disabled><span>已出租</span></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="面积" prop="area" style="text-align:left">
                            <Input v-model="newStoreForm.area" style="width:100px;margin-right:10px" />
                            <span>平方米</span>
                        </FormItem>
                        <FormItem label="地址" prop="address">
                            <Input 
                                type="textarea" 
                                v-model="newStoreForm.address" 
                                placeholder="请输入门店详细地址" 
                                :autosize="{minRows: 2,maxRows: 5}" />
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="resetAdd('newStoreRef')">重置</Button>
                            <Button class="login-btn" shape="circle" @click="submitAddStore('newStoreRef')">添加</Button>
                        </div>
                    </Form>
                </div>
                <Modal 
                    v-model="newStoreModal" 
                    title="确认提示" 
                    @on-ok="resubmitAddStore" 
                    @on-cancel="cancelAddStore">
                    <p>是否确认保存该门店？</p>
                </Modal>
            </TabPane>

            <!-- 门店列表 -->
            <TabPane label="列表" name="name2">
                <div class="header">
                    <!-- 搜索条件 -->
                    <Select 
                        v-model="selectStoreId"
                        @on-change="changeSelectStoreId"
                        style="width:200px;margin-right:30px" 
                        placeholder="请选择店铺编号" >
                        <Option v-for="(item,index) in TheselectStoreList" :value="item.storeId" :key="index">
                            {{item.storeNo}}
                        </Option>
                    </Select>
                </div>
                <!-- 数据列表 -->
                <div class="content">
                    <Table 
                        height="400" 
                        stripe 
                        :loading="listloading"
                        :columns="tableTitle" 
                        :data="selectStoreList" >
                        <template slot-scope="{row,index}" slot="action">
                            <Button icon="md-open" @click="showStoreDetail(row,index)" ></Button>
                            <Button @click="addStoreUser(row,index)" v-if="row.rentStatus == '未租出'">添加租户</Button>
                            <Button @click="updateStoreUser(row,index)" v-if="row.rentStatus == '已租出'">修改租户</Button>
                        </template>
                    </Table>
                </div>
                <!-- 信息详情 -->
                <Modal 
                    v-model="selectStoreDetailModal" 
                    :mask-closable="false" 
                    :footer-hide="true" >
                    <p class="modaltitle">
                        <span>基本信息</span>
                    </p>
                    <Form 
                        ref="storeDetailRef" 
                        :model="selectStoreDetailForm" 
                        :rules="selectStoreDetailRule" 
                        :label-width="80" >
                        <FormItem label="门店ID" prop="storeId">
                            <Input v-model="selectStoreDetailForm.storeId" disabled />
                        </FormItem>
                        <FormItem label="编号" prop="storeNo">
                            <Input v-model="selectStoreDetailForm.storeNo" />
                        </FormItem>
                        <FormItem label="租赁状态" prop="rentStatus" style="text-align:left">
                            <RadioGroup v-model="selectStoreDetailForm.rentStatus">
                                <Radio label='0'><span>未出租</span></Radio>
                                <Radio label='1'><span>已出租</span></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="面积" prop="area" style="text-align:left">
                            <Input v-model="selectStoreDetailForm.area" style="width:100px;margin-right:10px"/>
                            <span>平方米</span>
                        </FormItem>
                        <FormItem label="地址" prop="address">
                            <Input 
                                type="textarea" 
                                v-model="selectStoreDetailForm.address" 
                                placeholder="请输入门店详细地址" 
                                :autosize="{minRows: 2,maxRows: 5}"
                            />
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="cancelStoreDetail">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitNewStoreDetail('storeDetailRef')">修改</Button>
                        </div>
                    </Form>
                </Modal>
                <!-- 信息详情二次确认框 -->
                <Modal 
                    v-model="reselectStoreDetailModal" 
                    @on-ok="resubmitNewStoreDetail" 
                    @on-cancel="recancelStoreDetail"
                    title="确认提示" 
                    :mask-closable="false" >
                    <p>是否确认修改该门店信息？</p>
                </Modal>
                <!-- 添加租户 -->
                <Modal 
                    v-model="addRentModal" 
                    :mask-closable="false" 
                    :footer-hide="true" 
                    @on-cancel="canceladdRent">
                    <p class="modaltitle">
                        <span>租赁信息</span>
                    </p>
                    <Form 
                        ref="addRentRef" 
                        :model="addRentForm" 
                        :rules="addRentRule" 
                        :label-width="80" >
                        <FormItem label="租金" prop="rent">
                            <Input v-model="addRentForm.rent" />
                        </FormItem>
                        <FormItem label="租赁人" prop="userId" style="text-align:left">
                            <Button class="login-btn" shape="circle" @click="selectAddUser">选择</Button>
                        </FormItem>
                        <div>租户：{{selectUser.name}}</div>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="canceladdRent">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitNewRent">添加</Button>
                        </div>
                        <!-- 租户选择列表 -->
                        <Modal 
                            v-model="selectUserModal" 
                            :mask-closable="false"  
                            :footer-hide="true"
                            width="400" >
                            <p class="modaltitle">
                                <span>租户</span>
                            </p>
                            <Table 
                                ref="userTableRef" 
                                height="300" border 
                                :columns="userTabletitle" 
                                :data="allSelectUser" 
                                :highlight-row=true
                                @on-current-change="selectUserList" />
                        </Modal>
                    </Form>
                </Modal>
                <!-- 添加租户二次确认框 -->
                <Modal 
                    v-model="readdRentModal" 
                    @on-ok="resubmitNewRent" 
                    @on-cancel="recanceladdRent"
                    title="确认提示" 
                    :mask-closable="false" >
                    <p>是否确认添加该租赁信息？</p>
                </Modal>
                <!-- 修改租户 -->
                <Modal 
                    v-model="updateRentModal" 
                    :mask-closable="false" 
                    :footer-hide="true" 
                    @on-cancel="cancelupdateRent" >
                    <p class="modaltitle">
                        <span>租赁信息</span>
                    </p>
                    <Form 
                        ref="updateRentRef" 
                        :model="updateRentForm" 
                        :rules="updateRentRule" 
                        :label-width="80" >
                        <FormItem label="租金" prop="rent">
                            <Input v-model="updateRentForm.rent" />
                        </FormItem>
                        <FormItem label="租赁人" prop="userId" style="text-align:left">
                            <Button class="login-btn" shape="circle" @click="selectUpdateUser">选择</Button>
                        </FormItem>
                        <div>租户：{{selectUser.name}}</div>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="cancelupdateRent">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitupdateRent()">修改</Button>
                        </div>
                    </Form>
                </Modal>
                <!-- 修改租户二次确认框 -->
                <Modal 
                    v-model="reupdateRentModal" 
                    @on-ok="resubmitupdateRent" 
                    @on-cancel="recancelupdateRent"
                    title="确认提示" 
                    :mask-closable="false" >
                    <p>是否确认修改该租赁信息？</p>
                </Modal>
            </TabPane>

            <!-- 删除门店 -->
            <TabPane label="删除" name="name3">
                <div class="header">
                    <!-- 搜索条件 -->
                    <Select 
                        v-model="selectStoreId"
                        @on-change="changeSelectStoreId"
                        style="width:200px;margin-right:30px" 
                        placeholder="请选择店铺编号" >
                        <Option v-for="(item,index) in TheselectStoreList" :value="item.storeId" :key="index">
                            {{item.storeNo}}
                        </Option>
                    </Select>
                    <Button @click="deleteStore">删除</Button>
                </div>
                <!-- 删除店铺二次确认框 -->
                <Modal 
                    v-model="deleteStoreModal"
                    @on-ok="submitDeleteStore" 
                    @on-cancel="cancelDeleteStore"
                    title="确认提示" 
                    :mask-closable="false" >
                    <p>是否确认删除所选用户？</p>
                </Modal>
                <div class="content">
                    <Table 
                        height="400" 
                        stripe 
                        :loading="listloading"
                        :columns="deleteTableTitle" 
                        :data="selectStoreList"
                        @on-select="selectDeleted"
                        @on-select-cancel="cancelselectDeleted"
                        @on-select-all="selectDeleted"
                        @on-select-all-cancel="cancelselectDeleted" >
                        <template slot-scope="{row,index}" slot="action">
                            <Button @click="remoteStoreUser(row,index)" v-if="row.rentStatus == '已租出'">移除租户</Button>
                        </template>
                    </Table>
                </div>
                <!-- 删除用户二次确认框 -->
                <Modal 
                    v-model="removeUserModal"
                    @on-ok="submitRemoveUser" 
                    @on-cancel="cancelRemoveUser"
                    title="确认提示" 
                    :mask-closable="false" >
                    <p>是否确认移除该店铺租户？</p>
                </Modal>
            </TabPane>
        </Tabs>

        <!-- <vue-particles 
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
        </vue-particles> -->
    </div>
</template>

<script>
import {getAllUser} from '@/http/moudules/user'
import {addnewstore,getStoreRent,deleteOneStore,updateStore,saveNewRent,updateRent,deleteRent} from '@/http/moudules/store'
export default {
  data() {
    return {
      // 添加新门店
      newStoreForm: {
        storeNo: '',
        rentStatus: '0',
        area: '',
        address: ''
      },
      // 添加新门店表单验证
      newStoreRules: {
        storeNo: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[A-Za-z0-9]{2,10}$/,
          message: '仅支持2-10位大小写字母或数字'
        }],
        rentStatus: [{
          required: true,
          trigger: 'blur, change',
          message: '请选择租赁状态'
        }],
        area: [{
          trigger: 'blur, change',
          pattern:/^[0-9]\d*|[0-9]\d*\.\d*$/,
          message: '格式错误'
        }],
        address: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，。,.\x22]$/,
          message: '格式错误'
        }]
      },
      // 添加新门店二次确认框
      newStoreModal: false,
      // 编号筛选（店铺Id）
      selectStoreId: '',
      // 变化的所有店铺
      selectStoreList: [],
      // 固定的所有店铺
      TheselectStoreList: [],
      // 表格加载
      listloading: false,
      // 表格表头
      tableTitle: [
        {
          title: '店铺ID',
          key: 'storeId',
          width: 80,
          align: 'center'
        }, {
          title: '店铺编号',
          key: 'storeNo',
          align: 'center'
        }, {
          title: '面积（平方米）',
          key: 'area',
          align: 'center',
          sortable: true
        }, {
          title: '地址',
          key: 'address',
          align: 'center'
        }, {
          title: '租赁状态',
          key: 'rentStatus',
          align: 'center',
          filters: [
            {
              label: '未租出',
              value: 1
            },
            {
              label: '已租出',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value,row) {
            if(value === 1){
              return row.rentStatus == '未租出'
            } else if (value === 2) {
              return row.rentStatus == '已租出'
            }
          }
        }, {
          title: '租金（元/月）',
          key: 'rent',
          align: 'center',
          sortable: true
        }, {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      // 门店信息详情
      selectStoreDetailForm: {
        storeId: '',
        storeNo: '',
        rentStatus: '',
        area: '',
        address: ''
      },
      // 门店信息详情校验
      selectStoreDetailRule: {
        storeNo: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[A-Za-z0-9]{2,10}$/,
          message: '仅支持2-10位大小写字母或数字'
        }],
        rentStatus: [{
          required: true,
          trigger: 'blur, change',
          message: '请选择租赁状态'
        }],
        area: [{
          trigger: 'blur, change',
          pattern:/^[0-9]\d*|[0-9]\d*\.\d*$/,
          message: '格式错误'
        }],
        address: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，。,.\x22]$/,
          message: '格式错误'
        }]
      },
      // 门店信息详情弹框
      selectStoreDetailModal: false,
      // 门店信息二次确认弹框
      reselectStoreDetailModal: false,
      // 新增租户数据
      addRentForm: {
        storeId: '',
        userId: '',
        rent: ''
      },
      // 新增租户数据校验
      addRentRule: {
        userId:[{
          required: true,
          message: '请选择租户'
        }],
        rent: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[0-9]\d*|[0-9]\d*\.\d*$/,
          message: '格式错误'
        }]
      },
      // 新增租户弹框
      addRentModal:false,
      // 新增租户二次确认框
      readdRentModal: false,
      // 修改租户数据
      updateRentForm: {
        rentId: '',
        storeId: '',
        userId: '',
        rent: ''
      },
      // 修改租户数据校验
      updateRentRule: {
        userId:[{
          required: true,
          message: '请选择租户'
        }],
        rent: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[0-9]\d*|[0-9]\d*\.\d*$/,
          message: '格式错误'
        }]
      },
      // 修改租户弹框
      updateRentModal: false,
      // 租户选择弹框
      selectUserModal: false,
      // 租户选择二次确认框
      reupdateRentModal: false,
      // 租户选择表格表头
      userTabletitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: '租户',
          key: 'name',
          align: 'center',
        }
      ],
      // 租户选择表格数据
      allSelectUser: [],
      // 选择租户
      selectUser: '',
      // 移除租户弹框
      removeUserModal: false,
      // 修改租户数据
      removeRentForm: {
        rentId: '',
        storeId: '',
        userId: '',
        rent: ''
      },
      // 删除表头
      deleteTableTitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '店铺ID',
          key: 'storeId',
          align: 'center'
        }, {
          title: '店铺编号',
          key: 'storeNo',
          align: 'center'
        }, {
          title: '面积（平方米）',
          key: 'area',
          align: 'center',
          sortable: true
        }, {
          title: '地址',
          key: 'address',
          align: 'center'
        }, {
          title: '租赁状态',
          key: 'rentStatus',
          align: 'center',
          filters: [
            {
              label: '未租出',
              value: 1
            },
            {
              label: '已租出',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value,row) {
            if(value === 1){
              return row.rentStatus == '0'
            } else if (value === 2) {
              return row.rentStatus == '1'
            }
          }
        }, {
          title: '租金（元/月）',
          key: 'rent',
          align: 'center',
          sortable: true
        }, {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      // 删除店铺二次确认框
      deleteStoreModal: false,
      // 删除店铺列表
      deleteStoreListId: []
    }
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name2'){
        this.selectStoreId = ''
        this.getAllStoreInfo() 
        this.getAllUserInfo()
      }
      if(name === 'name3'){
        this.selectStoreId = ''
        this.getAllStoreInfo() 
      }
    },
    // 添加新门店按钮
    submitAddStore (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.newStoreModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 重置按钮
    resetAdd(name) {
      this.$refs[name].resetFields()
    },
    // 添加新门店二次确认框确认按钮
    resubmitAddStore () {
      addnewstore(this.newStoreForm).then(data => {
        if(data.code == '200'){
          this.newStoreModal=false
          this.$Message.info('新门店添加成功')
          this.$refs['newStoreRef'].resetFields()
        }
        if(data.code == '500') {
          this.$Message.error('新门店添加失败')
        }
      })
    },
    // 添加新门店二次确认框取消按钮
    cancelAddStore () {
      this.newStoreModal=false
      this.$Message.info('取消添加新门店')
    },
    // 获取所有门店信息
    getAllStoreInfo() {
      this.listloading=true
      getStoreRent().then(data => {
        if(data.code == '200'){
          this.TheselectStoreList = data.stores;
          let StoreRent = data.rents;
          this.TheselectStoreList.forEach((i,index) => {
            StoreRent.forEach(item => {
              if(i.storeId == item.storeId){
                i['rent']=item.rent
                i['rentId']=item.rentId
                i['userId']=item.userId
              }
            })
            if(i.rentStatus==0){
              i['rentStatus']='未租出'
            }else if(i.rentStatus==1){
              i['rentStatus']='已租出'
            }
          })
          this.selectStoreList=this.TheselectStoreList.map(item => {
            return {
              ...item
            }
          })
          this.listloading=false
        }
        if(data.code == '300') {
          this.TheselectStoreList = data.stores;
          this.TheselectStoreList.forEach(i => {
            if(i.rentStatus==0){
              i['rentStatus']='未租出'
            }else if(i.rentStatus==1){
              i['rentStatus']='已租出'
            }
          })
          this.selectStoreList=this.TheselectStoreList.map(item => {
            return {
              ...item
            }
          })
        }
        if(data.code == '500') {
          this.$Message.info('无门店信息')
        }
      })
    },
    // 店铺编号筛选
    changeSelectStoreId() {
      let selectList=this.TheselectStoreList.filter(item => item.storeId == this.selectStoreId)
      this.selectStoreList=selectList
    },
    // 店铺信息详情
    showStoreDetail(row,index) {
      this.selectStoreDetailForm=JSON.parse(JSON.stringify(row))
      if(this.selectStoreDetailForm.rentStatus == 0){
        this.selectStoreDetailForm.rentStatus='0'
      }else{
        this.selectStoreDetailForm.rentStatus='1'
      }
      this.selectStoreDetailModal=true
    },
    // 门店信息详情修改
    submitNewStoreDetail(name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.reselectStoreDetailModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 取消门店信息详情修改
    cancelStoreDetail() {
      this.$refs['storeDetailRef'].resetFields()
      this.selectStoreDetailModal=false
    },
    // 门店信息详情修改二次确认
    resubmitNewStoreDetail() {
      updateStore(this.selectStoreDetailForm).then(data => {
        if(data.code == '200'){
          this.reselectStoreDetailModal=false
          this.$Message.info('门店信息修改成功')
          this.selectStoreDetailModal=false
          this.getAllStoreInfo()
        }
        if(data.code == '500') {
          this.$Message.error('门店信息修改失败')
        }
      })
    },
    // 取消门店信息详情修改二次确认
    recancelStoreDetail() {
      this.reselectStoreDetailModal=false
      this.$Message.info('取消修改门店信息')
    },
    // 添加租户
    addStoreUser(row,index) {
      this.addRentModal=true
      this.$refs['addRentRef'].resetFields()
      this.selectUser=''
      this.allSelectUser.forEach(item => item['_highlight'] = false)
      this.addRentForm.storeId=row.storeId
    },
    // 修改租户
    updateStoreUser(row,index){
      this.updateRentModal=true
      this.updateRentForm=JSON.parse(JSON.stringify(row))
      this.allSelectUser.forEach(item => {
        if(item.userId === row.userId) {
          item['_highlight'] = true
          this.selectUser=item
        }else{
          item['_highlight'] = false
        }
      })
    },
    // 获取所有租户
    getAllUserInfo() {
      getAllUser({role: '用户'}).then(data => {
        if(data.code == '200'){
          this.allSelectUser = data.users;
        }
        if(data.code == '500') {
          this.$Message.info('无用户信息')
        }
      })
    },
    // 选择租户按钮
    selectAddUser() {
      this.selectUserModal=true
    },
    // 更新租户按钮
    selectUpdateUser() {
      this.selectUserModal=true
    },
    // 选择租户
    selectUserList(currentRow, oldCurrentRow) {
      if(currentRow){
        this.allSelectUser.forEach(item => {
          if(item.userId === currentRow.userId) {
            item['_highlight'] = true
            this.selectUser=item
          }else{
            item['_highlight'] = false
          }
        })
        this.selectUserModal=false
      }
    },
    // 添加租户确认
    submitNewRent() {
      this.addRentForm.userId=this.selectUser.userId
      this.$refs['addRentRef'].validate(valid => {
        if(valid){
          this.readdRentModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 取消添加租户确认
    canceladdRent() {
      this.addRentModal=false
      this.$refs['addRentRef'].resetFields()
      this.selectUser=''
    },
    // 添加租户二次确认
    resubmitNewRent() {
      saveNewRent(this.addRentForm).then(data => {
        if(data.code == '200'){
          this.readdRentModal=false
          this.$Message.info('该租户信息添加成功')
          this.addRentModal=false
          this.getAllStoreInfo()
        }
        if(data.code == '500'){
          this.$Message.error('租户信息添加失败')
        }
      })
    },
    // 取消添加租户二次确认
    recanceladdRent() {
      this.readdRentModal=false
      this.$Message.info('取消租户信息添加')
    },
    // 修改租户确认
    submitupdateRent() {
      this.updateRentForm.userId=this.selectUser.userId
      this.$refs['updateRentRef'].validate(valid => {
        if(valid){
          this.reupdateRentModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 取消修改租户确认
    cancelupdateRent() {
      this.updateRentModal=false
      this.$refs['updateRentRef'].resetFields()
      this.selectUser=''
    },
    // 修改租户二次确认
    resubmitupdateRent() {
      updateRent(this.updateRentForm).then(data => {
        if(data.code == '200'){
          this.reupdateRentModal=false
          this.$Message.info('该租户信息修改成功')
          this.updateRentModal=false
          this.getAllStoreInfo()
        }
        if(data.code == '500'){
          this.$Message.error('租户信息修改失败')
        }
      })
    },
    // 取消修改租户二次确认
    recancelupdateRent() {
      this.reupdateRentModal=false
      this.$Message.info('取消租户信息添加')
    },
    // 表格选择
    selectDeleted(selection, row) {
      // 全选
      if (!row && selection && selection.length > 0) {
        this.TheselectStoreList.forEach(item => {
          item['_checked'] = true
        })
      } else {
        // 单选
        this.TheselectStoreList.forEach(item => {
          if(item.storeId === row.storeId) {
            item['_checked'] = true
          }
        })
      }
    },
    // 表格取消选择
    cancelselectDeleted(selection, row) {
      // 全不选
      if (!row && selection && selection.length == 0) {
        this.TheselectStoreList.forEach(item => {
          item['_checked'] = false
        })
      } else {
        // 单不选
        this.TheselectStoreList.forEach(item => {
          if(item.storeId === row.storeId) {
            item['_checked'] = false
          }
        })
      }
    },
    // 表格删除
    deleteStore() {
      this.deleteStoreModal=true
    },
    // 店铺删除二次确认框
    submitDeleteStore() {
      let list=this.TheselectStoreList.filter(item => item['_checked'])
      let tempList=[]
      list.forEach(item => {
          tempList.push({
            ...item
          })
      })
      this.deleteStoreListId=tempList.map(item => item.storeId)
      deleteOneStore({storeId: JSON.stringify(this.deleteStoreListId)}).then(data => {
        if(data.code == '200'){
          this.deleteStoreModal=false
          this.$Message.info('店铺删除成功')
          this.getAllStoreInfo()
        }
        if(data.code == '500') {
          this.$Message.info('无删除店铺')
        }
      })
    },
    // 取消店铺删除二次确认框
    cancelDeleteStore() {
      this.deleteStoreModal=false
      this.$Message.info('取消删除店铺及租户信息')
    },
    // 移除租户
    remoteStoreUser(row,index) {
      this.removeUserModal=true
      this.removeRentForm=JSON.parse(JSON.stringify(row))
    },
    // 移除租户二次确认
    submitRemoveUser() {
      deleteRent(this.removeRentForm).then(data => {
        if(data.code == '200'){
          this.removeUserModal=false
          this.$Message.info('租户信息移除成功')
          this.getAllStoreInfo()
        }
        if(data.code == "500") {
          this.$Message.error('租户信息移除失败')
        }
      })
    },
    // 取消移除租户二次确认
    cancelRemoveUser() {
      this.removeUserModal=false
      this.$Message.info('取消移除该店铺租户信息')
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
.formtitle{
  height: 80px;
  font-size: 20px;
  text-align: center;
}
.formtext{
  width: 50%;
  margin: 50px auto;
  padding: 30px;
  box-shadow: 0 4px 50px rgba(80, 80, 80, 0.15);
}
.form-item{
  text-align: center;
}
.login-btn{
  margin: 0 20px;
}
.header{
  width: 100%;
  height: 50px;
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
  padding: 40px 50px;
}
/deep/ .ivu-table{
  border-radius: 5px;
}
/deep/ .ivu-table th{
  background-color: #66a9c9;;
  color: #ffffff;
}
/deep/ .ivu-table-border th{
  border-right: 1px solid #66a9c9;
}
/deep/ .ivu-table-wrapper{
  box-shadow: 0 4px 50px rgba(80, 80, 80, 0.15);
  border-radius: 10px;
}
/deep/ .ivu-table:after{
  background-color: #f0faff;
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
/deep/ .ivu-tabs-nav .ivu-tabs-tab{
  margin-left: 20px;
  margin-right: 0px;
  font-size: 16px;
  line-height: 2;
}
/deep/ .ivu-tabs-ink-bar{
  margin-left: 20px;
  height: 3px;
}
</style>
