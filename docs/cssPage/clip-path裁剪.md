## clip-path的作用
clip-path出现，它可以帮助我们绘制很多特殊的图形（不规则的图形）
### 浏览器兼容性
IE 和 Edge 不支持这个属性。Firefox 仅部分支持 clip-path （它只支持 url() 语法）。但是 47 以上的版本，激活 Firefox 的layout.css.clip-path-shapes.enabled选项就可以支持这个属性了。
Chrome、Safari 和 Opera 需要使用 -webkit- 前缀支持此属性。还不支持外部的 SVG 形状。
## clip-path语法
```css
clip-path: <clip-source> | [ <basic-shape> || <geometry-box> ] | none
```
默认值为：none
<ul>
    <li>clip-source：可以是内、外部的SVG的clipPath元素的URL引用</li>
    <li>basic-shape：使用一些基本的形状函数创建一个形状。主要包括circle()、ellipse()等</li>
    <li>geometry-box：可选参数，此参数和basic-shape一起使用时，可以为basic-shape的裁剪提供参考盒子。如果geometry-box由自身指定，那么它会使用指定盒子形状作为裁剪的路径，包括任何(由border-radius提供的)的角的形状。</li>
</ul>

## clip-path使用
注意：
<ul>
    <li>使用clip-path要从同一方向绘制，如果顺时针就一律顺时针，逆时针就一律逆时针。因为polygon是一个连续的线段，如果线段有交叉，裁剪区域就会有相减的情况</li>
    <li>如果裁剪时，采用比例方式绘制，长宽就必须先设定。</li>
</ul>

### 1、使用polygon()函数
<ul>
    <li>polygon()函数：用于定义一个多边形，也可以用来剪裁图形。它的参数是一组坐标对（shape-arg shape-arg），每一个坐标对代表多边形的一个顶点坐标。浏览器会将最后一个顶点和第一个顶点连接得到一个封闭的多边形。坐标对使用逗号来进行分隔，可以使用绝对单位或百分比单位值。</li>
    <li>除了坐标对参数，polygon()函数还可以使用一个可选的关键字fill-rule。该关键字指定如何处理可能相交的多边形形状的区域。可取值有nonzero 和evenodd。默认值为nonzero。</li>
</ul>

#### 示例
每一个点的第一个坐标决定了在x轴的位置，第二点决定在y轴的位置，所有的点是顺时针绘制的，所以以图形左上角为（0,0）坐标，x轴向右延伸，y轴向下延伸。当前菱形最右面的点（100% 50%），它位于x轴最长，y轴一半，在第四象限上。
<script setup>
</script>
<div style="display:flex">
    <img src='/test.jpg' style="width:200px;height:200px"/>
    <img src='/test.jpg' style="width:200px;height:200px;clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"/>
</div>

#### 代码
```css
<div style="display:flex">
    <img src='/test.jpg' style="width:200px;height:200px"/>
    <img src='/test.jpg' style="width:200px;height:200px;clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"/>
</div>
```

### 2、使用circle()函数
语法如下：
```css
circle( [<shape-radius>]? [at <position>]? )
```
其中?是正则表达式中的特殊符号，标识0和1，也就是说shape-radius（圆半径）和position（圆心位置）都是可以缺省的。
#### 代码：
```css
shape-outside: circle();
shape-outside: circle(50%);
shape-outside: circle(at 50% 50%);
shape-outside: circle(50% at 50% 50%);
shape-outside: circle(50px at 50px 50px);
```
#### 示例：
<div style="">
    <img src='/test.jpg' style="width: 200px;height: 200px;shape-outside: polygon(50% 0px, 100% 50%, 50% 100%, 0px 50%);margin: 20px;float: left;"/>
    <span>e had agreed, my companion and I, that I should call for him at his house, after dinner, not later than eleven
      o’clock. This athletic young Frenchman belongs to a small set of Parisian sportsmen, who have taken up
      “ballooning” as a pastime. After having exhausted all the sensations that are to be found in ordinary sports, even
      those of “automobiling” at a breakneck speed, the members of the “Aéro Club” now seek in the air, where they
      indulge in all kinds of daring feats, the nerve-racking excitement that they have ceased to find on earth.</span>
</div>

#### 解析:
```css
circle() // 圆形使用closest-side作为半径，圆形位于元素中心.
circle(100px at 30% 50%); // 半径100px，圆形30% 50%
circle(farthest-side at 25% 25%); // 圆形的半径为最远边的一半，位于元素的水平25%，垂直25%的地方
```
<div style="display:flex">
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: circle();"/>
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: circle(100px at 30% 50%);"/>
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: circle(farthest-side at 25% 25%);"/>
</div>

### 3、ellipse()函数椭圆
语法如下：
```css
ellipse( [<shape-radius>{2}]? [at <position>]? )
```
x轴半径，y轴半径，以及椭圆的圆心位置。x，y半径除了具体数值，还支持farthest-side和closest-side这两个关键字，顾名思义，分别表示到最长边的长度和最短边的长度。
#### 代码
```css
ellipse() //
ellipse(100px 50px at 30% 50%); // 椭圆形的X轴半径100像素，Y轴半径50像素。圆心位于水平30%，垂直50%的地方
ellipse(farthest-side closest-side at 25% 25%); // 椭圆形的X轴半径为farthest-side，Y轴半径为closest-side。圆心位于水平25%，垂直25%的地方
ellipse(50px 75px at 50% 50%)
ellipse(farthest-side closest-side at 25% 25%)
```
#### 示例
<div style="display:flex;flex-wrap: wrap;">
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: ellipse();"/>
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: ellipse(100px 50px at 30% 50%);"/>
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: ellipse(farthest-side closest-side at 25% 25%);"/>
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: ellipse(50px 75px at 50% 50%);"/>
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: ellipse(farthest-side closest-side at 25% 25%);"/>
</div>

### 4、inset()函数-内矩形（包括圆角矩形）
语法如下：
```css
inset( <shape-arg>{1,4} [round <border-radius>]? )
```
#### 代码
```css
inset(10% 20% round 5px); // 一个带5像素圆角的矩形，上下2条边向内10%，左右2条边向内20%
inset(15px 20px 30px);
inset(25% round 10px 30px);
inset(10px 20px 30px 40px round 10px);
```
#### 示例
<div style="display:flex;flex-wrap: wrap;">
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: inset(10% 20% round 5px)"/>
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: inset(15px 20px 30px);"/>
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: inset(25% round 10px 30px);"/>
    <img src='/test.jpg' style="width: 200px;height: 200px;clip-path: inset(10px 20px 30px 40px round 10px);"/>
</div>






