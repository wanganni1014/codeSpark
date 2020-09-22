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
