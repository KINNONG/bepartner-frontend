<script setup lang="ts">
import { onReady } from "@dcloudio/uni-app"
import { tnNavPage } from "@tuniao/tnui-vue3-uniapp/utils"
import { reactive, ref } from "vue"
import type { FormRules, TnFormInstance } from "@tuniao/tnui-vue3-uniapp"
import { BASE_URL } from "../../../../config"
import { useLocalstorageGet } from "../../../../hooks/use-localstorage-get"
import TnLoading from '@tuniao/tnui-vue3-uniapp/components/loading/src/loading.vue'

const formRef = ref<TnFormInstance>()

// 当前选中标签
const currentTabIndex = ref(0)

// 表单数据
const formData = reactive({
  username: ""
})

// 规则
const formRules: FormRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: ["change", "blur"] },
    {
      pattern: /^[\w-]{4,16}$/,
      message: "请输入4-16位英文、数字、下划线、横线",
      trigger: ["change", "blur"]
    }
  ]
}


// 登录注册选项切换
const tabs = ["登录", "注册"]

// 登录账户
const userAccount = ref("")
// 登录密码
const userPassword = ref("")

const loginFormData = reactive({
  userAccount: "KINLOONG",
  userPassword: "12345678"
})

// 是否显示密码
const showPassword = ref(false)

// 提示
const tips = ref("获取验证码")

//modeSliderStyle
const modeSliderStyle = reactive(
  {
    left: 0
  }
)

//登录注册滑块切换
const modeSwitch = (value: number) => {
  const sliderWidth = uni.upx2px(476 / 2)
  modeSliderStyle.left = `${sliderWidth * value}px`
  currentTabIndex.value = value
}

// #ifdef H5 || WEB
const withCredentials = ref(true)
// #endif

const {
  localstorage
} = useLocalstorageGet()

// 表单提交
const loginHandler = (value: number) => {
  if (value === 0) {
    console.log("我点击了登录")
    uni.request({
      url: BASE_URL + "/user/login",
      method: "POST",
      data: loginFormData,
      withCredentials: true
    }).then(res => {
      const cookies = res.header["Set-Cookie"]
      console.log(cookies)
      uni.setStorage({
        key: "cookie",
        data: cookies
      })
    })
    uni.showLoading()
    setTimeout(() =>{
      tnNavPage('/pages/index/index',"reLaunch")
      uni.hideLoading()
    },1500)

  }

  if (value === 1) {
    console.log("我点击了注册")
  }

}

onReady(() => {
  // #ifdef MP
  console.log("weixin")
  // #endif
  // #ifdef H5 || WEB
  console.log("H5")
  // #endif
})

</script>

<template>
  <TnNavbar
    fixed
    :bottom-shadow="false"
    bg-color="transparent"
  >
  </TnNavbar>

  <view class="login">
    <!-- 顶部背景图片-->
    <view class="login__bg login__bg--top">
      <image class="bg" src="https://resource.tuniaokj.com/images/login/1/login_top2.jpg" mode="widthFix"></image>
    </view>
    <view class="login__bg login__bg--top">
      <image class="rocket rocket-sussuspension" src="https://resource.tuniaokj.com/images/login/1/login_top3.png"
             mode="widthFix"></image>
    </view>

    <view class="login__wrapper">
      <!-- 登录/注册切换 -->
      <view class="login__mode tn-flex tn-flex-row tn-flex-nowrap tn-flex-center-around">
        <view class="login__mode__item" :class="[{'login__mode__item--active': currentTabIndex === 0}]"
              @tap.stop="modeSwitch(0)">
          登录
        </view>
        <view class="login__mode__item" :class="[{'login__mode__item--active': currentTabIndex === 1}]"
              @tap.stop="modeSwitch(1)">
          注册
        </view>

        <!-- 滑块-->
        <view class="login__mode__slider tn-gradient-bg__cool-15" :style="[modeSliderStyle]"></view>
      </view>

      <!-- 输入框内容-->
      <view class="login__info tn-flex tn-flex-column tn-flex-col-center tn-flex-row-center">
        <!-- 登录 -->
        <block v-if="currentTabIndex === 0">
          <view
            class="login__info__item__input tn-flex tn-flex-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
            <view class="login__info__item__input__left-icon tn-flex-center">
              <view class="tn-icon-identity"></view>
            </view>
            <view class="login__info__item__input__content tn-flex-center-start">
              <input v-model="loginFormData.userAccount" maxlength="20" placeholder-class="input-placeholder"
                     placeholder="请输入登录账号" />
            </view>
          </view>

          <view
            class="login__info__item__input tn-flex tn-flex-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
            <view class="login__info__item__input__left-icon tn-flex-center">
              <view class="tn-icon-lock"></view>
            </view>
            <view class="login__info__item__input__content tn-flex-center-start">
              <input v-model="loginFormData.userPassword" :password="!showPassword"
                     placeholder-class="input-placeholder " placeholder="请输入登录密码" />
            </view>
            <view class="login__info__item__input__right-icon tn-flex-center" @click="showPassword = !showPassword">
              <view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
            </view>
          </view>
        </block>
        <!-- 注册 -->
        <block v-if="currentTabIndex === 1">
          <view
            class="login__info__item__input tn-flex tn-flex-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
            <view class="login__info__item__input__left-icon tn-flex-center">
              <view class="tn-icon-identity"></view>
            </view>
            <view class="login__info__item__input__content tn-flex-center-start">
              <input maxlength="20" placeholder-class="input-placeholder" placeholder="请输入注册账号/手机号" />
            </view>
          </view>

          <view
            class="login__info__item__input tn-flex tn-flex-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
            <view class="login__info__item__input__left-icon tn-flex-center">
              <view class="tn-icon-lock"></view>
            </view>
            <view class="login__info__item__input__content tn-flex-center-start">
              <input :password="!showPassword" placeholder-class="input-placeholder" placeholder="请输入登录密码" />
            </view>
            <view class="login__info__item__input__right-icon tn-flex-center" @click="showPassword = !showPassword">
              <view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
            </view>
          </view>

          <view
            class="login__info__item__input tn-flex tn-flex-row tn-flex-nowrap tn-flex-col-center tn-flex-row-left">
            <view class="login__info__item__input__left-icon tn-flex-center">
              <view class="tn-icon-lock"></view>
            </view>
            <view class="login__info__item__input__content tn-flex-center-start">
              <input :password="!showPassword" placeholder-class="input-placeholder" placeholder="请再次确认登录密码" />
            </view>
            <view class="login__info__item__input__right-icon tn-flex-center" @click="showPassword = !showPassword">
              <view :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']"></view>
            </view>
          </view>

        </block>

        <view class="login__info__item__button tn-cool-bg-color-7--reverse"
              hover-class="tn-hover"
              :hover-stay-time="150"
              @tap.stop="loginHandler(currentTabIndex)"
        >
          {{ currentTabIndex === 0 ? "登录" : "注册" }}

        </view>

        <view v-if="currentTabIndex === 0" class="login__info__item__tips">忘记密码?</view>
      </view>
    </view>

  </view>

  <!-- 底部背景图片-->
  <view class="login__bg login__bg--bottom">
    <image src="https://resource.tuniaokj.com/images/login/1/login_bottom_bg.jpg" mode="widthFix"></image>
  </view>

</template>

<style scoped lang="scss">
@import './styles/index.scss';
</style>