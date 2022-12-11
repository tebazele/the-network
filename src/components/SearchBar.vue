<template>
    <div>
        <form @submit.prevent="searchProfiles" class="input-group">
            <input type="text" class="border border-info border-3" v-model="search.query" />
            <button class="btn btn-info"><i class="mdi mdi-magnify"></i></button>
        </form>


    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter()
        const search = reactive({
            query: ''
        })
        return {
            search,
            async searchProfiles() {
                try {
                    await profilesService.searchProfiles(search)
                    router.push({ name: 'Results' })
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

</style>