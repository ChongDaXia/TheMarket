<template>
    <div class="layout">
        <Table :columns="columns1" :data="data1">
        </Table>
    </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      columns1: [
          {
            title: 'Name',
            key: 'name'
          }, {
            title: 'Age',
            key: 'age'
          }, {
            title: 'Address',
            key: 'address'
          }
      ],
      data1: [
        {
          name: 'John',
          age: 18,
          address: '11111111111111',
          date: '2015-4-6'
        }, {
          name: 'John',
          age: 18,
          address: '11111111111111',
          date: '2015-4-6'
        }
      ]
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
</style>
