<template>
    <ps-route-link
            :to="{name: name, params : params2 }" 
            :textColor="route.name === name && textColor == '' ? 'text-primary-500 dark:text-primary-500': textColor "
            :class="route.name === name ? ' font-bold flex': 'flex' "> 
            {{title}}
            
    </ps-route-link>
</template>

<script lang="ts">
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import { useRoute } from 'vue-router';

export default {
    name: 'PsNavMenu',
    components: {
        PsRouteLink
    },
    props: {
        name : {
            type: String,
            default : 'Dashboard'
        },
        title : {
            type: String,
            default : ''
        },
        params2 : {
            type : Object,            
        },
        textColor : {
            type : String,
            default : ''
        }
    },
    setup() {
        const route = useRoute();
        return {
            route
        }
    }
}
</script>PsLink