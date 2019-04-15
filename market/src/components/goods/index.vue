<template>
    <div class="layout">
        <Tabs size="small">
            <TabPane label="添加">
                <div class="header">
                    <Button>添加商品</Button>
                </div>
                <!-- 数据列表 -->
                <div class="content">
                    <Table 
                        height="330" 
                        border 
                        stripe 
                        :columns="newTableTitle" 
                        :data="newGoodsList"
                    />
                </div>
            </TabPane>
            
            <TabPane label="删除">
                
            </TabPane>

            <TabPane label="统计">
                标签二的内容
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
  data () {
    return {
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

  methods: {
    
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
  height: 60px;
  padding: 50px;
}
.content{
  width: 100%;
  padding: 50px;
}
</style>
