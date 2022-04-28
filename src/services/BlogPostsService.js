import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BlogPostsService{
    async getAll(){
        const res = await api.get('/api/blogs')
        AppState.blogPosts = res.data
        logger.log(res.data, 'the res')
    }

    async getByQuery(params = {})
    {
        AppState.activePosts = []
       const res = await api.get("api/blogs", { params })
       logger.log("[BlogPosts getByQuery response]", res.data);
       AppState.activePosts = res.data;
    }
}
export const blogPostsService = new BlogPostsService()