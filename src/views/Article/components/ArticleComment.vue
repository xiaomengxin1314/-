<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        // props自定义校验函数
        return ['a', 'c'].includes(value) // 数据只能是a或是c才能通过
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        console.log(res)
        // 数据已全部加载完毕，则直接将finished设置成true即可
        if (res.data.data.results.length === 0) { // 判断数据是否加载完毕
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results) // 保留每一页数据
        // 本次返回结果的最后一个评论id作为下一页数据的offset参数若本次无具体数据，则值为null
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 每次当前数据拿回来了 就把loading转圈效果关闭掉
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // console.log(123)
      // 获取每一页数据
      this.getCommentList()
    }
  },
  computed: {},
  watch: {},
  filters: {},

  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
