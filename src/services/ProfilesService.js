import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"
import { AppState } from '../AppState.js'
import { Account } from "../models/Account.js"

class ProfilesService {
    async getProfileById(id) {
        const res = await api.get('/api/profiles/' + id)
        logger.log('got profile by id', res.data)
        AppState.activeProfile = new Account(res.data)

    }

    async searchProfiles(search) {
        const res = await api.get('/api/profiles', { params: search })
        logger.log('searching profiles', res.data)
        AppState.profilesResults = res.data.map(p => new Account(p))
    }

}

export const profilesService = new ProfilesService()