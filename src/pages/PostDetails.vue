<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="component p-3 m-2">
        <img :src="blogPost.creator.picture" alt="profile pic" />
      </div>
      <h1>
        <strong>{{ blogPost.title }}</strong>
        <button v-if="blogPost.creatorId === account.id" class="btn btn-outline-danger ms-4" @click="deleteBlog()"><i class="mdi mdi-delete-outline mdi-16px"></i></button>
      </h1>
      <h3>{{ blogPost.creator.name }}</h3>
      <h5>{{ blogPost.createdAt.substring(0, 10) }}</h5>
      <p class="p-1 border fs-4">{{ blogPost.body }}</p>
      <div class="col-2"></div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/runtime-core";
import { blogPostsService } from "../services/BlogPostsService";
import { AppState } from "../AppState";
import { useRoute, useRouter } from "vue-router";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
export default {
    async created()
    {
        try {
            const route = useRoute();
            await blogPostsService.getById(route.params.id);
        } catch (error) {
            logger.error(error);
            Pop.toast(error.message, "error");
        }
    },

  setup() {
      const router = useRouter();
    return {
      profile: computed(() => AppState.activeProfile),
      blogPost: computed(() => AppState.activePost),
      account: computed(() => AppState.account),
      async deleteBlog()
      {
          try
          {
              if(await Pop.confirm())
              {
                  await blogPostsService.deleteBlog(AppState.activePost.id);
                  Pop.toast("Blog successfully deleted", "success");
                  router.push({ name: "Home" });
              }
          }
          catch(error)
          {
              logger.error("[PostDetails > deleteBlog]", error.message);
              Pop.toast(error.message, "error");
          }
      }
    };
  },
};
</script>


<style lang="scss" scoped>
</style>