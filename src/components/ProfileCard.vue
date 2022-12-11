<template>
    <div class="bg-white elevation-5 p-0 my-3 col-10 container-fluid">
        <section v-if="profile" class="d-flex bg-image ps-3 justify-content-between align-items-center">
            <div class="col-4 my-3">

                <img :src="profile.picture" class="img-fluid rounded-circle elevation-5 profile-search-img selectable"
                    @click="goToProfile" />




            </div>
            <div class="col-8">
                <h6>{{ profile.name }}</h6>
                <p class="text-secondary">{{ profile.email }}</p>
                <p>{{ profile._id }}</p>
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';

import { Account } from '../models/Account.js';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
export default {
    props: { profile: { type: Object, required: true } },
    setup(props) {
        const router = useRouter()
        return {
            async goToProfile() {
                try {
                    logger.log(props.profile._id)
                    debugger
                    await profilesService.getProfileById(props.profile._id)
                    router.replace({ path: `/profile/${props.profile._id}` })
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
.profile-search-img {
    height: 60px;
    width: 60px;
}
</style>