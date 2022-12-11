<template>
    <h3 class="ms-5 mt-1 text-secondary fira-sans">Sponsored</h3>
    <div class="mt-3 mx-3 mb-5 text-center" v-for="b in banners">
        <img v-if="b.tall" :src="b.square" alt="" class="img-fluid ad-img elevation-2">
    </div>



</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { bannersService } from '../services/BannersService.js'
export default {
    setup() {
        async function getBanners() {
            try {
                await bannersService.getBanners()
            } catch (error) {
                logger.log(error)
                Pop.error(error)
            }
        }
        onMounted(() => {
            getBanners()
        })
        return {
            banners: computed(() => AppState.banners)

        }
    }
};
</script>


<style lang="scss" scoped>
.ad-img {
    max-width: 50vh;
}
</style>