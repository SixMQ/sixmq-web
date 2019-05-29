<template>
  <div>
    <p v-text="statusText"></p>
    <p v-if="errorCount > 0">
      失败次数: {{errorCount}} / {{retry}}
    </p>
    <p v-if="delay">延迟 {{delay}} 秒执行, 计划执行时间：<br/>{{delayRunTime|formatDate}}</p>
    <p v-if="timeout > -1">任务超时：{{timeout}} 秒</p>
    <p v-if="ttl > -1">
      <template v-if="realTTL > 0">消息即将过期：{{realTTL}} 秒</template>
      <template v-else>消息已过期</template>
    </p>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'status',
  props: {
    data: {
      default: null,
    },
  },
  data: () => {
    return {
      consum: false,
      delay: null,
      delayRunTime: null,
      timeout: -1,
      errorCount: 0,
      retry: 0,
      status: 0,
      statusText: '',
      ttl: -1,
      realTTL: 999,
      ttlHandler: null,
    }
  },
  filters: {
    formatDate(value){
      return util.formatDate(new Date(value * 1000));
    },
  },
  mounted() {
    this.$nextTick(()=>{
      Object.assign(this.$data, this.data ? this.data : JSON.parse(JSON.stringify(this.$parent.scope.row)))
      if(this.ttl > -1)
      {
        this.realTTL = this.ttl - 1;
        this.ttlHandler = setInterval(()=>{
          --this.realTTL;
        }, 1000);
      }
    })
  },
  beforeDestroy(){
    if(this.ttlHandler)
    {
      console.log('clear');
      clearInterval(this.ttlHandler);
    }
  }
}
</script>

<style>
.true, .false{
  font-size: 24px;
  vertical-align: middle;
}
.true{
  color: green;
}
.false{
  color: red;
}
</style>