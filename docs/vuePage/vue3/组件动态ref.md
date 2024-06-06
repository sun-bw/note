## 在循环中使用组件，通过ref去调用组件方法。
```vue
<template>
    <div v-for="(item, index) in list" :key="index">
        <!-- 给组件绑定ref属性，并传入一个函数 -->
        <Children :ref="(el) => setRef(el, index)"></Children>
        <button @click="callMethod(item, index)">调用组件方法</button>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import Children from './Children'

    let list = ref([1,2,3,4])
    let refs = ref([]) // // 组件的引用数组

    const setRef = (el, index) => {
        // 如果el存在，说明是渲染后的组件实例
        if(el) {
             // 将组件实例存入数组中
            refs.value[index] = el
        }
    }

    const callMethod = (item, index) => {
        // 调用每个组件实例的sayHello方法
        refs.value[index].sayHello()
    }
</script>
```