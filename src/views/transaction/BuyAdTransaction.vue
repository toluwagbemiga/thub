<template>
<div>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 ">
                

                <div class="flex flex-col items-start mt-8">
                    <div class="w-full flex flex-row justify-between">  
                        <div class="flex-grow">
                            <ps-label-header-4 class=" mb-4 font-medium">  {{ $t("user_setting_modal__limit_ads") }} </ps-label-header-4>
                            <!-- <ps-label >  {{ $t("paid_item_list__text") }}</ps-label> -->
                        </div>
                        <div class="flex flex-col">
                        <ps-label @click="buyAdClick" class='flex-grow-0 cursor-pointer bg-primary-500 dark:bg-primaryDark-accent lg:rounded-2xl rounded-xl font-medium cursor-pointer sm:text-xs sm:w-32 w-10  ps-3.5 pe-1 sm:ps-4 sm:pe-3 py-1' textColor="text-textLight dark:text-textDark" > 
                            <div class='flex flex-row items-center'> 
                                <span class="hidden sm:inline-block sm:me-2 "> {{ $t("buy_ad_transacation__new_post") }} </span>
                                <span class="text-xl "> + </span> 
                                </div>
                        </ps-label>
                        </div>
                    </div>
                    
                    <div class=" mb-4 flex items-start mt-8"> 
                        <ps-route-link :to="{ name: 'profile'}">                          
                            <ps-label
                                class="hover:underline cursor-pointer font-medium"> 
                                    {{ breadcrumbuserProvider.user.data ? breadcrumbuserProvider.user.data.userName:'' }}
                            </ps-label>
                        </ps-route-link> 

                        <ps-icon name="rightArrow" class='mx-2'/>

                        <ps-label class="font-light"> {{ $t("user_setting_modal__limit_ads") }} </ps-label>
                    </div>

                    <div class='w-full flex flex-col items-start ' >
                        <div class="w-full">
                             <!-- paid & promote ads -->
                            <div v-if="limitProvider.buyadList?.data != null">
                                <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                            
                                    <div class="w-full col-span-2 lg:col-span-3" v-for="buyad in limitProvider.buyadList.data" :key="buyad.id">
                                
                                        <ps-route-link :to="{ name: 'limit'}">
                                            <limit-ad-horizontal-item  :buyad="buyad" />  
                                        </ps-route-link>
                                        
                                
                                    </div>

                                </div>
                            </div>
                            <div v-else class="w-full flex justify-center">
                                <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white lg:text-xl sm:text-lg text-base font-medium" class="mt-10 flex-grow-0 mx-auto"> {{ $t("list__no_result") }} </ps-label>
                            </div>
                            <!-- end paid ads -->

                        </div>

                        <ps-button v-if="limitProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="limitProvider.isNoMoreRecord ? 'hidden' : ''">{{ $t("list__load_more") }} </ps-button>
                        <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("list__loading") }}  </ps-button>                      

                    </div>
                </div>
            </div>
        </template>
    </ps-content-container>
    <limit-item-modal ref="limit_item_modal" />
</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import LimitItemModal from '@/components/modules/item/LimitItemModal.vue';

import LimitAdHorizontalItem from "@/components/modules/item/LimitAdHorizontalItem.vue";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
//Models
import { createLimitAdItemProviderState } from "@/store/modules/limit/LimitAdItemProvider";
import { createUserProviderState } from "@/store/modules/user/UserProvider";

import "vue-skeletor/dist/vue-skeletor.css";

export default {
    name : "PaidItemListView",
    components : {
        PsContentContainer,
        PsLabelHeader4,
        PsLabel,
        LimitAdHorizontalItem,
        PsButton,
        PsIcon,
        PsRouteLink,
        LimitItemModal
    },
    setup() {
      
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        // Inject Provider
        const limitProvider = createLimitAdItemProviderState();
        const breadcrumbuserProvider = createUserProviderState();
        const limit_item_modal = ref();

        limitProvider.resetPaidAdItemList(loginUserId);

        // Load User By ID List
        breadcrumbuserProvider.getUser(loginUserId);

        function loadMore() {             
            limitProvider.resetPaidAdItemList(loginUserId);
        }
        function buyAdClick(){
            limit_item_modal.value.openModal();
        }


        return {
            limitProvider,
            loadMore,
            breadcrumbuserProvider,
            limit_item_modal,
            buyAdClick
        }
    }
}
</script>