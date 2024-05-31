import { getCurrentInstance, onMounted, ref } from 'vue'
import { tnNavPage } from '@tuniao/tnui-vue3-uniapp/utils'
import { BASE_URL } from "../../../../../config"
import { useSubPageProvide } from '../../../composables'
import type { NavbarRectInfo } from '@tuniao/tnui-vue3-uniapp/components/navbar'
import type { IndexPageOnLoadFunc, IndexPageOnScrollFunc } from '../../../types'
import type { Category } from '@/types/api/category'

import { useLocalstorageGet, useScrollTransparentNavbar } from "@/hooks"
import { ColorType } from '@/types/color'

export const useSubPage = () => {
	const instance = getCurrentInstance()
	// 顶部轮播图
	const swiperData = ref<string[]>([
		// 'https://resource.tuniaokj.com/images/swiper/ad2.jpg',
		'https://resource.tuniaokj.com/images/swiper/ad3.jpg',
		'https://resource.tuniaokj.com/images/swiper/ad4.jpg',
		'https://resource.tuniaokj.com/images/swiper/ad5.jpg',
	])

  // 用户列表
  const userList = ref([])

	// 通知数据
	const noticeData = ref<string[]>([
		'搭伙全新上线，欢迎大家前来访问',
		'搭伙全新上线，欢迎大家前来访问',
		'搭伙全新上线，欢迎大家前来访问',
	])

	// 广告胶囊
	const adCapsuleData = ref<string>(
		'https://resource.tuniaokj.com/images/swiper/capsule1.png'
	)

	// 热门案例
	const hotCaseData = ref<string[]>([
		'https://resource.tuniaokj.com/images/blogger/content_1.jpeg',
		'https://resource.tuniaokj.com/images/blogger/onepiece-1.jpg',
		'https://resource.tuniaokj.com/images/blogger/onepiece-2.jpg',
	])

	const {
		triggerElementId,
		navbarOpacity,
		init: initTransparentScroll,
		updateTargetTriggerValue,
		opacityScrollHandle,
	} = useScrollTransparentNavbar(instance)

	onMounted(() => {
		initTransparentScroll()
	})

	// 顶部导航栏初始化完成事件
	const navbarInitFinishHandle = (info : NavbarRectInfo) => {
		updateTargetTriggerValue(info.height)
	}

	// 跳转到关于图鸟页面
	const navAboutPage = () => {
		tnNavPage('/tuniao/about/index')
	}

	// 跳转到搜索页面
	const navSearchPage = () => {
		tnNavPage('/home-page/search/index')
	}

  const { localstorage } = useLocalstorageGet()

	// 获取用户推荐列表
	const getUserRecommend = () => {
    console.log(localstorage.value,"我是本地缓存呀")
		uni.request({
			url: BASE_URL + '/user/recommend',
			data: {
				pageNum: 1,
				pageSize: 10
			},
			method: 'GET',
      withCredentials: true,
      header:{
        'content-type': 'application/json', // 设置请求的 content-type
        'cookie': localstorage.value,// 设置cookie
      }
		}).then(res => {
			console.log(res)
      const { data } = res.data
      userList.value = data.records
  }
		)
	}

	// 当挂载时执行
	onMounted(() => {
		getUserRecommend()
	})

	const onLoad : IndexPageOnLoadFunc = () => {
		// eslint-disable-next-line no-console
		console.log('pageA onLoad')
	}
	const onScroll : IndexPageOnScrollFunc = ({ top }) => {
		opacityScrollHandle(top)
	}

	useSubPageProvide(0, {
		onLoad,
		onScroll,
	})

	return {
		triggerElementId,
		navbarOpacity,
		swiperData,
    userList,
		noticeData,
		adCapsuleData,
		hotCaseData,
		tnNavPage,
		navbarInitFinishHandle,
		navAboutPage,
		navSearchPage,
	}
}