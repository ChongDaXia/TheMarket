<template>
    <div class="layout">
        <Tabs class="tabstyle">
            <TabPane label="添加">
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
            
            <TabPane label="删除">
                
            </TabPane>

            <TabPane label="统计">
                标签二的内容
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
import {selectGoods} from '@/http/moudules/goods'
import {selectPurchaseStaff} from '@/http/moudules/staff'
export default {
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
      ]
    }
  },

  mounted() {
    this.getSelectStaff()
  },

  methods: {
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
  height: 200px;
  padding: 50px;
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
