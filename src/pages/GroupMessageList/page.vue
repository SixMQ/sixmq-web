<template>
  <d2-container class="page">
    <d2-crud
      :columns="columns"
      :data="tableData"
      :rowHandle="rowHandle"
      @custom-emit-1="handleCustomEvent"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange">
        <el-form
          slot="header"
          :inline="true"
          :model="form"
          ref="form"
          size="mini">

          <el-form-item>
            <el-button
              type="primary"
              @click="handleFormSubmit">
              <d2-icon name="search"/>
              刷新
            </el-button>
          </el-form-item>

        </el-form>
    </d2-crud>
    <el-dialog
      title="消息详情"
      width="600px"
      :visible.sync="messageDetailVisible"
      :append-to-body="true">
        <detail v-if="messageDetailVisible" :data="detail"/>
    </el-dialog>
  </d2-container>
</template>

<script>
import store from '@/store'
import router from '@/router'
import util from '@/libs/util'
import status from '../MessageList/components/status'
import detail from '../MessageList/components/detail'
import group from '../MessageList/components/group'
import '@/components/highlight-styles/github.css'
export default {
  components: {
    status,
    detail,
    group,
  },
  data () {
    return {
      messageDetailVisible: false,
      columns: [
        {
          title: '消息ID',
          key: 'messageId'
        },
        {
          title: '状态',
          component: {
            name: status
          }
        },
        {
          title: '分组ID',
          component: {
            name: group
          }
        },
        {
          title: '最后进入时间',
          key: 'inTime',
          formatter: this.formatDate
        },
        {
          title: '创建时间',
          key: 'firstInTime',
          formatter: this.formatDate
        },
      ],
      pagination: {
        currentPage: 1,
        pageSize: 15,
        total: 0
      },
      tableData: [
        
      ],
      rowHandle: {
        custom: [
          {
            text: '查看消息',
            type: 'primary',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
      },
      detail: null,
      status: [
        {
          label: '全部',
          value: 0,
        },
        {
          label: '空闲',
          value: 1,
        },
        {
          label: '工作中',
          value: 2,
        },
        {
          label: '成功',
          value: 3,
        },
        {
          label: '消费失败',
          value: 4,
        },
        {
          label: '超时失败',
          value: 5,
        },
      ],
      form: {
        status: 0,
      },
    }
  },
  mounted () {
    this.loadList();
  },
  beforeDestroy () {
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.loadList()
    },
    handleFormSubmit() {
      this.pagination.currentPage = 1
      this.loadList()
    },
    loadList() {
      store.dispatch('d2admin/message/listByGroup', {
        queueId: this.$route.params.queueId,
        groupId: this.$route.params.groupId,
        page: this.pagination.currentPage,
        count: this.pagination.pageSize,
      }).then(res => {
        this.pagination.total = res.pages * this.pagination.pageSize;
        this.tableData = [];
        this.$nextTick(()=>{
          this.tableData = res.list;
        })
      });
    },
    handleCustomEvent ({ index, row }) {
      this.detail = row;
      this.detail.dataText = vkbeautify.json(JSON.stringify(row.data), 4)
      this.messageDetailVisible = true;
    },
    formatDate(row, column, cellValue, index){
      let date = new Date(cellValue * 1000);
      return util.formatDate(date);
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  
}
</style>
