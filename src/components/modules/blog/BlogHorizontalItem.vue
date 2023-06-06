<template>
    <div class="rounded-xl lg:rounded-2xl cursor-pointer lg:p-2 lg:pb-4 p-1 pb-2 bg-primary-000 dark:bg-primaryDark-black w-full h-full" v-on:click="onClick != null ? onClick(blog) : null">
        <img alt="Placeholder" class="rounded-lg block lg:hidden w-full lg:h-32 h-20 object-cover" width="360px" height="100px" v-lazy="blogProvider.imageUrl(blog ? blog.defaultPhoto.imgPath : '', 2) " @error="blogProvider.defaultCarImage">
        <img alt="Placeholder" class="rounded-lg lg:block hidden w-full lg:h-32 h-20 object-cover" width="360px" height="100px" v-lazy="blogProvider.imageUrl(blog ? blog.defaultPhoto.imgPath : '',3) " @error="blogProvider.defaultCarImage"/>
        <div class="mt-2 px-0.5 lg:px-1" v-if="blog">
            <ps-label class="font-medium text-xs lg:text-sm" v-html=" blog.name.length > 20 ? blog.name.slice(0,15)+' ....' : blog.name "> </ps-label>
            <p class="mt-2  lg:text-sm text-xs">
                <ps-label class="font-light text-xxs lg:text-xs" v-html=" blog.description.length > 70 ? blog.description.slice(0,70)+' ....' : blog.description ">  </ps-label>
            </p> 
        </div>
    </div>
</template>

<script lang="ts">
import PsLabel from '@/components/core/label/PsLabel.vue';
import { createBlogProviderState } from "@/store/modules/blog/BlogProvider";
import Blog from '@/object/Blog';

export default {
    name : "BlogHorizontalItem",
    components : {
        PsLabel
    },
    props : {
        blog : { type : Blog } ,
        onClick : Function
    },
    setup() {
        // Inject Provider
        const blogProvider = createBlogProviderState();
        return {
            blogProvider
        }
    }
}
</script>