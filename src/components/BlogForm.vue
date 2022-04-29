<template>
    <form @submit.prevent="createBlog">
        <input type="text" class="form-control" placeholder="Blog Title" v-model="newBlog.title" />
        <textarea class="form-control mt-3" placeholder="Blog Body" v-model="newBlog.body" ></textarea>
        <input type="url" class="form-control mt-3" placeholder="Blog Picture" v-model="newBlog.imgUrl" />
        <h4 v-if="newBlog.tags.length > 0" class="mt-3">Tags</h4>
        <ul>
            <li v-for="(t, i) in newBlog.tags" :key="i">{{t}}</li>
        </ul>
        <input type="text" class="form-control" placeholder="Add Tags" v-model="newBlog.tagEntry">
        <span><small>* press space to add tag</small></span>
        <div class="d-flex justify-content-between mt-4">
            <button type="button" class="btn btn-outline-secondary" @click="closeForm">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { blogPostsService } from '../services/BlogPostsService.js';
import Pop from '../utils/Pop.js';
import { useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { watchEffect } from '@vue/runtime-core';
import { logger } from '../utils/Logger.js';
import { Modal } from 'bootstrap';
export default
{
    setup()
    {
        const newBlog = ref({tags: []});
        const router = useRouter();

        watchEffect(() => 
        {
            if(newBlog.value.tagEntry)
            {
                while(newBlog.value.tagEntry.includes(" "))
                {
                    newBlog.value.tagEntry = newBlog.value.tagEntry.trim().split(" ");
                    if(newBlog.value.tagEntry[0].length > 0)
                    {
                        newBlog.value.tags.push(newBlog.value.tagEntry.shift());
                    }
                    newBlog.value.tagEntry = newBlog.value.tagEntry.join(" ");
                }
            }
        })

        return {
            newBlog,
            async createBlog()
            {
                try
                {
                    await blogPostsService.createBlog(newBlog.value);
                    Modal.getOrCreateInstance(document.getElementById("create-post-modal")).hide();
                    Pop.toast("Successfully created blog", "success");
                    router.push({name: "PostDetails", params: {id: AppState.activePost.id}});
                }
                catch(error)
                {
                    logger.error("[Blog form > create blog]", error.message);
                    Pop.toast(error.message, "error");
                }
            },
            closeForm()
            {
                Modal.getOrCreateInstance(document.getElementById("create-post-modal")).hide();
                newBlog.value = {tags: []};
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>