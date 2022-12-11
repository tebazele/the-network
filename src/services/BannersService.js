import { AppState } from "../AppState.js"
import { Banner } from "../models/Banner.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class BannersService {
    async getBanners() {
        const res = await api.get('/api/ads')
        logger.log(res.data)
        AppState.banners = res.data.map(a => new Banner(a))
    }
}
export const bannersService = new BannersService()