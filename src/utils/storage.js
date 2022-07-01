// 为了方便项目中使用本地存储的时候写的时候，简化操作 封装 获取 设置删除 全部删除工具函数
/**
 *获取
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    console.log(err)
  }
}
/**
 * 设置
 * @param {*} key
 * @param {*} value
 */

export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.steItem(key, value)
  }
}
/**
 *根据key删除本地存储的某一个数据
 * @param {*} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
/**
 * 清除所有的本地存储数据
 */
export function clearItem () {
  window.localStorage.clearItem()
}
