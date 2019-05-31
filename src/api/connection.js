import request from '@/plugin/axios'

export function ConnectionSelect (data) {
  return request({
    url: '/connection/select',
    data
  })
}

export function ConnectionClose (data) {
  return request({
    url: '/connection/close',
    method: 'POST',
    data,
  })
}
