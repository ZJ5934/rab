//封装分类数据业务相关代码
import { getCategoryAPI } from '@/apis/category.js'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }

    onMounted(() => {
        getCategory()
    })

    //路由参数变化，重新发送数据接口请求
    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}