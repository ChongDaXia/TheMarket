<template>
    <div class="layout">
        <div class="header">
            <!-- 搜索条件 -->
            <Select v-model="selectamount" style="width:200px;margin-right:30px" placeholder="请选择库存">
                <Option v-for="item in selectamountlist" :value="item" :key="item">
                    {{item}}
                </Option>
            </Select>
            <Select v-model="selectId" filterable style="width:200px;margin-right:30px" placeholder="请选择名称">
                <Option v-for="item in goodslist" :value="item.goodsId" :key="item.goodsId">{{item.name}}</Option>
            </Select>
        </div>
        <!-- 数据列表 -->
        <div class="content">
            <Table height="330" border stripe :columns="tabletitle" :data="goodslist"></Table>
        </div>
        <!-- 信息详情 -->
        <Modal v-model="goodsdetail" :mask-closable="false" @on-ok="submitgoodsdetail('goodsdetailRef')" @on-cancel="cancelgoodsdetail" ok-text="修改">
            <p class="modaltitle">
                <span>基本信息</span>
            </p>
            <Form ref="goodsdetailRef" :model="goodsdetailForm" :rules="goodsdetailRule" :label-width="80">
                <FormItem label="商品Id" prop="goodsId">
                    <Input v-model="goodsdetailForm.goodsId" disabled></Input>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input v-model="goodsdetailForm.name"></Input>
                </FormItem>
                <FormItem label="库存数量" prop="amount" style="text-align:left">
                      <InputNumber v-model="goodsdetailForm.amount" :min="0"></InputNumber>
                </FormItem>
                <FormItem label="已售数量" prop="salesCount" style="text-align:left">
                      <InputNumber v-model="goodsdetailForm.salesCount" :min="0" disabled></InputNumber>
                </FormItem>
            </Form>
        </Modal>
        <!-- 信息详情二次确认框 -->
        <Modal v-model="regoodsdetail" :mask-closable="false" title="确认提示" @on-ok="resubmitgoodsdetail" @on-cancel="recancelgoodsdetail">
            <p>是否确认修改该商品信息？</p>
        </Modal>
    </div>
</template>
<script>
import {getAllgoods, getOnegoods, updategoods} from '../http/moudules/goods'
export default {
  name: 'goodList',
  data () {
    return {
      // 库存筛选
      selectamount: '',
      selectamountlist: [
        '所有',
        '零库存'
      ],
      // 名称筛选
      selectId: '',
      // 数据列表
      goodslist: [],
      // 表格数据
      tabletitle: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '库存数量',
          key: 'amount'
        },
        {
          title: '已售数量',
          key: 'salesCount'
        },
        {
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
                    this.show(params.index)
                  }
                }
              }, '商品信息修改'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.updatepwd(params.index)
                  }
                }
              }, '商品进库')
            ])           
          }
        }
      ],
      // 信息详情弹框
      goodsdetail: false,
      // 信息详情数据
      goodsdetailForm: {
        goodsId: '',
        name: '',
        amount: 0,
        salesCount: 0,
      },
      // 信息详情数据校验
      goodsdetailRule: {
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
        }]
      },
      // 信息详情二次确认框
      regoodsdetail: false
    }
  },
  mounted() {
    this.getAllgoodsList()
  },
  watch: {
    selectamount: 'changelistbyamount',
    selectId: 'changelistbygoodsId'
  },
  methods: {
    // 获取所有商品信息
    getAllgoodsList () {
      getAllgoods().then(data => {
        if(data.code == '200'){
          this.goodslist = data.goodss;
        }
        if(data.code == "500") {
          this.$Message.error('获取所有商品失败')
        }
      })
    },
    // 表格中的按钮函数(详情)
    show (index) {
      getOnegoods({goodsId: this.goodslist[index].goodsId}).then(data => {
        if(data.code == '200'){
          this.goodsdetailForm=data.goodss
          this.goodsdetail=true
        }
        if(data.code == "500") {
          //获取信息失败
          this.$Message.error('商品详情获取失败')
        }
      })
    },
    updatepwd () {

    },
    // 信息详情
    submitgoodsdetail (name) {
      this.$refs[name].validate(valid => {
        if(valid){
          this.regoodsdetail=true
        } else {
          this.$Message.error('填写内容不符合规范')
        }
      })
    },
    cancelgoodsdetail () {
      this.goodsdetail=false
    },
    // 信息详情二次确认框
    resubmitgoodsdetail () {
      updategoods(this.goodsdetailForm).then(data => {
        if(data.code == '200'){
          this.regoodsdetail=false
          this.$Message.info('商品信息修改成功')
          this.getAllgoodsList()
        }
        if(data.code == "500") {
          this.$Message.error('商品信息保存失败')
        }
      })
    },
    recancelgoodsdetail () {
      this.regoodsdetail=false
      this.$Message.info('取消修改商品信息')
    },
    // 筛选函数
    changelistbyamount () {
      if (this.selectamount === '所有') {
        this.getAllgoodsList()
      } 
      if (this.selectamount === '零库存'){
        getAllgoods({amount: '0'}).then(data => {
          if(data.code == '200'){
            this.goodslist = data.goodss;
          }
          if(data.code == "500") {
            this.$Message.error('获取所有商品失败')
          }
        })
      }
    },
    changelistbygoodsId () {
      getAllgoods({goodsId: this.selectId}).then(data => {
        if(data.code == '200'){
          this.goodslist = data.goodss;
        }
        if(data.code == "500") {
          this.$Message.error('获取所有商品失败')
        }
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
