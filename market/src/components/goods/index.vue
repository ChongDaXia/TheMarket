<template>
    <div class="layout">
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">
            <TabPane label="采购" name="name1">
                <div class="header">
                    <Button @click="btnSelectStaff">请选择采购员身份</Button>
                    <div>采购员{{selectStaff}}</div>
                    <Button @click="btnSelectGoods">添加商品</Button>
                    <div>商品名称{{selectGoods}}</div>
                </div>
                <!-- 采购员选择列表 -->
                <Modal 
                    v-model="selectStaffModal" 
                    :mask-closable="false"  
                    @on-ok="okselectStaff"  
                    @on-cancel="cancelselectStaff" 
                    width="400">
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
                <!-- <div class="content">
                    <Table 
                        height="330" 
                        border 
                        stripe 
                        :columns="newTableTitle" 
                        :data="newGoodsList"
                    />
                </div> -->
            </TabPane>
            
            <!-- 列表 -->
            <TabPane label="列表" name="name2">
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
                        <Card v-for="(item,index) in supplierList" :value="item.supplierId" :key="index" class="cardstyle">
                            <Row>
                                <Col span="2" v-if="deleteable">
                                    <Checkbox :label="item.supplierId">删除</Checkbox>
                                </Col>
                                <Col span="18">{{item.name}}</Col>
                                <Col span="4"><a @click="getSupplierDetail(item.supplierId)">编辑</a></Col>
                            </Row>
                        </Card>
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
      // 选择采购员
      selectStaff: '',
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
          key: 'staffId'
        }
      ],
      // 选择采购员表格数据
      allSelectStaff: [],
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
          key: 'userId'
        },{
          title: '数量',
          key: 'userId'
        },{
          title: '单价',
          key: 'userId'
        },
      ],
      // 图表显示数据
      echartDataLine: {
        // x: ['啊','哦','额','哈'],
        // data: [{name: '表格', data: [500,200,360,100]}]
      },
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
      selectdeleteId: [],
      deleteable: false,
      // 删除二次确认按钮
      redeleteSupplierModal: false,
      // 所有商品信息
      AllGoodsList: []
    }
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name4'){
        this.getAllsupplierlist()
      }
      if(name === 'name5'){
        this.getAllGoods()
      }
    },
    // 选择采购员
    getSelectStaff() {
      selectPurchaseStaff({userId: this.$store.state.userId}).then(data => {
        if(data.code == '200'){
          this.allSelectStaff=data.staff
        }
        if(data.code == '500'){
          this.$Message.info('无员工信息')
        }
      })
    },
    btnSelectStaff() {
      this.selectStaffModal=true
    },
    // 选择
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
    // 弹框确认选择
    okselectStaff() {
      this.selectStaffModal=false
    },
    // 弹框取消
    cancelselectStaff() {
      this.selectStaffModal=false
    },

    // 选取商品
    btnSelectGoods() {
      selectGoods({userId: this.selectStaff.staffId}).then(data => {
        if(data.code == '200'){
          this.selectGoods=data.allgoods
        }
        if(data.code == '300'){
          this.$Message.info('无商品信息')
        }
        if(data.code == '500'){
          this.$Message.info('信息获取错误')
        }
      })
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
      debugger
      this.selectdeleteId=this.selectdelete.map(item => item.supplierId)
      deleteSupplier({supplierId: JSON.stringify(this.selectdeleteId)}).then(data => {
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
    // 商品报表
    getAllGoods(){
      getAllgoods().then(res => {
        if(res.code == '200') {
          this.AllGoodsList=res.goodss
          let x=[]
          let echartData=[]
          res.goodss.forEach(item => {
            x.push(item.name)
            echartData.push(item.amount)
          })
          this.echartDataLine={
            x: x.reverse(),
            data: [{name: '商品库存', data: echartData.reverse()}]
          }
        }
        if(res.code == '500') {
          this.$Message.info('无商品信息')
        }
      })
    },
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
