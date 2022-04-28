import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class ProfilesService
{
    async getProfileById(id)
    {
        AppState.activeProfile = {};
        const res = await api.get("api/profiles/" + id);
        logger.log(`[Get Profile By Id response | id = ${id}]`, res.data);
        AppState.activeProfile = res.data;
    }
}

export const profilesService = new ProfilesService();