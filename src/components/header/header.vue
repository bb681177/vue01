<template>
  <div class="header">
    <div class="content-wrapper">

      <!--头像-->
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>

      <!--头像右侧内容-->
      <div class="content">
        <!--第一行-->
        <div class="title">
          <div class="brand"></div>
          <div class="name">{{seller.name}}</div>
        </div>

        <!--第二行-->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>

        <!--第三行-->
        <div v-if="seller.supports" class="support">
          <!--根据不同优惠，显示不同图片：seller.supports[0].type获取到分类type, 将type值传入数组classMap中，calssMap根据type值匹配'图片的前缀名'-->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>

      <!--总数-->
      <div v-if="seller.supports" class="support-count" @click="showdetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <!--首页公告-->
    <div class="bulletin-wrapper" @click="showdetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <!--头部背景-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <!-- transition 过度动画效果-->
    <transition name="fade">
      <!--公告及优惠信息页-->
      <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">

          <!--商家名-->
          <h1 class="name">{{seller.name}}</h1>

          <!--评分组件 star.vue-->
          <div class="star-wrapper">
            <star v-bind:size="48" v-bind:score="seller.score"></star>
          </div>

          <!--优惠信息-->
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>

          <!-- v-for 获取优惠数据（supports）-->
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports" v-bind:key="index">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>

          <!--商家公告-->
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <!-- 获取数据-->
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <!-- Sticky footers 布局-->
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star'
export default {
  // props:用来接收 <vheader :banner="banner"></vheader> 传过来的数据
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      // uve 对标签初始化属性
      detailShow: false
    }
  },
  methods: {
    // 定义showdetail 这个方法，将detailShow属性改为true，这样就可以将detail标签显示出来
    // 作用：点击页面‘数据个数’位置的时候，可以显示浮动层detail这个页面。
    showdetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
  },
  created () {
    // 根据不同优惠，显示不同图片：根据分类type，创建一个数组
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    // 自定义一个<star>标签
    star
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/icon.styl"
  .header
    position :relative
    overflow :hidden
    color : #fff
    background rgba(7,17,27,0.5)
    .content-wrapper
      position :relative
      padding : 24px 12px 18px 24px
      font-size : 0
      .avatar
        display : inline-block
        vertical-align :top
        img
          border-radius :2px  /*2px 圆角*/
      .content
        display : inline-block
        font-size : 14px
        margin-left : 16px
        .title
          margin :2px 0 8px 0
          .brand
            display : inline-block
            float :left
            vertical-align : top
            width : 30px
            height : 18px
            bg-image('brand') /*图片文件名开头是brand ，所以传入brand，函数会自动匹配*/
            background-size :30px 18px
            background-repeat : no-repeat
          .name
            float :left
            margin-left : 6px
            font-size : 16px
            line-height : 18px
            font-weight : bold /*加粗*/

        .description
          font-size : 12px
          line-height : 30px
        .support
          .icon
            display : inline-block
            width :12px
            height :12px
            margin-right :4px
            background-size :12px 12px  /*CSS3 规定背景图像的尺寸*/
            background-repeat :no-repeat
            /*根据不同优惠，显示不同图片*/
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            vertical-align :top
            line-height :12px
            font-size :10px

      .support-count
        position :absolute
        right :12px
        bottom :14px
        padding :0 8px
        height :24px
        line-height :24px
        border-radius :14px
        background :rgba(0,0,0,0.2)  /*透明效果*/
        text-align :center
        .count
          vertical-align :top
          font-size :10px
        .icon-keyboard_arrow_right
          margin-left :2px
          line-height :24px
          font-size :10px
    .bulletin-wrapper
      position relative
      height :28px
      line-height :28px
      padding :0 22px 0 12px
      white-space: nowrap
      overflow : hidden
      text-overflow :ellipsis
      background :rgba(7,17,27,0.2)  /*透明效果*/
      .bulletin-title
        vertical-align :top
        margin-top :9px
        display :inline-block
        width :22px
        height :12px
        bg-image('bulletin')
        background-size :22px 12px
        background-repeat :no-repeat
      .bulletin-text
        vertical-align :top
        margin: 0 4px
        font-size :10px
      .icon-keyboard_arrow_right
        position :absolute
        font-size :10px
        right :12px
        top: 9px

    .background
      position : absolute
      top: 0
      left: 0
      width :100%
      height :100%
      z-index :-1
      filter :blur(10px)
    .detail
      position :fixed
      z-index :100
      width :100%
      height :100%
      top: 0
      left :0
      overflow :auto
      background rgba(7,17,27,0.8)
      &.fade-enter-active, &.fade-leave-active
        transition: all .6s;
      &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */
        opacity: 0;
      .detail-wrapper
        min-height :100%
        width :100%
        .detail-main
          margin-top :64px
          padding-bottom :64px
          .name
            line-height :16px
            text-align :center
            font-size :16px
            font-weight :700 //字体粗细值
          .star-wrapper
            margin-top :18px
            padding :2px 0
            text-align :center
          .title
            display :flex
            width :80%
            margin 28px auto 24px auto
            .line
              flex :1
              position relative
              top: -6px
              border-bottom :1px solid rgba(255,255,255,0.2)  //下边框线
            .text
              padding :0 12px
              font-weight 700
              font-size :14px
          .supports
            width :80%
            margin 0 auto
            .support-item
              padding:0 12px
              margin-bottom :12px
              font-size 0
              &:last-child
                margin-bottom :0
              .icon
                display : inline-block
                width :16px
                height :16px
                vertical-align :top
                margin-right :6px
                background-size :16px 16px
                background-repeat :no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height :16px
                font-size :12px
          .bulletin
            width :80%
            margin :0 auto //div 水平居中
            .content
              padding :0 12px
              line-height :24px
              font-size :12px
      .detail-close
        position :relative
        width :32px
        height :32px
        margin :-60px auto 0 auto
        clear :both
        font-size :32px
</style>
