import util from '@/libs/util.js'
import { ConnectionSelect } from '@/api/connection';

export default {
  namespaced: true,
  actions: {
    /**
     * @description 消息列表
     */
    select (e, data) {
      return ConnectionSelect(data)
    },
  }
}
