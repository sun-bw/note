## 一、自定义防抖函数指令
在directive/index.js中新建
```js
import Vue from 'vue';
/***
        * 防抖 单位时间只触发最后一次
        *  @param {?Number|300} time - 间隔时间
        *  @param {Function} fn - 执行事件
        *  @param {?String|"click"} event - 事件类型 例："click"
        *  @param {Array} binding.value - [fn,event,time]
        *  例：<el-button v-debounce="[reset,`click`,300]">刷新</el-button>
        *  也可简写成：<el-button v-debounce="[reset]">刷新</el-button>
 */
Vue.directive('debounce', {
    inserted: function(el, binding) {
        let [fn, time = 300] = binding.value
        let timer
        el.addEventListener('click', event => {
            timer && clearTimeout(timer)
            timer = setTimeout(() => fn(), time)
        }, true)
    }
})
// 使用 指令是数组，第一个参数为方法名，第二个可以为时间
<el-button type="primary" id="searchBtn" v-debounce="[nextStep]">下一步</el-button>
```
## 二、自定义节流函数
```js
import Vue from 'vue';

Vue.directive('throttle', {
    inserted: function (el, binding) {
        let [fn, event = "click", time = 1300] = binding.value
        let timer, timer_end;
        el.addEventListener(event, () => {
            if (timer) {
                clearTimeout(timer_end);
                return timer_end = setTimeout(() => fn(), time);
            }
            fn();
            timer = setTimeout(() => timer = null, time)
        })
    }
})
```
## 三、自定义水印
```js
Vue.directive('waterMarker', {
    bind: function(el, binding) {
        let str = binding.value.text || '大医云版权所有'
        let parentNode = el
        let font = binding.value.font
        let textColor = binding.value.textColor
        // 水印文字，父元素，字体，文字颜色
        var can = document.createElement('canvas')
        parentNode.appendChild(can)
        can.width = 200
        can.height = 150
        can.style.display = 'none'
        var cans = can.getContext('2d')
        cans.rotate((-20 * Math.PI) / 180)
        cans.font = font || '16px Microsoft JhengHei'
        cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
        cans.textAlign = 'left'
        cans.textBaseline = 'Middle'
        cans.fillText(str, can.width / 10, can.height / 2)
        parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
    }
})
```
## 四、在main.js中导入
```js
import './directive/index'
```
