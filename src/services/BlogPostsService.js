import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BlogPostsService{
    async getAll(){
        const res = await api.get('/api/blogs')
        AppState.blogPosts = res.data
        logger.log(res.data, 'the res')
    }
}
export const blogPostsService = new BlogPostsService()