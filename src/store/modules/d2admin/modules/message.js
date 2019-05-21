import util from '@/libs/util.js'
import { MessageList, MessageRepush } from '@/api/message';

export default {
  namespaced: true,
  actions: {
    /**
     * @description 消息列表
     */
    list (e, data) {
      return MessageList(data)
    },
    repush(e, {messageId}) {
      return MessageRepush(messageId)
    },
  }
}
