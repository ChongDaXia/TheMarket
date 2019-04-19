<template>
    <div class="layout">
        <!-- tabs列表 -->
        <Tabs class="tabstyle">
            <!-- 维修申请功能 -->
            <TabPane label="添加">
                
            </TabPane>
            
            <!-- 维修列表 -->
            <TabPane label="列表">
                <!-- 搜索条件 -->
                <div class="header">
                    
                </div>
                <!-- 数据列表 -->
                <div class="content">
                    
                </div>
                <!-- 信息详情 -->
                
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
export default {
  mounted() {
    this.getAllUserInfo()
  },
  data() {
    return {
      
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
