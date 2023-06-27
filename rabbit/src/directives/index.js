//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
    install(app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                //el:指令绑定的元素
                //binding：binding.value 指令等于号后面表达式的值
                // console.log(el,binding.value)

                const { stop } = useIntersectionObserver(el,
                    ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            //进入视口区域
                            el.src = binding.value
                            stop()
                        }
                    },
                )
            }
        })
    }
}