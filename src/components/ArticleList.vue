<template>
  <div>
    <van-cell-group>
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        ref="pullRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell
            :title="item.title"
            label="详细信息"
            v-for="(item, index) in artList"
            :key="index"
          >
          </van-cell> -->
          <ArticleItem
            v-for="(item, index) in artList"
            :key="index"
            :article="item"
          ></ArticleItem>
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import { getArcleList } from '@/api/home'
import ArticleItem from './ArticleItem.vue'
let ele = null
let scrollTop = 0
export default {
  // name: ArticleList,
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArcleList()
  },
  mounted () {
    // console.log(this.$refs.pullRefresh)
    // eslint-disable-next-line no-const-assign
    ele = this.$refs.pullRefresh.$el
    this.$refs.pullRefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      // eslint-disable-next-line no-const-assign
      scrollTop = this.scrollTop
    })
  },
  // 每次
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      artList: [],
      loading: false,
      finished: false,
      refreshing: false

    }
  },
  methods: {
    async getArcleList () {
      if (this.refreshing) {
        this.artList = []
        this.refreshing = false
      }
      try {
        const res = await getArcleList({ channel_id: this.id, timestamp: this.timestamp })

        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        // this.artList = res.data.data.results
        if (this.timestamp === null) {
          this.finished = true
        }
        this.artList.push(...res.data.data.results)
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArcleList()
    },
    onRefresh () {
      console.log('下拉触发了')
      this.finished = false
      this.timestamp = Date.now()
      this.getArcleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }

}

</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
