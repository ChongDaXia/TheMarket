<template>
    <div>
        <div>图标页面</div>

        <echarts
          style="width: 300px; height: 400px;"
          refName="line"
          type="line"
          :chartsData="echartDataLine"
        />
    </div>
</template>
<script>
import echarts from '../echarts'
export default {
  components: {
    echarts
  },
  
  data () {
    return {
      // 图表显示数据
      echartDataLine: {
        x: ['啊','哦','额','哈'],
        data: [{name: '', data: [500,200,360,100]}]
      }
    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

