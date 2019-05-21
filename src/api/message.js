import request from '@/plugin/axios'

export function MessageList (data) {
  return request({
    url: '/message/list',
    data
  })
}

export function MessageRepush(messageId) {
  return request({
    url: '/message/repush',
    method: 'POST',
    data: {
      messageId: messageId,
    },
  })
}

export function MessageListByGroup(data) {
  return request({
    url: '/message/listByGroup',
    data
  })
}
