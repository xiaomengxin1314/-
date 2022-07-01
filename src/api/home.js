import request from '@/utils/request'
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
/**
 *获取文章列表
 * @param {*} channel_id
 * @param {*} timestamp
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArcleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id, timestamp
    }
  })
}
// 获取所有的频道列表

export const getAllArcleList = () => {
  return request({
    url: 'channels'
  })
}

export const saveChannel = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: { channels }
  })
}
