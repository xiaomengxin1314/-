<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()"
      ><van-icon name="cross" slot="left"
    /></van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '不符合手机的格式',
          },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>

      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码必须是六位' },
        ]"
      >
        <!-- <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i> -->
        <HmIcon :name="'yanzhengma'" slot="left-icon"></HmIcon>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          /><van-button
            @click="sendSms"
            size="small"
            class="yzm"
            native-type="button"
            v-else
            >发送验证码</van-button
          ></template
        >
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="longin-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import HmIcon from '@/components/HmIcon.vue'
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      time: 5 * 1000,
      isCountDownShow: false
    }
  },

  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        this.$store.commit('setUser', res.data.data)
        console.log(res)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async sendSms () {
      try {
        await this.$refs.form.validate('mobile')
        // console.log('验证通过')
        this.isCountDownShow = true // 显示倒计时
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败，请重试')
        }
      } catch (err) {
        console.log(err)
        console.log('验证失败')
        this.$toast.fail('手机格式不对')
      }
    }
  },

  computed: {},
  watch: {},
  filters: {},
  components: { HmIcon }
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 37px;
}
.yzm {
  position: fixed;
  right: 18px;
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  .van-button__text {
    zoom: 0.95;
  }
}
.longin-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #ffffff;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
</style>
