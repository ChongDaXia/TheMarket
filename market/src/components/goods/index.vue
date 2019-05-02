<template>
    <div class="layout">
        <Tabs class="tabstyle" value="name1" @on-click="selectTab">

            <TabPane label="采购" name="name1">
                <div class="purchaseheader">
                    <div class="p-title">采购单</div>
                    <Divider />
                    <div>
                        <Row class="rowstyle">
                            <span class="spanstyle">[采购时间]</span>{{daytime}}
                        </Row>
                        <Row  class="rowstyle">
                            <Col span="12">
                                <Button @click="selectStaffModal=true">添加</Button>
                                <span class="spanstyle">[采购员]</span>{{selectStaff.name}}
                            </Col>
                            <Col span="12">
                                <Button @click="selectSupplierModal=true">添加</Button>
                                <span class="spanstyle">[供应商]</span>{{selectSupplier.name}}
                            </Col>
                        </Row>
                        <Row  class="rowstyle">
                            <Col span="12">
                                <Button @click="selectItemModal=true" class="purchasebtnstyle">选择商品</Button>
                                <Button @click="btnAddGoods" class="purchasebtnstyle">添加商品</Button>
                            </Col>
                            <Col span="12">
                                <Button @click="btnAddPurchase" class="purchasebtnstyle">添加采购单</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <!-- 选择商品 -->
                <Modal 
                    v-model="selectItemModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    width="400" >
                    <p class="modaltitle">
                        <span>选择商品</span>
                    </p>
                    <Table 
                        ref="goodsTableRef" 
                        height="300" border 
                        :columns="goodsTabletitle" 
                        :data="allGoodsList" 
                        :highlight-row=true
                        @on-current-change="selectGoodsList" />
                </Modal>
                <!-- 添加商品 -->
                <Modal 
                    v-model="addNewItemModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    @on-cancel="cancelNewItem"
                    width="400">
                    <p class="modaltitle">
                        <span>添加商品</span>
                    </p>
                    <Form 
                        ref="newItemRef" 
                        :model="newItemForm" 
                        :rules="newItemRules" 
                        :label-width="80" >
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
                    width="400" >
                    <p class="modaltitle">
                        <span>采购员</span>
                    </p>
                    <Table 
                        ref="staffTableRef" 
                        height="300" border 
                        :columns="staffTabletitle" 
                        :data="allSelectOffice" 
                        :highlight-row=true
                        @on-current-change="selectStaffList" />
                </Modal>
                <!-- 供应商选择列表 -->
                <Modal 
                    v-model="selectSupplierModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    width="400" >
                    <p class="modaltitle">
                        <span>供应商</span>
                    </p>
                    <Table 
                        ref="staffTableRef" 
                        height="300" border 
                        :columns="supplierTabletitle" 
                        :data="supplierList" 
                        :highlight-row=true
                        @on-current-change="selectSupplierList" />
                </Modal>
                <!-- 数据列表 -->
                <div class="content">
                    <Table 
                        height="330" 
                        stripe 
                        :columns="newTableTitle" 
                        :data="newGoodsForm" >
                        <template slot-scope="{row}" slot="name">
                            <Input v-model="row.name" disabled/>
                        </template>
                        <template slot-scope="{row,index}" slot="amount">
                            <InputNumber v-model="newGoodsForm[index].amount" :min="1" v-if="row.unchange"/>
                            <InputNumber v-model="newGoodsForm[index].amount" :min="1" disabled v-if="!row.unchange"/>
                        </template>
                        <template slot-scope="{row, index}" slot="price">
                            <Input v-model="newGoodsForm[index].price" 
                                prefix="logo-usd" 
                                style="width:100px;margin-right:10px" 
                                v-if="row.unchange"/>
                            <Input v-model="newGoodsForm[index].price" 
                                prefix="logo-usd" 
                                style="width:100px;margin-right:10px" 
                                disabled v-if="!row.unchange"/>
                            <span>元</span>
                        </template>
                        <template slot-scope="{row,index}" slot="action">
                            <Button type="primary" @click="removeGoodsItem(row,index)" >删除</Button>
                        </template>
                    </Table>
                </div>
                <!-- 采购单添加表 -->
                <Modal 
                    v-model="newPurchaseModal" 
                    title="采购单" 
                    @on-ok="resubmitAddPurchase" 
                    @on-cancel="newPurchaseModal=false">
                    <p>[采购时间]{{daytime}}</p>
                    <p>[采购员]{{selectStaff.name}}</p>
                    <p>[供应商]{{selectSupplier.name}}</p>
                    <Row>
                        <Col span="8">商品名称</Col>
                        <Col span="8">数量</Col>
                        <Col span="8">单价</Col>
                    </Row>
                    <ul>
                        <li v-for="(item,index) in newGoodsForm">
                            <Row>
                                <Col span="8">{{item.name}}</Col>
                                <Col span="8">{{item.amount}}</Col>
                                <Col span="8">{{item.price}}</Col>
                            </Row>
                        </li>
                    </ul>
                    <p>[采购总额]{{newGoodsForm.totalPrice}}</p>
                </Modal>
            </TabPane>
            
            <!-- 列表 -->
            <TabPane label="列表" name="name2">
                <Row>
                    <!-- 商品列表 -->
                    <Col span="10">
                        <div class="header">
                            <!-- 搜索条件 -->
                            <Select 
                                v-model="selectGoodsId" 
                                @on-change="changeSelectGoodsName"
                                style="width:200px;margin-right:20px" 
                                placeholder="请选择商品名称">
                                <Option v-for="(item,index) in TheallGoodsList" :value="item.goodsId" :key="index">
                                    {{item.name}}
                                </Option>
                            </Select>
                            <Button @click="exportgoodsData()">
                                <Icon type="ios-download-outline" />
                                下载商品数据
                            </Button>
                        </div>
                        <!-- 数据列表 -->
                        <div class="content">
                            <Table 
                                height="400" 
                                stripe 
                                ref='goodstablerefs'
                                :loading="goodslistloading"
                                :columns="changedGoodsTableTitle" 
                                :data="changedGoodsList">
                            </Table>
                        </div>
                    </Col>

                    <!-- 采购单列表 -->
                    <Col span="14">
                        <div class="header">
                            <!-- 搜索条件 -->
                            <DatePicker 
                                type="daterange" 
                                :value="searchTimes" 
                                :options="optionsDatetime" 
                                @on-change="updateByTime" 
                                :clearable="false"
                                placement="bottom-start" 
                                placeholder="请选择采购单日期" 
                                style="width: 200px" 
                                split-panels 
                                :editable="false" />
                            <Button @click="exportpurchasetData()" style="margin-left:20px">
                                <Icon type="ios-download-outline" />
                                下载采购单数据
                            </Button>
                        </div>
                        <!-- 数据列表 -->
                        <div class="content">
                            <Table 
                                height="400" 
                                stripe 
                                ref='purchasetablerefs'
                                :loading="purchaselistloading"
                                :columns="changedPurchaseTableTitle" 
                                :data="changedPurchaseList">
                            </Table>
                        </div>
                    </Col>
                </Row>
            </TabPane>

            <!-- 销售 -->
            <TabPane label="销售" name="name3">  
                <div class="purchaseheader">
                    <div class="p-title">销售单</div>
                    <Divider />
                    <div>
                        <Row class="rowstyle">
                            <span class="spanstyle">[销售时间]</span>{{daytime}}
                        </Row>
                        <Row  class="rowstyle">
                            <Col span="12">
                                <Button @click="saleSelectStaffModal=true">添加</Button>
                                <span class="spanstyle">[销售员]</span>{{saleSelectStaff.name}}
                            </Col>
                            <Col span="12">
                                <Button @click="selectMemberModal=true">添加</Button>
                                <span class="spanstyle">[会员]</span>{{selectMember.name}}
                            </Col>
                        </Row>
                        <Row  class="rowstyle">
                            <Col span="12">
                                <Button @click="saleSelectItemModal=true" class="purchasebtnstyle">选择商品</Button>
                            </Col>
                            <Col span="12">
                                <Button @click="btnAddSales" class="purchasebtnstyle">添加销售单</Button>
                            </Col>
                        </Row>
                    </div>
                </div> 
                <!-- 选择商品 -->
                <Modal 
                    v-model="saleSelectItemModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    width="400" >
                    <p class="modaltitle">
                        <span>选择商品</span>
                    </p>
                    <Table 
                        ref="saleGoodsTableRef" 
                        height="300" border 
                        :columns="goodsTabletitle" 
                        :data="saleAllGoodsList" 
                        :highlight-row=true
                        @on-current-change="saleSelectGoodsList" />
                </Modal>
                <!-- 销售员选择列表 -->
                <Modal 
                    v-model="saleSelectStaffModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    width="400" >
                    <p class="modaltitle">
                        <span>销售员</span>
                    </p>
                    <Table 
                        ref="staffTableRef" 
                        height="300" border 
                        :columns="staffTabletitle" 
                        :data="saleAllSelectOffice" 
                        :highlight-row=true
                        @on-current-change="saleSelectStaffList" />
                </Modal>
                <!-- 会员选择列表 -->
                <Modal 
                    v-model="selectMemberModal" 
                    :mask-closable="false"  
                    :footer-hide="true"
                    width="400" >
                    <p class="modaltitle">
                        <span>会员</span>
                    </p>
                    <Table 
                        ref="memberTableRef" 
                        height="300" border 
                        :columns="memberTabletitle" 
                        :data="memberList" 
                        :highlight-row=true
                        @on-current-change="selectMemberList" />
                </Modal>
                <!-- 数据列表 -->
                <div class="content">
                    <Table 
                        height="330" 
                        stripe 
                        :columns="newTableTitle" 
                        :data="saleNewGoodsForm" >
                        <template slot-scope="{row}" slot="name">
                            <Input v-model="row.name" disabled/>
                        </template>
                        <template slot-scope="{row,index}" slot="amount">
                            <InputNumber v-model="saleNewGoodsForm[index].amount" :min="1"/>
                        </template>
                        <template slot-scope="{row, index}" slot="price">
                            <Input v-model="saleNewGoodsForm[index].price" 
                                prefix="logo-usd" 
                                style="width:100px;margin-right:10px" />
                            <span>元</span>
                        </template>
                        <template slot-scope="{row,index}" slot="action">
                            <Button type="primary" @click="saleRemoveGoodsItem(row,index)" >删除</Button>
                        </template>
                    </Table>
                </div>
                <!-- 采购单添加表 -->
                <Modal 
                    v-model="newSaleModal" 
                    title="销售单" 
                    @on-ok="resubmitAddSale" 
                    @on-cancel="newSaleModal=false">
                    <p>[销售时间]{{daytime}}</p>
                    <p>[销售员]{{saleSelectStaff.name}}</p>
                    <p>[会员]{{selectMember.name}}</p>
                    <Row>
                        <Col span="8">商品名称</Col>
                        <Col span="8">数量</Col>
                        <Col span="8">单价</Col>
                    </Row>
                    <ul>
                        <li v-for="(item,index) in saleNewGoodsForm">
                            <Row>
                                <Col span="8">{{item.name}}</Col>
                                <Col span="8">{{item.amount}}</Col>
                                <Col span="8">{{item.price}}</Col>
                            </Row>
                        </li>
                    </ul>
                    <p>[销售总额]{{saleNewGoodsForm.totalPrice}}</p>
                    <p>[积分]{{saleNewGoodsForm.totalPrice*10}}</p>
                </Modal>
            </TabPane>

            <!-- 供应商 -->
            <TabPane label="供应商" name="name4">
                <div class="header">
                    <div class="btnstyle">
                        <Button @click="deleteBtn">
                            删除供应商
                        </Button>
                    </div>
                    <div class="btnstyle">
                        <Button @click="addNewSupplier">
                            添加新供应商
                        </Button>
                    </div>
                    <div class="leftbtn">
                        <Button @click="deleteSelectedSupplier" v-if="deleteable">
                            确认删除
                        </Button>
                    </div>
                    <div class="leftbtn">
                        <Button @click="canceldeleteBtn" v-if="deleteable">
                            取消删除
                        </Button>
                    </div>
                    <!-- 新增供应商 -->
                    <Modal 
                        v-model="addNewSupplierModal" 
                        :mask-closable="false" 
                        :footer-hide="true"
                        @on-cancel="cancelNewSupplier('newSupplierRef')" >
                        <p class="modaltitle">
                            <span>供应商信息</span>
                        </p>
                        <Form 
                            ref="newSupplierRef" 
                            :model="newSupplierForm" 
                            :rules="newSupplierRule" 
                            :label-width="80" >
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
                                  :autosize="{minRows: 2,maxRows: 5}" />
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
                        @on-cancel="recancelNewSupplier" >
                        <p>是否确认添加该供应商？</p>
                    </Modal>
                    <!-- 删除供应商二次确认框 -->
                    <Modal 
                        v-model="redeleteSupplierModal" 
                        :mask-closable="false" 
                        title="确认提示" 
                        @on-ok="resubmitDeleteSupplier" 
                        @on-cancel="recancelDeleteSupplier" >
                        <p>是否确认删除所选供应商？</p>
                    </Modal>
                </div>
                <div class="content">
                    <CheckboxGroup v-model="selectdelete">
                        <Scroll :on-reach-bottom="handleReachBottom"  height="400">
                            <Card v-for="(item,index) in supplierList" 
                                :value="item.supplierId" 
                                :key="index" 
                                class="cardstyle">
                                <Row>
                                    <Col span="2" v-if="deleteable">
                                        <Checkbox :label="item.supplierId">删除</Checkbox>
                                    </Col>
                                    <Col span="20">{{item.name}}</Col>
                                    <Col span="2">
                                        <Button 
                                            icon="md-open" 
                                            @click="getSupplierDetail(item,index)" ></Button>
                                    </Col>
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
                    @on-cancel="cancelSupplierDetail('supplierRef')" >
                    <p class="modaltitle">
                        <span>供应商信息</span>
                    </p>
                    <Form 
                        ref="supplierRef" 
                        :model="supplierForm" 
                        :rules="supplierRule" 
                        :label-width="80" >
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
                              :autosize="{minRows: 2,maxRows: 5}" />
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
                    @on-cancel="reCancelSupplierDetail" >
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
                            :chartsData="echartDataLine" />
                    </Col>
                    <Col span="12" class="echartsbox">
                        <echarts
                            style="width: 400px; height: 400px;"
                            refName="goodsbar"
                            type="bar"
                            :chartsData="echartDataLine" />
                    </Col>
                </Row>
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
        </vue-particles>   -->
    </div>
