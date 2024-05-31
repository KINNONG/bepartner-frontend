<script lang="ts" setup>
import { onPageScroll, onReady } from "@dcloudio/uni-app"
import TnSearchBox from "@tuniao/tnui-vue3-uniapp/components/search-box/src/search-box.vue"
import { ref, } from "vue"
import { useSearch } from "./composables"
import Title from "@/components/title/index.vue"




const activeIndex = ref(0)


const {
  currentTabbarIndex,
  navbarHeight,
  leftScrollViewTop,
  scrollViewHeight,
  scrollViewBasicTop,
  searchValue,
  triggerElementId,
  navbarOpacity,
  historyList,
  labelList,
  tabList,
  searchResult,
  navbarInitFinishHandle,
  initTransparentScroll,
  searchConfirmLabel,
  seachClearValue,
  searchConfirmHandle,
  historyClickHandle,
  clearLabels,
  getScrollViewInfo,
  opacityScrollHandle,
  findTabTextById
} = useSearch()

onReady(() => {
  initTransparentScroll()
  getScrollViewInfo()
})


onPageScroll((e) => {
  const top = e.scrollTop
  opacityScrollHandle(top)
})

// 点击了分类导航，切换样式
const tabbarItemClass = (index: number) => {
  if (index === currentTabbarIndex.value) {
    return "tn-classify__tabbar__item--active tn-white_bg"
  } else {
    let clazz = "tn-gray-light_bg tn-flex tn-flex-center-center"
    if (currentTabbarIndex.value > 0 && index === currentTabbarIndex.value - 1) {
      clazz += " tn-classify__tabbar__item--active--prev"
    }
    if (currentTabbarIndex.value < tabList.length && index === currentTabbarIndex.value + 1) {
      clazz += " tn-classify__tabbar__item--active--next"
    }
    return clazz
  }
}

// 点击切换分类标签
const clickClassifyNav = (index: number) => {
  if (currentTabbarIndex.value === index) {
    return
  }
  currentTabbarIndex.value = index

}

// 点击选择标签
const chooseTabs = (id: number) =>{
  const index = labelList.value.indexOf(id);
  if(index === -1){
    // 如果ID不在数组中，添加到数组中（选中）
    labelList.value.push(id);
    console.log(labelList.value)
  }else {
    // 如果ID已存在于数组中，从数组中移除（取消选中）
    labelList.value.splice(index, 1);
    console.log(labelList.value)
  }

}
</script>

<template>
  <TnNavbar
    fixed
    :bg-color="`rgba(255, 255, 255, ${navbarOpacity})`"
    :bottom-shadow="false"
    :placeholder="false"
    @init-finish="navbarInitFinishHandle"
  />

  <view class="search-page" :style="{ paddingTop: `${navbarHeight + 20}px` }">
    <!-- 搜索操作栏 -->
    <view class="search-operation">
      <view class="input">
        <TnSearchBox
          v-model="searchValue"
          :search-button="false"
          shape="round"
          size="sm"
          placeholder="请输入您要搜索的标签"
          @search="searchConfirmLabel"
          @clear="seachClearValue"
        />
      </view>
<!--      <view class="button">-->
<!--        <TnButton-->
<!--          bg-color="tn-blue"-->
<!--          shape="round"-->
<!--          width="150"-->
<!--          height="66"-->
<!--          @click="searchConfirmLabel"-->
<!--        >-->
<!--          搜 索-->
<!--        </TnButton>-->
<!--      </view>-->
    </view>


    <!-- 已选标签 -->
    <view class="history-list">
      <Title
        title="已选标签"
        sub-title
        operation-title="删除"
        operation-icon="delete"
        @operation="clearLabels"
      />
      <view class="content-wrapper">
        <view
          v-for="(item, index) in labelList"
          :key="index"
          class="label-item tn-gray-light_bg"
          @tap.stop="historyClickHandle(item)"
        >
          # {{ findTabTextById(item) }}
        </view>
      </view>
    </view>

    <!--    分类选择-->
    <view :id="triggerElementId" class="tn-classify__container" :class="labelList.length <= 0?'tn-mt-xl':''">
      <view class="tn-flex tn-flex-nowrap tn-flex-center-around tn-white_bg">
        <!--        左边容器-->
        <scroll-view class="tn-classify__left-box left-width" :scroll-top="leftScrollViewTop" scroll-y
                     scroll-with-animation :style="{height: 300 + 'px'}">
          <view v-for="(item, index) in tabList" :key="index" :id="`tabbar_item_${index}`"
                class="tn-classify__tabbar__item tn-flex tn-flex-col-center tn-flex-row-center"
                :class="[tabbarItemClass(index)]" @tap.stop="clickClassifyNav(index)"
          >
            <view class="tn-classify__tabbar__item__title">{{ item.text }}</view>
          </view>
        </scroll-view>

        <!-- 右边容器 -->
        <scroll-view class="tn-classify__right-box" scroll-y
                     :style="{height: 300 + 'px'}">

          <view class="tn-classify__content">
            <!-- 分类内容子栏目 -->
            <view v-if="tabList[currentTabbarIndex].children"
                  v-for="(sub_item,sub_index) in tabList[currentTabbarIndex].children"
                  :key="sub_index"
                  :id="`sub_item_${sub_index}`"
                  class="tn-classify__content__sub-classify__content__item tn-flex tn-flex-column"
                  :class="{ 'tn-blue_text': labelList.includes(sub_item.id)}"
                  @tap.stop="chooseTabs(sub_item.id)"
            >
              <view class="tn-flex-center-between">
                {{ sub_item.text }}
                <TnIcon v-if="labelList.includes(sub_item.id)" name="success" color="#3668FC"></TnIcon>
              </view>
            </view>
          </view>
        </scroll-view>

      </view>
    </view>

    <view class="tn-flex-center-center tn-p-xl">
      <TnButton
        bg-color="tn-blue"
        shape="radius"
        width="100%"
        height="80"
        @click="searchConfirmHandle"
      >
        搜索用户
      </TnButton>

    </view>

  </view>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
