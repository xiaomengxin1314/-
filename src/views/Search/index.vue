<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.go(-1)"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
    </form>
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSearch" :searchText="searchText"> </SearchResult>

      <SearchSuggest
        @search="onSearch"
        :searchText="searchText"
        v-else
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './commponents/SearchHistory'
import SearchSuggest from './commponents/SearchSuggest'
import SearchResult from './commponents/SearchResult'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    // 想实现的需求，在搜索input回车的时候显示搜索结果
    onSearch (str) {
      this.isSearch = true
      this.searchText = str
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearchSuggest, SearchResult }
}
</script>

<style scoped lang='less'>
</style>
