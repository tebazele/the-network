<template>

  <div class="container-fluid">
    <section class="row">
      <div v-if="account.id" class="col-12 p-3 m-3 bg-white elevation-5 serif-font">
        <CreatePost />

      </div>
    </section>
    <section class="row">
      <div class="col-12 bg-white elevation-5 m-3" v-for="p in posts">
        <PostComponent :post="p" />

      </div>
      <!-- <div class="col-5">
        Place Ads here
      <Banner />
  </div> -->
    </section>
  </div>


</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
import { onMounted, computed, ref, reactive } from 'vue';
import { AppState } from '../AppState.js';
import PostComponent from '../components/PostComponent.vue';
import CreatePost from '../components/CreatePost.vue';
import Banner from '../components/Banner.vue';

export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.log(error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getPosts()
    })
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
    }
  },
  components: { PostComponent, CreatePost, Banner }
}
</script>

<style scoped lang="scss">

</style>
