<template>
  <div>
    <p><el-link type="primary" :underline="false" v-text="groupId" @click="gotoGroupMessageList"></el-link></p>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'group',
  props: {
    data: {
      default: null,
    },
  },
  data: () => {
    return {
      queueId: '',
      groupId: '',
    }
  },
  mounted() {
    Object.assign(this.$data, this.data ? this.data : this.$parent.scope.row)
  },
  methods: {
    gotoGroupMessageList(){
      let data = {
        queueId: this.queueId,
        groupId: this.groupId,
      }
      this.$router.push({
        name: 'groupMessageList',
        params: data,
      })
    },
  },
}
</script>

<style>

</style>