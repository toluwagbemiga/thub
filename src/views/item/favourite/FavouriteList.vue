<template>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 ">
                <div class="flex flex-col items-start">
                    <ps-label-header-4 class=" mb-4 font-medium"> {{ $t("favourite_list__favourite_list") }} </ps-label-header-4>
                    <ps-label textColor=""> {{ $t("favourite_list__text") }}</ps-label>

                    <div class=" flex items-center mt-8"> 
                        <ps-route-link :to="{ name: 'profile'}">                          
                            <ps-label
                                class="hover:underline cursor-pointer font-medium"> 
                                    {{ breadcrumbuserProvider.user.data ? breadcrumbuserProvider.user.data.userName:'' }}
                            </ps-label>
                        </ps-route-link> 

                        <ps-icon name="rightArrow" class='mx-2'/>

                        <ps-label class="font-light" > {{ $t("favourite_list__favourite_list") }} </ps-label>
                    </div>

                    <div class='w-full flex flex-col items-start mt-4' >
                        <div class="w-full">
                            

                            <div v-if="favouriteitemProvider.favouriteItemList?.data != null">
                                <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                                    <!-- Column -->
                                    <div class="w-full col-span-2 lg:col-span-3" v-for="item in favouriteitemProvider.favouriteItemList.data" :key="item.id">
                                        
                                         <ps-route-link :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                                            <item-horizontal-item  :item="item" />
                                        </ps-route-link>  
                                        
                                    </div>

                                    <!-- END Column -->
                                </div>
                            </div>
                            <div v-else-if=" favouriteitemProvider.loading.value == true ">
                                <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">
                                    <!-- Column -->
                                    <div class="w-full col-span-2 lg:col-span-3" v-for="i in 3" :key="i">
                                        
                                        <item-horizontal-skeletor-item />
                                        
                                    </div>
                                    <!-- END Column -->
                                </div>
                            </div>
                            <div v-else class="w-full flex justify-center">
                                <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white lg:text-xl sm:text-lg text-base font-medium" class="mt-10 flex-grow-0 mx-auto"> {{ $t("list__no_result") }} </ps-label>
                            </div>

                        </div>

                        <ps-button v-if="favouriteitemProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="favouriteitemProvider.isNoMoreRecord == true ? 'hidden' : ''"> {{ $t("favourite_list__load_more") }}  </ps-button>
                        <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("favourite_list__loading") }}  </ps-button>
                    </div>

                </div>
            </div>
        </template>
    </ps-content-container>
</template>

<script lang='ts'>
import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

import { PsValueProvider } from "@/store/modules/core/PsValueProvider";

import { createFavouriteItemProviderState } from "@/store/modules/item/FavouriteItemProvider";
import { createUserProviderState } from "@/store/modules/user/UserProvider";

import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
import ItemHorizontalItem from "@/components/modules/item/ItemHorizontalItem.vue";

export default {
    name : "FavouriteListView",
    components : {
        PsContentContainer,
        PsLabelHeader4,
        PsButton,
        ItemHorizontalSkeletorItem,
        ItemHorizontalItem,
        PsLabel,
        PsIcon,
        PsRouteLink
    },
    setup() {
       
        const psValueHolder = PsValueProvider.psValueHolder;
        // Inject Item Provider
        const favouriteitemProvider = createFavouriteItemProviderState();
        const breadcrumbuserProvider = createUserProviderState();
        const loginUserId = psValueHolder.getLoginUserId();
        // Load Data
        favouriteitemProvider.loadFavouriteItemList(psValueHolder.getLoginUserId());

        // Load User By ID List
        breadcrumbuserProvider.getUser(loginUserId);

        function loadMore() {             
            favouriteitemProvider.loadFavouriteItemList(psValueHolder.getLoginUserId());
        }
        return {
            favouriteitemProvider,
            loadMore,
            breadcrumbuserProvider
        };
    }
}
</script>