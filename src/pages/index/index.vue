<script setup lang="ts">
import { nextTick } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import TnTabbar from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar.vue'
import TnTabbarItem from '@tuniao/tnui-vue3-uniapp/components/tabbar/src/tabbar-item.vue'

/* 引入子页面 */
import PageA from './sub-pages/page-a/index.vue'
import PageE from './sub-pages/page-e/index.vue'
import Team from './sub-pages/team/index.vue'

import { useIndex, useIndexCustomStyle } from './composables'

const {
  tabbarData,
  currentTabbarIndex,
  renderPageStatus,
  tabbarChangeHandle,
  scrollViewScrollHandle,
} = useIndex()
const { pageContainerStyle } = useIndexCustomStyle(currentTabbarIndex)

onLoad((options: any) => {
  // 当前进入子页面的索引值
  const index = Number(options?.index || 0)
  tabbarChangeHandle(index)
  // 设置默认被渲染的页面
  renderPageStatus.value[index] = true
  nextTick(() => {
    // 设置当前子页面的索引值
    currentTabbarIndex.value = index
  })
})
</script>

<template>
  <view class="page">
    <!-- 首页子页面 -->
    <view
      v-if="renderPageStatus[0]"
      class="page__container"
      :style="pageContainerStyle(0)"
    >
      <scroll-view
        class="scroll-view"
        scroll-y
        @scroll="scrollViewScrollHandle"
      >
        <PageA />
      </scroll-view>
    </view>

    <view
      v-if="renderPageStatus[1]"
      class="page__container"
      :style="pageContainerStyle(1)"
    >
      <scroll-view
        class="scroll-view"
        scroll-y
        @scroll="scrollViewScrollHandle"
      >
        <Team />
      </scroll-view>
    </view>

    <view
      v-if="renderPageStatus[2]"
      class="page__container"
      :style="pageContainerStyle(2)"
    >
      <scroll-view
        class="scroll-view"
        scroll-y
        @scroll="scrollViewScrollHandle"
      >
        <PageE />
      </scroll-view>
    </view>
  </view>

  <!-- 底部导航栏 -->
  <TnTabbar
    v-model="currentTabbarIndex"
    fixed
    frosted
    switch-animation
    :placeholder="false"
    font-size="20"
    @change="tabbarChangeHandle"
  >
    <TnTabbarItem
      v-for="(item, index) in tabbarData"
      :key="index"
      :text="item.text"
      :icon="item.icon"
      :active-icon="item.activeIcon"
      :bulge="index === 1"
      :icon-size="index === 1 ? '56' : ''"
    />
  </TnTabbar>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
