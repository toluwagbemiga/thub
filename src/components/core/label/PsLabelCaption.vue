<template>
    <ps-label class="lg:text-xs sm:text-xxs text-3xs" :textColor="textColor"  >
        <slot></slot>
    </ps-label> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PsLabel from './PsLabel.vue';

export default defineComponent({
    name : 'PsLabelCaption',
    components: { 
        PsLabel 
    },
    props: {
        textColor : {
            type: String,               
            default: 'text-secondary-400 dark:text-secondaryDark-grey',                
        }
    }    
});
</script>