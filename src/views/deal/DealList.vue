<template>
    <ps-content-container class="sm:mt-32 lg:mt-36 mt-28">
        <template #content>
            <!-- category list -->
            <div class="flex flex-col mb-4">
                <div class="flex flex-col items-start mt-2">
                    <ps-label-header-4 class="font-medium"> {{ $t("deal_list__title") }} </ps-label-header-4>
                    <ps-label class="mt-2 text-center "> {{ $t("deal_list__text") }} </ps-label>
                </div>
                <div class="flex flex-row mb-8 mt-4">
                    <div class='w-full flex flex-col' >
                        <div class="flex flex-wrap ">

                            <!-- Column -->
                            <div class="w-full" v-for="deal in dealoptionProvider.dealOptionList.data" :key="deal.id">
                                <deal-horizontal-item  :deal="deal" />
                            </div>
                            <!-- END Column -->

                        </div>

                        <ps-button v-if="dealoptionProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="dealoptionProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("category_list__load_more") }} </ps-button>
                        <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("category_list__loading") }} </ps-button>

                    </div>

                </div>
            </div>
            <!-- End category List -->
        </template>
    </ps-content-container>
</template>

<script lang="ts">
import { createDealOptionProviderState } from "@/store/modules/dealOption/DealOptionProvider";

import PsContentContainer from "@/components/layouts/container/PsContentContainer.vue";
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import DealHorizontalItem from '@/components/modules/dealoption/DealHorizontalItem.vue';


export default {
    name: 'DealListView',
    components : {
        PsContentContainer,
        PsButton,
        PsLabel,
        PsLabelHeader4,
        DealHorizontalItem,
    },
    setup (){
       
        const dealoptionProvider = createDealOptionProviderState();

        dealoptionProvider.loadDealOptionList();

        function loadMore() {             
            dealoptionProvider.loadDealOptionList();
        }

        return {
            dealoptionProvider,
            loadMore,

        }
    }
    
}
</script>