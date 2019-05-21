import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function AccountStatus() {
  return request({
    url: '/auth/status'
  })
}