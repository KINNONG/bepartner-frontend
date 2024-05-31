<script lang="ts" setup>
import TnPicker from '@tuniao/tnui-vue3-uniapp/components/picker/src/picker.vue'
import TnDateTimePicker from '@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue'
import TnUpdateUserInfoPopup from 'tnuiv3p-tn-update-user-info-popup/index.vue'
import { useUserInfo } from './composables'
import { UserSex } from '@/types/store/user'

const {
  userInfo,
  showUpdateUserInfoPopup,
  showSexPicker,
  showBirthdayPicker,
  showProfessionPicker,
  sexPickerData,
  professionPickerData,
  openUpdateUserInfoPopup,
  openSexPicker,
  openBirthdayPicker,
  openProfessionPicker,
} = useUserInfo()


const avatarUrl = userInfo?.avatarUrl
const username = userInfo?.username
const gender = userInfo?.gender
</script>

<template>
  <TnNavbar fixed :bottom-shadow="false" />
  <view class="user-info">
    <view class="avatar-nickname">
      <view class="left">
        <view class="nickname" @tap.stop="openUpdateUserInfoPopup">
          {{ userInfo?.username }}
        </view>

      </view>
      <view class="avatar" @tap.stop="openUpdateUserInfoPopup">
        <image class="tn-image" :src="userInfo?.avatarUrl" mode="aspectFill" />
      </view>
    </view>

    <view class="info-item">
      <view class="left">
        <view class="item-title">账号</view>
        <view class="content">
          <input
            disabled
            class="input"
            :value="userInfo?.userAccount"
            placeholder="请输入账号"
            placeholder-style="color: var(--tn-color-gray-disabled)"
          />
        </view>
      </view>
    </view>

    <view class="info-item">
      <view class="left">
        <view class="item-title">绑定手机号</view>
        <view class="content">
          {{ userInfo?.phone || '未绑定' }}
        </view>
      </view>
      <view class="right">
        <TnIcon name="right" />
      </view>
    </view>

    <view class="info-item" @tap.stop="openSexPicker">
      <view class="left">
        <view class="item-title">性别</view>
        <view class="content">
          {{ UserSex?.[userInfo?.gender] || '请选择性别' }}
        </view>
      </view>
      <view class="right">
        <TnIcon name="right" />
      </view>
    </view>
    <view class="info-item">
      <view class="left">
        <view class="item-title">邮箱</view>
        <view class="content">
          <input
            class="input"
            :value="userInfo?.email"
            placeholder="请输入邮箱"
            placeholder-style="color: var(--tn-color-gray-disabled)"
          />
        </view>
      </view>
    </view>
    <view class="info-item">
      <view class="left">
        <view class="item-title">星球编号</view>
        <view class="content">
          <input
            class="input"
            :value="userInfo?.planetCode"
            placeholder="请输入星球编号"
            placeholder-style="color: var(--tn-color-gray-disabled)"
          />
        </view>
      </view>
    </view>
    <view class="info-item">
      <view class="left">
        <view class="item-title">注册时间</view>
        <view class="content">
          <input
            disabled
            class="input"
            :value="userInfo?.createTime"
            placeholder-style="color: var(--tn-color-gray-disabled)"
          />
        </view>
      </view>
    </view>
  </view>

  <TnUpdateUserInfoPopup
    v-model:show="showUpdateUserInfoPopup"
    v-model:avatar="avatarUrl"
    v-model:nickname="username"
  />
  <!-- 性别选择 -->
  <TnPicker
    v-model:open="showSexPicker"
    v-model="gender"
    :data="sexPickerData"
  />
</template>

<style lang="scss" scoped>
@import './styles/index.scss';
</style>
