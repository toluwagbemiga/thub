<template>
    <div class="flex flex-col mt-2 w-full h-auto cursor-pointer" @click="onClick != null ? onClick(deal) : null">
       <ps-card class="flex w-full flex-col my-2 bg-white dark:bg-primaryDark-black " :enabledHover="true">
           <div class="flex flex-col">
                <div class="flex content-center items-center p-5">
                    <ps-icon name="dot" h="8" class="mt-1 " textColor="text-secondary-400 dark:text-secondaryDark-grey" />
                    <ps-label > {{ deal ? deal.name : '' }} </ps-label>
                </div>
            </div>
       </ps-card>
    </div>
</template>

<script lang="ts">
import { createDealOptionProviderState } from "@/store/modules/dealOption/DealOptionProvider";
import { defineComponent } from "vue";
import PsLabel from '@/components/core/label/PsLabel.vue';
import DealOption from "@/object/DealOption";
import PsCard from '@/components/core/card/PsCard.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';

export default defineComponent ({
    name : "DealHorizontalItem",
    props : {
        deal : { type : DealOption } ,
        onClick : Function
    },
    components : {
       PsLabel,
       PsCard,
       PsIcon
    },
    setup() {
        // Inject Provider
        const dealoptionProvider = createDealOptionProviderState();
        
        return {
            dealoptionProvider
        }

    }
});
</script>