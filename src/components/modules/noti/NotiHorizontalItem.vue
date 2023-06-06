<template>
    <div class=" w-full cursor-pointer h-20 bg-primary-000 dark:bg-primaryDark-black p-2 rounded-2xl" v-on:click="onClick != null ? onClick(noti) : null">
        <div class="flex flex-row">
            <div class="rounded-2xl bg-background dark:bg-primaryDark-black">
            <div class="sm:w-36 w-24 h-16 ">
                <img alt="Placeholder" width="15px" height="10px" class="block w-full h-full rounded-2xl object-contain" :src="notiProvider.imageUrl(noti ? noti.defaultPhoto.imgPath : '',2) " @error="notiProvider.defaultCarImage">
            </div>
            </div>
            
            <div class="flex sm:hidden flex-col ms-4">
                <ps-label class="text-xs sm:text-sm lg:text-base" v-html=" noti.message.length > 18 ? noti.message.slice(0,15)+' ....' : noti.message "> </ps-label>
                <ps-label class="text-xxs sm:text-xxs lg:text-xs mt-1"  v-html=" noti.description.length > 100 ? noti.description.slice(0,95)+' ....' : noti.description "> </ps-label>
            </div>
            <div class="hidden sm:flex flex-col ms-4">
                <ps-label class="text-xs sm:text-sm lg:text-base" v-html=" noti.message.length > 50 ? noti.message.slice(0,45)+' ....' : noti.message "> </ps-label>
                <ps-label class="text-xxs sm:text-xxs lg:text-xs mt-1"  v-html=" noti.description.length > 200 ? noti.description.slice(0,190)+' ....' : noti.description "> </ps-label>     
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import PsLabel from '@/components/core/label/PsLabel.vue';
import { createNotiProviderState } from "@/store/modules/noti/NotiProvider";
import Noti from '@/object/Noti';

export default {
    name : "NotiHorizontalItem",
    components : {
        PsLabel
    },
    props : {
        noti : { type : Noti, default: new Noti } ,
        onClick : Function
    },
    setup() {
        // Inject Provider
        const notiProvider = createNotiProviderState();
        return {
            notiProvider
        }
    }
}
</script>