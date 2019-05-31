<template>
  <div>
    <template v-if="blockStatus">
      <p v-text="blockStatus.type"></p>
      <p v-if="'push' === blockStatus.type">
        消息ID: <span v-text="blockStatus.data.serverPush.messageId"></span>
      </p>
      <p v-else-if="'pop' === blockStatus.type">
        队列ID: <span v-text="blockStatus.data.popData.queueId"></span>
      </p>
    </template>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'blockStatus',
  props: {
    data: {
      default: null,
    },
  },
  data: () => {
    return {
      blockStatus: null,
    }
  },
  filters: {
    formatDate(value){
      return util.formatDate(new Date(value * 1000));
    },
  },
  mounted() {
    this.$nextTick(()=>{
      Object.assign(this.$data, this.data ? this.data : this.$parent.scope.row)
    })
  },
}
</script>

<style>
</style>