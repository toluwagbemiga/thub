<style scoped>

.swiper-container {
  z-index: 0 !important;
}

.swiper-wrapper {
  z-index: 0 !important;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

</style>

<template>

    <div class='overflow: hidden;'>
        <div v-if="galleryList == null && isLoading "> 
            <swiper
                class='swiper-container w-full overflow-hidden'
                slides-per-view= "auto"
                @swiper="onSwiper"
                @slideChange="onSlideChange" >
                
                <swiper-slide class='swiper-slide' v-for="index in 2" :key="index" >
                    <gallery-horizontal-skeletor-item />
                </swiper-slide>
                
            </swiper> 
            
        </div>
        <div v-else-if="galleryList == null && !isLoading " class="flex flex-row sm:space-x-3 space-x-0">  
            <img alt="Placeholder" class="sm:w-1/2 w-full h-56 object-cover rounded-xl" 
                width="30px" height="30px" :src="require('@/assets/images/default-placeholder.png')" @error="galleryProvider.defaultCarImage">
            <img alt="Placeholder" class="hidden sm:block w-1/2 h-56 object-cover rounded-xl" 
                width="30px" height="30px" :src="require('@/assets/images/default-placeholder.png')" @error="galleryProvider.defaultCarImage">
        </div>
        <div v-else>
           <swiper
                class='hidden sm:block'
                navigation
                :slides-per-view="galleryList.length < 3 ? galleryList.length : 3"
                :space-between="14"
                @slideChange="onSlideChange">
                    <swiper-slide class='swiper-slide bg-background dark:bg-backgroundDark' v-for="gallery in galleryList.slice(0,totalCount)" :key="gallery.imgId" >
                        <gallery-horizontal-item :imageCount="imageCount" :gallery="gallery" @click="imgClicked(gallery)" />
                    </swiper-slide>

            </swiper>

            <swiper
                class='block sm:hidden'
                navigation
                :slides-per-view="1"
                :space-between="14"
                @slideChange="onSlideChange">
                    <swiper-slide class='swiper-slide' v-for="gallery in galleryList.slice(0,totalCount)" :key="gallery.imgId" >
                        <gallery-horizontal-item  :imageCount="imageCount" :gallery="gallery" @click="imgClicked(gallery)" />
                    </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script lang="ts">
import GalleryHorizontalItem from '@/components/modules/gallery/GalleryHorizontalItem.vue';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'; 
import { Swiper, SwiperSlide } from 'swiper/vue';
// import 'swiper/swiper.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';
// import 'swiper/components/navigation/navigation.scss';
// swiper bundle styles
import 'swiper/swiper-bundle.min.css';

// swiper core styles
import 'swiper/swiper.min.css';

// modules styles
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import DefaultPhoto from '@/object/DefaultPhoto';
import GalleryHorizontalSkeletorItem from './GalleryHorizontalSkeletorItem.vue';
import {  createGalleryProviderState } from '@/store/modules/gallery/GalleryProvider';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default {
    name: "GalleryHorizontalSwiper",
    components : {
        Swiper,
        SwiperSlide,
        GalleryHorizontalItem,
        GalleryHorizontalSkeletorItem
    },
    props : {
        totalCount : {
            type : Number,
            default : 0,
        },
        imageCount : {
            type : Number,
            default : 1,
        },
        galleryList : {
            type: Array as () => Array<DefaultPhoto>,
            default: () => [DefaultPhoto]
        },
        isLoading : {
            type : Boolean,
            default : true
        }
    },
    emits: ['clickImage'],
    methods: {        
        setThumbsSwiper() {
            
        },
    },
    setup(  props, context ) {
        let thumbsSwiper : typeof Swiper;
        const galleryProvider = createGalleryProviderState();

        function onSwiper(swiper) {
         
            thumbsSwiper = swiper;            
        }

        function onSlideChange() {}            
        
        function onClick(swiper) {            
            thumbsSwiper.slideTo( swiper.clickedIndex, 100);            
        }
        
        function imgClicked(gallery) {
            context.emit('clickImage', gallery, props.galleryList);
        }

        return {
            onSwiper,
            onSlideChange,
            onClick,
            imgClicked,
            galleryProvider,
        }

    }
    
}
</script>

