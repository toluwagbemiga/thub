<template>
   <div class="text-center cursor-pointer w-full lg:py-6 lg:px-8 px-2 py-2 bg-primary-000 dark:bg-primaryDark-black rounded-x sm:rounded-xl lg:rounded-2xl">
        <div class='flex justify-center'>
            <img alt="Placeholder" class="w-12 h-12" width="100px" height="100px" v-lazy="categoryProvider.imageUrl(category ? category.defaultIcon.imgPath : '',2) " @error="categoryProvider.defaultCarImage">
        </div>
        <div class="lg:text-base text-sm lg:pt-4 pt-2  ">
            <ps-label class=" lg:text-base sm:text-sm text-xxs" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ category.catName.length > 8 ? category.catName.slice(0,8)+'...' : category.catName }}  </ps-label>
        </div>
    </div>
</template>

<script lang="ts">
import { createCategoryProviderState } from "@/store/modules/category/CategoryProvider";
import { defineComponent } from "vue";
import PsLabel from '@/components/core/label/PsLabel.vue';
import Category from "@/object/Category";

export default defineComponent ({
    name : "CategoryHorizontalItem",
    props : {
        category : { type : Category } ,
    },
    components : {
       PsLabel
    },
    setup() {
        // Inject Provider
        const categoryProvider = createCategoryProviderState();
        
        return {
            categoryProvider
        }

    }
});
</script>