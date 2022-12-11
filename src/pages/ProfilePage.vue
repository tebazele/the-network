<template>
    <!-- <ProfileCard :profile="profile" /> -->
    <div class="bg-white elevation-5 p-0 my-3 col-12 container-fluid">
        <section v-if="profile" class="d-flex bg-image ps-3 justify-content-between">
            <div class="col-4 mt-3">
                <img :src="profile.picture" class="img-fluid rounded-circle elevation-5 profile-img" />

            </div>

            <div class="col-3 d-flex align-items-end text-shadow">

                <h1 v-if="profile.github"><i class="mdi mdi-github"></i><a target="_blank" :href="profile.github"></a>
                </h1>
                <h1 v-if="profile.linkedin"><i class="mdi mdi-linkedin"></i><a target="_blank"
                        :href="profile.linkedin"></a>
                </h1>
                <h1 v-if="profile.resume"><i class="mdi mdi-file-certificate"></i><a target="_blank"
                        :href="profile.resume"></a></h1>
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

    <div class="bg-white elevation-5 my-2 ">
        <section class="row">
            <div class="col-12">
                <CreatePost />
            </div>
        </section>

    </div>


    <section class="row">
        <div class="col-12 bg-white elevation-5 ms-2 my-2 me-3" v-for="p in posts">

            <PostComponent :post="p" />


        </div>

    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
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
        watchEffect(() => getProfileById())

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
        onMounted(() => {
            // getProfileById();
            getPostsByProfileId()
        });
        return {
            coverImg: computed(() => `url(${AppState.activeProfile.coverImg})`),
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            posts: computed(() => AppState.posts)
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
    background-position: bottom;
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
</style>