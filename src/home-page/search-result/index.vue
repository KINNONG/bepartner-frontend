<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app"
import userlistSimpleItem from "../../pages/index/sub-pages/page-a/components/userlist-simple-item/index.vue"
import { useSearchResult } from "./composables"

const {
  searchResult,

} = useSearchResult()


</script>

<template>
  <TnNavbar
    fixed
  >
    搜索结果
  </TnNavbar>

  <view class="search-result-page">
    <view
      v-for="(item,index) in searchResult"
      :key="index"
      class="users-item"
    >
      <userlistSimpleItem
        :username="item.username"
        :tags="item.tags"
        :image="item.avatarUrl"
      >

      </userlistSimpleItem>
    </view>

  </view>
</template>

<style scoped lang="scss">
@import "./styles/index.scss";
</style>