import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Post.js').Post[]} */
  posts: [],
  /** @type {import('./models/Account.js').Account} */
  activeProfile: {},
  /** @type {import('./models/Banner.js').Banner[]} */
  banners: [],

  liked: null,
  likeCount: 0,
  /** @type {import('./models.Account.js').Account[]} */
  profilesResults: [],
  page: 1,
  maxPage: 10
})
