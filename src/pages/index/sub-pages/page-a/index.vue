<script lang="ts" setup>
import TnSwiper from '@tuniao/tnui-vue3-uniapp/components/swiper/src/swiper.vue'
import TnNoticeBar from '@tuniao/tnui-vue3-uniapp/components/notice-bar/src/notice-bar.vue'
import PageContainer from '../../components/page-container/index.vue'
import TeamSimpleItem from "../team/components/team-simple-item/index.vue"
import { useSubPage } from './composables'
import Title from '@/components/title/index.vue'
import UserlistSimpleItem from "./components/userlist-simple-item/index.vue"

const {
  triggerElementId,
  navbarOpacity,
  swiperData,
  userList,
  noticeData,
  adCapsuleData,
  hotCaseData,
  tnNavPage,
  navbarInitFinishHandle,
  navAboutPage,
  navSearchPage,
} = useSubPage()
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>
// #endif

<template>
  <PageContainer>
    <view class="page">

      <!-- 顶部搜索区域 -->
      <TnNavbar
        fixed
        :placeholder="false"
        back-icon=""
        back-text=""
        home-icon=""
        :bottom-shadow="false"
        :bg-color="`rgba(255, 255, 255, ${navbarOpacity})`"
        @init-finish="navbarInitFinishHandle"
      >
        <view class="navbar">
          <view class="navbar__logo" @tap.stop="navAboutPage">
            <image
              class="tn-image"
              src="https://kinnong-1301438479.cos.ap-guangzhou.myqcloud.com/yupi-project%2F2f419034-d1b1-46ea-82af-8d95ce584506.webp"
              mode="aspectFill"
            />
          </view>
          <view
            class="search-box"
            :style="{
              backgroundColor: `rgba(248, 247, 248 , ${Math.max(
                0.25,
                navbarOpacity
              )})`,
              color: `rgba(0, 0, 0 , ${Math.max(0.45, navbarOpacity)})`,
            }"
            @tap.stop="navSearchPage"
          >
            <view class="search-box__icon">
              <TnIcon name="search" />
            </view>
            <view class="search-box__tips">想搜索点什么呢</view>
          </view>
        </view>
      </TnNavbar>

      <!-- 顶部轮播图 -->
      <view class="top-swiper">
        <TnSwiper :data="swiperData" width="100%" height="100%" indicator loop>
          <template #default="{ data }">
            <view class="swiper-item">
              <image class="tn-image" :src="data" mode="aspectFill" />
            </view>
          </template>
        </TnSwiper>
      </view>

      <!-- 通知 -->
      <view :id="triggerElementId" class="notice-bar">
        <TnNoticeBar
          :data="noticeData"
          direction="vertical"
          loop
          left-icon="sound"
        />
      </view>

      <!-- 页面内容 -->
      <view class="sub-page-container" :id="triggerElementId">
        <view class="page">
          <view
            v-for="(item, index) in userList"
            :key="index"
            class="users-item"
          >
            <UserlistSimpleItem
              :username="item.username"
              :image="item.avatarUrl"
              :tags="item.tags"
            />
          </view>
        </view>
      </view>
    </view>
  </PageContainer>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
