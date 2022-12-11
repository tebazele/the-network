<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-3 login-col p-0">
        <Login />
      </div>
      <div class="col-9 p-0 fira-sans">
        <header>
          <Navbar />
        </header>
        <section class="row">

          <main class="col-md-7">
            <router-view />

          </main>


          <div class="col-5">
            <Banner />
          </div>
        </section>
      </div>
    </section>
  </div>
  <div class="modal fade" id="editAccount" tabindex="-1" aria-labelledby="BlogPost" aria-hidden="true">
    <div class="modal-dialog">
      <!-- NOTE modal to component out -->
      <EditAccount />
    </div>
  </div>

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Banner from './components/Banner.vue'
import EditAccount from './components/EditAccount.vue'
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login, EditAccount, Banner }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

.login-col {
  min-height: 100vh;
}

.full-width {
  width: 100%;
}



// footer {
//   display: grid;
//   place-content: center;
//   height: 32px;
// }
</style>
