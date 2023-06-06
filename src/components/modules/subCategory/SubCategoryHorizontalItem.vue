<template>

    <div class="flex flex-col mt-2 w-full h-auto cursor-pointer">
        
        <div class="relative bg-black lg:h-40 sm:h-28 h-20 rounded-md">
            
            <div class="absolute opacity-50">
                
                <img alt="Placeholder" width="150px" height="100px" class="w-screen block mx-auto lg:h-40 sm:h-28 h-20 object-cover rounded-md" :src="subCategoryProvider.imageUrl(subCategory ? subCategory.defaultPhoto.imgPath : '',3) " @error="subCategoryProvider.defaultCarImage">
                
            </div>
            
            <div class="relative justify-end flex">
                <custom-checkbox :isScribe="subCategory.isSubScribe" :checked="subCategory.id" :value="subCategory.isSubScribe" 
                    v-model:selectedValue="checkedSelectedList" v-if="scribe"></custom-checkbox>
            </div>
            <div class="mx-auto lg:pt-16 sm:pt-12 pt-10 relative">
                
                <ps-label class="absolute w-full  lg:text-lg sm:text-sm text-xs text-center leading-4" textColor="text-textLight"> {{subCategory ? subCategory.name : ''}} </ps-label>
            </div>

        </div>  
    </div>

</template>

<script lang="ts">
import { createSubCategoryProviderState } from "@/store/modules/subCategory/SubCategoryProvider";
import { defineComponent, reactive } from "vue";
import PsLabel from '@/components/core/label/PsLabel.vue';
import CustomCheckbox from '@/components/core/checkbox/CustomCheckbox.vue';
import SubCategory from "@/object/SubCategory";

export default defineComponent ({
    name : "SubCategoryHorizontalItem",
    props : {
        subCategory : { type : SubCategory } ,
        scribe : { 
            type : Boolean,
            default : false
        },
        onClick : Function
    },
    components : {
        PsLabel,
        CustomCheckbox,
    },
    setup() {
        // Inject Provider
        const subCategoryProvider = createSubCategoryProviderState();
        const checkedSelectedList = reactive([]);
        
        return {
            subCategoryProvider,
           // handleInput,
           checkedSelectedList
            
        }

    }
});
</script>