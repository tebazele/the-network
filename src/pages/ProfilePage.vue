<template>
    <!-- <ProfileCard :profile="profile" /> -->
    <div class="bg-white elevation-5 p-0 my-3 col-12 container-fluid">
        <section v-if="profile" class="d-flex bg-image ps-3 justify-content-between">
            <div class="col-4 mt-3">
                <img :src="profile.picture" class="img-fluid rounded-circle elevation-5 profile-img" />

            </div>

            <div class="col-3 d-flex align-items-end text-shadow ">

                <a v-if="profile.github" :href="profile.github" target="_blank"
                    class="a-tag elevation-2 mb-1 pt-1 px-1">
                    <h1 class="mdi mdi-github"></h1>
                </a>
                <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"
                    class="a-tag elevation-2 mb-1 pt-1 px-1">
                    <h1 class="mdi mdi-linkedin"></h1>
                </a>
                <a v-if="profile.resume" target="_blank" :href="profile.resume"
                    class="a-tag elevation-2 mb-1 pt-1 px-1">
                    <h1 class="mdi mdi-file-certificate"></h1>
                </a>
            </div>
        </section>
        <section class="row">
            <div class="col-4 mt-5 px-4">
                <h6 v-if="profile.graduated"><i mdi mdi-account-school></i>Graduated</h6>
                <h6 v-if="profile.class">{{ profile.class }}</h6>
                <h4>{{ profile.name }}</h4>

            </div>
            <div class="col-7 mt-5 serif-font">
                <i>{{ profile.bio }}</i>
            </div>
            <div v-if="profile.id == account.id" class="mb-2 text-end">
                <button data-bs-toggle="modal" data-bs-target="#editAccount" class="btn btn-primary me-5">
                    Edit Profile
                </button>
            </div>
        </section>
    </div>

    <div v-if="profile.id == account.id" class="bg-white elevation-5 my-2">
        <section class="row">
            <div class="col-12">
                <CreatePost />
            </div>
        </section>

    </div>



    <section class="row justify-content-center">
        <div class="col-11 bg-white elevation-5  ms-1 my-2 me-1" v-for="p in posts">

            <PostComponent :post="p" />


        </div>

    </section>

    <section class="row justify-content-between">
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
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import CreatePost from '../components/CreatePost.vue';
import PostComponent from '../components/PostComponent.vue';
import { postsService } from '../services/PostsService.js';
import ProfileCard from '../components/ProfileCard.vue';
export default {
    setup() {
        const route = useRoute();
        const myAccount = ref({})
        watchEffect(() => {
            getProfileById()
            getPostsByProfileId()
            if (AppState.account.id) {
                myAccount.value = { ...AppState.account }
            }
        })

        async function getProfileById() {
            try {
                await profilesService.getProfileById(route.params.id);
            }
            catch (error) {
                logger.log(error);
                Pop.error(error);
            }
        }

        async function getPostsByProfileId() {
            try {
                await postsService.getPostsByProfileId(route.params.id)
            } catch (error) {
                logger.log(error)
                Pop.error(error)
            }
        }
        // onMounted(() => {
        //     getProfileById();
        //     getPostsByProfileId()
        // });
        return {
            coverImg: computed(() => `url(${AppState.activeProfile.coverImg})`),
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            posts: computed(() => AppState.posts),
            currPage: computed(() => AppState.page),
            maxPage: computed(() => AppState.maxPage > 10 ? 10 : AppState.maxPage),
            async changePage(number) {
                try {
                    await postsService.changePage(number, route.params.id)
                } catch (error) {
                    logger.log(error)
                    Pop.error(error)
                }
            }
        };
    },
    components: { CreatePost, PostComponent, ProfileCard }
};
</script>


<style lang="scss" scoped>
.bg-image {
    background-image: v-bind(coverImg);
    height: 30vh;
    width: 100%;
    background-position: center;
    background-size: cover;
}

.profile-img {
    height: 25vh;
    width: 25vh;
    transform: translateY(2.5em);
}

.serif-font {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.text-shadow {
    text-shadow: 1px 1px rgb(198, 187, 187);
}

.a-tag {
    color: rgb(59, 54, 54);
}
</style>