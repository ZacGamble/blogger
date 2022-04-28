<template>
  <div class="row my-4 border border-dark">
    <div class="shadow p-3">
      <div class="col-9">
        <router-link :to="{ name: 'Profile', params: { id: blog.creator.id } }">
          <div class="">
            <img
              class="img-fluid thumbnail"
              :src="blog.creator.picture"
              alt="profile pic"
              title="profile pic"
            />
            <h4 class="">{{ blog.creator.name }}</h4>
          </div>
        </router-link>
        <h3>{{ blog.title }}</h3>
        <p>{{ blog.body }}</p>
        <span>date?</span>
      </div>
      <div class="col-3"></div>
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
.thumbnail {
  border-radius: 50%;
  height: 75px;
}
.thumbnail:hover {
  cursor: pointer;
  transform: scale(1.02);
}
</style>