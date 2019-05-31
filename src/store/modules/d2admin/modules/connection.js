import util from '@/libs/util.js'
import { ConnectionSelect, ConnectionClose } from '@/api/connection';

export default {
  namespaced: true,
  actions: {
    select (e, data) {
      return ConnectionSelect(data)
    },
    close (e, data) {
      return ConnectionClose(data)
    },
  }
}
