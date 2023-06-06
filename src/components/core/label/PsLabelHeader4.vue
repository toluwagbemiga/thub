<template>
    <ps-label class="lg:text-3xl sm:text-2xl text-xl font-medium" :textColor="textColor"  >
        <slot></slot>
    </ps-label> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PsLabel from './PsLabel.vue';

export default defineComponent({
    name : 'PsLabelHeader4',
    components: { PsLabel },
    props: {
        textColor : {
            type: String,               
            default: 'text-secondary-500 dark:text-secondaryDark-white',            
        }        
    }    
});
</script>