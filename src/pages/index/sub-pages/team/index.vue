<script setup lang="ts">
import TnTabsItem from "@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs-item.vue"
import ArticleSimpleItem from "../../../../components/article-simple-item/index.vue"
import PageContainer from "../../components/page-container/index.vue"
import { useTeamPage } from "./composables"
import TnTabs from "@tuniao/tnui-vue3-uniapp/components/tabs/src/tabs.vue"
import TeamSimpleItem from "./components/team-simple-item/index.vue"
import TnSuspendButton from 'tnuiv3p-tn-suspend-button/index.vue'
import moment from 'moment';

const {
  triggerElementId,
  navbarOpacity,
  currentTabIndex,
  xiongjie,
  tabsData,
  teamList,
  updateTargetTriggerValue,
  navbarInitFinishHandle,
  opacityScrollHandle,
  initTransparentScroll,
  navSearchPage,
  getTagStatus,
  teamChangeHandle,
  toCreateTeam
} = useTeamPage()
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
  <PageContainer>
    <TnNavbar
      fixed
      :bottom-shadow="false"
      :placeholder="false"
      frosted
      back-icon=""
      back-text=""
      home-icon=""
      home-text=""
      @init-finish="navbarInitFinishHandle"
    >
      <view class="navbar">
        <view class="search-operation" @tap.stop="navSearchPage">
          <TnIcon name="search-menu-fill" />
        </view>
        <view class="category">
          <TnTabs
            v-model="currentTabIndex"
            bg-color="transparent"
            :bottom-shadow="false"
            :bar="false"
            :scroll="false"
            height="auto"
            active-color="#080808"
            font-size="34"
            @change="teamChangeHandle"
          >
            <TnTabsItem
              v-for="(item, index) in tabsData"
              :key="index"
              :title="item.text"
            />
          </TnTabs>
        </view>
      </view>
    </TnNavbar>
    <view class="page">
      <view
          v-for="(item, index) in teamList"
          :key="index"
          class="teams-item"
        >
          <TeamSimpleItem
            :title="item.name"
            :desc="item.description"
            :tag=getTagStatus(item.status)
            :has-join-num="item.hasJoinNum"
            :max-num="item.maxNum"
            :expire-time="moment(item.expireTime).format('YYYY-MM-DD HH:MM')"
            :create-time="moment(item.createTime).format('YYYY-MM-DD HH:MM')"
            :image="xiongjie"
            :id="item.id"
          />
      </view>
    </view>
  </PageContainer>

  <TnSuspendButton icon="add" @tap="toCreateTeam"/>

</template>

<style scoped lang="scss">
@import "./styles/index.scss";
</style>