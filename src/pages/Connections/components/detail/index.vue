<template>
  <div class="connections-detail">
    <template v-if="fd">
      <p>连接fd: <span v-text="fd"></span></p>
      <p>
        客户端: 
        <client :data="data"/>
        <d2-highlight :code="clientInfoText" lang="json"/>
      </p>
      <p>阻塞状态: 
        <blockStatus :data="data"/>
        <d2-highlight :code="blockStatusText" lang="json"/>
      </p>
      <p>连接时间: <span>{{clientInfo.connect_time|formatDate}}</span></p>
      <p>最后通讯时间: <span>{{clientInfo.last_time|formatDate}}</span></p>
    </template>
  </div>
</template>

<script>
import util from '@/libs/util'
import client from '../client'
import blockStatus from '../blockStatus'
export default {
  name: 'detail',
  components: {
    client,
    blockStatus,
  },
  props: {
    data: {
      default: null,
    },
  },
  data: () => {
    return {
      fd: null,
      clientInfo: null,
      blockStatus: null,
      clientInfoText: '',
      blockStatusText: '',
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
      this.clientInfoText = vkbeautify.json(JSON.stringify(this.clientInfo), 4);
      this.blockStatusText = vkbeautify.json(JSON.stringify(this.blockStatus), 4);
    })
  },
}
</script>

<style>
.connections-detail{
  max-height: 700px;
  overflow: auto;
}
</style>