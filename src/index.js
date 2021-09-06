import ScrollAnimate from './scroll-animate'

function getScrollEl(el,binding){
        let {name,value,oldValue,expression,arg,modifiers} = binding
        let elParam = value.el
        let scrollEl = window
        if (typeof elParam == 'string'){
          scrollEl = document.querySelector(elParam)
        } else if (elParam instanceof Element || elParam instanceof HTMLDocument) {
          scrollEl = elParam
        }
        return scrollEl
}

export default {
  ScrollAnimate,
  install(Vue) {
    Vue.directive('onelscroll', {
      inserted(el, binding) {
        let scrollEl = getScrollEl(el, binding)
        const scrollAnimate = ScrollAnimate(Date.now())
        const previousClassName = el.className
        let lastScrollTop = scrollEl.pageYOffset
        const scrollCb = function() {
          let scrollTop = scrollEl.pageYOffset || document.documentElement.scrollTop
          const isUpwards = scrollTop < lastScrollTop
          scrollAnimate.run(el, binding, {isUpwards, previousClassName},scrollEl)
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
        }
        el._onelscroll_scrollCb = scrollCb
        scrollEl.addEventListener('scroll', scrollCb, false)
      },
      unbind(el, binding, vnode, oldVnode) {
        let scrollEl = getScrollEl(el, binding)
        el._onelscroll_scrollCb && scrollEl.removeEventListener('scroll', el._onelscroll_scrollCb)
        el._onelscroll_scrollCb = null
      },
    })
  }
}
