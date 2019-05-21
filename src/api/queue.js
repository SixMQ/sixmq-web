import request from '@/plugin/axios'

export function QueueList (data) {
  return request({
    url: '/queue/list',
  })
}
