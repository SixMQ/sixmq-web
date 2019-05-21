import util from '@/libs/util.js'
import { QueueList } from '@/api/queue';

export default {
  namespaced: true,
  actions: {
    /**
     * @description 队列列表
     */
    list () {
      return QueueList()
    },
  }
}
