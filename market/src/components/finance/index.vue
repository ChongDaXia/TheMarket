<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle" v-model="tabvalue" @on-click="selectTab">
            <!-- 所有店铺盈利功能 -->
            <TabPane label="店铺盈利" name="name1">
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
  mounted() {
    
  },

  data() {
    return {
      tabvalue: 'name1',
    }
  },

  methods: {
    // tab函数
    selectTab(name){
      if(name === 'name1'){
      }
      if(name === 'name2'){
      }
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