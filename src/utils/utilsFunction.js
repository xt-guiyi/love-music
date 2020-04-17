/*
封装添加和删除动画(详见animated官网)
 */
export const animateCSS = (vm, element, animationName) => {
  const node = vm.$refs[element]
  // console.log(node)
  node.classList.add('animated', animationName)
  // 动画结束后删除动画类
  function handleAnimationEnd() {
    node.classList.remove('animated', animationName)
    node.removeEventListener('animationend', handleAnimationEnd)
  }

  node.addEventListener('animationend', handleAnimationEnd)
}
