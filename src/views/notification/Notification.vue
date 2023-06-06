<template>
    <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 w-mobile sm:w-median lg:w-large mx-auto">
        <div class="flex flex-col">
            <div class=" mb-4 flex items-center "> 
                <ps-route-link :to="{ name: 'notification-list'}">                          
                    <ps-label
                        class="hover:underline cursor-pointer font-medium"> 
                            {{ $t("notification__notification_list") }}
                    </ps-label>
                </ps-route-link> 
                <ps-icon name="rightArrow" class='mx-2'/>
                <ps-label > {{ $t("notification__notification_detail") }} </ps-label>
            </div>
            
            <div class=" w-auto cursor-pointer mt-4  mb-16">
                <img alt="Placeholder" width="300px" height="300px"  class="block w-full lg:h-96 h-56 sm:h-72  object-cover" :src="notiProvider.imageUrl( image )" @error="notiProvider.defaultCarImage">
                <div class="mt-4">
                    <ps-label-title> {{message}} </ps-label-title>
                    <p class="mt-4">
                        <ps-label v-html="description"> </ps-label>
                    </p>
                </div>
            </div>
           
        </div>

    </div>
    <!-- google adsense desktop view -->
    <div class="mx-auto">
        <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
    </div>
   
</template>

<script lang="ts">
//Vue
import { useRoute } from 'vue-router';

import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

//Models
import { createNotiProviderState } from "@/store/modules/noti/NotiProvider";

export default {
    name : "NotificationView",
    components : {
        PsLabelTitle,
        PsLabel,
        PsIcon,
        PsRouteLink,
        PsAdSense
    },
    setup() {
       
        const route = useRoute();
        const notificationId = route.params.notificationId.toString();
        const message = route.params.message.toString();
        const description = route.params.description.toString();
        const image = route.params.image.toString();
        const notiProvider = createNotiProviderState();

        return {
            notiProvider,
            notificationId,
            message,
            description,
            image
        }
    }
}
</script>