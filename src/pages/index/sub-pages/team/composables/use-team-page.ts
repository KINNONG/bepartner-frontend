import { onLoad } from "@dcloudio/uni-app"
import type { NavbarRectInfo } from "@tuniao/tnui-vue3-uniapp/components/navbar"
import { tnNavPage } from "@tuniao/tnui-vue3-uniapp/utils"
import { getCurrentInstance, onMounted, ref } from "vue"
import { BASE_URL } from "../../../../../config"
import { useScrollTransparentNavbar } from "../../../../../hooks"

export const useTeamPage = () => {
  // 当前标签
  const currentTabIndex = ref<number>(0)
  // 导航栏的高度
  const navbarHeight = ref(0)
  //队伍的列表
  const teamList = ref([])
  // 凶姐图片
  const xiongjie = "https://kinnong-1301438479.cos.ap-guangzhou.myqcloud.com/yupi-project%2Fimg%2Fx27.jpg"

  //搜索队伍检索词
  const searchText = ref<string>('')

  // 模拟标签
  const tabsData = [
    {
      text: "公开"
    },
    {
      text: "加密"
    }
  ]
  const instance = getCurrentInstance()
  const {

    triggerElementId,
    navbarOpacity,
    init: initTransparentScroll,
    updateTargetTriggerValue,
    opacityScrollHandle
  } = useScrollTransparentNavbar(instance)


  // 导航栏初始化完毕
  const navbarInitFinishHandle = (info: NavbarRectInfo) => {
    navbarHeight.value = info.height
  }

  // 跳转到搜索页面
  const navSearchPage = () => {
    tnNavPage("/home-page/search/index")
  }

  // 跳转到添加队伍页
  const toCreateTeam = () => {
    tnNavPage("/pages/team-create/index")
  }

  // 队伍类别切换
  const teamChangeHandle = (index: string | number) => {
    console.log(index)
    // 查公开
    if (index === 0) {
      getTeamList(searchText.value, 0)
    } else {
      // 查加密
      getTeamList(searchText.value, 2)
    }
  }

  const getTeamList = (val= "", status= 0) => {
    uni.request({
      url: BASE_URL + "/team/list",
      method: "GET",
      data: {
        searchText: val,
        pageNum: 1,
        status
      },
      success: (res) => {
        const { data } = res.data
        teamList.value = data
        console.log(teamList.value)
      }
    })
  }

  // 获取标签状态
  const getTagStatus = (value: number) =>
    value === 0 ? "公开"
      : value === 1 ? "私有" : "加密"

  onMounted(() => {
    getTeamList()
  })

  return {
    triggerElementId,
    currentTabIndex,
    xiongjie,
    tabsData,
    teamList,
    navbarOpacity,
    updateTargetTriggerValue,
    opacityScrollHandle,
    initTransparentScroll,
    navbarInitFinishHandle,
    navSearchPage,
    getTagStatus,
    getTeamList,
    teamChangeHandle,
    toCreateTeam
  }
}