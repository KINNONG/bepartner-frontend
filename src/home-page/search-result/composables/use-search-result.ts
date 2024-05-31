import { onLoad } from "@dcloudio/uni-app"
import { onMounted, ref } from "vue"
import { BASE_URL } from "../../../config"
import { useLocalstorageGet } from "../../../hooks"

interface ResultItem {
  id: number,
  username: string,
  userAccout: string,
  avatarUrl: string,
  gender: number,
  userPassword: string,
  phone: string,
  email: string
  tags: Array<string>
  userStatus: number,
  createTime: string
  updateTime: string,
  planetCode: string
}

export const useSearchResult = () => {
  // 传过来的参数
  const labelList = ref<string[]>([])

  // 搜索结果
  const searchResult = ref<ResultItem[]>([])

  // 解构localstorage
  const { localstorage } = useLocalstorageGet()

  onLoad((option) => {
    console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
    labelList.value = option.labelList
    console.log(labelList.value)
    uni.request({
      url:BASE_URL + '/user/search/tags',
      data:{
        tagNameList:labelList.value
      },
      method: 'GET',
      withCredentials: true,
      header:{
        'content-type': 'application/json', // 设置请求的 content-type
        'cookie': localstorage.value // 设置cookie
      }
    }).then(res => {
      const { data } = res?.data
      searchResult.value = data
    })
  });

  return {
    searchResult
  }

}