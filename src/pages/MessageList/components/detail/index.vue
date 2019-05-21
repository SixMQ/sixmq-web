<template>
  <div v-if="detail">
    <p>消息ID: {{detail.messageId}}</p>
    <status :data="detail"/>
    <p>消息数据：</p>
    <d2-highlight :code="detail.dataText" lang="json"/>
    <p>消息结果：</p>
    <p v-text="detail.resultData"></p>

    <p>
      <el-button type="success" @click="pushToQueue">加入队列</el-button>
    </p>
  </div>
</template>

<script>
import util from '@/libs/util'
import status from '../status'
import { Message } from 'element-ui'
import store from '@/store'
export default {
  name: 'detail',
  components: {
    status
  },
  props: {
    data: {
      default: null,
    },
  },
  data: () => {
    return {
      detail: null,
    }
  },
  mounted() {
    this.detail = this.data;
  },
  methods: {
    pushToQueue(){
      this.$confirm('是否将消息重新加入队列?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('d2admin/message/repush', {
          messageId: this.detail.messageId,
        }).then(res => {
          Message({
            message: '加入队列成功',
            type: 'success'
          });
        });
      });
    },
  },
}
</script>
