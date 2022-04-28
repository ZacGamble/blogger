<template>
    <div class="row mt-3">
        <div class="col-2">
            <img v-if="profile.picture" :src="profile.picture" :alt="'Profile picture of ' + profile.name" class="img-fluid fit-cover rounded-circle" />
        </div>
        <div class="col-10">
            <h3>{{ profile.name }}</h3>
            <button v-if="account.id === profile.id" class="btn btn-primary"><i class="mdi mdi-pen mdi-24px"></i></button>
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-12">
            <button v-if="account.id === profile.id" class="btn btn-primary"><i class="mdi mdi-plus mdi-24px"></i></button>
        </div>
    </div>
    <BlogPost v-for="b in blogPosts" :key="b.id" :blog="b" />
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { profilesService } from "../services/ProfilesService.js";
import { blogPostsService } from "../services/BlogPostsService.js";
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default
{
    setup()
    {
        const route = useRoute();

        onMounted(async () =>
        {
            try
            {
                await blogPostsService.getByQuery({ creatorId: route.params.id })
                await profilesService.getProfileById(route.params.id);
            }
            catch(error)
            {
                logger.error("[ProfilePage.vue > onMounted]", error.message);
                Pop.toast(error.message, "error");
            }
        });

        return {
            // TODO make Appstate.activeProfile and activePosts
            profile: computed(() => AppState.activeProfile),
            blogPosts: computed(() => AppState.activePosts),
            account: computed(() => AppState.account)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>