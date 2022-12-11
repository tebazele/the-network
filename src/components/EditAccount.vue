<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="editForm">Edit Your Account</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="editAccount()">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input v-model="myAccount.name" type="text" required class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="picture" class="form-label">Picture</label>
                    <input v-model="myAccount.picture" type="text" required class="form-control" id="picture">
                </div>
                <div class="mb-3">
                    <label for="bio" class="form-label">Bio</label>
                    <textarea v-model="myAccount.bio" required class="form-control" id="bio" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="coverImg" class="form-label">Cover Image</label>
                    <input v-model="myAccount.coverImg" required class="form-control" id="coverImg" rows="3" />
                </div>
                <div class="mb-3">
                    <label for="github" class="form-label">Your Github</label>
                    <input v-model="myAccount.github" class="form-control" id="github" rows="3" />
                </div>
                <div class="mb-3">
                    <label for="linkedin" class="form-label">Your LinkedIn</label>
                    <input v-model="myAccount.linkedin" class="form-control" id="linkedin" rows="3" />
                </div>
                <div class="mb-3">
                    <label for="resume" class="form-label">Your Resume</label>
                    <input v-model="myAccount.resume" class="form-control" id="resume" rows="3" />
                </div>
                <div class="mb-3">
                    <label for="class" class="form-label">Your Class</label>
                    <input v-model="myAccount.class" class="form-control" id="class" rows="3" />
                </div>
                <div class="mb-3">
                    <label for="graduated" class="form-label">Have you graduated?</label>
                    <input v-model="myAccount.graduated" class="form-control" id="graduated" rows="3" />
                </div>
                <button class="btn btn-success mb-1" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
export default {
    setup() {
        const myAccount = ref({})
        watchEffect(() => {
            if (AppState.account.id) {
                myAccount.value = { ...AppState.account }
            }
        })
        return {
            myAccount,
            async editAccount() {
                try {
                    await accountService.editAccount(myAccount.value)
                    Pop.toast('Account edited!', 'success')
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