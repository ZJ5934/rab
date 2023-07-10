import { defineStore } from "pinia";

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

    return {
        cartList,
        addCart,
    }
}, {
    persist:true
})