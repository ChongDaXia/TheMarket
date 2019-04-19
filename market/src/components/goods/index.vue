<template>
    <div class="layout">
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">
            <TabPane label="采购" name="name1">
                <div class="header">
                    <Button @click="btnSelectGoods">选择商品</Button>
                    <Button @click="btnAddGoods">添加商品</Button>
                    <Button @click="btnSelectStaff">请选择采购员身份</Button>
                </div>
                <!-- 添加商品 -->
                <Modal 
                    v-model="addNewItemModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    @on-cancel="cancelNewItem"
                    width="400"
                >
                    <p class="modaltitle">
                        <span>添加商品</span>
                    </p>
                    <Form 
                        ref="newItemRef" 
                        :model="newItemForm" 
                        :rules="newItemRules" 
                        :label-width="80"
                    >
                        <FormItem label="名称" prop="name">
                            <Input v-model="newItemForm.name" placeholder="请输入商品名称" />
                        </FormItem>
                        <FormItem label="数量" prop="amount" style="text-align:left">
                            <InputNumber v-model="newItemForm.amount" :min="1" />
                        </FormItem>
                        <FormItem label="单价" prop="price" style="text-align:left">
                            <Input v-model="newItemForm.price" prefix="logo-usd" style="width:100px;margin-right:10px" />
                            <span>元</span>
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="cancelNewItem">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitNewItem('newItemRef')">添加</Button>
                        </div>
                    </Form>
                </Modal>
                <!-- 采购员选择列表 -->
                <Modal 
                    v-model="selectStaffModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    width="400"
                >
                    <p class="modaltitle">
                        <span>采购员</span>
                    </p>
                    <Table 
                        ref="staffTableRef" 
                        height="300" border 
                        :columns="staffTabletitle" 
                        :data="allSelectStaff" 
                        :highlight-row=true
                        @on-current-change="selectStaffList"
                    />
                </Modal>
                <!-- 数据列表 -->
                <div class="content">
                    <Table 
                        height="330" 
                        border 
                        stripe 
                        :columns="newTableTitle" 
                        :data="newGoodsForm"
                    >
                        <template slot-scope="{row}" slot="name">
                            <Input v-model="row.name" />
                        </template>
                        <template slot-scope="{row}" slot="amount">
                            <InputNumber v-model="row.amount" :min="1" />
                        </template>
                        <template slot-scope="{row}" slot="price">
                          <Input v-model="row.price" prefix="logo-usd" style="width:100px;margin-right:10px" />
                          <span>元</span>
                        </template>
                        <template slot-scope="{row,index}" slot="action">
                          <Button type="primary" @click="removeGoodsItem(index)" >删除</Button>
                        </template>
                    </Table>
                </div>
            </TabPane>
            
            <!-- 列表 -->
            <TabPane label="列表" name="name2">
                <Row>
                    <!-- 商品列表 -->
                    <Col span="12">
                        <div class="header">
                            <!-- 搜索条件 -->
                            <!-- <Select 
                                v-model="selectGoodsId" 
                                @on-change="changeSelectGoodsName"
                                style="width:200px;margin-right:30px" 
                                placeholder="请选择商品名称"
                            >
                                <Option v-for="(item,index) in selectGoodsIdList" :value="item.goodsId" :key="index">
                                    {{item.name}}
                                </Option>
                            </Select> -->
                        </div>
                        <!-- 数据列表 -->
                        <!-- <div class="content">
                            <Table 
                                height="330" 
                                border 
                                stripe 
                                :columns="tableTitle" 
                                :data="selectUserList"
                            />
                        </div> -->
                    </Col>

                    <!-- 采购单列表 -->
                    <Col span="12">
                    
                    </Col>
                </Row>
            </TabPane>

            <TabPane label="删除" name="name3">   

            </TabPane>

            <!-- 供应商 -->
            <TabPane label="供应商" name="name4">
                <div class="header">
                    <div class="btnstyle">
                        <Button @click="addNewSupplier">
                            添加新供应商
                        </Button>
                    </div>
                    <div class="btnstyle">
                        <Button @click="deleteBtn">
                            删除供应商
                        </Button>
                    </div>
                    <div class="leftbtn">
                        <Button @click="deleteSelectedSupplier" v-if="deleteable">
                            确认删除
                        </Button>
                    </div>
                    <!-- 新增供应商 -->
                    <Modal 
                        v-model="addNewSupplierModal" 
                        :mask-closable="false" 
                        :footer-hide="true"
                        @on-cancel="cancelNewSupplier('newSupplierRef')"
                    >
                        <p class="modaltitle">
                            <span>供应商信息</span>
                        </p>
                        <Form 
                            ref="newSupplierRef" 
                            :model="newSupplierForm" 
                            :rules="newSupplierRule" 
                            :label-width="80"
                        >
                            <FormItem label="名称" prop="name">
                                <Input v-model="newSupplierForm.name" />
                            </FormItem>
                            <FormItem label="联系人" prop="contacts">
                                <Input v-model="newSupplierForm.contacts" />
                            </FormItem>
                            <FormItem label="联系电话" prop="mobileNo">
                                <Input v-model="newSupplierForm.mobileNo" />
                            </FormItem>
                            <FormItem label="地址" prop="address">
                              <Input 
                                  type="textarea" 
                                  v-model="newSupplierForm.address" 
                                  placeholder="请输入供应商详细地址" 
                                  :autosize="{minRows: 2,maxRows: 5}"
                              />
                            </FormItem>
                            <div class="form-item">
                                <Button class="login-btn" shape="circle" @click="resetAdd('newSupplierRef')">重置</Button>
                                <Button class="login-btn" shape="circle" @click="submitNewSupplier('newSupplierRef')">添加</Button>
                            </div>
                        </Form>
                    </Modal>
                    <!-- 新增供应商二次确认框 -->
                    <Modal 
                        v-model="readdNewSupplierModal" 
                        :mask-closable="false" 
                        title="确认提示" 
                        @on-ok="resubmitNewSupplier" 
                        @on-cancel="recancelNewSupplier"
                    >
                        <p>是否确认添加该供应商？</p>
                    </Modal>
                    <!-- 删除供应商二次确认框 -->
                    <Modal 
                        v-model="redeleteSupplierModal" 
                        :mask-closable="false" 
                        title="确认提示" 
                        @on-ok="resubmitDeleteSupplier" 
                        @on-cancel="recancelDeleteSupplier"
                    >
                        <p>是否确认删除所选供应商？</p>
                    </Modal>
                </div>
                <div class="content">
                    <CheckboxGroup v-model="selectdelete">
                        <Scroll :on-reach-bottom="handleReachBottom">
                        <Card v-for="(item,index) in supplierList" :value="item.supplierId" :key="index" class="cardstyle">
                            <Row>
                                <Col span="2" v-if="deleteable">
                                    <Checkbox :label="item.supplierId">删除</Checkbox>
                                </Col>
                                <Col span="18">{{item.name}}</Col>
                                <Col span="4"><a @click="getSupplierDetail(item.supplierId)">编辑</a></Col>
                            </Row>
                        </Card>
                        </Scroll>
                    </CheckboxGroup>
                </div>
                <!-- 信息详情 -->
                <Modal 
                    v-model="supplierDetailModal" 
                    :mask-closable="false" 
                    :footer-hide="true"
                    @on-cancel="cancelSupplierDetail('supplierRef')" 
                >
                    <p class="modaltitle">
                        <span>供应商信息</span>
                    </p>
                    <Form 
                        ref="supplierRef" 
                        :model="supplierForm" 
                        :rules="supplierRule" 
                        :label-width="80"
                    >
                        <FormItem label="名称" prop="name">
                            <Input v-model="supplierForm.name" />
                        </FormItem>
                        <FormItem label="联系人" prop="contacts">
                            <Input v-model="supplierForm.contacts" />
                        </FormItem>
                        <FormItem label="联系电话" prop="mobileNo">
                            <Input v-model="supplierForm.mobileNo" />
                        </FormItem>
                        <FormItem label="地址" prop="address">
                          <Input 
                              type="textarea" 
                              v-model="supplierForm.address" 
                              placeholder="请输入供应商详细地址" 
                              :autosize="{minRows: 2,maxRows: 5}"
                          />
                        </FormItem>
                        <div class="form-item">
                            <Button class="login-btn" shape="circle" @click="cancelSupplierDetail('supplierRef')">取消</Button>
                            <Button class="login-btn" shape="circle" @click="submitSupplierDetail('supplierRef')">修改</Button>
                        </div>
                    </Form>
                </Modal>
                <!-- 信息详情二次确认框 -->
                <Modal 
                    v-model="resupplierDetailModal" 
                    :mask-closable="false" 
                    title="确认提示" 
                    @on-ok="reSubmitSupplierDetail" 
                    @on-cancel="reCancelSupplierDetail"
                >
                    <p>是否确认修改该供应商信息？</p>
                </Modal>
            </TabPane>

            <!-- 报表 -->
            <TabPane label="报表" name="name5">
                <Row>
                    <Col span="12" class="echartsbox">
                        <echarts
                            style="width: 450px; height: 400px;"
                            refName="goodsline"
                            type="line"
                            :chartsData="echartDataLine"
                          />
                    </Col>
                    <Col span="12" class="echartsbox">
                        <echarts
                            style="width: 400px; height: 400px;"
                            refName="goodsbar"
                            type="bar"
                            :chartsData="echartDataLine"
                          />
                    </Col>
                </Row>
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
import {selectGoods,getAllgoods} from '@/http/moudules/goods'
import {selectPurchaseStaff} from '@/http/moudules/staff'
import echarts from '../../echarts'
import {addnewsupplier, getAllsupplier, getOnesupplier, updatesupplier,deleteSupplier} from '@/http/moudules/goods'
export default {
  components: {
    echarts
  },

  data () {
    return {
      // 选择采购员弹框
      selectStaffModal: false,
      // 选择采购员表格表头
      staffTabletitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: '采购员',
          key: 'name'
        }
      ],
      // 选择采购员表格数据
      allSelectStaff: [],
      // 选中的采购员
      selectStaff: '',


      // 新增商品弹框
      addNewItemModal: false,
      // 新增商品项数据
      newItemForm: {
        name: '',
        amount: 1,
        price: 0
      },
      // 新增商品项数据校验
      newItemRules: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
        }],
        amount: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[0-9]*$/,
          message: '请输入数字'
        }],
        price: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[0-9]\d*|[0-9]\d*\.\d*$/,
          message: '格式错误'
        }]
      },
      // 采购单中商品列表
      newGoodsForm: [],
      
      // 选取商品
      selectGoods: [],
      // 添加商品表格表头
      newTableTitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: '商品名称',
          slot: 'name'
        },{
          title: '数量',
          slot: 'amount'
        },{
          title: '单价',
          slot: 'price'
        },{
          title: '操作',
          slot: 'action',
          width: 80,
          align: 'center'
        }
      ],

      // 列表界面
      // 商品名称筛选（goodsId）
      selectGoodsId: '',
      // 商品名称筛选所有列表
      selectGoodsIdList: [],


      // 图表显示数据
      echartDataLine: {},
      // 供应商数据列表
      supplierList: [],
      // 供应商信息
      newSupplierForm: {
        name: '',
        contacts: '',
        mobileNo: '',
        address: ''
      },
      // 供应商信息校验
      newSupplierRule: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,40}$/,
          message: '仅支持2-40位大小写字母或数字、中文'
        }],
        contacts: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
        }],
        mobileNo: [{
          trigger: 'blur, change',
          pattern:/^\d{11}$/,
          message: '仅支持11位数字'
        }],
        address: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，。,.\x22]$/,
          message: '格式错误'
        }]
      },
      // 添加新供应商弹窗
      addNewSupplierModal: false,
      // 添加新供应商弹窗二次确认框
      readdNewSupplierModal: false,
      // 数据详情
      supplierForm: {
        name: '',
        contacts: '',
        mobileNo: '',
        address: ''
      },
      // 数据详情校验
      supplierRule: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,40}$/,
          message: '仅支持2-40位大小写字母或数字、中文'
        }],
        contacts: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
        }],
        mobileNo: [{
          trigger: 'blur, change',
          pattern:/^\d{11}$/,
          message: '仅支持11位数字'
        }],
        address: [{
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]|[-，。,.\x22]$/,
          message: '格式错误'
        }]
      },
      // 数据详情弹窗
      supplierDetailModal: false,
      // 数据详情弹窗二次确认框
      resupplierDetailModal: false,
      // 删除选择器
      selectdelete: [],
      deleteable: false,
      // 删除二次确认按钮
      redeleteSupplierModal: false,
    }
  },

  mounted() {
    this.getAllgoods()
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name4'){
        this.getAllsupplierlist()
      }
    },
    // 获取所有商品
    getAllgoods() {
      selectGoods({userId: this.$store.state.userId}).then(res => {
        if(res.code == '200'){
          this.selectGoods=res.allgoods
          this.selectGoodsIdList=res.allgoods
          this.allSelectStaff=res.allstaff
          let StaffName=res.allstaffname
          this.allSelectStaff.forEach((i, index) => {
            StaffName.forEach(item => {
              if(i.staffId == item.staffId) {
                i['name']=item.name
              }
            })
          })
          let x=[]
          let echartData=[]
          res.allgoods.forEach(item => {
            x.push(item.name)
            echartData.push(item.amount)
          })
          this.echartDataLine={
            x: x.reverse(),
            data: [{name: '商品库存', data: echartData.reverse()}]
          }
        }
        if(res.code == '300'){
          this.allSelectStaff=res.allstaff
          let StaffName=res.allstaffname
          this.allSelectStaff.forEach((i, index) => {
            StaffName.forEach(item => {
              if(i.staffId == item.staffId) {
                i['name']=item.name
              }
            })
          })
          this.$Message.info('无商品信息')
        }
        if(res.code == '500'){
          this.$Message.info('暂时无员工')
        }
      })
    },
    // 选取商品
    btnSelectGoods() {
      
    },
    // 添加商品
    btnAddGoods() {
      this.newItemForm={
        name: '',
        amount: 1,
        price: 0
      }
      this.addNewItemModal=true
    },
    // 确认添加商品
    submitNewItem(name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.newGoodsForm.push(this.newItemForm)
          this.addNewItemModal=false
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    // 取消添加商品
    cancelNewItem() {
      this.$refs['newItemRef'].resetFields()
      this.addNewItemModal=false
    },
    // 删除商品列表中的商品项
    removeGoodsItem(index) {
      this.newGoodsForm.splice(index,1)
    },



    // 选择采购员按钮
    btnSelectStaff() {
      this.selectStaffModal=true
    },
    // 选择采购员
    selectStaffList(currentRow, oldCurrentRow){
      if(currentRow){
        this.allSelectStaff.forEach(item => {
          if(item.staffId === currentRow.staffId) {
            item['_highlight'] = true
            this.selectStaff=item
          }else{
            item['_highlight'] = false
          }
        })
      }
    },

    

    // 获取所有供应商数据
    getAllsupplierlist () {
      getAllsupplier().then(data => {
        this.supplierList=data.suppliers
      })
    },
    // 右上角添加新供应商按钮
    addNewSupplier() {
      this.addNewSupplierModal=true
    }, 
    // 重置按钮
    resetAdd(name) {
      this.$refs[name].resetFields()
    },
    // 添加新供应商确认按钮
    submitNewSupplier(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.readdNewSupplierModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    cancelNewSupplier(name) {
      this.$refs[name].resetFields()
      this.addNewSupplierModal=false
    },
    // 添加新供应商二次确认按钮
    resubmitNewSupplier() {
      addnewsupplier(this.newSupplierForm).then(data => {
        if(data.code == '200'){
          this.readdNewSupplierModal=false
          this.cancelNewSupplier('newSupplierRef')
          this.getAllsupplierlist ()
          this.$Message.info('供应商信息添加成功')
        }
        if(data.code == "500") {
          this.$Message.error('供应商信息添加失败')
        }
      })
    },
    recancelNewSupplier() {
      this.readdNewSupplierModal=false
      this.$Message.info('取消添加供应商')
    },
    // 获取供应商详细信息
    getSupplierDetail(name) {
      getOnesupplier({supplierId: name}).then(data => {
        if(data.code == "200"){
          this.supplierForm=data.suppliers
          this.supplierDetailModal=true
        }
        if(data.code == "500") {
          this.$Message.error('供应商信息获取失败')
        }
      })
    },
    // 修改供应商确认按钮
    submitSupplierDetail(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.resupplierDetailModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    cancelSupplierDetail(name) {
      this.$refs[name].resetFields()
      this.supplierDetailModal=false
    },
    // 修改供应商二次确认按钮
    reSubmitSupplierDetail() {
      updatesupplier(this.supplierForm).then(data => {
        if(data.code == '200'){
          this.resupplierDetailModal=false
          this.cancelSupplierDetail('supplierRef')
          this.getAllsupplierlist ()
          this.$Message.info('供应商信息修改成功')
        }
        if(data.code == '500') {
          this.$Message.error('供应商信息修改失败')
        }
      })
    },
    reCancelSupplierDetail() {
      this.resupplierDetailModal=false
      this.$Message.info('取消修改供应商')
    },
    // 右上角删除供应商按钮
    deleteBtn() {
      this.deleteable=true
    },
    // 确认删除按钮
    deleteSelectedSupplier() {
      this.redeleteSupplierModal=true
    },
    // 二次确认删除按钮
    resubmitDeleteSupplier() {
      deleteSupplier({supplierId: JSON.stringify(this.selectdelete)}).then(data => {
        if(data.code == '200'){
          this.redeleteSupplierModal=false
          this.$Message.info('供应商删除成功')
          this.deleteable=false
          this.getAllsupplierlist()
        }
        if(data.code == '300') {
          this.$Message.error('部分供应商删除失败')
        }
        if(data.code == '500') {
          this.$Message.info('无删除供应商')
        }
      })
    },
    recancelDeleteSupplier() {
      this.redeleteSupplierModal=false
      this.$Message.info('取消删除供应商')
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
  margin: 0 auto;
}
.header{
  width: 100%;
  height: 100px;
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
.echartsbox{
  width: 50%;
  padding: 50px 100px;
}
.btnstyle{
  float: right;
  width: 100px;
}
.leftbtn{
  float: left;
  width: 100px;
}
.cardstyle{
  margin-bottom: 10px;
}
</style>
