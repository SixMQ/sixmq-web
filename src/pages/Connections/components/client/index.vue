<template>
  <div>
    <template v-if="clientInfo">
      <p><span v-text="clientInfo.remote_ip"></span>:<span v-text="clientInfo.remote_port"></span></p>
    </template>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'client',
  props: {
    data: {
      default: null,
    },
  },
  data: () => {
    return {
      clientInfo: null,
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