</template>

<script>
import moment from 'moment'
import {selectGoods,getAllgoods,addnewpurchase,getAllPurchase,saleSelectGoods,addnewsales} from '@/http/moudules/goods'
import {selectPurchaseStaff} from '@/http/moudules/staff'
import {getAllMember} from '@/http/moudules/member'
import echarts from '../../echarts'
import {addnewsupplier, getAllsupplier, getOnesupplier, updatesupplier,deleteSupplier} from '@/http/moudules/goods'
export default {
  components: {
    echarts
  },

  data () {
    return {
      // 当前时间
      daytime: moment().format('YYYY-MM-DD'),
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
      // 选择商品弹框
      selectItemModal: false,
      // 选择商品表格表头
      goodsTabletitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: '商品名称',
          key: 'name',
          align: 'center'
        },{
          title: '库存数量',
          key: 'amount',
          align: 'center'
        }
      ],
      // 选择商品表格数据
      allGoodsList: [],
      // 添加商品弹框
      addNewItemModal: false,
      // 添加商品项数据
      newItemForm: {
        name: '',
        amount: 1,
        price: 0
      },
      // 添加商品项数据校验
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
          key: 'name',
          align: 'center'
        }
      ],
      // 选择采购员表格数据
      allSelectOffice: [],
      // 选中的采购员
      selectStaff: '',
      // 选择供应商弹框
      selectSupplierModal: false,
      // 选择供应商表格数据
      supplierTabletitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: '供应商',
          key: 'name',
          align: 'center'
        }
      ],
      // 供应商数据列表
      supplierList: [],
      // 选择的供应商
      selectSupplier: '',
      // 采购单确认弹框
      newPurchaseModal: false,
      // 采购单表格表头
      newTableTitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: '商品名称',
          slot: 'name',
          align: 'center',
        },{
          title: '数量',
          slot: 'amount',
          align: 'center',
          sortable: true
        },{
          title: '单价',
          slot: 'price',
          align: 'center',
          sortable: true
        },{
          title: '操作',
          slot: 'action',
          width: 80,
          align: 'center'
        }
      ],
      // 采购单表格数据
      newGoodsForm: [],
      // 商品名称筛选（goodsId）
      selectGoodsId: '',
      // 表格加载
      goodslistloading: false,
      // 商品列表表头
      changedGoodsTableTitle: [
        {
          type: 'index',
          width: 80,
          align: 'center'
        },{
          title: '商品名称',
          key: 'name',
          align: 'center'
        },{
          title: '库存数量',
          key: 'amount',
          align: 'center',
          sortable: true
        }
      ],
      // 固定商品列表
      TheallGoodsList: [],
      // 变化商品列表
      changedGoodsList: [],
      // 所有商品
      temp: {
        name: '所有商品',
        goodsId: 0
      },
      // 表格加载
      purchaselistloading: false,
      // 采购单列表表头
      changedPurchaseTableTitle: [
        {
          title: '采购单ID',
          key: 'purchaseId',
          width: 100,
          align: 'center'
        },{
          title: '采购员',
          key: 'staffname',
          align: 'center'
        },{
          title: '供应商',
          key: 'suppliername',
          align: 'center'
        },{
          title: '采购金额',
          key: 'totalPrice',
          align: 'center',
          sortable: true
        },{
          title: '采购日期',
          key: 'createTime',
          align: 'center',
          sortable: true
        }
      ],
      // 转化前的采购单列表
      ThePurchaseList: [],
      // 固定采购单列表
      ThechangedPurchaseList: [],
      // 变化采购单列表
      changedPurchaseList: [],
      // 销售选择商品弹框
      saleSelectItemModal: false,
      // 销售选择商品表格数据
      saleAllGoodsList: [],
      // 销售单单表格数据
      saleNewGoodsForm: [],
      // 销售单确认弹窗
      newSaleModal: false,
      // 选择销售员弹框
      saleSelectStaffModal: false,
      // 选择销售员表格数据
      saleAllSelectOffice: [],
      // 选中的销售员
      saleSelectStaff: '',
      // 选择会员弹窗
      selectMemberModal: false,
      // 选择会员表格表头
      memberTabletitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },{
          title: '会员',
          key: 'name',
          align: 'center'
        }
      ],
      // 选择会员表格数据
      memberList: [],
      // 选择的会员
      selectMember: '',     
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
      // 供应商详情
      supplierForm: {
        name: '',
        contacts: '',
        mobileNo: '',
        address: ''
      },
      // 供应商详情校验
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
      // 供应商详情弹窗
      supplierDetailModal: false,
      // 供应商详情弹窗二次确认框
      resupplierDetailModal: false,
      // 供应商删除列表
      selectdelete: [],
      // 供应商选择删除
      deleteable: false,
      // 供应商删除二次确认按钮
      redeleteSupplierModal: false,
      // 图表显示数据
      echartDataLine: {}
    }
  },

  mounted() {
    this.getAllgoods()
    this.getAllsupplierlist()
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name1'){
        this.getAllgoods()
        this.getAllsupplierlist()
        this.newGoodsForm=[]
        this.selectStaff=''
        this.selectSupplier=''
      }
      if(name === 'name2'){
        this.getAllPurchases()
      }
      if(name === 'name3'){
        this.getAllMemberInfo()
        this.saleNewGoodsForm=[]
        this.saleSelectStaff=''
        this.selectMember=''
      }
      if(name === 'name4'){
        this.getAllsupplierlist()
      }
    },
    // 获取所有商品\采购员\销售员\采购单\报表
    getAllgoods() {
      this.goodslistloading=true
      selectGoods({userId: this.$store.state.userId}).then(res => {
        if(res.code == '200'){
          // 采购（选择商品）
          this.allGoodsList=res.allgoods.map(item => {
            return {
              ...item
            }
          })
          // 销售（选择商品）
          this.saleAllGoodsList=res.allgoods.map(item => {
            return {
              ...item
            }
          })
          // 不变的商品列表
          this.TheallGoodsList=res.allgoods.map(item => {
            return {
              ...item
            }
          })
          this.TheallGoodsList.push(this.temp)
          // 变化的商品列表
          this.changedGoodsList=res.allgoods.map(item => {
            return {
              ...item
            }
          })
          // 采购单
          this.ThePurchaseList=res.allpurchase
          this.ThePurchaseList.forEach(item => {
            item['createTime']=moment(item.createTime).format('YYYY-MM-DD')
          })
          // 采购员
          this.allSelectOffice=res.alloffice.map(item => {
            return {
              ...item
            }
          })
          // 销售员
          this.saleAllSelectOffice=res.alloffice.map(item => {
            return {
              ...item
            }
          })
          let Staff=res.allstaff
          this.allSelectOffice.forEach((i, index) => {
            Staff.forEach(item => {
              if(i.staffId == item.staffId) {
                i['name']=item.name
              }
            })
          })
          this.saleAllSelectOffice.forEach((i, index) => {
            Staff.forEach(item => {
              if(i.staffId == item.staffId) {
                i['name']=item.name
              }
            })
          })
          // 图表
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
          this.goodslistloading=false
        }
        if(res.code == '300'){
          // 采购员
          this.allSelectOffice=res.alloffice.map(item => {
            return {
              ...item
            }
          })
          // 销售员
          this.saleAllSelectOffice=res.alloffice.map(item => {
            return {
              ...item
            }
          })
          let Staff=res.allstaff
          this.allSelectOffice.forEach((i, index) => {
            Staff.forEach(item => {
              if(i.staffId == item.staffId) {
                i['name']=item.name
              }
            })
          })
          this.saleAllSelectOffice.forEach((i, index) => {
            Staff.forEach(item => {
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
    // 获取所有供应商数据
    getAllsupplierlist () {
      getAllsupplier().then(data => {
        this.supplierList=data.suppliers
      })
    },
    // 选择商品
    selectGoodsList(currentRow, oldCurrentRow) {
      if(currentRow){
        this.allGoodsList.forEach((item,index) => {
          if(item.goodsId === currentRow.goodsId) {
            item['_highlight'] = true
            let selectGoods=item
            selectGoods.amount=1
            selectGoods.price=0
            selectGoods['unchange']=true
            this.selectItemModal=false
            this.newGoodsForm.push(selectGoods)
            this.allGoodsList.splice(index,1)
          }else{
            item['_highlight'] = false
          }
        })
      }
    },
    // 添加商品按钮
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
      if(this.newItemForm.price == 0){
        this.$Message.error('请输入采购单价')
      }else{
        this.$refs[name].validate(valid => {
          if(valid){
            this.newGoodsForm.push(this.newItemForm)
            this.addNewItemModal=false
          } else {
            this.$Message.error('填写内容不符合规范')
          }
        })
      }
    },
    // 取消添加商品
    cancelNewItem() {
      this.$refs['newItemRef'].resetFields()
      this.addNewItemModal=false
    },
    // 选择采购员
    selectStaffList(currentRow, oldCurrentRow) {
      if(currentRow){
        this.allSelectOffice.forEach(item => {
          if(item.staffId === currentRow.staffId) {
            item['_highlight'] = true
            this.selectStaff=item
            this.selectStaffModal=false
          }else{
            item['_highlight'] = false
          }
        })
      }
    },
    // 选择供应商
    selectSupplierList(currentRow, oldCurrentRow) {
      if(currentRow){
        this.supplierList.forEach(item => {
          if(item.supplierId === currentRow.supplierId) {
            item['_highlight'] = true
            this.selectSupplier=item
            this.selectSupplierModal=false
          }else{
            item['_highlight'] = false
          }
        })
      }
    },
    // 删除商品列表中的商品项
    removeGoodsItem(row,index) {
      row['_highlight']=false
      row['unchange']=false
      this.TheallGoodsList.forEach(item => {
        if(item.goodsId === row.goodsId){
          this.allGoodsList.push(item)
        }
      })
      this.newGoodsForm.splice(index,1)
    },
    // 添加采购单
    btnAddPurchase() {
      var reg=new RegExp(/^[0-9]\d*|[0-9]\d*\.\d*$/)
      let ischecked=true
      if(this.newGoodsForm.length == 0){
        this.$Message.error('请添加采购商品')
        ischecked=false
      } else {
        this.newGoodsForm.forEach(item => {
          if((item.price === 0) || (!reg.test(item.price)) || item.price === null) {
            this.$Message.error('请输入正确的单价')
            ischecked=false
            return
          }
          if(item.amount === null) {
            this.$Message.error('请输入采购数量')
            ischecked=false
            return
          }
        })
      }
      if(this.selectStaff.staffId == null){
        this.$Message.error('请选择采购员')
        ischecked=false
      }else if(this.selectSupplier.supplierId == null){
        this.$Message.error('请选择供应商')
        ischecked=false
      }
      if(ischecked) {
        let totalPrice=0
        this.newGoodsForm.forEach(item => {
          totalPrice=totalPrice+item.amount*item.price
        })
        this.newGoodsForm.totalPrice=totalPrice
        this.newPurchaseModal=true
      }
    },
    // 新建采购单：采购员Id+供应商Id+总价格+时间
    // （选择商品）更新商品表：商品Id+数量
    // （选择商品）新建采购项：采购单Id+商品Id+数量+价格
    // （新建商品）新建商品表：商品名称+数量
    // （新建商品）新建采购项：采购单Id+商品Id+数量+价格
    // 添加采购单确认
    resubmitAddPurchase(){
      let purchase={
        staffId: this.selectStaff.staffId,
        supplierId: this.selectSupplier.supplierId,
        totalPrice: this.newGoodsForm.totalPrice,
        newGoodsForm: JSON.stringify(this.newGoodsForm)
      }
      addnewpurchase(purchase).then(data => {
        if(data.code == '200'){
          this.$Message.info('添加新采购单成功')
          this.newPurchaseModal=false
          this.clearPurchase()
        }
        if(data.code == '500') {
          this.$Message.info('添加新采购单失败')
        }
      })
    },
    // 清空采购单
    clearPurchase(){
      this.newGoodsForm=[]
      this.selectSupplier=''
      this.selectStaff=''
      this.supplierList.forEach(item => {
        item['_highlight'] = false
      })
      this.allSelectOffice.forEach(item => {
        item['_highlight'] = false
      })
    },
    // 名称筛选商品
    changeSelectGoodsName() {
      if(this.selectGoodsId == 0){
        let selectList=this.TheallGoodsList.filter(item => item.goodsId != this.selectGoodsId)
        this.changedGoodsList=selectList.map(item => {
          return {
            ...item
          }
        })
      }else{
        let selectList=this.TheallGoodsList.filter(item => item.goodsId == this.selectGoodsId)
        this.changedGoodsList=selectList
      }
    },
    // 时间筛选采购单
    updateByTime (val) {
      this.searchTimes=val
      let starttime=new Date(this.searchTimes[0]).getTime();
      let endtime=new Date(this.searchTimes[1]).getTime();
      this.changedPurchaseList=this.ThechangedPurchaseList.map(item => {
        return {
          ...item
        }
      })
      this.changedPurchaseList=this.changedPurchaseList.filter(item => {
        let createTimestap=new Date(item.createTime).getTime()
        return createTimestap>=starttime && createTimestap<=endtime
      })
    },
    // 商品下载
    exportgoodsData() {
      this.$refs['goodstablerefs'].exportCsv({
        filename: '商品数据'
      })
    },
    // 采购单下载
    exportpurchasetData() {
      this.$refs['purchasetablerefs'].exportCsv({
        filename: '采购单数据'
      })
    },
    // 获取所有采购单
    getAllPurchases() {
      this.purchaselistloading=true
      let purchase={purchase: JSON.stringify(this.ThePurchaseList)}
      getAllPurchase(purchase).then(data => {
        if(data.code == '200'){
          this.ThechangedPurchaseList=data.newpurchase
          this.ThechangedPurchaseList.forEach(item => {
            item['createTime']=moment(item.createTime).format('YYYY-MM-DD')
          })
          this.changedPurchaseList=this.ThechangedPurchaseList.map(item => {
            return {
              ...item
            }
          })
          this.purchaselistloading=false
        }
        if(data.code == '500'){
          this.$Message.info('无采购单或信息转换失败')
        }
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
    // 添加新供应商取消按钮
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
          this.getAllsupplierlist()
          this.$Message.info('供应商信息添加成功')
        }
        if(data.code == "500") {
          this.$Message.error('供应商信息添加失败')
        }
      })
    },
    // 添加新供应商二次取消按钮
    recancelNewSupplier() {
      this.readdNewSupplierModal=false
      this.$Message.info('取消添加供应商')
    },
    // 获取供应商详细信息
    getSupplierDetail(item,index) {
      getOnesupplier({supplierId: item.supplierId}).then(data => {
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
    // 修改供应商取消按钮
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
    // 修改供应商二次取消按钮
    reCancelSupplierDetail() {
      this.resupplierDetailModal=false
      this.$Message.info('取消修改供应商')
    },
    // 右上角删除供应商按钮
    deleteBtn() {
      this.deleteable=true
    },
    // 隐藏删除供应商按钮
    canceldeleteBtn() {
      this.deleteable=false
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
    // 二次取消删除按钮
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
    },


    // 获取所有销售单
    saleGetAllgoods() {
      saleSelectGoods({userId: this.$store.state.userId}).then(res => {
        if(res.code == '200'){
          this.saleAllGoodsList=res.allgoods
        }
        if(res.code == '300'){

        }
        if(res.code == '500'){
          this.$Message.info('暂时无员工')
        }
      })
    },
    // 获取所有会员信息
    getAllMemberInfo() {
      getAllMember({userId: this.$store.state.userId}).then(data => {
        if(data.code == '200'){
          this.memberList=data.members
        }
        if(data.code == '500') {
          this.$Message.info('无会员信息')
        }
      })
    },
    // 销售选择商品
    saleSelectGoodsList(currentRow, oldCurrentRow) {
      if(currentRow){
        this.saleAllGoodsList.forEach((item,index) => {
          if(item.goodsId === currentRow.goodsId) {
            item['_highlight'] = true
            let saleSelectGoods=item
            saleSelectGoods.amount=1
            saleSelectGoods.price=0
            this.saleSelectItemModal=false
            this.saleNewGoodsForm.push(saleSelectGoods)
            this.saleAllGoodsList.splice(index,1)
          }else{
            item['_highlight'] = false
          }
        })
      }
    },
    // 选择销售员
    saleSelectStaffList(currentRow, oldCurrentRow) {
      if(currentRow){
        this.saleAllSelectOffice.forEach(item => {
          if(item.staffId === currentRow.staffId) {
            item['_highlight'] = true
            this.saleSelectStaff=item
            this.saleSelectStaffModal=false
          }else{
            item['_highlight'] = false
          }
        })
      }
    },
    // 选择会员
    selectMemberList(currentRow, oldCurrentRow) {
      if(currentRow){
        this.memberList.forEach(item => {
          if(item.memberId === currentRow.memberId) {
            item['_highlight'] = true
            this.selectMember=item
            this.selectMemberModal=false
          }else{
            item['_highlight'] = false
          }
        })
      }
    },
    // 删除销售单商品列表中的商品项
    saleRemoveGoodsItem(row,index) {
      row['_highlight']=false
      this.TheallGoodsList.forEach(item => {
        if(item.goodsId === row.goodsId){
          this.saleAllGoodsList.push(item)
        }
      })
      this.saleNewGoodsForm.splice(index,1)
    },
    // 添加销售单
    btnAddSales() {
      var reg=new RegExp(/^[0-9]\d*|[0-9]\d*\.\d*$/)
      let ischecked=true
      if(this.saleNewGoodsForm.length == 0){
        this.$Message.error('请选择销售商品')
        ischecked=false
      } else {
        this.saleNewGoodsForm.forEach(item => {
          if(item.price === 0 || (!reg.test(item.price)) || item.price === null){
            this.$Message.error('请输入正确的单价')
            ischecked=false
            return
          }
          if(item.amount === null) {
            this.$Message.error('请输入销售数量')
            ischecked=false
            return
          }else{
            let tempitem=this.TheallGoodsList.filter(i => i.goodsId == item.goodsId)
            if(item.amount>tempitem[0].amount){
              this.$Message.error(item.name,'库存不足')
              ischecked=false
              return
            }
          }
        })
      }
      if(this.saleSelectStaff.staffId == null){
        this.$Message.error('请选择销售员')
        ischecked=false
      }
      if(ischecked) {
        let totalPrice=0
        this.saleNewGoodsForm.forEach(item => {
          totalPrice=totalPrice+item.amount*item.price
        })
        this.saleNewGoodsForm.totalPrice=totalPrice
        this.newSaleModal=true
      }
    },
    // 添加销售单确认
    resubmitAddSale() {
      let sales={
        staffId: this.saleSelectStaff.staffId,
        memberId: this.selectMember.memberId,
        totalPrice: this.saleNewGoodsForm.totalPrice,
        saleNewGoodsForm: JSON.stringify(this.saleNewGoodsForm)
      }
      addnewsales(sales).then(data => {
        if(data.code == '200'){
          this.$Message.info('添加新销售单成功')
          this.newSaleModal=false
          this.clearSales()
        }
        if(data.code == '500') {
          this.$Message.info('添加新销售单失败')
        }
      })
    },
    // 清空销售单
    clearSales() {
      this.saleNewGoodsForm=[]
      this.selectMember=''
      this.saleSelectStaff=''
      this.memberList.forEach(item => {
        item['_highlight'] = false
      })
      this.saleAllSelectOffice.forEach(item => {
        item['_highlight'] = false
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
  height: 50px;
  padding-left: 50px;
  padding-right: 40px;
  padding-top: 20px;
}
.purchaseheader{
  width: 100%;
  height: 130px;
  padding-left: 50px;
  padding-right: 40px;
}
.p-title{
  text-align: center;
  font-size: 18px;
}
/deep/ .ivu-divider-horizontal{
  margin: 15px 0;
}
.rowstyle{
  margin: 8px 0;
}
.spanstyle{
  margin-right: 20px;
  color: #9ea7b4;
}
.purchasebtnstyle{
  float: right;
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
.echartsbox{
  width: 50%;
  padding: 50px 100px;
}
.btnstyle{
  float: right;
  width: 100px;
  margin: 10px;
}
.leftbtn{
  float: left;
  width: 100px;
}
.cardstyle{
  margin-bottom: 10px;
  border-color: #66a9c9;
}
</style>
