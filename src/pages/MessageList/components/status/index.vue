<template>
  <div>
    <p v-text="statusText"></p>
    <p v-if="errorCount > 0">
      失败次数: {{errorCount}} / {{retry}}
    </p>
    <p v-if="delay">延迟 {{delay}} 秒执行, 计划执行时间：<br/>{{delayRunTime|formatDate}}</p>
    <p v-if="timeout > -1">任务超时：{{timeout}} 秒</p>
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
      statusText: '',
    }
  },
  filters: {
    formatDate(value){
      return util.formatDate(value);
    },
  },
  mounted() {
    Object.assign(this.$data, this.data ? this.data : this.$parent.scope.row)
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