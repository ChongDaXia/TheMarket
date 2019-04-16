<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle">
            <!-- 添加新店铺功能 -->
            <TabPane label="添加">
                <!-- 添加新店铺 -->
                <div class="formtext">
                    <Form 
                        ref="newStoreRef" 
                        :model="newStoreForm" 
                        :rules="newStoreRules" 
                        :label-width="80"
                    >
                        <FormItem label="编号" prop="storeNo">
                            <Input 
                                v-model="newStoreForm.storeNo" 
                                placeholder="请输入门店编号" 
                                icon="ios-clock-outline"
                            />
                        </FormItem>
                        <FormItem label="租赁状态" prop="rentStatus" style="text-align:left">
                            <RadioGroup v-model="newStoreForm.rentStatus">
                                <Radio label='0'><span>未出租</span></Radio>
                                <Radio label='1'><span>已出租</span></Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="面积" prop="area" style="text-align:left">
                            <Input 
                                v-model="newStoreForm.area" 
                                style="width:100px;margin-right:10px"
                            />
                            <span>平方米</span>
                        </FormItem>
                        <FormItem label="地址" prop="address">
                            <Input 
                                type="textarea" 
                                v-model="newStoreForm.address" 
                                placeholder="请输入门店详细地址" 
                                :autosize="{minRows: 2,maxRows: 5}"
                            />
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
            <TabPane label="列表">
                <div class="header">
                    <!-- 搜索条件 -->
                    <Select 
                        v-model="selectStoreStatus" 
                        @on-change="changeSelectStoreStatus"
                        style="width:200px;margin-right:30px" 
                        placeholder="请选择租赁状态"
                    >
                        <Option v-for="(item,index) in selectStoreStatusList" :value="item" :key="index">
                            {{item}}
                        </Option>
                    </Select>
                    <Select 
                        v-model="selectStoreId"
                        @on-change="changeSelectStoreId"
                        style="width:200px;margin-right:30px" 
                        placeholder="请选择店铺编号"
                    >
                        <Option v-for="(item,index) in selectStoreIdList" :value="item.storeId" :key="index">
                            {{item.storeNo}}
                        </Option>
                    </Select>
                </div>
                <!-- 数据列表 -->
                <div class="content">
                    <Table 
                        height="330" 
                        border 
                        stripe 
                        :columns="tableTitle" 
                        :data="selectStoreList"
                    />
                </div>
                <!-- 信息详情 -->
                <Modal 
                    v-model="selectStoreDetailModal" 
                    :mask-closable="false" 
                    :footer-hide="true"
                >
                    <p class="modaltitle">
                        <span>基本信息</span>
                    </p>
                    <Form 
                        ref="storeDetailRef" 
                        :model="selectStoreDetailForm" 
                        :rules="selectStoreDetailRule" 
                        :label-width="80"
                    >
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
                    :mask-closable="false" 
                >
                    <p>是否确认修改该门店信息？</p>
                </Modal>
            </TabPane>

            <!-- 删除门店 -->
            <TabPane label="删除">
                <Button @click="deleteStore" style="margin: 10px 50px;">删除</Button>
                <!-- 删除用户二次确认框 -->
                <Modal 
                    v-model="deleteStoreModal"
                    @on-ok="submitDeleteStore" 
                    @on-cancel="cancelDeleteStore"
                    title="确认提示" 
                    :mask-closable="false" 
                >
                    <p>是否确认删除所选用户？</p>
                </Modal>
                <div class="content">
                    <Table 
                        height="330" 
                        border 
                        stripe 
                        :columns="deleteTableTitle" 
                        :data="selectStoreList"
                        @on-select="selectDeleted"
                        @on-select-cancel="cancelselectDeleted"
                        @on-select-all="selectDeleted"
                        @on-select-all-cancel="cancelselectDeleted"
                    />
                </div>
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
import {addnewstore,getAllStore,getOneStore,getAllRent,getOneRent,getStoreRent,deleteOneStore,updateStore} from '@/http/moudules/store'
export default {
  mounted() {
    this.getAllStoreInfo()
  },
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
      // 租赁状态筛选
      selectStoreStatus: '',
      selectStoreStatusList: [
        '所有店铺',
        '已租出',
        '未租出'
      ],
      // 编号筛选（店铺Id）
      selectStoreId: '',
      selectStoreIdList: [],
      // 所有店铺
      selectStoreList: [],
      // 表格表头
      tableTitle: [
        {
          title: '店铺ID',
          key: 'storeId'
        }, {
          title: '店铺编号',
          key: 'storeNo'
        }, {
          title: '面积（平方米）',
          key: 'area'
        }, {
          title: '地址',
          key: 'address'
        }, {
          title: '租赁状态',
          key: 'rentStatus'
        }, {
          title: '租金（元/月）',
          key: 'rent'
        }, {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h,params) => {
            return h('div',[
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showStoreDetail(params.index)
                  }
                }
              }, '信息修改'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.addStoreUser(params.index)
                  }
                }
              }, '添加租户')
            ])           
          }
        }
      ],
      // 门店信息详情
      selectStoreDetailForm: {
        storeId: '',
        storeNo: '',
        rentStatus: '0',
        area: '',
        address: ''
      },
      // 门店信息详情弹框
      selectStoreDetailModal: false,
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
      // 门店信息二次确认弹框
      reselectStoreDetailModal: false,
      // 删除表头
      deleteTableTitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '店铺ID',
          key: 'storeId'
        }, {
          title: '店铺编号',
          key: 'storeNo'
        }, {
          title: '面积（平方米）',
          key: 'area'
        }, {
          title: '地址',
          key: 'address'
        }, {
          title: '租赁状态',
          key: 'rentStatus'
        }, {
          title: '租金（元/月）',
          key: 'rent'
        }
      ],
      // 删除店铺二次确认框
      deleteStoreModal: false,
      // 删除店铺列表
      deleteStoreListId: []
    }
  },

  methods: {
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
    // 添加新门店二次确认框确认按钮
    resubmitAddStore () {
      addnewstore(this.newStoreForm).then(data => {
        if(data.code == '200'){
          this.newStoreModal=false
          this.$Message.info('新门店添加成功')
          this.$refs['newStoreRef'].resetFields()
          this.getAllStoreInfo()
        }
        if(data.code == '500') {
          this.$Message.error('新门店添加失败')
        }
      })
    },
    // 重置按钮
    resetAdd(name) {
      this.$refs[name].resetFields()
    },
    // 添加新门店二次确认框取消按钮
    cancelAddStore () {
      this.newStoreModal=false
      this.$Message.info('取消添加新门店')
    },
    // 获取所有门店信息
    getAllStoreInfo() {
      getStoreRent().then(data => {
        if(data.code == '200'){
          this.selectStoreList = data.stores;
          this.selectStoreIdList = data.stores;
          let StoreRent = data.rents;
          this.selectStoreList.forEach((i,index) => {
            StoreRent.forEach(item => {
              if(i.storeId == item.storeId){
                i.push(item.rent)
              }
            })
          })
        }
        if(data.code == '300') {
          this.selectStoreList = data.stores;
          this.selectStoreIdList = data.stores;
        }
        if(data.code == '500') {
          this.selectStoreList = []
          this.$Message.info('无门店信息')
        }
      })
    },
    // 租赁状态筛选
    changeSelectStoreStatus() {
      if (this.selectStoreStatus === '所有店铺') {
        this.getAllStoreInfo()
      } 
      if (this.selectStoreStatus === '已租出'){
        getStoreRent({rentStatus: '1'}).then(data => {
          if(data.code == '200'){
            this.selectStoreList = data.stores;
            let StoreRent = data.rents;
            this.selectStoreList.forEach((i,index) => {
              StoreRent.forEach(item => {
                if(i.storeId == item.storeId){
                  i.push(item.rent)
                }
              })
            })
          }
          if(data.code == '300') {
            this.selectStoreList = data.stores;
          }
          if(data.code == '500') {
            this.selectStoreList = []
            this.$Message.info('无门店信息')
          }
        })
      }
      if (this.selectStoreStatus === '未租出') {
        getStoreRent({rentStatus: '0'}).then(data => {
          if(data.code == '200'){
            this.selectStoreList = data.stores;
            let StoreRent = data.rents;
            this.selectStoreList.forEach((i,index) => {
              StoreRent.forEach(item => {
                if(i.storeId == item.storeId){
                  i.push(item.rent)
                }
              })
            })
          }
          if(data.code == '300') {
            this.selectStoreList = data.stores;
          }
          if(data.code == '500') {
            this.selectStoreList = []
            this.$Message.info('无门店信息')
          }
        })
      }
    },
    // 店铺编号筛选
    changeSelectStoreId() {
      getStoreRent({storeId: this.selectStoreId}).then(data => {
        if(data.code == '200'){
          this.selectStoreList = data.stores;
          let StoreRent = data.rents;
          this.selectStoreList.forEach((i,index) => {
            StoreRent.forEach(item => {
              if(i.storeId == item.storeId){
                i.push(item.rent)
              }
            })
          })
        }
        if(data.code == '300') {
          this.selectStoreList = data.stores;
        }
        if(data.code == '500') {
          this.selectStoreList = []
          this.$Message.info('无门店信息')
        }
      })
    },
    // 店铺信息详情
    showStoreDetail(index) {
      getOneStore({storeId: this.selectStoreList[index].storeId}).then(data => {
        if(data.code == '200'){
          this.selectStoreDetailForm=data.store
          if(data.store.rentStatus == 0){
            this.selectStoreDetailForm.rentStatus='0'
          }else{
            this.selectStoreDetailForm.rentStatus='1'
          }
          this.selectStoreDetailModal=true
        }
        if(data.code == '500') {
          //获取信息失败
          this.$Message.error('门店详情获取失败')
        }
      })
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
    recancelStoreDetail() {
      this.reselectStoreDetailModal=false
      this.$Message.info('取消修改门店信息')
    },
    addStoreUser(index) {

    },
    // 表格选择
    selectDeleted(selection, row) {
      // 全选
      if (!row && selection && selection.length > 0) {
        this.selectStoreList.forEach(item => {
          item['_checked'] = true
        })
      } else {
        // 单选
        this.selectStoreList.forEach(item => {
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
        this.selectStoreList.forEach(item => {
          item['_checked'] = false
        })
      } else {
        // 单不选
        this.selectStoreList.forEach(item => {
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
      let list=this.selectStoreList.filter(item => item['_checked'])
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
        if(data.code == '300') {
          this.$Message.error('部分店铺删除失败')
        }
        if(data.code == '500') {
          this.$Message.info('无删除店铺')
        }
      })
    },
    cancelDeleteStore() {
      this.deleteStoreModal=false
      this.$Message.info('取消店铺用户')
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
