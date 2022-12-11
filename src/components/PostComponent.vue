<template>

    <section class="row">
        <div class="col-4 p-3">
            <router-link :to="{ name: 'Profile', params: { id: post.creatorId } }">
                <img :src="post.creator.picture" class="user-picture">
            </router-link>

        </div>
        <div class="col-5 p-3 mt-5">
            <!-- creator name, graduated, how long ago post was made -->
            <h6>{{ post.creator.name }} <span v-if="post.creator.graduated"><i class="mdi mdi-school"></i></span>
            </h6>
            <!-- FIXME figure out how to get how long ago a post was made -->
            <p>{{ new Date(post.creator.createdAt).toLocaleString('en-US') || 'now' }}</p>
        </div>
        <div class="col-3 mt-5">
            <h1 v-if="state.liked || post.likedByAccount" @click="likeOrUnlike(post.id)"><i
                    class="mdi mdi-heart text-danger selectable"></i>
            </h1>
            <h1 v-else @click="likeOrUnlike(post.id)"><i class="mdi mdi-heart-outline text-danger selectable"></i></h1>
            <p>This post has {{ state.likeCount }} like(s)!</p>

        </div>
    </section>
    <section class="row serif-font">
        <div class="col-11 m-3">{{ post.body }}</div>


        <div v-if="post.imgUrl" class="text-center p-0">
            <img :src="post.imgUrl" class="img-fluid post-img ">
        </div>

    </section>



</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { Post } from '../models/Post.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { accountService } from '../services/AccountService.js';

export default {
    props: { post: { type: Post, required: true } },
    setup(props) {
        const state = reactive({
            liked: false,
            likeCount: props.post.likeIds.length
        })
        // watchEffect(() => {
        //     if (AppState.account.id) {
        //         checkLikes()

        //     }
        // })
        // function checkLikes() {
        //     postsService.checkLikes(props.post.id)
        // }





        return {
            state,
            account: computed(() => AppState.account),
            async likeOrUnlike(id) {
                try {
                    logger.log(id)
                    await postsService.likeOrUnlike(id)
                    logger.log(props.post.likeIds)
                    state.liked = !state.liked
                    if (state.liked) {
                        state.likeCount++
                    } else {
                        state.likeCount--
                    }

                } catch (error) {
                    logger.log(error)
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.serif-font {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif
}

.post-img {
    object-fit: cover;
    object-position: center;
    width: 100%;

}

.user-picture {
    height: 20vh;
    width: 20vh;
    border-radius: 50%;
}
</style>