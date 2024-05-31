<script lang="ts" setup>
import { tnNavPage } from "@tuniao/tnui-vue3-uniapp/utils"
import { ref } from "vue"
import { BASE_URL } from "../../../../../../config"
import { useLocalstorageGet } from "../../../../../../hooks"
import { useTeamPage } from "../../composables"

withDefaults(
  defineProps<{
    /**
     * @description 队伍id
     */
    id: number
    /**
     * @description 标题
     */
    title: string
    /**
     * @description 描述
     */
    desc: string
    /**
     * @description 图片地址
     */
    image: string
    /**
     * @description 标签
     */
    tag: string
    /**
     * @description 队伍参加人数
     */
    hasJoinNum:number
    /**
     * @description 队伍最大人数
     */
    maxNum:number
    /**
     * @description 过期时间
     */
    expireTime:string
    /**
     * @description 创建时间
     */
    createTime:string
  }>(),
  {
    id:0,
    tag: '',
    hasJoinNum:1,
    maxNum:3
  }
)

const hasJoin = ref(true)
const { localstorage } = useLocalstorageGet()
const { getTeamList }  = useTeamPage()
const deleteTeam = (value:number) => {
  uni.request({
    url:BASE_URL + '/team/delete',
    data:{
      id:value
    },
    method:"POST",
    withCredentials:true,
    header:{
      'content-type': 'application/json', // 设置请求的 content-type
      'cookie': localstorage.value // 设置cookie
    }
  }).then(res => {
    console.log(res)
    getTeamList()
  })
}
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
  <view class="search-item tn-shadow">
    <view class="item-image tn-mr-lg">
      <image class="tn-image" :src="image" mode="aspectFill" />
    </view>

<!--    主要信息-->
    <view class="item-info">
      <view class="info-detail">
        <view class="tn-flex tn-flex-center-between">
          <view class="title">{{ title }}</view>
          <view class="tag-data">{{ tag && `# ${tag}` }}</view>
        </view>
        <view class="desc tn-text-ellipsis-2">{{ desc }}</view>
        <view class="desc">队伍人数：{{ hasJoinNum+ '/' +maxNum }}</view>
        <view class="time tn-text-xs">过期时间：{{ expireTime }}</view>
        <view class="time tn-text-xs">创建时间：{{ createTime }}</view>
      </view>

      <view class="info-data">

        <view class="info-button" v-if="!hasJoin">
          <TnButton type="primary">加入队伍</TnButton>
        </view>

        <TnButton type="danger" v-if="!hasJoin">退出队伍</TnButton>

        <view class="info-login-button">
          <TnButton type="primary" custom-class="tn-mr-sm">更新队伍</TnButton>
          <TnButton type="danger" @click="deleteTeam(id)">解散队伍</TnButton>
        </view>



<!--        <view class="count-data">-->
<!--          <view class="count-item">-->
<!--            <view class="icon">-->
<!--              <TnIcon name="rocket" />-->
<!--            </view>-->
<!--            <view class="data">{{ viewCount }}</view>-->
<!--          </view>-->
<!--          <view class="count-item">-->
<!--            <view class="icon">-->
<!--              <TnIcon name="like-lack" />-->
<!--            </view>-->
<!--            <view class="data">{{ likeCount }}</view>-->
<!--          </view>-->
<!--        </view>-->
      </view>
    </view>

  </view>
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
