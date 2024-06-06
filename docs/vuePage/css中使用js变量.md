```vue
<template>
    <div :style="{ '--today-drug-list': todayDrugListLength }">

    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue'
    let todayDrugListLength = ref(105px)
</script>
<style scoped lang="scss">
    .drug_content {
        font-size: 24rpx;
        color: #101010;
        margin-top: 16rpx;
        .item {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            height: 116rpx;
            overflow: hidden;
            .item_loop {
                animation: myMove 5s linear infinite;
                box-sizing: border-box;
            }
            @keyframes myMove {
                0% {
                    transform: translateY(0);
                }
                100% {
                    transform: translateY(var(--today-drug-list));
                }
            }

        }
    }
</style>
```
通过在js中定义响应式变量，在模板中使用:style进行变量绑定，然后style中通过var()去使用当前的变量。