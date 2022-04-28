<template>
  <div class="row my-4 border border-dark shadow">
    <div class="col-9 p-3">
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
    <div class="col-3">
      <div
        class="
          d-flex
          flex-column
          justify-content-center
          align-items-center
          mt-5
        "
      >
        <router-link
          :to="{ name: 'PostDetails', params: { id: blog.creator.id } }"
        >
          <button class="btn btn-info">Expand view</button>
        </router-link>
      </div>
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