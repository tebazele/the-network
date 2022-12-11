import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getPosts() {
        const res = await api.get('api/posts')
        logger.log('got posts', res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.posts.forEach(p => {
            p.likedByAccount = p.likeIds.includes(AppState.account.id)
            logger.log(p.likedByAccount)
        })
    }

    async createPost(data) {
        const res = await api.post('api/posts', data)
        logger.log('new post', res.data)
        AppState.posts.unshift(new Post(res.data))
    }

    async getPostsByProfileId(id) {
        const res = await api.get('api/posts', { params: { creatorId: id } })
        logger.log('got posts by this person', res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))

    }

    async likeOrUnlike(id) {
        const res = await api.post('/api/posts/' + id + '/like')
        logger.log('post liked', id)

    }

    // checkLikes(id) {
    //     let foundPost = AppState.posts.find(p => p.id == id)
    //     let likeIsThere = foundPost.likeIds.includes(AppState.account.id)
    //     AppState.liked = likeIsThere
    //     AppState.likeCount = foundPost.likeIds.length
    //     logger.log(AppState.liked, AppState.likeCount)
    // }
}

export const postsService = new PostsService()