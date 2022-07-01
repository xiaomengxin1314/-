<template>
  <div>
    <div class="banner">
      <div class="title">
        <h3>我的频道</h3>
        <van-button type="default" round @click="isCloseShow = !isCloseShow">{{
          isCloseShow ? "完成" : "编辑"
        }}</van-button>
      </div>

      <van-row>
        <van-col span="6" v-for="(item, index) in HomeList" :key="item.id">
          <div
            class="inner"
            @click="Onclick(index)"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon
              name="close"
              v-show="isCloseShow"
              v-if="index !== 0"
              :style="{ color: active === index ? 'red' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="banner">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendList" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArcleList, saveChannel } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {

  props: {
    HomeList: {
      typr: Array,
      required: true
    },
    active: {
      trpe: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArcleList()
      console.log(res)
      this.recommendList = res.data.data.channels.filter(item => this.HomeList.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendList: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      // 获取索引值 判断索引是否相等
      const index = this.recommendList.findIndex(item => item.id === id)
      this.HomeList.push(this.recommendList[index])
      this.recommendList.splice(index, 1)
    },
    Onclick (index) {
      if (this.isCloseShow) {
        if (index === 0) return
        // 删除
        const obj = this.HomeList[index]
        this.HomeList.splice(index, 1)
        this.recommendList.push(obj)
        if (index < this.active) {
          this.$emit('del-active', this.active - 1)
        }
      } else {
        // 切换
        this.$emit('chang-active', index)
      }
    }
  },
  computed: {},
  watch: {
    HomeList: {
      async handler (newVal) {
        console.log(newVal)
        if (this.$store.state.user && this.$store.state.user.token) {
          // 未登录
          console.log(newVal)
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannel(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  display: flex;
  justify-content: space-between;
  padding: 0 16px 0 24px;
  margin-top: 52px;
  margin-bottom: 48px;

  h3 {
    width: 133px;
    height: 32px;
    font-size: 32px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: 36px;
  }
}
.van-button {
  width: 130px;
  height: 48px;
  border-radius: 20px;
  color: #f85a5a;
  // font-size: 12px;
}
.inner {
  width: 160px;
  height: 86px;
  background: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: 400;
  color: #222222;
  text-align: center;
  line-height: 86px;
  margin-left: 13px;
  margin-bottom: 20px;
  position: relative;
  .van-icon {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
</style>
