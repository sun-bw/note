## 添加注释
1. ctrl+shift+p打开搜索呢
2. 输入snippets，回车。
3. 回车后输入分别输入css.json,javascript.json,vue-html.json,vue.json，分别打开，css配置文件，JavaScript配置文件，vue-html配置文件，vue配置文件。
4. 分别进行一下配置：
### 1.css.json文件：
```json
{
	"Print to cssTitle": {
		"prefix": "cssNoteTitle",
		"body": [
		  "/*",
		  " *@description: ",
		  " *@author: 孙博文 ",
		  " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
		  " *@version V1.0.5 ",
		  "*/"
		],
		"description": "css注释标题"
	},
	"Print to cssItem":{
		"prefix": "cssNoteItem",
		"body": [
		  "/*",
		  " *@description: ",
		  " *@author: 孙博文 ",
		  " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
		  "*/"
		],
		"description": "css类注释"
	}
}
```
### 2.javascript.json文件：
```json
{
	// 开始标题注释
	"Print to jsNoteTitle": {
		"prefix": "jsNoteTitle",
		"body": [
		  "/*",
		  " *@description:",
		  " *@author: 孙博文",
		  " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
		  " *@version: V1.0.5",
		  "*/"
		],
		"description": ""
	},
	// 方法注释
	"Print to jsfn": {
		"prefix": "jsfn",
		"body": [
			"/*",
			" *@functionName: ${TM_CURRENT_LINE}",
			" *@params1: ${1:参数1}",
			" *@params2: ${2:参数2}",
			" *@params3: ${3:参数3}",
			" *@params4: ${4:参数4}",
			" *@description:",
			" *@author: 孙博文",
			" *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
			" *@version: V1.0.5",
			"*/"
		],
		"description": ""
	},
	// 方法修改注释
	"Print to jsModify": {
		"prefix": "jsModify",
		"body": [
		  "/*",
		  " *@description:",
		  " *@modifyContent:",
		  " *@author: 孙博文",
		  " *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
		  "*/"
		],
		"description": ""
	},
	// 变量注释
	"Print to jsVariable": {
		"prefix": "jsVariable",
		"body": [
			"/*",
			" *@description:",
			" *@author: 孙博文",
			" *@date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
			" *@variable1: ${1:变量1}",
			" *@variable2: ${2:变量2}",
			" *@variable3: ${3:变量3}",
			" *@variable4: ${4:变量4}",
			" *@variable5: ${5:变量5}",
			"*/"
		],
		"description": ""
	}
}
```
### 3.vue-html.json文件：
```json
{
	"Print to htmlStart": {
        "prefix": "htmlStart",
        "body": [
            "<!-- $0start @author: 孙博文 !-->"
        ],
        "description": "html开始时使用"
    },
    "Print to htmlItem": {
        "prefix": "htmlEnd",
        "body": [
            "<!-- $0end @author: 孙博文 !-->"
        ],
        "description": "html结束时使用"
    },
}
```
### 4.vue.json文件：
```json
{
	"Print to vueTitle": {
		"prefix": "vueTitle",
		"body": [
		  "<!-- ",
		  " * @description: ",
		  " * @fileName: ${TM_FILENAME} ",
		  " * @author: 孙博文 ",
		  " * @date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
		//   " * @后台人员: $1 ",
		  " * @version: V1.0.5 ",
		  "!-->"
		],
		"description": ".vue文件开头配置注释"
	}
}
```