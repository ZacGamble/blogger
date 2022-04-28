<template>
  <BlogPost v-for="b in blogs" :key="b.id" :blog="b" />
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted } from "@vue/runtime-core";
import { blogPostsService } from "../services/BlogPostsService";
export default {
  setup() {
    onMounted(async () => {
      try {
        await blogPostsService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      blogs: computed(() => AppState.blogPosts),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>