<template>
    <div class=' mt-36 flex flex-col items-center'>
        <img src="@/assets/images/not_found.png"  width="30px" height="20px" alt='not found' class=" w-2/3 h-auto object-cover "/>
        <ps-label class="">
            {{ $t('not_found__page_does_not_exit') }}
        </ps-label>
        <ps-button @click="goToDashboard" class='mt-12 mb-20'> {{ $t('not_found__go_to_dashboard') }} </ps-button>
    </div>
</template>

<script lang='ts'>

import PsLabel from "@/components/core/label/PsLabel.vue";
import PsButton from "@/components/core/buttons/PsButton.vue";
import router from '@/router'
import { defineComponent } from "vue";

export default defineComponent({
    name: "NotFoundView",
    components: { 
        PsLabel,
        PsButton
    },    
    setup() {
        function goToDashboard() {
            router.push({name: "dashboard"});
        }

        return {
            goToDashboard
        }

    }
  
  
});
</script>
