<template>
  <div>
    <!--已登录 -->
    <div class="hander hander-login" v-if="user && user.token">
      <div class="arate">
        <div class="left">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="botton">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="hander hander-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="文字">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="文字">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button class="logout" block v-if="user && user.token" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'my',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        this.userInfo = res.data.data
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定要退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.hander {
  width: 750px;
  height: 401px;

  background: rgb(64, 155, 247, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.hander-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
    margin-bottom: 10px;
  }
  p {
    font-size: 28px;
    font-weight: 400;

    color: #ffffff;
    margin: 0;
    padding: 0;
  }
}
.hander-login {
  padding-top: 116px;
}
.arate {
  margin-bottom: 55px;
  padding: 0 32px 0 33px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .botton {
    width: 116px;
    height: 33px;
    background-color: #ffffff;
    border-radius: 16px;

    text-align: center;
    line-height: 32px;
    font-size: 20px;

    font-weight: normal;
    color: #666666;
  }
  .left {
    display: flex;
    align-items: center;
    span {
      margin-left: 22px;
      width: 153px;
      height: 29px;
      font-size: 30px;
      color: #ffffff;
    }
  }
}
.list {
  display: flex;
  li {
    flex: 1;
    text-align: center;
    p {
      color: #fff;
      font-weight: normal;
      &:nth-child(1) {
        font-size: 36px;
      }
      &:nth-child(2) {
        font-size: 23px;
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}

/deep/ .van-grid-item__text {
  font-size: 28px;
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: red;
}
</style>
