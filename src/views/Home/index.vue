<template>
  <div>
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button type="info" to="/search" round icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in HomeList" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelShow"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPanel
        :HomeList="HomeList"
        :active="active"
        @chang-active="changAct"
        @del-active="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
import ChannelPanel from './components/ChannelPanel'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getHomeChannel()
  },
  data () {
    return {
      active: 0,
      HomeList: [],
      isChannelShow: false
    }
  },
  // 三种情况
  // 1. 没有登陆第一次安装好app,第一次打开的时候 只能去ajax中拿
  // 2.没有登陆 但第二次打开，有可能频道被编辑或删除过 这样的从本地拿
  // 3.登陆过zhijiecongajax拿
  // 编辑 删除的时候 持久化数据 1.没有登陆 把数据放在本地存储 2.登陆过用Ajax
  methods: {
    async getHomeChannel () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log(res)
          this.HomeList = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    },
    changAct (index) {
      this.active = index
      this.isChannelShow = false
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang="less">
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);

  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 82px;
  position: fixed;
  right: 0;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
