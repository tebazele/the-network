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

    </section>
    <section class="row justify-content-between" v-if="currPage">

      <div class="col-2">
        <button v-if="currPage > 1" class="btn btn-success" @click="changePage(currPage - 1)">
          Previous
        </button>

        <button v-else class="btn btn-success" disabled>
          Previous
        </button>
      </div>
      <div class="col-3">
        <p>{{ currPage }}/{{ maxPage }}</p>
      </div>
      <div class="col-1 text-end">
        <button v-if="currPage < maxPage" class="btn btn-success" @click="changePage(currPage + 1)">
          Next
        </button>
        <button v-else class="btn btn-success" disabled>
          Next
        </button>
      </div>
    </section>
  </div>


</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
import { onMounted, computed, ref, reactive, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import PostComponent from '../components/PostComponent.vue';
import CreatePost from '../components/CreatePost.vue';
import Banner from '../components/Banner.vue';

export default {

  setup() {
    watchEffect(() => {
      if (AppState.account.id) {
        getPosts()
      }
    })
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
      account: computed(() => AppState.account),
      currPage: computed(() => AppState.page),
      maxPage: computed(() => AppState.maxPage),
      async changePage(number) {
        try {
          await postsService.changePage(number)
        } catch (error) {
          logger.log(error)
          Pop.error(error)
        }
      }
    }
  },
  components: { PostComponent, CreatePost, Banner }
}
</script>

<style scoped lang="scss">

</style>
