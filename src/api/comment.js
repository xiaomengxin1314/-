import request from '@/utils/request'

/**
 *评价列表
 * @param type
 *@param
 *@param
* @param
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

export const addLike = (target) => {
  return request({
    method: 'POST',
    url: '/comment/likings',
    data: {
      target
    }
  })
}

export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/comment/likings/${target}`
  })
}

export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
