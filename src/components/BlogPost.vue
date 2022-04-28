<template>
  <div class="row my-4 border border-dark shadow no-select action" @click="navigateTo('PostDetails', { id: blog.id })">
    <div class="col-9 p-3">
        <div class="selectable" @click.stop="navigateTo('Profile', { id: blog.creator.id })">
          <img
            class="img-fluid thumbnail"
            :src="blog.creator.picture"
            alt="profile pic"
            title="profile pic"
          />
          <h4 class="">{{ blog.creator.name }}</h4>
        </div>
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
      </div>
    </div>
  </div>
</template>


<script>
import { useRouter } from 'vue-router';
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },

  setup() {
      const router = useRouter();
    return {
        navigateTo(name, params)
        {
            router.push({name, params});
        }
    };
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