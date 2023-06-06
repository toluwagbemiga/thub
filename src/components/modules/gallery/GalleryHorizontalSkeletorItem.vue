<template>
    <div class='w-screen overflow-hidden bg-primary-000 dark:bg-primaryDark-black' >
        <div class=' w-full h-64'>
            <Skeletor class='rounded-none'/>
        </div> 
    </div>
</template>

<script lang="ts">
import {  createGalleryProviderState } from '@/store/modules/gallery/GalleryProvider';
import { defineComponent } from "vue";
import DefaultPhoto from "@/object/DefaultPhoto";
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";

export default defineComponent ({
    name : "GalleryHorizontalSkeletorItem",
    components : {
       Skeletor
    },
    props : {
        gallery : { type : DefaultPhoto } ,
        onClick : Function,
        customClass : {
            type : String,
            default : ' h-112 object-contain'
        }
    },
    setup() {
        // Inject Provider
        const galleryProvider = createGalleryProviderState();
        
        return {
            galleryProvider
        }

    }
});
</script>