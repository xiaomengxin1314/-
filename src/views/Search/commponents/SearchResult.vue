<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in resultList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getResul()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      resultList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getResul () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        // 数据加载完了
        if (res.data.data.results.length === 0) { // 数据加载完了需要fininsh变成true
          this.finished = true
          return
        }
        // 新旧数据要合并在一起而不是把新数据去覆盖就的数据
        this.resultList.push(...res.data.data.results)
        this.refreshing = false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // 每次到底部页面加1 加载新数据
      this.page++
      this.getResul()
    },
    onRefresh () {
      this.resultList = []
      this.page = 1
      this.getResul()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
