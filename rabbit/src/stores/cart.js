import { defineStore } from "pinia";
import { computed } from "vue";

export const useCartStore = defineStore('cart', () => {
    //state
    const cartList = ref([])

    //action
    const addCart = (goods) => {
        const item = cartList.value.find((item) => item.skuId === goods.skuId)
        if (item) {
            item.count += goods.count
        } else { 
            cartList.value.push(goods)
        }
    }

    const delCart = (skuId) => { 
        const idx = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(idx,1)
    }

    const allCount = computed(() => cartList.value.reduce((a,c) => a + c.count ,0))
    const allPrice = computed(() => cartList.value.reduce((a,c) => a + c.count * c.price ,0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice
    }
}, {
    persist:true
})