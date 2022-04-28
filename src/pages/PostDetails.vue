<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="component">
        HI
        <img src="" alt="profile pic" />
        <h1>Profile name here:</h1>
      </div>
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
        await blogPostsService.getByQuery({ creatorId: route.params.id });
        await profilesService.getProfileById(route.params.id);
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