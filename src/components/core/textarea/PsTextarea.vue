<template>
    <textarea class="shadow-sm text-sm"
                :rows="rows"
                :class="theme"
                :value="value"
                @input="handleInput($event.target.value)"
    ></textarea>
</template>

<script lang='ts'>
export default {
    name : 'PsTextArea',
    props: {
        "rows" : {
            type: Number,
            default: 3
        },  
        "value" : String,
        "type" : {
            type: String,
            default: "text"
        },  
        "theme" : {
            type: String,
            default : "ring-primary-200 dark:ring-primaryDark-grey focus:outline-none focus:ring py-2 ps-4 form-input bg-primary-000 dark:bg-primaryDark-black text-secondary-500 dark:text-secondaryDark-white rounded-xl lg:rounded-2xl"
                
        },           
    },
    setup(_, {emit}) {
        function handleInput(v) {              
            emit('update:value', v);
        }

        return {
            handleInput
        }
    }
};
</script>