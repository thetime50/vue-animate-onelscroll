# vue-animate-onelscroll
A simple Vue directive that animates elements as they scroll into view.

[![View UI](https://img.shields.io/npm/v/vue-animate-onelscroll.svg?style=flat)](https://www.npmjs.org/package/vue-animate-onelscroll)

## Installation

```sh
npm install vue-animate-onelscroll
# or
yarn add vue-animate-onelscroll
```

## Setup
Import to your `Vue` application
```javascript
import Vue from 'vue'
import VueAnimateOnElScroll from 'vue-animate-onelscroll'

Vue.use(VueAnimateOnElScroll)
```

## Usage
For demo purposes, let's use [animate.css](https://daneden.github.io/animate.css/),
a css animation library but using your own custom CSS animations would work the same way as well.

Import `animate.css` anyway you like. For demo purposes, in your `index.html`
```html
<head>
  <!-- some other stuff -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css">
</head>
```

Pass the desired class as a string literal (in single quotes) in your `Vue` template:
```html
<div v-onelscroll="'animated flip'">Animate me once upon scroll</div>
```

### Repeat Modifier
Note that by default the animation will only trigger once: the first time the element scrolled into view. If you want to repeat the animation everytime it was scrolled into view, use the `repeat` modifier:
```html
<div v-onelscroll.repeat="'animated flip'">Animate me upon scroll forever</div>
```

### Scroll Direction
It's also possible to animate only on a specific scroll direction by passing in an object as the value. In the following example, the animation will only trigger the first time you scroll down on the element.

```html
<div v-onelscroll="{down: 'animated flip'}">Animate me once upon scroll down</div>
```
On upward scroll:
```html
<div v-onelscroll="{up: 'animated rotateOut'}">Animate me once upon scroll up</div>
```

If you want to repeat the animation *everytime you scroll down* to the element add the `repeat` modifier:

```html
<div v-onelscroll.repeat="{down: 'animated flip'}">Animate me everytime you scroll down on me</div>
```

### Multiple animations
Or use two different animations for each scroll direction:
```html
<div v-onelscroll="{down: 'animated flip', up: 'animated rotateOut' }">Animate me upon scroll forever</div>
```
Note that by providing both `up` and `down` directions, the `repeat` modifier is implicitly in effect.

## 新增特性
### scrollEl参数
可以指定滚动元素scrollEl \[undefined, null, string, Element\]  
- 如果未指定滚动元素，默认监听window的滚动事件，并且v-onelscroll指令可以用在任何元素上
- 如果scrollEl的值是null 不会进行初始化
- 如果指定了 scrollEl 那么绑定的元素要能够通过 el.offsetTop直接获取到在容器中的位置
- 如果scrollEl的值是string 则会通过 document.querySelector 获取dom
- scrollEl 可以初始化为 null mounted 后直接绑定Dom元素

```html
<template>
    <div class="component-scroll-animate flex-layout">
        <div class="scroll-wrap flex-auto scroll-all" ref="scrollWrap">
            <div class="content"> <!-- 这一层元素可以不需要 -->
                <div class="item" v-onelscroll="{
                        scrollEl:scrollEl, 
                        down: 'animated zoomInRight', 
                        up: 'animated flipInX' 
                    }"
                >item</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "scroll-animate",
    data() {
        return {
            scrollEl:null,
        };
    },
    mounted () {
        this.$nextTick(()=>{
            this.scrollEl = this.$refs.scrollWrap
        })
    }
};
</script>

```

### edge修饰符

添加.edge修饰符，只在进入/退出视图区域时触发动画，不会在视图区域中间触发
```html
  <div class="item" v-onelscroll.repeat.edge="{
          down: 'animated zoomInRight', 
          up: 'animated flipInX' 
      }"
  >item</div>
```

## Demo

Live demo [here](https://thetime50.github.io/front-laboratory/laboratory/dist/index.html#/animation/scroll-animate).  
Live demo [here -ch](http://thetime50.com/front-laboratory/laboratory/dist/index.html#/animation/scroll-animate).

## License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">vue-animate-onscroll</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="www.josephharveyangeles.com" property="cc:attributionName" rel="cc:attributionURL">Joseph Harvey Angeles</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/josephharveyangeles/vue-animate-onscroll" rel="dct:source">https://github.com/josephharveyangeles/vue-animate-onscroll</a>.