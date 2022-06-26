import request from '@/utils/request'
export const getSmsCode = () => {
  return request({
    url: `sms/codes/${mobile}`
  })
}

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: { mobile, code }
  })
}
