<template>
    <div class="layout">
        <div class="header">
            头部
            <div style="float: right">
              <a @click="addnewsupplier">添加新供应商</a>
            </div>
            <div style="float: right">
              <a @click="deleteshow">删除</a>
            </div>
            <!-- 新增供应商 -->
            <Modal v-model="addnewsupplier_isShowModal" :mask-closable="false" @on-ok="submitnewsupplier('newsupplierRef')" @on-cancel="cancelnewsupplier" ok-text="添加">
                <p class="modaltitle">
                    <span>供应商信息</span>
                </p>
                <Form ref="newsupplierRef" :model="newsupplierForm" :rules="newsupplierRule" :label-width="80">
                    <FormItem label="名称" prop="name">
                        <Input v-model="newsupplierForm.name"></Input>
                    </FormItem>
                    <FormItem label="联系人" prop="contacts">
                        <Input v-model="newsupplierForm.contacts"></Input>
                    </FormItem>
                    <FormItem label="联系电话" prop="mobileNo">
                        <Input v-model="newsupplierForm.mobileNo"></Input>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                      <Input type="textarea" v-model="newsupplierForm.address" placeholder="请输入供应商详细地址" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </FormItem>
                </Form>
            </Modal>
            <!-- 新增供应商二次确认框 -->
            <Modal v-model="readdnewsupplier_isShowModal" :mask-closable="false" title="确认提示" @on-ok="resubmitnewsupplier" @on-cancel="recancelnewsupplier">
                <p>是否确认添加该供应商？</p>
            </Modal>
        </div>
        <div class="content">
            <Button @click="deleteselected">确定删除</Button>
            <CheckboxGroup v-model="selectdelete">
                <Card v-for="(item,index) in supplierlist" :value="item.supplierId" :key="index">
                    <div>
                        <Row>
                            <Col span="2" v-if="deleteable">
                                <Checkbox :label="item.supplierId">删除</Checkbox>
                            </Col>
                            <Col span="18">{{item.name}}</Col>
                            <Col span="4"><a @click="getsupplierdetail(item.supplierId)">编辑</a></Col>
                        </Row>
                    </div>
                </Card>
            </CheckboxGroup>
            <!-- 信息详情 -->
            <Modal v-model="supplierdetail_isShowModal" :mask-closable="false" @on-ok="submitsupplierdetail('supplierRef')" @on-cancel="cancelsupplierdetail" ok-text="修改">
                <p class="modaltitle">
                    <span>供应商信息</span>
                </p>
                <Form ref="supplierRef" :model="supplierForm" :rules="supplierRule" :label-width="80">
                    <FormItem label="名称" prop="name">
                        <Input v-model="supplierForm.name"></Input>
                    </FormItem>
                    <FormItem label="联系人" prop="contacts">
                        <Input v-model="supplierForm.contacts"></Input>
                    </FormItem>
                    <FormItem label="联系电话" prop="mobileNo">
                        <Input v-model="supplierForm.mobileNo"></Input>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                      <Input type="textarea" v-model="supplierForm.address" placeholder="请输入供应商详细地址" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </FormItem>
                </Form>
            </Modal>
            <!-- 信息详情二次确认框 -->
            <Modal v-model="resupplierdetail_isShowModal" :mask-closable="false" title="确认提示" @on-ok="resubmitsupplierdetail" @on-cancel="recancelsupplierdetail">
                <p>是否确认修改该供应商信息？</p>
            </Modal>
            <div>{{this.selectdelete}}</div>
        </div>
    </div>
</template>
<script>
import {addnewsupplier, getAllsupplier, getOnesupplier, updatesupplier} from '../http/moudules/goods'
export default {
  data () {
    return {
      // 数据列表
      supplierlist: [],
      // 信息详情弹框
      supplierdetail_isShowModal: false,
      // 信息详情二次确认框
      resupplierdetail_isShowModal: false,
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
      // 新增供应商
      addnewsupplier_isShowModal: false,
      // 新增供应商二次确认框
      readdnewsupplier_isShowModal: false,
      // 新增数据
      newsupplierForm: {
        name: '',
        contacts: '',
        mobileNo: '',
        address: ''
      },
      // 新增数据校验
      newsupplierRule: {
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
      // 删除选择器
      selectdelete: [],
      deleteable: false
    }
  },
  mounted() {
    this.getAllsupplierlist ()
  },
  methods: {
    // 获取所有供应商数据
    getAllsupplierlist () {
      getAllsupplier().then(data => {
        this.supplierlist=data.suppliers
      })
    },
    // 获取供应商详情
    getsupplierdetail (name) {
      getOnesupplier({supplierId: name}).then(data => {
        if(data.code == "200"){
          this.supplierForm=data.suppliers
          this.supplierdetail_isShowModal=true
        }
        if(data.code == "500") {
          this.$Message.error('供应商信息获取失败')
        }
      })
    },
    // 
    submitsupplierdetail (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.resupplierdetail_isShowModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    cancelsupplierdetail () {
      this.supplierdetail_isShowModal=false
      this.$Message.info('取消供应商信息编辑')
    },
    resubmitsupplierdetail () {
      updatesupplier(this.supplierForm).then(date => {
        if(data.code == '200'){
          this.supplierdetail_isShowModal=false
          this.$Message.info('供应商信息修改成功')
        }
        if(data.code == "500") {
          this.$Message.error('供应商信息获取失败')
        }
      })
    },
    recancelsupplierdetail () {
      this.resupplierdetail_isShowModal=false
      this.$Message.info('取消修改供应商信息')
    },
    // 新增供应商
    addnewsupplier () {
      this.addnewsupplier_isShowModal=true
    },
    submitnewsupplier (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.readdnewsupplier_isShowModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    cancelnewsupplier () {
      this.addnewsupplier_isShowModal=false
      this.$Message.info('取消添加供应商')
    },
    resubmitnewsupplier () {
      addnewsupplier(this.newsupplierForm).then(data => {
        if(data.code == '200'){
          this.$refs['newsupplierRef'].resetFields()
          this.readdnewsupplier_isShowModal=false
          this.getAllsupplierlist ()
          this.$Message.info('供应商信息添加成功')
        }
        if(data.code == "500") {
          this.$Message.error('供应商信息添加失败')
        }
      })
    },
    recancelnewsupplier () {
      this.readdnewsupplier_isShowModal=false
      this.$Message.info('取消添加供应商')
    },
    // 删除
    deleteshow () {
      this.deleteable=true
    },
    deleteselected () {
      
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
  text-align: center;
  padding: 50px;
}
</style>
