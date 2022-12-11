import { AppState } from "../AppState.js"

export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.likeIds = data.likeIds
        this.likedByAccount = false
    }


}