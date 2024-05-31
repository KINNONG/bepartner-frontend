import { onMounted, ref } from "vue"
import { useUniAppSystemRectInfo } from "@tuniao/tnui-vue3-uniapp/hooks"
import { tnNavPage } from "@tuniao/tnui-vue3-uniapp/utils"
import type { StoreUser, UserType } from "@/types/store/user"
import { useSubPageProvide } from "@/pages/index/composables"
import { generateRandomNumber } from "@/utils/local-mock"
import { BASE_URL } from "../../../../../config"
import cookies from "weapp-cookie"
import { useLocalstorageGet } from "../../../../../hooks"


export const useSubPage = () => {
  const { navBarInfo } = useUniAppSystemRectInfo()

  const userInfo = ref<UserType>()

  const {
    localstorage
  } = useLocalstorageGet()

  const getCurrentUser = () => {
    uni.request({
      url: BASE_URL + "/user/current",
      method: "GET",
      withCredentials: true,
      header:{
        "cookie": localstorage.value.toString() // 设置cookie
      }
    }).then(res => {
      const { data } = res.data
        console.log(res)
        userInfo.value = data
      }
    )
  }

  onMounted(() => {
    // 挂载时获取当前用户信息
    getCurrentUser()
    // 获取 cookie
    let token = cookies.get("SESSION", "localhost")
    console.log(token)

  })


  const navUserLoginPage = () => {
    console.log("点击了")
    tnNavPage("./sub-pages/user-login/index")
  }

  // 跳转到个人信息页面
  const navUserInfoPage = () => {
    tnNavPage("/info-page/user-info/index")
  }

  // 跳转到常见问题页面
  const navCommonProblemPage = () => {
    tnNavPage("/info-page/common-problem/index")
  }

  // 跳转到会员权益页面
  const navMemberRightsPage = () => {
    tnNavPage("/info-page/member-rights/index")
  }

  // 跳转到订单列表页面
  const navOrderListPage = () => {
    tnNavPage("/order-page/order-list/index")
  }

  useSubPageProvide(4)

  return {
    navBarInfo,
    userInfo,
    // loginHandle,
    getCurrentUser,
    navUserInfoPage,
    navCommonProblemPage,
    navMemberRightsPage,
    navOrderListPage,
    navUserLoginPage
  }
}