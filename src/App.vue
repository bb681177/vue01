<template>
  <div id="app">
    <vheader :seller="seller"></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item"
      ><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view></router-view>
    <div class="content">
      I am content
    </div>
  </div>
</template>

<script>

import vheader from './components/header/header'

export default {
  data () {
    return {
      // 必须初始化数据，即使为空
      // 用vue指令将数据传给组件 <vheader :banner="banner"></vheader>
      // header.vue中需要获取数据
      seller: {}
    }
  },
  // created 生命周期函数 需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等
  created () {
    var url = '/api/seller'
    this.$http.get(url).then(response => {
      // 获取数据成功
      console.log(response)
      // response.body.data 这里
      this.seller = response.body.data
    }, response => {
      // 获取数据失败
      console.log(response)
    })
  },
  name: 'app',
  components: {
    vheader
  }

}

</script>

<style lang="stylus" scoped>
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
    .tab-item
      flex: 1
      text-align: center
</style>
