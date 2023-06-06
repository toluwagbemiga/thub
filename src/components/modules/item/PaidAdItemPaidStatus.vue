<template>
<div class="">
    <div v-if="status == 'Progress'" >
    <ps-label-caption>
        <div class="absolute py-2 px-4 right-2 top-2 bg-green-500 text-textLight   text-center leading-4 rounded-md">
            {{ $t("paidad_item__progress") }}
        </div>
    </ps-label-caption>
    </div>

    <div v-else-if="status == 'Finished'">
    <ps-label-caption>
        <div class="absolute py-2 px-4 right-2 top-2 bg-green-500 text-textLight   text-center leading-4 rounded-md">
            {{ $t("paidad_item__completed") }}
        </div>
    </ps-label-caption>
    </div>
    
    <div v-else-if="status == 'Not yet start'">
    <ps-label-caption>
        <div class="absolute py-2 px-4 right-2 top-2 bg-yellow-500 text-textLight   text-center leading-4 rounded-md">
            {{ $t("paidad_item__not_reached") }}
        </div>
    </ps-label-caption>
    </div>

    <div v-else-if="status == 'not_available'">
    <ps-label-caption>
        <div class="absolute py-2 px-4 right-2 top-2 bg-gray-500 text-textLight   text-center leading-4 rounded-md">
            {{ $t("paidad_item__no_action") }}
        </div>
    </ps-label-caption>
    </div>

    <div v-else-if="status == 'Waiting For Approval'">
    <ps-label-caption>
        <div class="absolute py-2 px-4 right-2 top-2 bg-yellow-500 text-textLight   text-center rounded-md">
            {{ $t("paidad_item__wait_approval") }}
        </div>
    </ps-label-caption>
    </div>

    <div v-else-if="status == 'Reject'">
    <ps-label-caption>
        <div class="absolute py-2 px-4 right-2 top-2 bg-red-600 text-textLight   text-center leading-4 rounded-md">
            {{ $t("paidad_item__wait_rejected") }}
        </div>
    </ps-label-caption>
    </div>
</div>
</template>

<script lang="ts">

import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';

export default {
    name : "PaidAdItemPaidStatus",
    components : {     
        PsLabelCaption   
        
    },
    props : {
        status : { type : String } ,
        onClick : Function
    },

}
</script>