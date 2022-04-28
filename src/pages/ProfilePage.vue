<template>
    <div class="row mt-3" v-if="!editing">
        <div class="col-2">
            <img v-if="profile.picture" :src="profile.picture" :alt="'Profile picture of ' + profile.name" class="img-fluid fit-cover rounded-circle" />
        </div>
        <div class="col-10 d-flex">
            <h3>{{ profile.name }}</h3>
            <div class="ms-3">
                <button v-if="account.id === profile.id" class="btn btn-primary" @click="editing = true" title="Edit Profile"><i class="mdi mdi-pen mdi-24px"></i></button>
            </div>
        </div>
    </div>
    <div class="row mt-3" v-else>
        <div class="col-10 offset-1 ">
            <form @submit.prevent="updateProfile">
                <div class="d-flex flex-column">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <label for="username" class="fs-4">Username:</label>
                        </div>
                        <div class="col-10">
                            <input type="text" class="form-control fs-4" placeholder="Username" name="username" required v-model="profile.name" />
                        </div>
                    </div>
                    <div class="row align-items-center mt-3">
                        <div class="col-2">
                            <label for="username" class="fs-4">Profile Picture:</label>
                        </div>
                        <div class="col-10">
                            <input type="url" class="form-control fs-4" placeholder="Profile picture"  required v-model="profile.picture" />
                        </div>
                    </div>
                    <div class="d-flex justify-content-around mt-4">
                        <button type="button" class="btn btn-outline-secondary text-dark" @click="editing = false">Cancel</button>
                        <button type="submit" class="btn btn-primary">Apply</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-12">
            <button v-if="account.id === profile.id" class="btn btn-primary"><i class="mdi mdi-plus mdi-24px"></i></button>
        </div>
    </div>
    <BlogPost v-for="b in blogPosts" :key="b.id" :blog="b" />

    <Modal id="create-post-modal">
        <template #modal-header>
            <h5>New Blog Post</h5>
        </template>
        <template #modal-body>
            <BlogForm />
        </template>
    </Modal>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { useRoute } from 'vue-router'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { profilesService } from "../services/ProfilesService.js";
import { blogPostsService } from "../services/BlogPostsService.js";
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { accountService } from '../services/AccountService.js'
export default
{
    setup()
    {
        const route = useRoute();
        const editing = ref(false);

        onMounted(async () =>
        {
            try
            {
                AppState.activeProfile = {};
                AppState.activePosts = [];
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
            editing,
            profile: computed(() => AppState.activeProfile),
            blogPosts: computed(() => AppState.activePosts),
            account: computed(() => AppState.account),
            async updateProfile()
            {
                try
                {
                    await accountService.editAccount(AppState.activeProfile);
                    Pop.toast("Successfully edited account", "success")
                    editing.value = false;
                }
                catch(error)
                {
                    logger.error("[ProfilePage.vue > Update Profile]", error.message);
                    Pop.toast(error.message, "error");
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>