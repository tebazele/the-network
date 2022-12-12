import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getPosts() {
        const res = await api.get('api/posts')
        logger.log('got posts', res.data, res.data.page)
        AppState.posts = res.data.posts.map(p => new Post(p))
        if (AppState.account.id) {
            AppState.posts.forEach(p => {
                // logger.log("post id:", p.id, "acct id:", AppState.account.id)
                //if (p.id == "6393abc8ecaffe36ef9785fc")
                //    debugger
                p.likedByAccount = p.likeIds.includes(AppState.account.id)
                logger.log(p.likedByAccount)
            })

        }
        let pageArr = res.data.page.split(' ')
        // logger.log(pageArr)
        AppState.page = parseInt(pageArr[0])
        AppState.maxPage = parseInt(pageArr[2])

    }

    async createPost(data) {
        const res = await api.post('api/posts', data)
        logger.log('new post', res.data)
        AppState.posts.unshift(new Post(res.data))
        // this.getPosts()
    }

    async getPostsByProfileId(id) {
        const res = await api.get('api/posts', { params: { creatorId: id } })
        logger.log('got posts by this person', res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))

        let pageArr = res.data.page.split(' ')
        // logger.log(pageArr)
        AppState.page = parseInt(pageArr[0])
        AppState.maxPage = parseInt(pageArr[2])
    }

    async likeOrUnlike(id) {
        const res = await api.post('/api/posts/' + id + '/like')

        logger.log('post liked', id)

    }

    async removePost(id) {
        // logger.log('removing post', id)
        const res = api.delete('/api/posts/' + id)
        logger.log('removing post', res)
        AppState.posts = AppState.posts.filter(p => p.id != id)
    }

    async changePage(num, id = '') {
        if (!id) {
            logger.log(num)
            const res = await api.get('/api/posts', { params: { page: num } })
            AppState.posts = res.data.posts.map(p => new Post(p))
            AppState.page = num
        } else {
            const res = await api.get('/api/posts', {
                params: {
                    creatorId: id,
                    page: num
                }
            })

            AppState.posts = res.data.posts.map(p => new Post(p))
            AppState.page = num
        }

    }
}

export const postsService = new PostsService()