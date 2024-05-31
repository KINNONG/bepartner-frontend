<script lang="ts" setup>
import TnFooter from '@tuniao/tnui-vue3-uniapp/components/footer/src/footer.vue'
import PageContainer from '../../components/page-container/index.vue'
import { useSubPage } from './composables'

const {
  navBarInfo,
  userInfo,
  loginHandle,
  navUserInfoPage,
  navCommonProblemPage,
  navMemberRightsPage,
  navOrderListPage,
  navUserLoginPage
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
    <!-- 顶部背景 -->
    <view class="top-bg" />
    <!-- 页面内容 -->
    <view class="page" :style="{ paddingTop: `${navBarInfo.height + 12}px` }">
      <!-- 用户信息 -->
      <view v-if="userInfo?.id" class="user-info" @tap.stop="navUserInfoPage">
        <view class="info-content">
          <view class="avatar">
            <image class="tn-image" :src="userInfo?.avatarUrl" mode="aspectFill" />
          </view>
          <view class="content">
            <view class="nickname">{{ userInfo?.username }}</view>
            <view class="uid">
              <view class="text">id: {{ userInfo?.planetCode }}</view>
              <view class="copy">
                <TnIcon name="copy" />
              </view>
            </view>
          </view>
        </view>
        <view class="setting-icon">
          <TnIcon name="install" />
        </view>
      </view>
      <view v-else class="login-btn tn-shadow" @tap.stop="navUserLoginPage">
        <view class="icon">
          <TnIcon name="wechat" />
        </view>
        <view class="text">点击登录</view>
      </view>

      <!-- 分类 -->
      <view class="category tn-shadow">
        <view class="category-item" @tap.stop="navUserInfoPage">
          <view class="icon">
            <TnIcon name="identity" />
          </view>
          <view class="title">个人信息</view>
        </view>
        <view class="category-item" @tap.stop="navCommonProblemPage">
          <view class="icon">
            <TnIcon name="help" />
          </view>
          <view class="title">常见问题</view>
        </view>
      </view>

      <!-- 列表 -->
      <view class="list tn-shadow">
        <view class="list-item">
          <view class="left">
            <view class="icon">
              <TnIcon name="coworker" />
            </view>
            <view class="text"> 我创建的队伍 </view>
          </view>
          <view class="right">
            <view class="icon">
              <TnIcon name="right" />
            </view>
          </view>
        </view>
        <view class="list-item">
          <view class="left">
            <view class="icon">
              <TnIcon name="my-love" />
            </view>
            <view class="text"> 我加入的队伍 </view>
          </view>
          <view class="right">
            <view class="icon">
              <TnIcon name="right" />
            </view>
          </view>
        </view>
      </view>

      <!-- 列表 -->
      <view class="list tn-shadow">
        <TnButton only-button open-type="contact">
          <view class="list-item">
            <view class="left">
              <view class="icon">
                <TnIcon name="service-fill" />
              </view>
              <view class="text"> 在线客服 </view>
            </view>
            <view class="right">
              <view class="icon">
                <TnIcon name="right" />
              </view>
            </view>
          </view>
        </TnButton>
        <TnButton only-button open-type="feedback">
          <view class="list-item">
            <view class="left">
              <view class="icon">
                <TnIcon name="tip-fill" />
              </view>
              <view class="text"> 问题反馈 </view>
            </view>
            <view class="right">
              <view class="icon">
                <TnIcon name="right" />
              </view>
            </view>
          </view>
        </TnButton>
        <view class="list-item">
          <view class="left">
            <view class="icon">
              <TnIcon name="tel-circle-fill" />
            </view>
            <view class="text"> 技术热线 </view>
          </view>
          <view class="right">
            <view class="text"> 131****2677 </view>
          </view>
        </view>
      </view>
    </view>
<!--    <view class="footer">-->
<!--    <TnFooter :fixed="false" content="图鸟科技 提供技术支持" />-->
<!--  </view>-->
  </PageContainer>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
