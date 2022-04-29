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
       const res = await api.get("api/blogs", { params })
       logger.log("[BlogPosts getByQuery response]", res.data);
       AppState.activePosts = res.data;
    }

    async getById(id)
    {
        const res = await api.get("api/blogs/" + id);
        logger.log("[Blog get by id response]", res);
        AppState.activePost = res.data;
    }

    async createBlog(newBlog)
    {
        const res = await api.post("api/blogs", newBlog);
        logger.log("[Create blog response]", res);
        AppState.activePost = res.data;
    }
}
export const blogPostsService = new BlogPostsService()