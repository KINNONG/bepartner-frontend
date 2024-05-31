import { tnNavPage } from "@tuniao/tnui-vue3-uniapp/utils"
import { getCurrentInstance, onMounted, ref } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import type { NavbarRectInfo } from "@tuniao/tnui-vue3-uniapp/components/navbar"
import storage from "@/utils/storage"
import { SearchHistoryKey } from "@/constants"
import { useScrollTransparentNavbar } from "@/hooks"


interface ResultItem {
  id: string
  title: string
  desc: string
  mainImage: string
  viewCount?: number
  likeCount?: number
  tag?: string
}

interface TabList {
  text: string
  children: [{
    id: number
    text: string
    disabled: boolean
  }
  ]
}

export const useSearch = () => {
  const leftScrollViewTop = ref<number>(0)
  const scrollViewHeight = ref<number>(0)
  const scrollViewBasicTop = ref<number>(0)
  // 当前选中的tabbar序号
  const currentTabbarIndex = ref<number>(0)
  //
  const instance = getCurrentInstance()
  // 导航栏顶部的高度
  const navbarHeight = ref<number>(0)
  // 输入框的值
  const searchValue = ref<string>("")
  // 最近搜索历史记录
  const historyList = ref<string[]>([])
  //已选择的标签列表
  const labelList = ref<string[]>([])

  //分类列表
  const origintabList = [
    {
      text: '性别',
      children: [
        {text: '男', id: '男'},
        {text: '女', id: '女'},
      ],
    },
    {
      text: '年级',
      children: [
        {text: '大一', id: '大一'},
        {text: '大二', id: '大二'},
        {text: '大三', id: '大三'},
        {text: '大四', id: '大四'},
      ],
    },
    {
      text: '职业',
      children: [
        {text: '前端开发', id: '前端开发'},
        {text: '后端开发', id: '后端开发'},
        {text: '产品经理', id: '产品经理'},
        {text: 'UI设计师', id: 'UI设计师'},
        {text: '运营', id: '运营'},
      ],
    },
    {
      text: '语言',
      children: [
        {text: 'Java', id: 'Java'},
        {text: 'JavaScript', id: 'JavaScript'},
        {text: 'GO', id: 'GO'},
        {text: 'C++', id: 'C++'},
        {text: 'Python', id: 'Python'},
      ],
    },
  ]

  let tabList = ref(origintabList)
  // 搜索结果
  const searchResult = ref<ResultItem[]>([

  ])

  // 搜索提交事件
  const searchConfirmHandle = () => {
    console.log(labelList.value)
    tnNavPage('/home-page/search-result/index?labelList=' + labelList.value)
  }

  // 搜索标签提交时间
  const searchConfirmLabel = () => {

    // 如果没有输入搜索内容，则显示当前标签的所有children
    if (!searchValue.value) {
      return tabList.value[currentTabbarIndex.value].children || []
    } else {
      // 如果有输入搜索内容，则过滤出符合条件的children
      tabList.value = origintabList.map(parentTag => {
        const tempChildren = [...parentTag.children]
        console.log(tempChildren, "222")
        const tempParentTag = { ...parentTag }
        console.log(tempParentTag,'tempParentTag')
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchValue.value))
        return tempParentTag
      })
    }
  }

  // 清空搜索栏
  const seachClearValue = () => {
    searchValue.value = ""
    tabList.value = origintabList
  }

  // 滚动后导航栏开始变颜色
  const {
    triggerElementId,
    navbarOpacity,
    init: initTransparentScroll,
    updateTargetTriggerValue,
    opacityScrollHandle
  } = useScrollTransparentNavbar(instance)


  // 历史记录点击事件
  const historyClickHandle = (value: string) => {
    searchValue.value = value
  }

  //根据对应的id值查找text
  const findTabTextById = (value: string) => {
    const allChildren = tabList.value.flatMap(item => item.children || [])
    // 在提取的children数组中查找具有指定id的项
    const target = allChildren.find(child => child.id === value)
    // 如果找到了，返回其text值；否则返回undefined
    return target ? target.text : undefined
  }


  const clearLabels = () => {
    uni.showModal({
      title: "提示",
      content: "确认清除已选择的标签吗?",
      showCancel: true,
      success: ({ confirm }) => {
        if (confirm) {
          labelList.value = []
          console.log("清楚所有")
        }
      }
    })
  }


  // 顶到导航栏初始化完毕
  const navbarInitFinishHandle = (info: NavbarRectInfo) => {
    navbarHeight.value = info.height
    updateTargetTriggerValue(info.height)
  }

  //获取分类列表的高度
  const getScrollViewInfo = async () => {
    const systemInfo = await uni.getSystemInfo()
    console.log(systemInfo)
    scrollViewBasicTop.value = systemInfo.statusBarHeight as number + uni.upx2px(10)
    console.log(systemInfo.statusBarHeight)
    scrollViewHeight.value = systemInfo.safeArea.height - navbarHeight.value - 100 - 75
    console.log(systemInfo.safeArea.height)
  }


  onLoad(() => {
    const historyData = storage.get(SearchHistoryKey)
    if (historyData) {
      historyList.value = historyData
    }
  })


  return {
    triggerElementId,
    currentTabbarIndex,
    searchValue,
    navbarHeight,
    leftScrollViewTop,
    scrollViewHeight,
    scrollViewBasicTop,
    navbarOpacity,
    historyList,
    labelList,
    tabList,
    searchResult,
    navbarInitFinishHandle,
    getScrollViewInfo,
    opacityScrollHandle,
    searchConfirmLabel,
    seachClearValue,
    searchConfirmHandle,
    historyClickHandle,
    initTransparentScroll,
    clearLabels,
    findTabTextById
  }
}
