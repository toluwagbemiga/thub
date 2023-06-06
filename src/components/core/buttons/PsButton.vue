<template>
    <button :type="type" :disabled="disabled" 
        class="items-center theme px-4 py-2  
            font-medium capitalize tracking-widest 
            active:bg-gray-900 focus:outline-none
            focus:border-gray-900 focus:shadow-outline-gray
            transition ease-in-out duration-150" 
       :class="[disabled ? 'bg-primary-500 dark:bg-primaryDark-accent text-secondary-000 dark:text-secondaryDark-grey' : theme, rounded, textSize]">
        <slot class=""></slot>
    </button>
</template>

<script lang='ts'>
    export default {
        name: "PsButton",
        props: {
            type: {
                type: String,
                default: 'submit',
            },
            theme : {
                type: String,
                default: 'bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark'
            },
            rounded : {
                type : String,
                default : "rounded-x sm:rounded-xl lg:rounded-2xl" 
            },
            disabled: {
                type: Boolean,
                default: false
            },
            textSize :{
                type: String,
                default: 'lg:text-sm sm:text-xs text-xxs'
            }
        }
    }
</script>
