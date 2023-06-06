<template>
    <p class="" :class="textColor === '' ? 'text-secondary-500 dark:text-secondaryDark-white' : textColor">
        <slot></slot>
    </p>
</template>

<script lang='ts'>
export default {
    name : 'PsLabel',
    props: {
        textColor : {
            type: String,               
            default: 'text-secondary-500 dark:text-secondaryDark-white',            
        }        
    }
}
</script>
