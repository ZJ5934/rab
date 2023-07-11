import { defineStore } from "pinia";
import { computed } from "vue";
import { useUserStore } from './user.js'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart.js'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    //state
    const cartList = ref([])

    //action
    const updateNewList = async () => { 
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            const item = cartList.value.find((item) => item.skuId === goods.skuId)
            if (item) {
                item.count += goods.count
            } else {
                cartList.value.push(goods)
            }
        }
    }

    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updateNewList()
        } else {
            const idx = cartList.value.findIndex((item) => item.skuId === skuId)
            cartList.value.splice(idx, 1)
        }

    }

    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    const allCheck = (selected) => {
        cartList.value.forEach((item) => item.selected = selected)
    }

    const clearCart = () => { 
        cartList.value = []
    }

    const isAll = computed(() => cartList.value.every((item) => item.selected))

    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
}, {
    persist: true
})