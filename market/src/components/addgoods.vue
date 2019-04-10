<template>
    <div class="layout">
        <div class="header">
            <div>添加新商品</div>
        </div>
        <div class="content">
            <!-- 添加新商品 -->
            <Button @click="addnewpurchaseitembtn">添加商品项</Button>
            <Modal>
                <Form ref="newGoodsRef" :model="newGoodsForm" :rules="newGoodsRules" :label-width="80">
                  <FormItem label="名称" prop="name">
                      <Input v-model="newGoodsForm.name" placeholder="仅支持2-20位大小写字母或数字、中文"></Input>
                  </FormItem>
                  <FormItem label="数量" prop="amount" style="text-align:left">
                      <InputNumber v-model="newGoodsForm.amount" :min="0"></InputNumber>
                  </FormItem>
                  
                  <!-- 提交 -->
                  <div class="form-item">
                      <Button class="login-btn" shape="circle" @click="resetAdd('newGoodsRef')">重置</Button>
                      <Button class="login-btn" shape="circle" @click="submitAddGoods('newGoodsRef')">添加</Button>
                  </div>
                  <Modal v-model="addGoodsModal" title="确认提示" @on-ok="resubmitAddGoods" @on-cancel="cancelAddGoods">
                      <p>是否确认保存该商品？</p>
                  </Modal>
              </Form>
            </Modal>
            <div class="formtext">
                <FormItem label="供应商" prop="supplierId" style="text-align:left">
                      <Button class="login-btn" shape="circle" @click="selectsupplier">选择</Button>
                  </FormItem>
                  <!-- 选择供应商 -->
                  <Modal v-model="selectsupplier_isShowModal" :mask-closable="false"  @on-ok="okselectsupplier"  @on-cancel="cancelselectsupplier" width="400">
                      <p class="modaltitle">
                          <span>基本信息</span>
                      </p>
                      <Table ref="supplierTableRef" height="300" border :columns="supplierTabletitle" :data="supplierlist" 
                          @on-select="selectsupplierlist"
                          @on-select-cancel="cancelselectsupplierlist"
                          @on-select-all="selectsupplierlist"
                          @on-select-all-cancel="cancelselectsupplierlist">
                      </Table>
                  </Modal>
                  <div>
                      <Tag v-for="(item, index) in allreadyCheckSupplierlist" v-if="item['_checked']" :key="index" :name="index" closable @on-close="supplierClose">{{item.name}}</Tag>
                  </div>
            </div>
        </div>
    </div>
</template>
<script>
import {addnewgoods,getAllsupplier} from '../http/moudules/goods'
export default {
  name: 'addgoods',
  data () {
    return {
            // 添加新商品
      newGoodsForm: {
        name: '',
        amount: 0,
        supplierId: []
      },
      newGoodsRules: {
        name: [{
          required: true,
          trigger: 'blur, change',
          pattern:/^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
          message: '仅支持2-20位大小写字母或数字、中文'
        }],
        amount: [{
          trigger: 'blur, change',
          pattern:/^[0-9]*$/,
          message: '请输入数字'
        }],
        supplierId: [{
          required: true,
          message: '请选择供应商'
        }]
      },
      // 添加新商品二次确认框
      addGoodsModal: false,
      // 选择供应商
      selectsupplier_isShowModal: false,
      // 供应商列表
      supplierlist: [],
      allreadyCheckSupplierlist: [],
      supplierTabletitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },{
          title: '名称',
          key: 'name'
        }
      ],
    }
  },
  mounted() {
    this.getAllSupplier()
  },
  methods: {
        // 选择供应商
    selectsupplier () {
      let checksupplierIdList = this.allreadyCheckSupplierlist.map(item => item.supplierId);
      this.supplierlist.forEach((item, index) => {
        if(checksupplierIdList.indexOf(item.supplierId) !== -1) {
          item['_checked'] = true;
        } else {
          item['_checked'] = false;
        }
        this.$set(this.supplierlist, index, item)
      })
      this.selectsupplier_isShowModal = true;  
    },
    getAllSupplier () {
      getAllsupplier().then(data => {
        if(data.code == '200'){
          this.supplierlist = data.suppliers;
        }
        if(data.code == "500") {
          this.$Message.error('供应商获取失败')
        }
      })
    },
    selectsupplierlist (selection, row) {
      // 全选
      if (!row && selection && selection.length > 0) {
        this.supplierlist.forEach(item => {
          item['_checked'] = true
        })
      } else {
        // 单选
        this.supplierlist.forEach(item => {
          if(item.supplierId === row.supplierId) {
            item['_checked'] = true
          }
        })
      }
    },
    cancelselectsupplierlist (selection, row) {
      // 全不选
      if (!row && selection && selection.length == 0) {
        this.supplierlist.forEach(item => {
          item['_checked'] = false
        })
      } else {
        // 单不选
        this.supplierlist.forEach(item => {
          if(item.supplierId === row.supplierId) {
            item['_checked'] = false
          }
        })
      }
    },
    // 弹框取消供应商
    cancelselectsupplier () {
      this.selectsupplier_isShowModal=false
    },
    // 弹框确认供应商
    okselectsupplier () {
      let list = this.supplierlist.filter(item => item['_checked']);
      let tempList = [];
      list.forEach(item => {
        tempList.push({
          ...item
        })
      })
      this.allreadyCheckSupplierlist = tempList;
      this.selectsupplier_isShowModal=false
    },
    // 标签删除供应商
    supplierClose (event, index) {
      let list = this.allreadyCheckSupplierlist.filter((item, tempIndex) => tempIndex !== index)
      this.allreadyCheckSupplierlist = list;
    },
    // 保存新商品
    submitAddGoods (name) {
      this.newGoodsForm.supplierId = this.allreadyCheckSupplierlist.map(item => item.supplierId);
      this.$refs[name].validate(valid => {
        if(valid){
          this.addGoodsModal=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    resubmitAddGoods () {
      addnewgoods(this.newGoodsForm).then(data => {
        if(data.code == '200'){
          this.addGoodsModal=false
          this.$Message.info('新商品添加成功')
          this.$refs['newGoodsRef'].resetFields()
        }
        if(data.code == "500") {
          this.$Message.error('新商品添加失败')
        }
      })
    },
    cancelAddGoods () {
      this.addGoodsModal=false
      this.$Message.info('取消添加新商品')
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
}
.header{
  width: 100%;
  height: 100px;
}
.content{
  width: 100%;
  text-align: center;
}
.formtext{
  width: 50%;
  margin: 0 auto;
}
.modaltitle{
  width: 100%;
  height: 100px;
  text-align: center;
  font-size: 24px;
  padding-top: 25px;
}
</style>
