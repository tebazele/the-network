<template>
    <form class="m-3 serif-font" @submit.prevent="createPost">
        <div class="mb-3">
            <textarea v-model="state.newPost.body" type="text" class="form-control" id="postBody"
                placeholder="Write something..." required></textarea>
        </div>
        <div class="mb-3">
            <label for="postImg">Add an Image</label>
            <input v-model="state.newPost.imgUrl" type="text" class="form-control" id="postImg">
        </div>
        <button class="btn btn-success">Post</button>
    </form>





</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
export default {
    setup() {
        const state = reactive({
            newPost: {
                body: '',
                imgUrl: ''
            }
        })
        return {
            state,
            async createPost() {
                try {
                    await postsService.createPost(state.newPost)
                    state.newPost = {}
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
</style>