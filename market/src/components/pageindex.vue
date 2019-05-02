<template>
    <div class="layout">
        <Carousel 
            autoplay 
            :autoplay-speed=5000 
            v-model="v" 
            loop>
            <CarouselItem>
                <div class="itemstyle">
                    <img src="../assets/images/p1.jpg"/>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="itemstyle">
                    <img src="../assets/images/p2.jpg"/>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="itemstyle">
                    <img src="../assets/images/p3.jpg"/>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="itemstyle">
                    <img src="../assets/images/p4.jpg"/>
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>

<script>
export default {
  mounted() {
    localStorage.setItem('selectmemu','主页')
    this.$store.dispatch('setSelectMemu','主页')
  },

  data() {
    return {
      v: 0
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
    background: #f5f7f9;
}
.itemstyle{
    width: 100%;
    height: 500px;
    background: #66a9c9;
    text-align: center;
    padding-top: 50px;
}
</style>       