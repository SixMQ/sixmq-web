import request from '@/plugin/axios'

export function ConnectionSelect (data) {
  return request({
    url: '/connection/select',
    data
  })
}
