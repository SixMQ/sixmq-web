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
      title="连接详情"
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
import client from './components/client'
import blockStatus from './components/blockStatus'
import detail from './components/detail'
import '@/components/highlight-styles/github.css'
export default {
  components: {
    client,
    blockStatus,
    detail,
  },
  data () {
    return {
      messageDetailVisible: false,
      columns: [
        {
          title: '连接fd',
          key: 'fd'
        },
        {
          title: '客户端',
          component: {
            name: client
          }
        },
        {
          title: '阻塞状态',
          component: {
            name: blockStatus
          }
        },
        {
          title: '连接时间',
          key: 'clientInfo.connect_time',
          formatter: this.formatDate
        },
        {
          title: '最后通讯时间',
          key: 'clientInfo.last_time',
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
            text: '查看详情',
            type: 'primary',
            size: 'small',
            emit: 'custom-emit-1'
          }
        ]
      },
      detail: null,
      form: {
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
      store.dispatch('d2admin/connection/select', {
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
      // this.detail.dataText = vkbeautify.json(JSON.stringify(row.data), 4)
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
