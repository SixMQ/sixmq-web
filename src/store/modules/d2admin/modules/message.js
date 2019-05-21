import util from '@/libs/util.js'
import { MessageList, MessageRepush, MessageListByGroup } from '@/api/message';

export default {
  namespaced: true,
  actions: {
    /**
     * @description 消息列表
     */
    list (e, data) {
      return MessageList(data)
    },
    listByGroup (e, data) {
      return MessageListByGroup(data)
    },
    repush(e, {messageId}) {
      return MessageRepush(messageId)
    },
  }
}
