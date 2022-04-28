<template>
  <div class="row">
    <div class="col-9">
      <h4>{{ blog.creator.name }}</h4>
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.body }}</p>
      <span>date?</span>
    </div>
    <div class="col-3">
      <img class="img-fluid" :src="blog.creator.picture" alt="" />
    </div>
  </div>
</template>


<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },

  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>