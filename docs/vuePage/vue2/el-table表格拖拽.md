## 一、安装依赖 vuedraggable
安装  vuedraggable 的同时，会自动安装 sortablejs
```js
npm install vuedraggable
```
或直接安装  sortablejs
```js
npm install sortablejs --save
```
## 二、实现拖拽的要点
<ol>
<li> 使用class为 draggable 的div 包裹整个表格，以便拖拽代码中，准确抓取到拖拽元素的父容器</li>
<li>行拖拽要点：需在 el-table 标签中，根据行的内容指定行的唯一标识  row-key="id"</li>
<li>列拖拽要点：需额外定义两个数组，分别存储拖拽前的列顺序和拖拽后的列顺序</li>
</ol>

## 三、功能示例

<script setup>
import { ref, onMounted } from 'vue'
import Sortable from 'sortablejs';

const count = ref(0)
const tableList = ref([
    {
        tagName: '测试1',
        modifyTime: '1111',
        age: 12
    },
    {
        tagName: '测试2',
        modifyTime: '2222',
        age: 12
    },
    {
        tagName: '测试3',
        modifyTime: '3333',
        age: 12
    },
])
const tableItems = ref([
    {
        label: '姓名',
        prop: 'tagName',
    },
    {
        label: '性别',
        prop: 'modifyTime',
    },
    {
        label: '年龄',
        prop: 'age',
    }
])
const oldList = ref([])
const newList = ref([])
onMounted(() => {
    oldList.value = JSON.parse(JSON.stringify(tableItems.value))
    newList.value = JSON.parse(JSON.stringify(tableItems.value))
    rowDrop()
    columnDrop()
})
const rowDrop = () => {
    // 此时找到的元素是要拖拽元素的父容器
    const tbody = document.querySelector('.draggable .el-table__body-wrapper tbody');
    Sortable.create(tbody, {
        //  指定父元素下可被拖拽的子元素
        draggable: ".draggable .el-table__row",
        onEnd({ newIndex, oldIndex }) {
            let tmp = tableList.value[newIndex];
            tableList.value[newIndex] = tableList.value[oldIndex];
            tableList.value[oldIndex] = tmp;
        }
    })
}
const columnDrop = () => {
    const wrapperTr = document.querySelector('.draggable .el-table__header-wrapper tr');
    Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
            const oldItem = newList.value[evt.oldIndex];
            newList.value.splice(evt.oldIndex, 1);
            newList.value.splice(evt.newIndex, 0, oldItem);
        }
    })
}
</script>
<div class="draggable">
    <el-table row-key="id" :data="tableList" border style="width: 100%; overflow-y: auto;">
        <el-table-column v-for="(item, index) in oldList" :key="`col_${index}`" :label="item.label" :prop="newList[index].prop"></el-table-column>
    </el-table>
</div>

## 四、代码示例
```js
<template>
    <el-table row-key="id" :data="tableList" border style="width: 100%; overflow-y: auto;">
        <el-table-column prop="tagName" align="center" label="标签名称"></el-table-column>
        <el-table-column prop="modifyTime" align="center" label="最近修改时间"></el-table-column>
        <el-table-column align="center" width="120" label="操作">
            <template slot-scope="scope">
                <el-button v-if="scope.row.tagSource != 'system'" type="text" @click="editLabel(scope.row)" size="small">编辑</el-button>
                <el-button v-if="scope.row.tagSource != 'system'" type="text" @click="deleteLabel(scope.row)" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import Sortable from 'sortablejs';
export default {
    data() {
        return {
            tableList: [],
        };
    },
    mounted() {
        this.rowDrop()
        this.columnDrop()
    },
    methods: {
        // 行拖拽
        rowDrop() {
            // 此时找到的元素是要拖拽元素的父容器
            const tbody = document.querySelector('.draggable .el-table__body-wrapper tbody');
            const _this = this;
            Sortable.create(tbody, {
                //  指定父元素下可被拖拽的子元素
                draggable: ".draggable .el-table__row",
                onEnd({ newIndex, oldIndex }) {
                    let tmp = _this.tableList[newIndex];
                    _this.tableList[newIndex] = _this.tableList[oldIndex];
                    _this.tableList[oldIndex] = tmp;
                    // 按照新的顺序进行保存
                    let tagIds = []
                    _this.tableList.map(item => {
                        tagIds.push(item.tagId)
                    })
                    _this.updateTagOrder(tagIds)
                }
            })
        },

        // 列拖拽
        columnDrop(){
            const wrapperTr = document.querySelector('.draggable .el-table__header-wrapper tr');
            Sortable.create(wrapperTr, {
                animation: 180,
                delay: 0,
                onEnd: evt => {
                    const oldItem = newList.value[evt.oldIndex];
                    newList.value.splice(evt.oldIndex, 1);
                    newList.value.splice(evt.newIndex, 0, oldItem);
                }
            })
        }
    }
};
</script>

```