<template>
    <div class="w-mobile sm:w-median lg:w-large mx-auto">
        <slot name="content" />
    </div>    
</template>

<script lang='ts'>
import { useRoute } from 'vue-router';

export default {
    name : "PsContentContainer",
    setup() {
        const route = useRoute();
        return {
            route
        }
    }
}
</script>
