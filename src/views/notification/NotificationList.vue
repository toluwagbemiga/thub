<template>
    <div class="mx-auto">
        <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
    </div>
   
    <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 w-mobile sm:w-median lg:w-large mx-auto">
        
        <!-- Notification list -->
        <div class=" mb-4">
            <div class=" i ">
                <ps-label class="text-xl sm:text-2xl lg:text-3xl font-medium">{{ $t("notification_list__notification_list") }} </ps-label>
            </div>

            <div class="flex flex-row mb-16 ">
                <div class='w-full flex flex-col' >
                    <div class="flex flex-col ">
                        <div class="w-full mt-2" v-for="noti in notiProvider.notiList.data" :key="noti.id">
                            <noti-horizontal-item  :noti="noti" :onClick="notiClicked"/>
                        </div>
                    </div>

                    <ps-button v-if="notiProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="notiProvider.isNoMoreRecord ? 'hidden' : ''">{{ $t("notification_list__load_more") }} </ps-button>
                    <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("notification_list__loading") }}  </ps-button>

                </div>

            </div>
        </div>
        <!-- End List -->
    </div>
</template>

<script lang="ts">
// Vue
import router from '@/router';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";

// Models
import { createNotiProviderState } from "@/store/modules/noti/NotiProvider";

// Modules
import NotiHorizontalItem from "@/components/modules/noti/NotiHorizontalItem.vue";

// Params Holders
import NotiParameterHolder from '@/object/holder/NotiParameterHolder';

export default {
    name : "NotificationListView",
    components : {
        NotiHorizontalItem,
        PsButton,
        PsLabel,
        PsAdSense
    },
    setup() {
      
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const notiProvider = createNotiProviderState();
        const holder = new NotiParameterHolder();
        holder.userId = loginUserId;

        notiProvider.loadNotiList(holder);

        function loadMore() {             
            notiProvider.loadNotiList(holder);
        }

        function notiClicked(noti: any) {
            // Redirect
            router.push({
                name: "notification",
                params: { 
                    notificationId: noti.id,
                    message: noti.message,
                    description: noti.description,
                    image: noti.defaultPhoto.imgPath

                     },
            });
        }

        return {
            notiProvider,
            notiClicked,
            loadMore
        };
    }
}
</script>