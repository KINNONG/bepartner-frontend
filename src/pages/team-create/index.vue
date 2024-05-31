<script setup lang="ts">
import TnForm from "@tuniao/tnui-vue3-uniapp/components/form/src/form.vue"
import TnFormItem from "@tuniao/tnui-vue3-uniapp/components/form/src/form-item.vue"
import TnInput from "@tuniao/tnui-vue3-uniapp/components/input/src/input.vue"
import TnDateTimePicker from "@tuniao/tnui-vue3-uniapp/components/date-time-picker/src/date-time-picker.vue"
import TnNumberBox from "@tuniao/tnui-vue3-uniapp/components/number-box/src/number-box.vue"
import TnRadio from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio.vue'
import TnRadioGroup from '@tuniao/tnui-vue3-uniapp/components/radio/src/radio-group.vue'
import { tnNavPage } from "@tuniao/tnui-vue3-uniapp/utils"
import { reactive, ref } from "vue"
import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
import { BASE_URL } from "../../config"
import TnNotify from '@tuniao/tnui-vue3-uniapp/components/notify/src/notify.vue'
import type { NotifyOptions, TnNotifyInstance } from '@tuniao/tnui-vue3-uniapp'
import { useLocalstorageGet } from "../../hooks"

const formRef = ref<TnFormInstance>()
const notifyRef = ref<TnNotifyInstance>()

// 队伍名
const teamName = ref("")
// 队伍描述
const teamDescription = ref("")

// 队伍人数
const teamNum = ref(3 )

// 队伍状态
const selectValue = ref('')

let dateTimeValue = ("")
const openDateTimePicker = ref(false)

const openDateTimeDateTimePicker = () => {
  console.log("我点击了")
  openDateTimePicker.value = true
}

const confirmDateTime = (value: string) => {
  console.log(value)
  formData.expireTime = value
}

// 表单数据
const formData = reactive({
  description: "",
  expireTime: null,
  maxNum: 3,
  name: "",
  password: "",
  status: 0,
})
const { localstorage }  = useLocalstorageGet()

// 按钮提交事件
const sumbitTeamCreate = () => {
  console.log(formData)
  uni.request({
    url:BASE_URL + '/team/add',
    data:formData,
    method:"POST",
    withCredentials:true,
    header:{
      'content-type': 'application/json', // 设置请求的 content-type
      'cookie': localstorage.value // 设置cookie
    }
  }).then(res => {
    console.log(res)
    if(res?.data.code === 0 && res.data){
      notifyRef.value?.show({
        msg: '添加成功',
      })
      tnNavPage("/pages/index/index")
    }else {
      notifyRef.value?.show({
        msg:res?.data.description
      })
    }
  })
}


</script>

<template>
  <TnNavbar
    fixed
    bg-color="tn-gradient-bg__cool-7"
  >
    创建队伍
  </TnNavbar>

  <view class="page">
    <view class="form_wrapper">
      <TnForm ref="formRef" :model="formData">
        <view class="tn-mb-xl">
          <!--        队伍名-->
          <TnFormItem label="队伍名称" prop="name" custom-class="form_item">
            <TnInput v-model="formData.name" clearable :border="false" underline placeholder="请输入您的队伍名" />
          </TnFormItem>
        </view>

        <view class="tn-mb-xl">
          <!--        队伍描述-->
          <TnFormItem label="队伍描述" prop="description" label-position="right" custom-class="form_item">
            <TnInput type="textarea" height="200" v-model="formData.description" placeholder="请输入队伍描述"
                     :underline="true"
                     :border="false" />
          </TnFormItem>
        </view>

        <!--        过期时间-->
        <view class="tn-mb-xl">
          <TnFormItem label="过期时间" prop="expireTime" custom-class="form_item">
            <view @tap.stop="openDateTimeDateTimePicker">
              <view class="tn-flex-center-between tn-pl-sm tn-pr-sm" v-if="formData.expireTime === null">
                <view class="tn-gray_text">
                  点击选择过期时间
                </view>
                <view class="tn-gray_text"> ></view>
              </view>

              <view class="tn-flex-center-between tn-pl-sm tn-pr-sm" v-if="formData.expireTime !== null">
                <view class="tn-gray_text">
                  {{ formData.expireTime }}
                </view>
                <view class="tn-gray_text"> ></view>
              </view>

            </view>
          </TnFormItem>
        </view>


        <view class="tn-mb-xl">
          <!--        队伍人数-->
          <TnFormItem label="队伍人数" prop="maxNum" class="form_item">
            <view class="tn-ml-lg">
            <TnNumberBox v-model="formData.maxNum" input-disabled :min="3"/>
            </view>
          </TnFormItem>
        </view>


        <!--        队伍状态-->
        <view class="tn-mb-xl">
          <TnFormItem label="队伍状态" prop="teamStatus">
            <view class="tn-ml-lg">
              <TnRadioGroup v-model="formData.status">
                <TnRadio border :label=0>公开</TnRadio>
                <TnRadio border :label=1>私有</TnRadio>
                <TnRadio border :label=2>加密</TnRadio>
              </TnRadioGroup>
            </view>
          </TnFormItem>
        </view>

        <!--        队伍密码-->
        <view class="tn-mb-xl" v-if="formData.status === 2">
          <TnFormItem label="队伍密码" prop="password">
            <view class="tn-ml-lg">
              <TnInput type="password" v-model="formData.password" underline />
            </view>
          </TnFormItem>
        </view>
      </TnForm>
    </view>

    <view class="tn-mt tn-flex-center">
      <TnButton size="xl" @click="sumbitTeamCreate"> 提交</TnButton>
    </view>
  </view>

  <TnDateTimePicker
    v-model="formData.expireTime"
    v-model:open="openDateTimePicker"
    mode="datetime"
    @confirm="confirmDateTime"
    :init-current-date-time="false"
    format="YYYY-MM-DD HH:mm:ss"
  />

  <TnNotify ref="notifyRef" :offset-top="80"/>
</template>

<style scoped lang="scss">
.page {
  width: 100%;
  position: relative;

  .form_wrapper {
    padding: 30rpx 50rpx;
  }

  .form_item {
    margin-bottom: 20rpx;
  }
}
</style>