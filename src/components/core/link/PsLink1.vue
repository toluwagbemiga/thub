<template>
    <a :href="url" class="w-full flex uppercase justify-center text-sm font-medium p-4" target="_parent" :class="textColor === '' ? 'text-secondary-500 dark:text-secondaryDark-white' : textColor">
        <slot></slot>
    </a>    
</template>

<script lang='ts'>
export default {
    name : 'PsLink1',
    props: {
        textColor : {
            type: String,               
            default: 'text-secondary-500 dark:text-secondaryDark-white',                
        },
        url : {
            type : String
        }        
    }
}
</script>