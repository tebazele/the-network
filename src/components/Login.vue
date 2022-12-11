<template>
  <div class="bg-white elevation-5 m-2 space">

    <section class="row align-items-center pt-5">
      <div class="col-12 text-center">
        <!-- NOTE login button -->
        <button class="btn btn-success selectable text-uppercase my-2 my-lg-0" @click="login"
          v-if="!user.isAuthenticated">
          Login or Sign up
        </button>
        <!-- NOTE avatar of person logged in -->
        <div v-else>

          <!-- <div class="space"></div> -->
          <div class="dropdown dropstart my-2 my-lg-0 fira-sans space">
            <div type="button" class="border-0 selectable no-select" data-bs-toggle="dropdown" aria-expanded="false">
              <div v-if="account.picture || user.picture" class="big-margin">
                <img :src="account.picture || user.picture" alt="account photo"
                  class="profile-img rounded-circle border border-success border-1" />
                <i v-if="account.graduated" class="mdi mdi-school fs-1"></i>
              </div>
              <div class="mt-3">
                <h6 v-if="account.class">{{ account.class }}</h6>
                <h3 v-if="account.name">{{ account.name }}</h3>
              </div>

            </div>
            <!-- <div class="space"></div> -->
            <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
              <div class="list-group">
                <router-link :to="{ name: 'Account' }">
                  <div class="list-group-item dropdown-item list-group-item-action">
                    Manage Account
                  </div>
                </router-link>
                <router-link v-if='account.id' :to="{ name: 'Profile', params: { id: account.id } }">
                  <div class="list-group-item dropdown-item list-group-item-action">
                    Go to My Profile
                  </div>
                </router-link>
                <div class="list-group-item dropdown-item list-group-item-action text-danger selectable"
                  @click="logout">
                  <i class="mdi mdi-logout"></i>
                  logout
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <h1 v-if="account.github"><a target="_blank" :href="account.github"><i class="mdi mdi-github"></i></a>
              </h1>
              <h1 v-if="account.linkedin"><a target="_blank" :href="account.linkedin"><i
                    class="mdi mdi-linkedin"></i></a></h1>
              <h1 v-if="account.resume"><a target="_blank" :href="account.resume"><i
                    class="mdi mdi-file-certificate"></i></a></h1>

            </div>
          </div>


        </div>
      </div>
    </section>
  </div>




</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.space {
  height: 100vh;
}

.big-margin {
  margin-top: 20vh;
}

.profile-img {
  height: 20vh;
  width: 20vh;
}
</style>
