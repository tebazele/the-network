<template>
    <h5 class="text-secondary fira-sans m-3">Profiles that match your search:</h5>
    <div v-if="profiles.length > 5" class="container-fluid" v-for="p in profiles.slice(0, 5)">

        <ProfileCard :profile="p" />

    </div>
    <div v-else class="container-fluid" v-for="p in profiles">

        <ProfileCard :profile="p" />

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import ProfileCard from '../components/ProfileCard.vue';

export default {
    setup() {
        return {
            profiles: computed(() => AppState.profilesResults)
        };
    },
    components: { ProfileCard }
};
</script>


<style lang="scss" scoped>

</style>