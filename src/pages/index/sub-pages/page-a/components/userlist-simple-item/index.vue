<script lang="ts" setup>
import { ref } from "vue"

withDefaults(
  defineProps<{
    /**
     * @description 用户昵称
     */
    username: string
    /**
     * @description 图片地址
     */
    image: string
    /**
     * @description 标签
     */
    tags: Array<string>


  }>(),
  {
    image: "",
    title: "",
    tags: ["男", "大四"]
  }
)

const hasJoin = ref(true)
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
}
</script>
// #endif

<template>
  <view class="search-item tn-shadow-md">
    <view class="item-image tn-mr-lg">
      <image class="tn-image" :src="image" mode="aspectFill" />
    </view>

    <!--    主要信息-->
    <view class="item-info">
      <view class="info-detail">
        <view class="tn-flex tn-flex-center-between">
          <view class="username">{{ username }}</view>
        </view>
        <view class="tag-wrapper">
          <view class="tag-data"
                v-for="(item,index) in JSON.parse(tags)"
                :key="index"
          >
            {{ item && `# ${item}` }}
          </view>
        </view>

      </view>
      <view class="info-button ">
        <TnButton type="primary">联系我</TnButton>
      </view>
    </view>

  </view>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
