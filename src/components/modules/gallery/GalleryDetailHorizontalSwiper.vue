<template>
    <ps-image-modal ref="psmodal" :isClickOut='false' class="z-50 content-center mx-auto" > 
        <template #body>
            <div class="w-screem flex flex-col">
                <div class="flex flex-row justify-between"> 
                    <div class="flex-grow" />
                    <font-awesome-icon @click="psmodal.toggle(false)" :icon="['fas', 'times']" class="text-secondary-700 dark:text-secondaryDark-grey" size="2x" />
                </div>
                <div class=" flex flex-row justify-between">
                    <div class="my-auto" @click="leftArrowClicked">
                        <ps-icon name="leftArrow" class='block sm:hidden stroke-current stroke-0 ' textColor="text-secondary-700 dark:text-secondaryDark-grey" w="30" h="30" />
                        <ps-icon name="leftArrow" class='hidden sm:block lg:hidden stroke-current stroke-0 ' textColor="text-secondary-700 dark:text-secondaryDark-grey" w="40" h="40" />
                        <ps-icon name="leftArrow" class='hidden lg:block stroke-current stroke-0 ' textColor="text-secondary-700 dark:text-secondaryDark-grey" w="50" h="50" />
                    </div>
                    <div class="flex flex-grow max-w-5/6">
                        <div v-if="gallery.imgType == 'video'"  class="w-full h-auto " >
                            <video width="320" height="240" class=" w-full h-112 mt-0 lg:mt-2 object-contain object-contains" controls>
                                <source :src="galleryProvider.videoUrl(gallery ? gallery.imgPath : '')" 
                                type="video/mp4">
                                <source :src="galleryProvider.videoUrl(gallery ? gallery.imgPath : '')" 
                                type="video/ogg">
                                <img  alt="Placeholder" :src="galleryProvider.imageUrl(gallery ? gallery.imgPath : '')" :error="galleryProvider.defaultCarImage" width="300px" height="400px" class="w-full h-112 overflow:hidden object-contain" >
                            </video>
                        </div>
                        <img v-else alt="Placeholder" width="300px" height="400px" class="w-full h-112 overflow:hidden object-contain" 
                        :src="galleryProvider.imageUrl(gallery ? gallery.imgPath : '')"
                        @error="galleryProvider.defaultCarImage" >
                    </div>
                    <div class="my-auto cursor-pointer"  @click="rightArrowClicked">
                        <ps-icon  name="rightArrow" class='block sm:hidden stroke-current stroke-0 ' textColor="text-secondary-700 dark:text-secondaryDark-grey" w="30" h="30"  />
                        <ps-icon  name="rightArrow" class='hidden sm:block lg:hidden stroke-current stroke-0 ' textColor="text-secondary-700 dark:text-secondaryDark-grey" w="40" h="40"  />
                        <ps-icon  name="rightArrow" class='hidden lg:block stroke-current stroke-0 ' textColor="text-secondary-700 dark:text-secondaryDark-grey" w="50" h="50"  />
                    </div>
                </div>
            </div>
        </template>
        
    </ps-image-modal>
</template>

<script lang='ts'>
import { defineComponent,ref } from 'vue';
import PsImageModal from '@/components/core/modals/PsImageModal.vue';
import DefaultPhoto from '@/object/DefaultPhoto';
import PsIcon from '@/components/core/icons/PsIcon.vue';

import {  createGalleryProviderState } from '@/store/modules/gallery/GalleryProvider';
import PsUtils from '@/utils/PsUtils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes)
export default defineComponent({
    name: "GalleryDetailHorizontalSwiper",
    components : {
        PsImageModal,
        PsIcon
    },
    setup() {
        const psmodal = ref();
        let gallery = ref(new DefaultPhoto());
        let galleryList = new Array();
        const galleryProvider = createGalleryProviderState();
        
        function openModal(galleryParam , galleryListParam) {
            
            gallery.value = galleryParam;
            galleryList = galleryListParam;
            PsUtils.log(galleryListParam);
            psmodal.value.toggle(true);           
        }

        function rightArrowClicked(){
            for (let i = 0; i < galleryList.length; i++) {
                
                if(galleryList[i].imgId == gallery.value.imgId){
                    if(i == galleryList.length -1 ){
                        gallery.value = galleryList[0];
                         break;
                          
                    }else{
                        
                        gallery.value = galleryList[i+1];
                         break;
                    }     
                }  
            }
        }
        function leftArrowClicked(){
            for (let i = 0; i < galleryList.length; i++) {
                
                if(galleryList[i].imgId == gallery.value.imgId){
                   
                    if(i == 0 ){
                        gallery.value = galleryList[galleryList.length-1];
                         break;
                          
                    }else{
                        
                        gallery.value = galleryList[i-1];
                         break;
                    }     
                }  
            }
        }

        return {
            psmodal,
            openModal,
            gallery,
            galleryList,
            galleryProvider,
            rightArrowClicked,
            leftArrowClicked
        }
    },
})
</script>