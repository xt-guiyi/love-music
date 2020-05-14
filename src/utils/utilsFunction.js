/*
封装添加和删除动画(animated官网例子)
 */
export const animateCSS = (vm, elementRef, animationName) => {
  const node = vm.$refs[elementRef]
  // console.log(node)
  node.classList.add('animated', animationName)
  // 动画结束后删除动画类
  function handleAnimationEnd() {
    node.classList.remove('animated', animationName)
    node.removeEventListener('animationend', handleAnimationEnd)
  }

  node.addEventListener('animationend', handleAnimationEnd)
}

// 从数组中随机获取任意个元素
export const getRandomArrayElements = (arr, count) => {
  var newArr = arr.slice(0)
  var i = arr.length,
    min = i - count
  while (i-- > min) {
    let index = Math.floor(Math.random() * (i + 1))
    let temp = newArr[index]
    newArr[index] = newArr[i]
    newArr[i] = temp
  }
  return newArr.slice(min)
}
