import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

import App from './App.vue'
import router from './router'
import '@/styles/common.scss'
// 测试api
// import { getCategoryAPI } from '@/apis/testAPI.js'
// getCategoryAPI().then(res => { 
//     console.log(res)
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.directive('img-lazy', {
    mounted(el, binding) {
        //el:指令绑定的元素
        //binding：binding.value 指令等于号后面表达式的值
        // console.log(el,binding.value)

        useIntersectionObserver(el,
            ([{ isIntersecting }]) => {
                if (isIntersecting) { 
                    //进入视口区域
                    el.src = binding.value
                }
            },
        )
    }
})