import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
// vue3 vs vue2 系列  --[每日一更]




// vue3
// 通过createApp API 返回一个应用实例,并且可通过链条方式继续调用其他方法
createApp(App).mount('#app');
// 挂载其他方法
// createApp(App).use(router).use(store).mount('#app');

// vue2
// new 一个实例
// new Vue({
//     el: '#app',
//     render: h => h(App)
// })
// 挂载其他方法
// new Vue({
//     el: '#app',
//     router,
//     store,
//     render: h => h(App)
// })

// vue3 vs vue2 自定义指令生命周期
// 和普通的component的生命周期匹配

// // vue2
// const MyCustomDirective = {
//     bind(el, binding, vnode, prevVnode) {},
//     inserted() {},
//     update() {},
//     componentUpdated() {},
//     unbind() {}
// }

// // vue3
// const MyCustomDirective = {
//     beforeMount(el, binding, vnode, prevVnode) {},
//     mounted() {},
//     beforeUpdate() {},
//     updated() {},
//     beforeUnmount() {},
//     unmounted() {}
// }

