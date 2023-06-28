//封装Banner轮播图业务相关代码
import { getBannerAPI } from '@/apis/home.js'

export function useBanner() {
    const bannerList = ref([])
    const getBanner = async () => {
        const res = await getBannerAPI({ distributionSite: '2' })
        // console.log(res.result)
        bannerList.value = res.result
    }
    onMounted(() => {
        getBanner()
    })

    return {
        bannerList
    }
}