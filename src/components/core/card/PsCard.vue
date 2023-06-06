<template>
  <div class="overflow-hidden lg:rounded-2xl rounded-xl bg-primary-000 dark:bg-gray-900  dark:border-black" 
    :class="enabledHover ? 'hover:shadow-lg' : '' " key="">
    <slot class=""></slot>
  </div>
</template>

<script lang='ts'>
export default {
    name : "PsCard",
    props: {
        enabledHover : {
            type : Boolean,
            default : false 
        },
    }
};
</script>