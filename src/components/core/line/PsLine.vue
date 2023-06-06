<template>
    <div class="border border-t-0 " :class="textColor" />
</template>

<script lang='ts'>
export default {
    name : 'PsLine',
    props: {
        textColor : {
            type: String,               
            default: 'text-primary-500 dark:text-textdark-500',            
        }        
    }
}
</script>
