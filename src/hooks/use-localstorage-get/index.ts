import { ref } from "vue"

export const useLocalstorageGet = () => {
  const localstorage = ref('')
  uni.getStorage({
    key: 'cookie',
    success: (res) => {
      console.log(res)
      localstorage.value = res.data
    }
  });

  return{
    localstorage
  }
}