<template>
    <div class="layout">
        <div>{{addname}}</div>
        <div class="header"></div>
        <div>页面内容</div>
    </div>
</template>
<script>
export default {
  name: 'addSome',
  data () {
    return {
      // 页面名称
      addname: ''
    }
  },
  // 页面加载时完成的内容
  mounted() {
      this.addname=this.$route.query.theid
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
}
</style>
