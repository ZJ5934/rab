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

    const delCart = (skuId) => { 
        const idx = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(idx,1)
    }

    return {
        cartList,
        addCart,
        delCart
    }
}, {
    persist:true
})