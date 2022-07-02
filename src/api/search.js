import request from '@/utils/request'
export const getSuggestList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}
/**
 * 获取搜索结果
 * @param page 当前是第几页 per_page 每页的数量 q 搜索关键字
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page, per_page, q }) => {
  return request({
    url: 'search',
    params: {
      page, per_page, q
    }
  })
}
