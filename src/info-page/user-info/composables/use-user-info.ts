import { onMounted, ref } from "vue"
import type { UserType } from "@/types/store/user"
import { BASE_URL } from "../../../config"
import { useLocalstorageGet } from "../../../hooks"
import { useSubPage } from "../../../pages/index/sub-pages/page-e/composables"

export const useUserInfo = () => {

  const { localstorage } = useLocalstorageGet()


  onMounted(() => {
    getCurrentUser()
  })

  const userInfo = ref<UserType>()
  const getCurrentUser = () => {
    uni.request({
      url: BASE_URL + "/user/current",
      method: "GET",
      withCredentials: true,
      header: {
        "content-type": "application/json", // 设置请求的 content-type
        "cookie": localstorage.value.toString() // 设置cookie
      }
    }).then(res => {
        const { data } = res.data
        console.log(res)
        userInfo.value = data
      }
    )
  }

  // 显示修改用户信息弹框
  const showUpdateUserInfoPopup = ref<boolean>(false)
  // 显示性别选择弹框
  const showSexPicker = ref<boolean>(false)
  const sexPickerData = [
    { label: "男", value: 1 },
    { label: "女", value: 2 },
    { label: "保密", value: 0 }
  ]
  // 显示生日选择弹框
  const showBirthdayPicker = ref<boolean>(false)
  // 显示职业选择弹框
  const showProfessionPicker = ref<boolean>(false)
  const professionPickerData = [
    "前端开发",
    "后端开发",
    "产品经理",
    "UI设计师",
    "运营"
  ]

  const openUpdateUserInfoPopup = () => {
    showUpdateUserInfoPopup.value = true
  }
  const openSexPicker = () => {
    showSexPicker.value = true
  }
  const openBirthdayPicker = () => {
    showBirthdayPicker.value = true
  }
  const openProfessionPicker = () => {
    showProfessionPicker.value = true
  }

  return {
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
    openProfessionPicker
  }
}
