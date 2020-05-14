<template>
  <main style="margin-top: 1rem;">
    <!-- 轮播图组件 -->
    <carousel-image
      :height="carousel.height"
      :interval="carousel.interval"
      :list="carousel.list"
    ></carousel-image>
    <!-- 导航菜单 -->
    <nav-Menu></nav-Menu>
    <!-- 推荐歌单 -->
    <recommend-song-list :songListData="songListData"></recommend-song-list>
    <!-- 新歌新蝶列表 -->
    <new-song-list
      :newSongData="newSongData"
      :newSongDish="newSongDish"
    ></new-song-list>
  </main>
</template>

<script>
import CarouselImage from 'components/FindChildComponents/CarouselImage.vue'
import NavMenu from 'components/FindChildComponents/NavMenu.vue'
import RecommendSongList from 'components/FindChildComponents/RecommendSongList.vue'
import NewSongList from 'components/FindChildComponents/NewSongList.vue'

import { findPageApi } from 'request/api/index'
export default {
  data() {
    return {
      // 轮播图参数
      carousel: {
        height: '12rem',
        interval: 3000,
        list: []
      },
      // 推荐歌单数据
      songListData: [],
      // 推荐新歌数据
      newSongData: [],
      // 推荐新碟数据
      newSongDish: []
    }
  },
  components: {
    CarouselImage,
    NavMenu,
    RecommendSongList,
    NewSongList
  },
  created() {
    this.getObtainCarousel()
    this.getRecommendedSongList()
    this.getNewSong()
    this.getNewDish()
  },
  methods: {
    // 获取轮播图片
    async getObtainCarousel() {
      const { data } = await findPageApi.bannerSwiper()
      // 请求失败，则retrun
      if (data === undefined) {
        return false
      } else if (data.code === 200) {
        this.carousel.list = data.banners
      }
      // console.log(this.carousel)
    },
    // 获取推荐歌单数据
    async getRecommendedSongList() {
      const { data } = await findPageApi.personalizedSong()
      // console.log(data)
      if (data === undefined) {
        return false
      } else if (data.code === 200) {
        this.songListData = data.result
      }
    },
    // 获取新歌数据
    async getNewSong() {
      const { data } = await findPageApi.personalizedNewSong()
      if (data === undefined) {
        return false
      } else if (data.code === 200) {
        this.newSongData = data.result
        // console.log(this.newSongData)
      }
    },
    // 获取新碟数据
    async getNewDish() {
      const { data } = await findPageApi.personalizedNewDish()
      if (data === undefined) {
        return false
      } else if (data.code === 200) {
        this.newSongDish = data.albums
        // console.log(this.newSongDish)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
