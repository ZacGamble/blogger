<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="component p-3 m-2">
        <img :src="blogPost.creator.picture" alt="profile pic" />
      </div>
      <h1>
        <strong>{{ blogPost.title }}</strong>
      </h1>
      <h3>{{ blogPost.creator.name }}</h3>
      <h5>Last updated: {{ blogPost.createdAt.substring(0, 10) }}</h5>
      <p class="p-1 border fs-4">{{ blogPost.body }}</p>
      <div class="col-2"></div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/runtime-core";
import { blogPostsService } from "../services/BlogPostsService";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
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
    return {
      profile: computed(() => AppState.activeProfile),
      blogPost: computed(() => AppState.activePost),
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>