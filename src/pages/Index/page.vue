<template>
  <d2-container class="page">
    <d2-crud
      :columns="columns"
      :data="data"
      :rowHandle="rowHandle"
      @custom-emit-1="handleCustomEvent"/>
  </d2-container>
</template>

<script>
import store from '@/store'
export default {
  
  components: {
  },
  data () {
    return {
      timeInterval: null,
      loading: false,
      columns: [
        {
          title: '队列ID',
          key: 'name'
        },
        {
          title: '等待消息数',
          key: 'waitingCount'
        },
        {
          title: '工作消息数',
          key: 'workingCount'
        },
        {
          title: '失败消息数',
          key: 'failCount'
        },
        {
          title: '超时消息数',
          key: 'timeoutCount'
        },
        {
          title: '总消息数',
          key: 'messageCount'
        },
      ],
      data: [
        
      ],
      rowHandle: {
        custom: [
          {
            text: '消息列表',
            type: 'primary',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
      },
    }
  },
  mounted () {
    this.loadList();
    this.timeInterval = setInterval(this.loadList, 3000);
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    loadList() {
      if(this.loading)
      {
        return;
      }
      this.loading = true;
      store.dispatch('d2admin/queue/list').then(res => {
        this.data = res.list;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    },
    handleCustomEvent ({ index, row }) {
      this.$router.push({
        name: 'messageList',
        params: {
          queueId: row.name,
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  
}
</style>
