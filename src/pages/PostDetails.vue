<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="component p-3 m-2">
        <img :src="blogPosts[0].creator.picture" alt="profile pic" />
      </div>
      <h1>
        <strong>{{ blogPosts[0].title }}</strong>
      </h1>
      <h3>{{ blogPosts[0].creator.name }}</h3>
      <h5>Last updated: {{ blogPosts[0].createdAt.substring(0, 10) }}</h5>
      <p class="p-1 border fs-4">{{ blogPosts[0].body }}</p>
      <div class="col-2"></div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { blogPostsService } from "../services/BlogPostsService";
import { profilesService } from "../services/ProfilesService";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
export default {
  // props: {
  //   blogPosts: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  setup() {
    const route = useRoute();

    onMounted(async () => {
      try {
        logger.log("hello from details page");
        await blogPostsService.getByQuery({ _id: route.params.id });
        // await profilesService.getProfileById(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      profile: computed(() => AppState.activeProfile),
      blogPosts: computed(() => AppState.activePosts),
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>